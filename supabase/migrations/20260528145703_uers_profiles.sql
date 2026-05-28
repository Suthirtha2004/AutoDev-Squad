create table profiles (
  id uuid primary key,
  username text unique,
  created_at timestamp default now()
);