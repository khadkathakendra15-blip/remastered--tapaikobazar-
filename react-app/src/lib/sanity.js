import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { npr } from './format';

export const sanityConfig = {
  projectId: 'm8sr7eub',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
};

export const sanityClient = createClient(sanityConfig);

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source) {
  if (!source) return null;
  // If it's already a full URL or relative path string, return an object with .url()
  if (typeof source === 'string') {
    return {
      url: () => source,
      width: () => ({ url: () => source, height: () => ({ url: () => source }) }),
      height: () => ({ url: () => source }),
      auto: () => ({ url: () => source }),
      fit: () => ({ url: () => source }),
    };
  }
  return builder.image(source);
}

/* A full-bleed hero is landscape on a desktop and portrait on a phone. Asking
   the browser to cover both from one 3:2 photograph means a 3.25x zoom on the
   phone, which is what "cut off" looks like. So we ask Sanity for a crop that
   already matches each shape; the hotspot set in Studio keeps the vehicle in
   frame either way. */
export function heroSources(imageRef, fallback) {
  if (!imageRef?.asset) return { wide: fallback, tall: fallback };
  const at = (w, h) => urlFor(imageRef).auto('format').fit('crop').width(w).height(h).url();
  return {
    wide: at(2400, 1350), // 16:9 for landscape screens
    tall: at(1000, 1500), // 2:3 for phones held upright
  };
}

export function getYoutubeId(url) {
  if (!url || typeof url !== 'string') return null;
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/
  );
  return match ? match[1] : null;
}

export function mapSanityVehicle(doc) {
  if (!doc) return null;

  // Resolve main image URL
  let img = null;
  if (doc.image?.asset) {
    img = urlFor(doc.image).auto('format').fit('max').width(1600).url();
  } else if (doc.imageUrl) {
    img = doc.imageUrl;
  }

  // Resolve dedicated thumbnail URL if provided
  let thumbnail = null;
  if (doc.thumbnail?.asset) {
    thumbnail = urlFor(doc.thumbnail).auto('format').fit('max').width(1000).url();
  }

  // Resolve gallery images
  let gallery = [];
  if (doc.gallery && Array.isArray(doc.gallery) && doc.gallery.length > 0) {
    gallery = doc.gallery
      .map((item) => {
        if (item?.asset) {
          return urlFor(item).auto('format').fit('max').width(1400).url();
        }
        if (typeof item === 'string') return item;
        return null;
      })
      .filter(Boolean);
  }
  if (img && (!gallery || gallery.length === 0)) {
    gallery = [img];
  }

  const downVal = typeof doc.down === 'number' ? doc.down : (doc.down ? Number(doc.down) : 0);

  // Resolve specs table
  let specs = [];
  if (doc.specs && Array.isArray(doc.specs)) {
    specs = doc.specs.map((s) => {
      if (Array.isArray(s)) return s;
      if (s && typeof s === 'object' && s.label) return [s.label, s.value || ''];
      return ['Specification', String(s)];
    });
  }

  // Auto-sync Downpayment spec line if doc.down is set
  if (downVal > 0) {
    const formattedDown = 'NPR ' + npr(downVal);
    const existingIdx = specs.findIndex(([l]) => /^downpayment$/i.test(l));
    if (existingIdx !== -1) {
      specs[existingIdx] = ['Downpayment', formattedDown];
    } else {
      const insertAfter = specs.findIndex(([l]) => /seating|air conditioning/i.test(l));
      if (insertAfter !== -1) {
        specs.splice(insertAfter + 1, 0, ['Downpayment', formattedDown]);
      } else {
        specs.push(['Downpayment', formattedDown]);
      }
    }
  }

  // Normalize ID / slug
  const id = doc.id?.current || (typeof doc.id === 'string' ? doc.id : doc._id);

  return {
    id: id,
    _id: doc._id,
    name: doc.name || 'Untitled Vehicle',
    type: doc.type || 'van',
    brand: doc.brand || '',
    price: doc.price ?? null,
    priceLabel: doc.priceLabel || null,
    down: downVal,
    status: doc.status || null,
    thumbnail: thumbnail || img,
    img: img || thumbnail,
    imageRef: doc.image?.asset ? doc.image : null,
    gallery: gallery,
    youtubeUrl: doc.youtubeUrl || null,
    blurb: doc.blurb || '',
    seatsMin: doc.seatsMin ?? (doc.type === 'van' ? 11 : 5),
    seatsMax: doc.seatsMax ?? (doc.type === 'van' ? (doc.seatsMin || 11) : 5),
    ac: doc.ac ?? false,
    specs: specs,
    highlights: Array.isArray(doc.highlights) ? doc.highlights : [],
    order: doc.order ?? 50,
  };
}

export async function fetchSanityVehicles() {
  const query = `*[_type == "vehicle"] | order(order asc, _createdAt asc) {
    _id,
    name,
    id,
    type,
    brand,
    price,
    priceLabel,
    down,
    status,
    thumbnail,
    image,
    imageUrl,
    gallery,
    youtubeUrl,
    blurb,
    seatsMin,
    seatsMax,
    ac,
    specs,
    highlights,
    order
  }`;

  const docs = await sanityClient.fetch(query);
  return docs.map(mapSanityVehicle).filter(Boolean);
}

export async function fetchSanityHeroSlides() {
  const query = `*[_type == "heroSlide"] | order(order asc, _createdAt asc) {
    _id,
    eyebrow,
    "vehicle": vehicle-> {
      _id,
      name,
      id,
      type,
      brand,
      price,
      priceLabel,
      image,
      imageUrl
    }
  }`;

  try {
    const docs = await sanityClient.fetch(query);
    return docs;
  } catch (err) {
    console.warn('Hero slides query fallback:', err);
    return [];
  }
}
