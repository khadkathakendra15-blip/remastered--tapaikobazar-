# TapaikoBazar

Static site for the TapaikoBazar showroom at Panipokhari, Kathmandu. The design comes
from the `TapaikoBazar Prototype.dc.html` file; the stock, prices, photographs and
company content come from the live site in `tapaikobazar-main/`.

## Running it

No build step. Any static server works:

```bash
python -m http.server 5173
```

Then open <http://localhost:5173>.

## Files

| Path | What it is |
| --- | --- |
| `index.html` | Page shell: top strip, masthead, view container, footer |
| `css/styles.css` | All styling, tokens at the top of the file |
| `js/data.js` | The catalogue — 77 vehicles, company content, financing defaults |
| `js/app.js` | State and rendering for the five views |
| `assets/` | Logo, favicons, vehicle photographs and the team portraits |

## The five views

Everything lives on one page and swaps out `#view`:

- **Browse** — hero, trust stats, then vans / cars / two wheelers. Vans filter by brand,
  price ceiling, seat count and air conditioning; cars and two wheelers filter by brand
  only, plus an electric/petrol split. Then how to buy, testimonials, the exchange
  camp and the visit form.
- **Detail** — gallery, specification table, price and EMI box, highlights, related stock.
- **Finance** — three steps (terms, applicant details, documents) plus a confirmation,
  with a live summary panel down the right.
- **Two wheelers** — a page of its own for the full floor, reached from the "Browse all
  two wheelers" button. Same type and brand filters as the section plus a price sort.
  The browse page shows the first `TW_PREVIEW` (12) and hands off here.
- **About** — the founding story, the six values, leadership, the 13-person team, the
  Auto Nepal press feature and showroom photographs.

## The hero and masthead

Full page and centred, taking its cues from nextgeninterior.com: the hero is `100dvh`,
the masthead floats over it, and a slow cross-fade runs between photographs, each one
drifting from 1.08 to 1.0 over seven seconds, under a vertical scrim that is dark at the
top and bottom and clear in the middle.

The masthead is fixed and transparent over the hero — white letterspaced micro-type,
the logo carrying a drop shadow so it reads against the photograph. Once the hero has
scrolled past, `paintMasthead()` adds `.is-solid` and it becomes a white bar with slate
type and a shorter logo. Views without a hero get `.is-solid` immediately, and
`body:not(.has-hero) #view` reserves 76px so their content clears it.

Headings are set in **Instrument Serif**, the face the reference site uses. Bebas Neue
keeps the numerals, buttons, badges and card names, where a condensed face still earns
its place; Poppins carries the body. The old top strip is gone —
its address and hours moved to the footer, its phone number into the masthead.

The stack is eyebrow, headline, a hairline that fades out at both ends, one letterspaced
line of copy, two bordered badges carrying the model and its price, then the buttons.
Dots and a scroll cue sit at the foot. `.hero__body` reserves 128px of bottom padding so
a three line headline can never reach the dots, and `.hero__title` is capped at 20ch so
the `<br />` in each headline is the only line break.

Slides live in `HERO_SLIDES` in `js/data.js`. `id` points at a catalogue entry, so the
model name and price follow the catalogue rather than being retyped.

## Calls to action

"Get finance" is the site-wide call to action, financing being what the showroom is
known for. In the masthead and the mobile menu it has no vehicle in context, so it sends
you to the vans to pick one. On a hero slide it opens the calculator for that vehicle
directly. On a vehicle page the primary is "Get finance on this" and the secondary is a
WhatsApp enquiry pre-filled with the model name.

The one place "Book a test ride" survives is the confirmation screen after an
application, where it is the sensible next step.

## Two wheelers without a photograph

The showroom price list is now a full store: all 53 two wheelers are cards with specs,
prices and detail pages, rather than a table. The browse page previews twelve and the
rest live on the dedicated two wheelers page. Only 16 of them have a photograph — the
seven the old site featured, six scooters, and three pulled from honda.com.np.

The other 37 render a placeholder card carrying the brand and model name. To fix one,
drop an image into `assets/` and add it as the fifth field of its row in
`TWO_WHEELER_LIST` in `js/data.js`:

    ['Honda', 'Honda Unicorn', 295000, '162.7cc · 55 kmpl · 13.3 PS · Disc', 'assets/honda-unicorn.jpg'],

The same placeholder catches any remote photograph that stops resolving, so a dead
third-party URL degrades rather than leaving a broken image.

Entries built from the price list carry real specs but no write up, so their detail
pages simply omit the blurb and the "why people buy this one" block.

## Known data problems in the source

Carried over from the live site, worth a look before this goes out:

- **Bajaj Pulsar NS 200 has two prices.** The featured card says NPR 4,51,900, the full
  price list says NPR 4,11,900. The card price is used for the vehicle entry and the
  list is reproduced as published.
- **Honda Dio 125 carries the wrong specs** — 286cc, 31 PS, dual ABS are CB300R figures,
  not a 125cc scooter. Ported as published rather than invented; needs correcting.
- **Honda Shine 125 BS6** is NPR 2,92,900 on the card and NPR 2,60,900 in the list.
  Possibly two trims, possibly stale.
- Maya Lama's photograph is referenced by the old about page but is not in the upload,
  so her card falls back to initials. Drop a file at `assets/team/maya-lama.jpg` and set
  `img` on her entry in `COMPANY.leaders`.

## The mobile layer

Below 980px the desktop chrome is replaced rather than merely reflowed:

- The top strip and the horizontal nav are dropped. What remains is a **57px sticky
  bar** — logo, a call button and a hamburger — so navigation is always in reach.
- The hamburger opens a **slide-in menu from the right**, carrying the section links,
  the showroom address and hours, all six phone numbers, and the two calls to action.
  It is the same `.drawer` component as the filter sidebar, hinged on the other side.
- The trust stats sit **two by two** instead of four stacked rows.
- On a vehicle page a **sticky action bar** pins the price and "Get finance" to the
  bottom of the screen. `body.is-detail` pads the page so it never covers the footer,
  and lifts the WhatsApp button clear of it.
- The three finance steps stay on **one row**, dropping their "Step one" labels.

Together these cut the run-up to the first vehicle card from 1,511px to 964px.

## Filters on narrow screens

At 980px and below the filter controls move into a slide-in sidebar, opened by the
**Filters** button in each section header. A red badge on that button counts how many
filters are off their default, and the button at the foot of the sidebar shows the
result count.

The controls are not duplicated. `relocateFilters()` in `js/app.js` moves the live DOM
nodes between the section header and `.drawer__body`, so their state and event listeners
travel with them — there is only ever one price slider, one set of brand pills. The move
is triggered by a `matchMedia` change and a `ResizeObserver`, and re-checked whenever the
sidebar opens. `.drawer__body` descendant rules in the stylesheet restyle the blocks for
a white panel; nothing about the desktop layout changes.

## Financing maths

Standard reducing-balance EMI in `emi()`. Vans run to the full term; anything else is
capped at 36 months. Rate and term defaults are in `FINANCE_DEFAULTS` in `js/data.js`
(8%, 60 months) — change them there and both the detail card and the calculator follow.

Amounts are formatted in lakh grouping by `npr()`: `41,99,000`, not `4,199,000`.

## Adding stock

Append to `CATALOGUE` in `js/data.js`. `type` is one of `van`, `car`, `scooter`, `bike`;
scooters and bikes both land in the two wheelers section. `price: null` puts "Price at
the counter" on the card and turns the finance button into "Ask for the price". A
`status` string replaces the "EMI financing available" line. `priceLabel` overrides the
displayed price for models sold as a range — keep `price` at the bottom of that range so
the price filter still works.

Vans additionally need `seatsMin`, `seatsMax` and `ac`. Models sold in several layouts
set the two seat figures apart (Joylong is 11 to 19) and match any seat filter that falls
inside the range. `vanTerms()` fills in the financing rows every van shares.

If a van lands above NPR 85,00,000, raise `VAN_PRICE_MAX` in `js/app.js` — it is the top
of the price slider.
#   r e m a s t e r e d - - t a p a i k o b a z a r - 2  
 