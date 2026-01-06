import { runAnalyzer } from "../analyzer/index.js";

const limit = parseInt(process.argv[2] || "1");

console.log(`🧠 Manual Analyzer Run (limit: ${limit})`);
runAnalyzer(limit)
    .then(() => console.log("Done"))
    .catch(console.error);
