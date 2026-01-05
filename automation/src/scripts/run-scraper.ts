import { runScraper } from "../scraper/index.js";

// Get source from command line args: npm run scrape -- --source=ARI
const args = process.argv.slice(2);
const sourceArg = args.find(a => a.startsWith("--source="))?.split("=")[1]?.toUpperCase();

// Available sources: ODTU, TUDOKSAD, ARI, or sector+city for Google Maps
const sources = sourceArg
    ? [{ sector: sourceArg, city: "all" }]
    : [{ sector: "ARI", city: "all" }]; // Default to ARI

console.log(`🕷️ Manual Scraper Run - Source: ${sources[0].sector}`);
runScraper(sources)
    .then(() => console.log("Done"))
    .catch(console.error);
