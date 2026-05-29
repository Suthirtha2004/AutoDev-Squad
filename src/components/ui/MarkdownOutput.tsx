import { motion } from "framer-motion";

interface Props {
  content: string;
  glowColor: string;
}

// Minimal markdown renderer — handles bold, headers, bullets, numbered lists, code blocks
function renderMarkdown(text: string): React.ReactNode[] {
  const lines = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n");
  const elements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeLines: string[] = [];
  let codeKey = 0;
  let listType: "ul" | "ol" | null = null;
  let listItems: React.ReactNode[] = [];

  const flushList = () => {
    if (!listType || listItems.length === 0) return;

    elements.push(
      listType === "ul" ? (
        <ul key={`list-${elements.length}`} className="space-y-2 ml-4 list-none">
          {listItems}
        </ul>
      ) : (
        <ol key={`list-${elements.length}`} className="space-y-2 ml-4 list-none">
          {listItems}
        </ol>
      )
    );

    listType = null;
    listItems = [];
  };

  const parseLine = (line: string): React.ReactNode => {
    const parts = line.split(/(\*\*[^*]+\*\*)/g);
    return (
      <span>
        {parts.map((part, i) =>
          part.startsWith("**") && part.endsWith("**") ? (
            <strong key={i} className="text-white font-semibold">
              {part.slice(2, -2)}
            </strong>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  lines.forEach((rawLine, i) => {
    const line = rawLine.trimEnd();

    if (line.startsWith("```") || line === "```") {
      if (inCodeBlock) {
        flushList();
        elements.push(
          <pre
            key={`code-${codeKey++}`}
            className="bg-black/40 border border-white/10 rounded-xl p-4 my-3 overflow-x-auto text-xs text-emerald-300 font-mono leading-relaxed"
          >
            {codeLines.join("\n")}
          </pre>
        );
        codeLines = [];
        inCodeBlock = false;
      } else {
        flushList();
        inCodeBlock = true;
      }
      return;
    }

    if (inCodeBlock) {
      codeLines.push(rawLine);
      return;
    }

    if (line.startsWith("## ")) {
      flushList();
      elements.push(
        <h2 key={i} className="text-base font-bold text-white mt-5 mb-2 border-b border-white/10 pb-1">
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith("# ")) {
      flushList();
      elements.push(
        <h1 key={i} className="text-lg font-bold text-white mt-5 mb-2">
          {line.slice(2)}
        </h1>
      );
    } else if (line.startsWith("### ")) {
      flushList();
      elements.push(
        <h3 key={i} className="text-sm font-bold text-gray-200 mt-4 mb-1">
          {line.slice(4)}
        </h3>
      );
    } else if (line.match(/^[-*] /)) {
      if (listType === "ol") flushList();
      listType = "ul";
      listItems.push(
        <li key={i} className="text-sm text-gray-300 leading-relaxed flex gap-2">
          <span className="text-cyan-500 shrink-0 mt-1">›</span>
          <span>{parseLine(line.slice(2))}</span>
        </li>
      );
    } else if (line.match(/^\d+\. /)) {
      if (listType === "ul") flushList();
      listType = "ol";
      const num = line.match(/^(\d+)\. /)?.[1];
      listItems.push(
        <li key={i} className="text-sm text-gray-300 leading-relaxed flex gap-2">
          <span className="text-cyan-500 shrink-0 font-mono text-xs mt-1">{num}.</span>
          <span>{parseLine(line.replace(/^\d+\. /, ""))}</span>
        </li>
      );
    } else if (line.trim() === "") {
      flushList();
      elements.push(<div key={i} className="h-2" />);
    } else {
      flushList();
      elements.push(
        <p key={i} className="text-sm text-gray-300 leading-relaxed">
          {parseLine(line)}
        </p>
      );
    }
  });

  flushList();

  return elements;
}

export default function MarkdownOutput({ content, glowColor }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative bg-black/30 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
    >
      {/* Top glow line */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${glowColor.replace("0.4", "0.8")}, transparent)`,
        }}
      />

      <div className="p-6 space-y-1">{renderMarkdown(content)}</div>
    </motion.div>
  );
}
