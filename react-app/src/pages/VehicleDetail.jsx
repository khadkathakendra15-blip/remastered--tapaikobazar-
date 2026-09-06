import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Shot from '../components/Shot';
import { CONTACT } from '../data/catalogue';
import { useFilters } from '../lib/filtersContext';
import { npr, priceText } from '../lib/format';
import { getYoutubeId } from '../lib/sanity';

export default function VehicleDetail() {
  const { id } = useParams();
  const f = useFilters();
  const v = f.findVehicle(id);

  const youtubeId = v ? getYoutubeId(v.youtubeUrl) : null;
  const [activeMedia, setActiveMedia] = useState(youtubeId ? 'video' : 'photo');
  const [shotAt, setShotAt] = useState(0);

  useEffect(() => {
    setShotAt(0);
    setActiveMedia(youtubeId ? 'video' : 'photo');
  }, [id, youtubeId]);

  /* Mobile only: the sticky bar needs room at the foot of the page. */
  useEffect(() => {
    document.body.classList.add('is-detail');
    return () => document.body.classList.remove('is-detail');
  }, []);

  if (!v) {
    return (
      <div className="grid-wrap">
        <div className="empty">
          <div className="empty__title">We do not stock that one</div>
          <p className="empty__note">
            <Link to="/">Back to browsing</Link>
          </p>
        </div>
      </div>
    );
  }

  const shots = (v.gallery && v.gallery.length ? v.gallery : [v.img]).filter(Boolean);
  const mainImg = shots[shotAt] || v.img;
  const highlights = v.highlights || [];

  const related = (f.allVehicles || []).filter((x) => x.type === v.type && x.id !== v.id).slice(0, 3);

  return (
    <>
      <div className="crumbs">
        <Link to="/">Browse</Link>
        <span>/</span>
        <span>{v.brand}</span>
        <span>/</span>
        <span className="crumbs__here">{v.name}</span>
      </div>

      <div className="detail">
        <div className="detail__left">
          <div className="detail__hero">
            {activeMedia === 'video' && youtubeId ? (
              <div className="detail__video-frame">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
                  title={`${v.name} Video Review`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="detail__iframe"
                />
              </div>
            ) : (
              <>
                <Shot vehicle={v} src={mainImg} loading="eager" />
                {youtubeId ? (
                  <button
                    type="button"
                    className="detail__play-cta"
                    onClick={() => setActiveMedia('video')}
                    aria-label="Play YouTube Video"
                  >
                    <span className="detail__play-cta-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                    <span>Watch Video</span>
                  </button>
                ) : null}
              </>
            )}
          </div>

          {(shots.length > 1 || youtubeId) ? (
            <div className="detail__thumbs">
              {youtubeId ? (
                <button
                  key="yt-video"
                  type="button"
                  className={`detail__thumb detail__thumb--video${activeMedia === 'video' ? ' is-on' : ''}`}
                  onClick={() => setActiveMedia('video')}
                  title="Watch YouTube video"
                >
                  <img
                    src={`https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`}
                    alt={`${v.name} video thumbnail`}
                  />
                  <span className="detail__thumb-play" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                  <span className="detail__thumb-badge">Video</span>
                </button>
              ) : null}

              {shots.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  className={`detail__thumb${activeMedia === 'photo' && i === shotAt ? ' is-on' : ''}`}
                  onClick={() => {
                    setActiveMedia('photo');
                    setShotAt(i);
                  }}
                >
                  <img src={src} alt={`${v.name} photo ${i + 1}`} />
                </button>
              ))}
            </div>
          ) : null}

          <div className="detail__caption">Showroom photographs, Panipokhari.</div>

          <h2 className="detail__h2">Specification</h2>
          <div className="spectable">
            {v.specs.map(([label, value]) => (
              <div className="spectable__row" key={label + value}>
                <span className="spectable__label">{label}</span>
                <span className="spectable__value">{value}</span>
              </div>
            ))}
          </div>

          <div className="visitnote">
            <div className="visitnote__title">See it at Panipokhari</div>
            <p>
              This one is on the floor right now. Opposite NIMB Bank, Sunday to Friday
              9am to 7pm. Ask for a test drive at the counter — no appointment needed,
              though a slot saves you the wait.
            </p>
          </div>
        </div>

        <div className="detail__right">
          <div className="detail__brand">{v.brand}</div>
          <h1 className="detail__name">{v.name}</h1>
          {v.blurb ? <p className="detail__blurb">{v.blurb}</p> : null}

          <div className="pricebox">
            <div className="pricebox__row">
              <span className="pricebox__label">Showroom price</span>
              <span className="pricebox__value">{priceText(v, 'Ask at the counter')}</span>
            </div>
            {v.down ? (
              <div className="pricebox__row" style={{ marginTop: '0.4rem', paddingTop: '0.4rem', borderTop: '1px solid #eee' }}>
                <span className="pricebox__label">Min downpayment</span>
                <span className="pricebox__value" style={{ fontWeight: 600 }}>NPR {npr(v.down)}</span>
              </div>
            ) : null}
          </div>

          <div className="detail__cta">
            <a
              className="btn btn--red btn--block"
              href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
                `I want to book the ${v.name}. Please tell me the next step.`
              )}`}
              target="_blank"
              rel="noopener"
            >
              Book now
            </a>
            <a
              className="btn btn--outline-navy btn--block"
              href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
                `I have a question about the ${v.name}.`
              )}`}
              target="_blank"
              rel="noopener"
            >
              WhatsApp enquiry
            </a>
            {v.price != null ? (
              <Link className="btn btn--outline-navy btn--block" to={`/finance/${v.id}`}>
                Apply finance
              </Link>
            ) : null}
          </div>

          {highlights.length ? (
            <div className="detail__block">
              <div className="detail__block-label">Why people buy this one</div>
              <div className="highlights">
                {highlights.map((h) => (
                  <div className="highlight" key={h}>
                    <span className="highlight__dot" />
                    <span className="highlight__text">{h}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          <div className="detail__block">
            <div className="detail__block-label">Also worth a look</div>
            <div className="related">
              {related.map((r) => (
                <Link className="related__item" key={r.id} to={`/vehicle/${r.id}`}>
                  <span className="related__shot">
                    <Shot vehicle={r} />
                  </span>
                  <span className="related__meta">
                    <span className="related__name">{r.name}</span>
                    <span className="related__price">{r.brand}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Narrow screens only: keeps the price and the next step in reach. */}
      <div className="actionbar">
        <div className="actionbar__price">
          <span className="actionbar__label">Showroom price</span>
          <span className="actionbar__value">{priceText(v, 'Ask at the counter')}</span>
        </div>
        {v.price != null ? (
          <Link className="btn btn--red actionbar__cta" to={`/finance/${v.id}`}>
            Apply finance
          </Link>
        ) : (
          <a
            className="btn btn--red actionbar__cta"
            href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
              'What is the price of the ' + v.name + '?'
            )}`}
            target="_blank"
            rel="noopener"
          >
            Ask the price
          </a>
        )}
      </div>
    </>
  );
}
