import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import LeadPopup from './components/LeadPopup';
import Masthead from './components/Masthead';
import { CONTACT } from './data/catalogue';
import FiltersProvider from './lib/FiltersProvider';
import About from './pages/About';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Browse from './pages/Browse';
import Finance from './pages/Finance';
import Recondition from './pages/Recondition';
import TwoWheelerStore from './pages/TwoWheelerStore';
import VehicleDetail from './pages/VehicleDetail';

/* Redirect to webmail cPanel interface directly */
function WebmailRedirect() {
  useEffect(() => {
    window.location.replace('https://s782.bom1.mysecurecloudhost.com:2096/');
  }, []);
  return null;
}

/* Clears the masthead, which is fixed. */
const HEAD_ROOM = 96;

/* Two jobs. Without it the router keeps the scroll position between entries,
   which lands you halfway down a page you have never seen. And the router does
   nothing at all with a hash, so a link to /#recondition would arrive at the
   top of the home page and stop there.

   Keyed on location.key rather than the pathname alone, so following the same
   link twice, or from the page it already points at, still moves. */
function ScrollManager() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0 });
      return undefined;
    }

    const id = decodeURIComponent(hash.slice(1));

    /* The section may not have mounted yet, and images settling afterwards can
       move it, so try again a few times before giving up and going to the top. */
    let tries = 0;
    const go = () => {
      const el = document.getElementById(id);
      if (el) {
        window.scrollTo({ top: Math.max(el.offsetTop - HEAD_ROOM, 0), behavior: 'smooth' });
        /* Keep nudging while late layout shifts things, then stop. */
        if (tries > 2) return;
      }
      if (tries > 6) {
        if (!el) window.scrollTo({ top: 0 });
        return;
      }
      tries += 1;
      timer = setTimeout(go, 90);
    };

    let timer = setTimeout(go, 0);
    return () => clearTimeout(timer);
  }, [pathname, hash, key]);

  return null;
}

export default function App() {
  const { pathname } = useLocation();

  return (
    <FiltersProvider>
      <a className="skiplink" href="#view">
        Skip to the vehicles
      </a>

      <div className="site">
        <Masthead />
        <ScrollManager />

        {/* Keyed on the path so each route mounts fresh and plays its entrance,
            rather than the next page snapping into the last one's place. */}
        <main id="view" tabIndex={-1} key={pathname} className="view-enter">
          <Routes>
            <Route path="/" element={<Browse />} />
            <Route path="/two-wheelers" element={<TwoWheelerStore />} />
            <Route path="/vehicle/:id" element={<VehicleDetail />} />
            <Route path="/finance/:id" element={<Finance />} />
            <Route path="/recondition" element={<Recondition />} />
            <Route path="/journal" element={<Blog />} />
            <Route path="/journal/:slug" element={<BlogPost />} />
            <Route path="/about" element={<About />} />
            <Route path="/webmail" element={<WebmailRedirect />} />
            <Route path="*" element={<Browse />} />
          </Routes>
        </main>

        <footer className="sitefoot">
          <span>
            Panipokhari, Kathmandu — opposite NIMB Bank · Sunday to Friday, 9am – 7pm
          </span>
          <span>© 2026 TapaikoBazar · Prices change, the counter has the current ones.</span>
        </footer>
      </div>

      <LeadPopup />

      <a
        className="wa"
        href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
          'Hello TapaikoBazar, I have a question'
        )}`}
        target="_blank"
        rel="noopener"
        aria-label="Chat with us on WhatsApp"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91S17.5 2 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23a8.19 8.19 0 0 1 8.24 8.24c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.44.13-.15.17-.25.25-.42.09-.16.04-.31-.02-.43-.06-.13-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.42l-.48-.01c-.16 0-.43.06-.65.31-.23.25-.86.84-.86 2.05s.88 2.38 1 2.54c.13.17 1.74 2.65 4.21 3.72.59.25 1.05.4 1.4.52.59.18 1.13.16 1.55.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.17-.48-.29Z" />
        </svg>
      </a>
    </FiltersProvider>
  );
}
