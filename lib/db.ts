import fs from "fs";
import path from "path";
import type { DB } from "@/types/auth";

const dbPath = path.join(process.cwd(), "db.json");

export const readDB = (): DB => {
  const data = fs.readFileSync(dbPath, "utf-8");
  return JSON.parse(data);
};

export const writeDB = (data: DB): void => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};
