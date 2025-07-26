import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import path from "path";

// --- Configuration ---
const numberOfFiles = 48; // You can change this value to control the number of output files
const inputFilePath = "./src/data/spells.json";
const outputDirectory = "./src/data/generated";
// --- End Configuration ---

async function splitSpells() {
  console.log(`Starting to split spells from: ${inputFilePath}`);

  // Ensure output directory exists
  if (!existsSync(outputDirectory)) {
    mkdirSync(outputDirectory, { recursive: true });
    console.log(`Created output directory: ${outputDirectory}`);
  }

  // Read the large JSON file
  let rawData;
  try {
    rawData = readFileSync(inputFilePath, "utf8");
  } catch (error) {
    console.error(`Error reading input file ${inputFilePath}:`, error);
    return;
  }

  let spells;
  try {
    spells = JSON.parse(rawData).spell; // Assuming the JSON has a top-level "spell" array
    if (!Array.isArray(spells)) {
      throw new Error("Expected 'spell' to be an array in the JSON data.");
    }
  } catch (error) {
    console.error("Error parsing JSON data:", error);
    return;
  }

  console.log(`Found ${spells.length} spells.`);

  const spellsPerFile = Math.ceil(spells.length / numberOfFiles);
  console.log(
    `Splitting into ${numberOfFiles} files, with approximately ${spellsPerFile} spells per file.`
  );

  for (let i = 0; i < numberOfFiles; i++) {
    const start = i * spellsPerFile;
    const end = Math.min(start + spellsPerFile, spells.length);
    const chunk = spells.slice(start, end);

    if (chunk.length === 0) {
      console.log(`Skipping empty chunk for file part ${i + 1}`);
      continue;
    }

    const outputFileName = `spells-part-${i + 1}.ts`;
    const outputPath = path.join(outputDirectory, outputFileName);

    // Convert JSON structure to TypeScript array with explicit type
    const tsContent = `export const spellsPart${i + 1}= ${JSON.stringify(
      chunk,
      null,
      2
    )};\n`;

    try {
      writeFileSync(outputPath, tsContent, "utf8");
      console.log(`Successfully wrote ${chunk.length} spells to ${outputPath}`);
    } catch (error) {
      console.error(`Error writing file ${outputPath}:`, error);
    }
  }

  console.log("Spell splitting complete.");
}

splitSpells();
