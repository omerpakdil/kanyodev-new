import { runScraper } from "../scraper/index.js";

// Example sources
const sources = [
    { sector: "ODTU", city: "all" },
];

console.log("🕷️ Manual Scraper Run");
runScraper(sources)
    .then(() => console.log("Done"))
    .catch(console.error);
