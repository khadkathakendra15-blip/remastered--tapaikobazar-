import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read seedSanity.js content to get VEHICLES and HERO_SLIDES
const seedPath = path.join(__dirname, 'seedSanity.js');
const seedCode = fs.readFileSync(seedPath, 'utf8');

// Dynamically import or evaluate VEHICLES
async function run() {
  const mod = await import('./seedSanity.js?export=true');
}
