import { useEffect, useState } from 'react';
import { urlFor } from '../lib/sanity';

/* One component renders every vehicle photograph on the site, so the watermark
   goes on here and lands everywhere automatically — cards, the vehicle page,
   the gallery, the related rows, the finance summary. */
export default function Shot({ vehicle, src, loading = 'lazy' }) {
  const rawImg = src !== undefined ? src : (vehicle?.thumbnail || vehicle?.img);
  const [failed, setFailed] = useState(false);

  let imgSrc = null;
  if (rawImg) {
    if (typeof rawImg === 'string') {
      imgSrc = rawImg;
    } else if (typeof rawImg === 'object' && rawImg.asset) {
      try {
        imgSrc = urlFor(rawImg).auto('format').fit('max').width(1000).url();
      } catch (err) {
        console.warn('Error resolving image URL:', err);
        imgSrc = null;
      }
    }
  }

  /* A new vehicle deserves a fresh attempt at its photograph. */
  useEffect(() => setFailed(false), [imgSrc]);

  if (!imgSrc || failed) {
    return (
      <span className="shot-none">
        <span className="shot-none__brand">{vehicle?.brand || ''}</span>
        <span className="shot-none__name">{vehicle?.name || 'Vehicle'}</span>
        <span className="shot-none__note">Photograph coming</span>
      </span>
    );
  }

  return (
    <>
      <img src={imgSrc} alt={vehicle?.name || 'Vehicle'} loading={loading} onError={() => setFailed(true)} />
      {/* Decorative: the brand is already in the masthead and the alt text, so
          this must not be announced again. */}
      <span className="shot-mark" aria-hidden="true" />
    </>
  );
}
