import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { CATALOGUE, HERO_SLIDES } from '../react-app/src/data/catalogue.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const lines = [];

// 1. Vehicle documents
CATALOGUE.forEach((v, index) => {
  const doc = {
    _id: `vehicle-${v.id}`,
    _type: 'vehicle',
    name: v.name,
    id: { _type: 'slug', current: v.id },
    type: v.type,
    brand: v.brand,
    price: v.price || null,
    priceLabel: v.priceLabel || null,
    down: v.down || null,
    status: v.status || null,
    imageUrl: v.img || null,
    blurb: v.blurb || '',
    seatsMin: v.seatsMin || (v.type === 'van' ? 11 : null),
    seatsMax: v.seatsMax || (v.type === 'van' ? 11 : null),
    ac: !!v.ac,
    specs: (v.specs || []).map(([label, value], i) => ({
      _key: `spec-${i}`,
      label: String(label),
      value: String(value),
    })),
    highlights: Array.isArray(v.highlights) ? v.highlights : [],
    order: (index + 1) * 10,
  };
  lines.push(JSON.stringify(doc));
});

// 2. Hero slide documents
HERO_SLIDES.forEach((s, index) => {
  const slideDoc = {
    _id: `hero-slide-${s.id}`,
    _type: 'heroSlide',
    eyebrow: s.eyebrow,
    vehicle: {
      _type: 'reference',
      _ref: `vehicle-${s.id}`,
    },
    order: index + 1,
  };
  lines.push(JSON.stringify(slideDoc));
});

const outputPath = path.join(__dirname, 'data.ndjson');
fs.writeFileSync(outputPath, lines.join('\n') + '\n', 'utf8');
console.log(`✓ Successfully generated ${outputPath} with ${lines.length} documents!`);
