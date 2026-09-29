import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Chatbot from './components/Chatbot';
import LeadPopup from './components/LeadPopup';
import Masthead from './components/Masthead';
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

      <Chatbot />
    </FiltersProvider>
  );
}
