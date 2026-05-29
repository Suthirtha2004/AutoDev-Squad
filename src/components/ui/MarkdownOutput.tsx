import { motion } from "framer-motion";

interface Props {
  content: string;
  glowColor: string;
}

// Minimal markdown renderer — handles bold, headers, bullets, code blocks
function renderMarkdown(text: string): React.ReactNode[] {
  const lines = text.split("\n");
  const elements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeLines: string[] = [];
  let codeKey = 0;

  const parseLine = (line: string, key: number): React.ReactNode => {
    // Bold **text**
    const parts = line.split(/(\*\*[^*]+\*\*)/g);
    return (
      <span key={key}>
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

  lines.forEach((line, i) => {
    if (line.startsWith("```")) {
      if (inCodeBlock) {
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
        inCodeBlock = true;
      }
      return;
    }

    if (inCodeBlock) {
      codeLines.push(line);
      return;
    }

    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="text-base font-bold text-white mt-5 mb-2 border-b border-white/10 pb-1">
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith("# ")) {
      elements.push(
        <h1 key={i} className="text-lg font-bold text-white mt-5 mb-2">
          {line.slice(2)}
        </h1>
      );
    } else if (line.startsWith("### ")) {
      elements.push(
        <h3 key={i} className="text-sm font-bold text-gray-200 mt-4 mb-1">
          {line.slice(4)}
        </h3>
      );
    } else if (line.match(/^[-*] /)) {
      elements.push(
        <li key={i} className="text-sm text-gray-300 leading-relaxed ml-4 list-none flex gap-2">
          <span className="text-cyan-500 flex-shrink-0 mt-1">›</span>
          <span>{parseLine(line.slice(2), 0)}</span>
        </li>
      );
    } else if (line.match(/^\d+\. /)) {
      const num = line.match(/^(\d+)\. /)?.[1];
      elements.push(
        <li key={i} className="text-sm text-gray-300 leading-relaxed ml-4 list-none flex gap-2">
          <span className="text-cyan-500 flex-shrink-0 font-mono text-xs mt-1">{num}.</span>
          <span>{parseLine(line.replace(/^\d+\. /, ""), 0)}</span>
        </li>
      );
    } else if (line.trim() === "") {
      elements.push(<div key={i} className="h-2" />);
    } else {
      elements.push(
        <p key={i} className="text-sm text-gray-300 leading-relaxed">
          {parseLine(line, 0)}
        </p>
      );
    }
  });

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
