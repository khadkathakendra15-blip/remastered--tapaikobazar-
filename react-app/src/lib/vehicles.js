import { CATALOGUE } from '../data/catalogue';
import { catOf } from './format';

let activeCatalogue = [...CATALOGUE];

export function getActiveCatalogue() {
  return activeCatalogue;
}

export function setActiveCatalogue(list) {
  if (Array.isArray(list) && list.length > 0) {
    activeCatalogue = list;
  }
}

export function getVans(list = activeCatalogue) {
  return list.filter((v) => catOf(v) === 'van');
}

export function getCars(list = activeCatalogue) {
  return list.filter((v) => catOf(v) === 'car');
}

export function getTw(list = activeCatalogue) {
  return list.filter((v) => catOf(v) === 'tw');
}

export const ALL_VANS = CATALOGUE.filter((v) => catOf(v) === 'van');
export const ALL_CARS = CATALOGUE.filter((v) => catOf(v) === 'car');
export const ALL_TW = CATALOGUE.filter((v) => catOf(v) === 'tw');

export function findVehicle(id, list = activeCatalogue) {
  if (!id) return null;
  const match = list.find((v) => v.id === id || v._id === id || (v.aliases && v.aliases.includes(id)));
  if (match) return match;
  // Fallback search in base catalogue
  return CATALOGUE.find((v) => v.id === id || (v.aliases && v.aliases.includes(id))) || null;
}

export function brandKeys(list) {
  const names = [];
  (list || []).forEach((v) => {
    if (v.brand && !names.includes(v.brand)) names.push(v.brand);
  });
  return [{ label: 'All brands', key: 'all' }].concat(
    names.map((b) => ({ label: b, key: b }))
  );
}

/* Some vans are sold in a range of layouts, so a seat filter matches if the
   wanted size falls anywhere inside that range. */
export function seatsMatch(v, seats) {
  switch (seats) {
    case '11':
      return v.seatsMin <= 11 && v.seatsMax >= 11;
    case '14':
      return v.seatsMin <= 14 && v.seatsMax >= 14;
    case '15':
      return v.seatsMin <= 16 && v.seatsMax >= 15;
    case '17':
      return v.seatsMax >= 17;
    default:
      return true;
  }
}
