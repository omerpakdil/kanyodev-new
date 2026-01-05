import { runAnalyzer } from "../analyzer/index.js";

console.log("🧠 Manual Analyzer Run");
runAnalyzer(10) // Limit to 10 companies
    .then(() => console.log("Done"))
    .catch(console.error);
