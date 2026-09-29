import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquareText, X, Send, ChevronLeft, Phone, MapPin, Sparkles } from 'lucide-react';
import { CATALOGUE, CONTACT, DOCS, HOW_TO_BUY, FINANCE_DEFAULTS } from '../data/catalogue';
import { npr, emi } from '../lib/format';

/* ---- TapaikoBazar wizard assistant --------------------------------------
   A guided, on-brand chatbot: no server, no API key. It answers the questions
   people actually ask on the floor — which vehicle, how the EMI works, what
   papers to bring, where we are — straight from the catalogue data. */

const WA_URL = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
  'Hello TapaikoBazar, I have a question'
)}`;

const TYPES = [
  { key: 'van', label: 'Electric vans', emoji: '🚐' },
  { key: 'car', label: 'Electric cars', emoji: '🚗' },
  { key: 'scooter', label: 'Electric scooters', emoji: '🛵' },
  { key: 'bike', label: 'Petrol bikes', emoji: '🏍️' },
];

const BUDGETS = {
  van: [['Under 50 Lakh', 0, 5000000], ['50 – 70 Lakh', 5000000, 7000000], ['Above 70 Lakh', 7000000, Infinity]],
  car: [['Under 50 Lakh', 0, 5000000], ['50 – 80 Lakh', 5000000, 8000000], ['Above 80 Lakh', 8000000, Infinity]],
  scooter: [['Under 2.2 Lakh', 0, 220000], ['2.2 – 2.6 Lakh', 220000, 260000], ['Above 2.6 Lakh', 260000, Infinity]],
  bike: [['Under 3 Lakh', 0, 300000], ['3 – 4 Lakh', 300000, 400000], ['Above 4 Lakh', 400000, Infinity]],
};

let mid = 0;
const nextId = () => `m${Date.now()}-${mid++}`;

function botText(text, chips) {
  return { id: nextId(), role: 'bot', text, chips };
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [pending, setPending] = useState(null); // { type } while choosing budget
  const [nudge, setNudge] = useState(true);
  const scrollRef = useRef(null);
  const timers = useRef([]);

  const greeting = useMemo(
    () =>
      botText(
        "Namaste! 👋 I'm TapaikoBazar AI. I can help you find a vehicle, work out the EMI, or plan a visit. What would you like?",
        [
          { label: '🚗 Find a vehicle', action: 'find' },
          { label: '💰 Financing & EMI', action: 'finance' },
          { label: '📄 Documents needed', action: 'documents' },
          { label: '🛒 How to buy', action: 'buy' },
          { label: '📍 Visit / contact', action: 'visit' },
        ]
      ),
    []
  );

  // seed the first message the first time the panel opens
  useEffect(() => {
    if (open && messages.length === 0) setMessages([greeting]);
  }, [open, messages.length, greeting]);

  // autoscroll to the newest message
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [messages, typing]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  function pushUser(text) {
    setMessages((m) => [...m, { id: nextId(), role: 'user', text }]);
  }

  function pushBot(items, delay = 550) {
    setTyping(true);
    const t = setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, ...(Array.isArray(items) ? items : [items])]);
    }, delay);
    timers.current.push(t);
  }

  function vehicleMsg(list, headline) {
    return { id: nextId(), role: 'bot', text: headline, vehicles: list.slice(0, 4) };
  }

  const backChip = { label: '↩ Start over', action: 'start' };

  function handle(action, label) {
    if (label) pushUser(label);

    if (action === 'start') {
      setPending(null);
      pushBot(botText('Sure — what can I help you with?', greeting.chips));
      return;
    }

    if (action === 'find') {
      setPending(null);
      pushBot(
        botText('Great. What kind of vehicle are you after?', [
          ...TYPES.map((t) => ({ label: `${t.emoji} ${t.label}`, action: `type:${t.key}` })),
          backChip,
        ])
      );
      return;
    }

    if (action.startsWith('type:')) {
      const type = action.slice(5);
      setPending({ type });
      const ranges = BUDGETS[type] || [];
      pushBot(
        botText('What is your budget?', [
          ...ranges.map(([lbl], i) => ({ label: lbl, action: `budget:${i}` })),
          { label: 'Any budget', action: 'budget:any' },
          backChip,
        ])
      );
      return;
    }

    if (action.startsWith('budget:')) {
      const type = pending?.type;
      if (!type) return pushBot(botText('Let’s start again — which vehicle type?', [{ label: 'Find a vehicle', action: 'find' }]));
      const pick = action.slice(7);
      let list = CATALOGUE.filter((v) => v.type === type && typeof v.price === 'number');
      if (pick !== 'any') {
        const [, lo, hi] = BUDGETS[type][Number(pick)];
        list = list.filter((v) => v.price >= lo && v.price < hi);
      }
      list.sort((a, b) => a.price - b.price);
      setPending(null);
      if (list.length === 0) {
        pushBot(
          botText('Nothing in that exact range on the floor right now — but the counter often has more. Want me to show the closest options or connect you on WhatsApp?', [
            { label: 'Show closest', action: `type:${type}` },
            { label: '💬 WhatsApp us', action: 'whatsapp' },
            backChip,
          ])
        );
        return;
      }
      pushBot([
        vehicleMsg(list, `Here ${list.length === 1 ? 'is' : 'are'} ${Math.min(list.length, 4)} option${list.length === 1 ? '' : 's'} that fit — tap any to see full details:`),
        botText('Anything else?', [
          { label: '💰 EMI on these', action: 'finance' },
          { label: '📄 Documents', action: 'documents' },
          { label: '🔁 Different type', action: 'find' },
        ]),
      ]);
      return;
    }

    if (action === 'finance') {
      setPending(null);
      const r = FINANCE_DEFAULTS.interestRate;
      pushBot([
        botText(
          `Here's how financing works at TapaikoBazar:\n\n• EMI up to 5 years (60 months)\n• Interest ${'5% – 9%'} (about ${r}% typical)\n• No collateral / no guarantor with a valid KYC\n• Booking amount just NPR 50,000\n\nVans carry a small cash downpayment; scooters, bikes and cars run on easy EMI.`
        ),
        botText('Want a quick EMI estimate?', [
          { label: '🧮 Estimate my EMI', action: 'emi' },
          { label: '📄 Documents needed', action: 'documents' },
          { label: '🚗 Find a vehicle', action: 'find' },
        ]),
      ]);
      return;
    }

    if (action === 'emi') {
      setPending(null);
      pushBot(
        botText('Pick a price band and I’ll show the rough monthly EMI (5 yr, ~8%):', [
          { label: 'NPR 2 Lakh', action: 'emiq:200000' },
          { label: 'NPR 45 Lakh', action: 'emiq:4500000' },
          { label: 'NPR 60 Lakh', action: 'emiq:6000000' },
          { label: 'NPR 80 Lakh', action: 'emiq:8000000' },
          backChip,
        ])
      );
      return;
    }

    if (action.startsWith('emiq:')) {
      const price = Number(action.slice(5));
      const monthly = emi(price, FINANCE_DEFAULTS.interestRate, 60);
      pushBot(
        botText(
          `On ${npr(price)} over 5 years at ~${FINANCE_DEFAULTS.interestRate}%, the EMI is roughly ${npr(monthly)} / month.\n\nThe bank sets the exact rate once your papers are checked. Want to see vehicles around this price?`,
          [
            { label: '🚗 Show vehicles', action: 'find' },
            { label: '💬 Talk to us', action: 'whatsapp' },
            backChip,
          ]
        )
      );
      return;
    }

    if (action === 'documents') {
      setPending(null);
      const lines = DOCS.map((d) => `• ${d.label} — ${d.note}`).join('\n');
      pushBot([
        botText(`For an easy-EMI purchase, bring:\n\n${lines}\n\nMissing something? We’ll tell you exactly how to get it.`),
        botText('What next?', [
          { label: '🛒 How to buy', action: 'buy' },
          { label: '📍 Visit us', action: 'visit' },
          { label: '🚗 Find a vehicle', action: 'find' },
        ]),
      ]);
      return;
    }

    if (action === 'buy') {
      setPending(null);
      const steps = HOW_TO_BUY.map(([t, d], i) => `${i + 1}. ${t} — ${d}`).join('\n\n');
      pushBot([
        botText(`Buying is five simple steps:\n\n${steps}`),
        botText('Ready to move?', [
          { label: '📄 Documents', action: 'documents' },
          { label: '📍 Visit / contact', action: 'visit' },
          { label: '💬 WhatsApp us', action: 'whatsapp' },
        ]),
      ]);
      return;
    }

    if (action === 'visit') {
      setPending(null);
      pushBot({ id: nextId(), role: 'bot', text: 'Come see us at Panipokhari 👇', contact: true });
      return;
    }

    if (action === 'whatsapp') {
      window.open(WA_URL, '_blank', 'noopener');
      pushBot(botText('Opening WhatsApp… if it didn’t open, call us at ' + CONTACT.mobiles[0] + '.', [backChip]));
      return;
    }
  }

  function onSend(e) {
    e?.preventDefault();
    const q = input.trim();
    if (!q) return;
    setInput('');
    pushUser(q);
    const s = q.toLowerCase();
    let action = null;
    if (/(van|car|scooter|bike|vehicle|buy a|looking|price|cheap)/.test(s)) action = 'find';
    else if (/(emi|finance|loan|interest|downpay|down payment|installment|instal)/.test(s)) action = 'finance';
    else if (/(document|paper|kyc|citizen|require)/.test(s)) action = 'documents';
    else if (/(where|location|address|visit|map|hour|open|contact|phone|call)/.test(s)) action = 'visit';
    else if (/(how.*buy|process|step)/.test(s)) action = 'buy';
    else if (/(whatsapp|message|chat|talk|human|agent)/.test(s)) action = 'whatsapp';

    if (action) handle(action, null);
    else
      pushBot(
        botText(
          "I’m best with vehicles, EMI, documents and visits. Here’s what I can help with — or message the team directly:",
          [
            { label: '🚗 Find a vehicle', action: 'find' },
            { label: '💰 Financing & EMI', action: 'finance' },
            { label: '💬 WhatsApp us', action: 'whatsapp' },
          ]
        )
      );
  }

  return (
    <>
      {/* Launcher — bottom-right, button in the corner with the AI nudge to its left */}
      <div className="fixed bottom-5 right-5 z-[70] flex flex-row-reverse items-center gap-3 sm:bottom-6 sm:right-6">
        <motion.button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close assistant' : 'Open assistant'}
          whileTap={{ scale: 0.92 }}
          className="relative grid h-14 w-14 shrink-0 place-items-center rounded-full text-white shadow-[0_10px_30px_rgba(255,77,94,0.5)] transition-transform hover:scale-105"
          style={{ background: 'linear-gradient(135deg, #FF4D5E 0%, #d81f34 100%)' }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                <X className="h-6 w-6" />
              </motion.span>
            ) : (
              <motion.span key="c" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                <MessageSquareText className="h-6 w-6" />
              </motion.span>
            )}
          </AnimatePresence>
          {!open && (
            <span className="absolute -right-0.5 -top-0.5 grid h-5 w-5 place-items-center rounded-full bg-white text-[#FF4D5E] shadow ring-2 ring-[#FF4D5E]">
              <Sparkles className="h-3 w-3" />
            </span>
          )}
        </motion.button>

        <AnimatePresence>
          {!open && nudge && (
            <motion.button
              type="button"
              onClick={() => setOpen(true)}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              className="hidden items-center gap-2 rounded-full bg-white py-2 pl-3 pr-3.5 text-sm font-medium text-gray-800 shadow-[0_8px_30px_rgba(0,0,0,0.15)] ring-1 ring-black/5 hover:bg-gray-50 sm:flex"
            >
              <Sparkles className="h-4 w-4 shrink-0 text-[#FF4D5E]" />
              <span className="whitespace-nowrap">
                Ask <span className="font-semibold text-[#c31f33]">TapaikoBazar AI</span>
              </span>
              <span
                role="button"
                aria-label="Dismiss"
                onClick={(e) => {
                  e.stopPropagation();
                  setNudge(false);
                }}
                className="ml-0.5 rounded-full p-0.5 text-gray-400 hover:text-gray-600"
              >
                <X className="h-3.5 w-3.5" />
              </span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            className="fixed bottom-24 left-3 right-3 z-[69] mx-auto flex max-h-[76vh] w-auto flex-col overflow-hidden rounded-3xl bg-white shadow-[0_20px_70px_rgba(0,0,0,0.28)] ring-1 ring-black/5 sm:right-6 sm:left-auto sm:mx-0 sm:h-[560px] sm:w-[384px]"
          >
            {/* Header */}
            <div className="relative flex items-center gap-3 px-4 py-3.5 text-white" style={{ background: 'linear-gradient(135deg, #17233b 0%, #0b1a2b 100%)' }}>
              <div className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full bg-white/10 ring-1 ring-white/15">
                <img src="/assets/logo.png" alt="" className="h-7 w-7 object-contain" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-1.5 truncate text-sm font-semibold">
                  TapaikoBazar AI
                  <span className="rounded-full bg-white/15 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white/90">AI</span>
                </p>
                <p className="flex items-center gap-1.5 text-[11px] text-white/70">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Online · replies instantly
                </p>
              </div>
              <button type="button" onClick={() => setOpen(false)} className="rounded-full p-1.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-[#f6f7f9] px-3.5 py-4">
              {messages.map((m) => (
                <Message key={m.id} m={m} onChip={handle} />
              ))}
              {typing && <Typing />}
            </div>

            {/* Composer */}
            <form onSubmit={onSend} className="flex items-center gap-2 border-t border-gray-100 bg-white px-3 py-2.5">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question…"
                className="min-w-0 flex-1 rounded-full bg-gray-100 px-4 py-2.5 text-sm text-gray-800 outline-none ring-[#FF4D5E]/30 placeholder:text-gray-400 focus:ring-2"
              />
              <button
                type="submit"
                aria-label="Send"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-white transition-transform hover:scale-105 active:scale-95"
                style={{ background: 'linear-gradient(135deg, #FF4D5E 0%, #d81f34 100%)' }}
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ------------------------------------------------------------------ pieces */

function Message({ m, onChip }) {
  const isBot = m.role === 'bot';
  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}>
      <div className={`max-w-[85%] ${isBot ? '' : 'text-right'}`}>
        {m.text && (
          <div
            className={
              isBot
                ? 'whitespace-pre-line rounded-2xl rounded-tl-md bg-white px-3.5 py-2.5 text-[13.5px] leading-relaxed text-gray-800 shadow-sm ring-1 ring-black/5'
                : 'inline-block whitespace-pre-line rounded-2xl rounded-tr-md px-3.5 py-2.5 text-[13.5px] leading-relaxed text-white'
            }
            style={m.role === 'user' ? { background: 'linear-gradient(135deg, #FF4D5E 0%, #e02a3f 100%)' } : undefined}
          >
            {m.text}
          </div>
        )}

        {m.vehicles && (
          <div className="mt-2 space-y-2">
            {m.vehicles.map((v) => (
              <VehicleCard key={v.id} v={v} />
            ))}
          </div>
        )}

        {m.contact && <ContactCard />}

        {m.chips && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {m.chips.map((c, i) => (
              <button
                key={i}
                type="button"
                onClick={() => onChip(c.action, c.label)}
                className="rounded-full border border-[#FF4D5E]/30 bg-white px-3 py-1.5 text-[12.5px] font-medium text-[#c31f33] transition-colors hover:border-[#FF4D5E] hover:bg-[#FF4D5E] hover:text-white"
              >
                {c.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function VehicleCard({ v }) {
  const monthly = typeof v.price === 'number' ? emi(v.price - (v.down || 0), FINANCE_DEFAULTS.interestRate, 60) : null;
  return (
    <Link
      to={`/vehicle/${v.id}`}
      className="flex items-center gap-3 rounded-2xl bg-white p-2 shadow-sm ring-1 ring-black/5 transition-shadow hover:shadow-md"
    >
      <div className="h-14 w-16 shrink-0 overflow-hidden rounded-xl bg-gray-100">
        {v.img ? (
          <img src={v.img} alt={v.name} className="h-full w-full object-cover" loading="lazy" />
        ) : (
          <div className="grid h-full w-full place-items-center text-gray-300">🚘</div>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[13px] font-semibold text-gray-900">{v.name}</p>
        <p className="text-[12px] font-medium text-[#FF4D5E]">
          {typeof v.price === 'number' ? npr(v.price) : (v.priceLabel || 'Ask at counter')}
        </p>
        {monthly && <p className="text-[11px] text-gray-500">≈ {npr(monthly)}/mo · 5 yr EMI</p>}
      </div>
      <span className="shrink-0 rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-medium text-gray-600">View</span>
    </Link>
  );
}

function ContactCard() {
  return (
    <div className="mt-2 space-y-2.5 rounded-2xl bg-white p-3.5 text-[13px] shadow-sm ring-1 ring-black/5">
      <p className="flex items-start gap-2 text-gray-700">
        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#FF4D5E]" />
        {CONTACT.address}
      </p>
      <p className="text-gray-500">{CONTACT.hours}</p>
      <div className="flex flex-wrap gap-2 pt-1">
        <a
          href={WA_URL}
          target="_blank"
          rel="noopener"
          className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366] px-3.5 py-2 text-[12.5px] font-semibold text-white hover:brightness-95"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22c5.46 0 9.9-4.45 9.9-9.91S17.5 2 12.04 2Zm5.3 14c-.25.7-1.46 1.34-2.01 1.38-.55.05-1.05.24-3.53-.74-2.98-1.17-4.86-4.2-5-4.4-.14-.2-1.2-1.6-1.2-3.05 0-1.45.76-2.16 1.03-2.46.27-.3.59-.37.79-.37h.57c.18 0 .43-.07.67.51.25.6.84 2.08.91 2.23.07.15.12.32.02.52-.1.2-.15.32-.3.5-.15.17-.31.39-.44.52-.15.15-.3.31-.13.61.18.3.79 1.3 1.7 2.11 1.17 1.04 2.15 1.36 2.45 1.51.3.15.48.13.66-.08.18-.2.76-.89.96-1.19.2-.3.4-.25.67-.15.27.1 1.72.81 2.02.96.3.15.5.22.57.35.07.13.07.72-.18 1.42Z" /></svg>
          WhatsApp
        </a>
        <a href={`tel:${CONTACT.mobiles[0]}`} className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3.5 py-2 text-[12.5px] font-semibold text-gray-700 hover:bg-gray-200">
          <Phone className="h-4 w-4" /> {CONTACT.mobiles[0]}
        </a>
      </div>
    </div>
  );
}

function Typing() {
  return (
    <div className="flex justify-start">
      <div className="flex items-center gap-1 rounded-2xl rounded-tl-md bg-white px-3.5 py-3 shadow-sm ring-1 ring-black/5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
}
