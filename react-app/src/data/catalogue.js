/* Showroom stock and company content, Panipokhari. Prices in NPR.
   Sourced from the live tapaikobazar site. */

const IMG = {
  /* Electric vans */
  kyc: 'https://cg-ev.com/storage/block/2023/05/website-img6-min-1_1684476974.png',
  danfe: 'https://motors.theego.com.np/wp-content/uploads/2023/05/dfsk-danfe-gallery-9.png',
  danfe2: 'https://motors.theego.com.np/wp-content/uploads/2023/05/dfsk-danfe-gallery-2.png',
  srm: 'https://www.gneenev.com/d/files/xhszy1.jpg',
  dong: 'https://trivenimotocorp.com.np/public/images/2015174667.jpg',
  dong14: 'https://trivenimotocorp.com.np/public/images/1272401361489950890_122186397518255162_2520902099410590018_n.jpg',
  dfacEm26: '/assets/dfac-em26.jpg',
  dfacEv32: '/assets/dfac-ev32.jpg',
  kawai: 'https://www.gneenev.com/d/files/xhszy1.jpg',
  higer: 'https://en.higer.com/uploadfiles/2024/11/20241120102842890.jpg?MjAyNDExMjAxMDI4NDI4OTAuanBn',
  joylong: 'https://vgnepalev.com/wp-content/uploads/2024/11/Untitled-design-2024-11-29T143713.056.png',
  king14: 'https://www.cgdigital.com.np/api/images/products/HzQiaO_1733388745-KINGLONG01.jpg',
  king15: 'https://cg-ev.com/storage/banner/2023/10/k1_1696571921.jpg',
  king16: 'https://cg-ev.com/storage/banner/2023/10/k2_1696571968.jpg',
  king19: 'https://www.cgdigital.com.np/api/images/products/H9lVzj_1733392649-KINGLONG01.jpg',

  /* Electric cars */
  g6: 'https://xpeng.cgmotors.com.np/gac/g6images/G6/G6banner-new.jpg',
  aionv: 'https://www.gneenev.com/d/files/1(10).jpg',
  aiony: 'https://upload.wikimedia.org/wikipedia/commons/6/6c/2021_GAC_Aion_Y_%28front%29.jpg',
  rid2: '/assets/riddara-2wd.webp',
  rid4: '/assets/riddara-tapaikobazar.png',
  hvh: 'https://carpricesnepal.com/assets/img/product/product-6687861a6c457Henry-Volts-Model-H.webp',
  hvc: 'https://techlekh.com/wp-content/uploads/2024/09/Henrey-Volts-HEV300.png',
  naami: 'https://dongfengnepal.com/wp-content/uploads/2024/08/New-Project1.png',
  deepal: 'https://www.changaneurope.com/Portals/2/adam/ContentBlocks/CfRkY2zSmkygQRDwi6bUTw/Image/S05_Full_01.png?w=1920&h=960&quality=75&mode=crop&scale=both&format=webp',
  seres: 'https://cdn.motor1.com/images/mgl/JljwJ/s3/huawei-seres-sf5-lead-image.webp',

  /* Electric scooters */
  winger: 'https://sarathiecooter.com.np/wp-content/uploads/2025/05/winger-300x300.jpg',
  e3g: 'https://sarathiecooter.com.np/wp-content/uploads/2025/07/Ecooter-E3-Gray.png',
  e3l: 'https://sarathiecooter.com.np/wp-content/uploads/2025/05/graywithgreen-300x300.jpg',
  mnk3: 'https://sarathiecooter.com.np/wp-content/uploads/2025/05/blue-300x300.jpg',
  s90: 'https://sarathiecooter.com.np/wp-content/uploads/2025/05/Luyuan-S90-Photo-1-300x300.webp',
  garow: 'https://garowgroup.com/Upload/%E4%BA%A7%E5%93%81/%E5%B3%B0%E4%BA%91/%E5%B7%A645-8efdcb9f88b045639b03999e44887d60.jpg',

  /* Petrol two wheelers */
  shine: 'https://honda.com.np/wp-content/uploads/product-catalog/motorcycles/DSC_9511-copy-3_1_11zon-scaled.jpg',
  dio: 'https://honda.com.np/wp-content/uploads/product-catalog/motorcycles/Sport-Red-min.png',
  apache: '/assets/tvs-apache.webp',
  ntorq: 'https://tvsnepal.com/images/color/Ntorq-Race-Edition60c1e8be895bbNtorq-Race-Edition5e1b0fdfd160aNtorq-Race-Edition.png',
  fzs: 'https://www.maw2wheelers.com/wp-content/uploads/2024/09/FZ-FI-V3-Black.jpg',
  rayzr: 'https://www.maw2wheelers.com/wp-content/uploads/2024/09/1.-RayZR-HYBRID-Disc-Premium-Premium-Plus.jpg',
  ns200: '/assets/ns-200-nepal.webp',
  hondaSp125: 'https://honda.com.np/wp-content/uploads/product-catalog/motorcycles/SP-125-Web-Banner.png',
  hondaDio110: 'https://honda.com.np/wp-content/uploads/product-catalog/motorcycles/Dio-110-BS6-Web-Banner.png',
  hondaShine: 'https://honda.com.np/wp-content/uploads/product-catalog/motorcycles/Honda-Shine-BS6-Web-Banner.png'
};

/* The hero slider. id points at a CATALOGUE entry, so the price and the
   "view details" link follow the catalogue rather than being retyped. */
const HERO_SLIDES = [
  { id: 'kyc11', eyebrow: 'Electric vans' },

  { id: 'king16', eyebrow: 'The big one' },

  { id: 'g6', eyebrow: 'Electric cars' },

  { id: 'dfacEm26', eyebrow: 'On our floor now' },

  { id: 'e3g', eyebrow: 'Electric scooters' }
];

/* Every van is financed on the same terms, so the tail of the spec table is
   identical. down is the figure in rupees, shown is the formatted string. */
function vanTerms(down) {
  return [
    ['Drivetrain', 'Electric'],
    ['Downpayment', 'NPR ' + down],
    ['EMI tenure', 'Up to 5 years'],
    ['Interest rate', '5% – 9%'],
    ['Warranty', 'As per company policy'],
    ['Booking amount', 'NPR 50,000']
  ];
}

const CATALOGUE = [

  /* ------------------------------------------------------------- vans ----- */

  { id: 'kyc11', type: 'van', brand: 'KYC', name: 'KYC 11 seater', price: 4199000, down: 450000,
    seatsMin: 11, seatsMax: 11, ac: false, img: IMG.kyc,
    blurb: 'The cheapest way into an electric van in Nepal. Eleven seats, no air conditioning, and the lowest downpayment on our floor.',
    specs: [['Seating', '11 persons'], ['Air conditioning', 'No']].concat(vanTerms('4,50,000')),
    highlights: ['Lowest downpayment of any van we stock, at NPR 4,50,000.', 'No collateral needed when you put down 20 to 40 percent.', 'Five year EMI at 5 to 9 percent through our partner banks.'] },

  { id: 'srm11', type: 'van', brand: 'SRM', name: 'SRM 11 seater', price: 4550000, down: 500000,
    seatsMin: 11, seatsMax: 11, ac: true, img: IMG.srm,
    blurb: 'Eleven air conditioned seats a little under the Dongfeng, and one of the newer names on the floor.',
    specs: [['Seating', '11 persons'], ['Air conditioning', 'Yes']].concat(vanTerms('5,00,000')),
    highlights: ['Air conditioned throughout at close to the entry price.', 'Company warranty included.', 'Five year EMI from NPR 5,00,000 down.'] },

  { id: 'danfe11', type: 'van', brand: 'Danfe', name: 'Danfe 11 seater', price: 4595000, down: 500000,
    seatsMin: 11, seatsMax: 11, ac: true, img: IMG.danfe, gallery: [IMG.danfe, IMG.danfe2],
    blurb: 'Eleven seats with full air conditioning, which is what most school and office routes end up needing.',
    specs: [['Seating', '11 persons'], ['Air conditioning', 'Yes']].concat(vanTerms('5,00,000')),
    highlights: ['Air conditioned throughout, unlike the KYC at a similar size.', 'Company warranty included.', 'Five year EMI from NPR 5,00,000 down.'] },

  { id: 'kawai', type: 'van', brand: 'Kawai', name: 'Kawai 14–16 seater', price: 4650000,
    priceLabel: 'NPR 46,50,000 – 63,50,000', down: 500000,
    seatsMin: 14, seatsMax: 16, ac: true, img: IMG.kawai,
    blurb: 'Sold in fourteen and sixteen seat layouts, so the price moves with the trim you pick. Ask at the counter which is on the floor today.',
    specs: [['Seating', '14 to 16 persons'], ['Air conditioning', 'Yes']].concat(vanTerms('5,00,000')),
    highlights: ['Two layouts, fourteen or sixteen seats.', 'Air conditioned, company warranty.', 'Five year EMI from NPR 5,00,000 down.'] },

  { id: 'dong11', type: 'van', brand: 'Dongfeng', name: 'Dongfeng 11 seater', price: 4950000, down: 500000,
    seatsMin: 11, seatsMax: 11, ac: true, img: IMG.dong,
    blurb: 'A heavier build than the entry vans, with air conditioning and the finish that comes with it.',
    specs: [['Seating', '11 persons'], ['Air conditioning', 'Yes']].concat(vanTerms('5,00,000')),
    highlights: ['Premium build compared with the entry level vans.', 'Air conditioned, company warranty.', 'Also available as a fourteen seater.'] },

  { id: 'dfacEm26', type: 'van', brand: 'DFAC', name: 'DFAC EM26 11 seater', price: 4950000, down: 500000,
    seatsMin: 11, seatsMax: 11, ac: true, img: IMG.dfacEm26,
    blurb: 'The eleven seat DFAC, photographed on our own floor. Same price as the Dongfeng with a different cabin.',
    specs: [['Seating', '11 persons'], ['Air conditioning', 'Yes']].concat(vanTerms('5,00,000')),
    highlights: ['Eleven seats with full air conditioning.', 'Company warranty included.', 'Five year EMI from NPR 5,00,000 down.'] },

  { id: 'joylong', type: 'van', brand: 'Joylong', name: 'Joylong 11–19 seater', price: 5600000,
    priceLabel: 'NPR 56,00,000 – 74,00,000', down: 500000,
    seatsMin: 11, seatsMax: 19, ac: true, img: IMG.joylong,
    blurb: 'The widest range of layouts we carry, from eleven seats up to nineteen. Price depends on the size you settle on.',
    specs: [['Seating', '11 to 19 persons'], ['Air conditioning', 'Yes']].concat(vanTerms('5,00,000')),
    highlights: ['Anything from eleven to nineteen seats.', 'Air conditioned, company warranty.', 'Five year EMI from NPR 5,00,000 down.'] },

  { id: 'higer', type: 'van', brand: 'Higer', name: 'Higer 16–19 seater', price: 5990000, down: 500000,
    seatsMin: 16, seatsMax: 19, ac: true, img: IMG.higer,
    blurb: 'A large capacity van at a price closer to the fourteen seaters. Good value if you are filling every seat.',
    specs: [['Seating', '16 to 19 persons'], ['Air conditioning', 'Yes']].concat(vanTerms('5,00,000')),
    highlights: ['Sixteen to nineteen seats for the price of a smaller van.', 'Air conditioned, company warranty.', 'Five year EMI from NPR 5,00,000 down.'] },

  { id: 'king14', type: 'van', brand: 'Kinglong', name: 'Kinglong 14 seater', price: 6050000, down: 500000,
    seatsMin: 14, seatsMax: 14, ac: true, img: IMG.king14,
    blurb: 'The fourteen seat Kinglong, with a roomier cabin layout than the fifteen.',
    specs: [['Seating', '14 persons'], ['Air conditioning', 'Yes']].concat(vanTerms('5,00,000')),
    highlights: ['Roomier layout than the fifteen seater.', 'Air conditioned, company warranty.', 'Five year EMI available.'] },

  { id: 'dong14', type: 'van', brand: 'Dongfeng', name: 'Dongfeng 14 seater', price: 6100000, down: 500000,
    seatsMin: 14, seatsMax: 14, ac: true, img: IMG.dong14,
    blurb: 'Three more seats than the eleven seater on the same platform. Popular with tour operators.',
    specs: [['Seating', '14 persons'], ['Air conditioning', 'Yes']].concat(vanTerms('5,00,000')),
    highlights: ['Fourteen seats for tour and staff routes.', 'Air conditioned, company warranty.', 'Same downpayment as the eleven seater.'] },

  { id: 'dfacEv32', type: 'van', brand: 'DFAC', name: 'DFAC EV32 14 seater', price: 6100000, down: 500000,
    seatsMin: 14, seatsMax: 14, ac: true, img: IMG.dfacEv32,
    blurb: 'The fourteen seat DFAC, also photographed at Panipokhari. Priced level with the Dongfeng fourteen.',
    specs: [['Seating', '14 persons'], ['Air conditioning', 'Yes']].concat(vanTerms('5,00,000')),
    highlights: ['Fourteen seats with full air conditioning.', 'Company warranty included.', 'Five year EMI from NPR 5,00,000 down.'] },

  { id: 'king15', type: 'van', brand: 'Kinglong', name: 'Kinglong 15 seater', price: 6200000, down: 500000,
    seatsMin: 15, seatsMax: 15, ac: true, img: IMG.king15,
    blurb: 'Fifteen seats for a little over the fourteen. The best value per seat in the Kinglong range.',
    specs: [['Seating', '15 persons'], ['Air conditioning', 'Yes']].concat(vanTerms('5,00,000')),
    highlights: ['One more seat than the fourteen for NPR 1,50,000.', 'Air conditioned throughout.', 'Five year EMI from NPR 5,00,000 down.'] },

  { id: 'king16', type: 'van', brand: 'Kinglong', name: 'Kinglong 16 seater', price: 7800000, down: 500000,
    seatsMin: 16, seatsMax: 16, ac: true, img: IMG.king16,
    blurb: 'A sixteen seat Kinglong with the fittings to match the price. The one most tour operators come in asking for.',
    specs: [['Seating', '16 persons'], ['Air conditioning', 'Yes']].concat(vanTerms('5,00,000')),
    highlights: ['Sixteen seats with the full Kinglong fit out.', 'Air conditioned throughout, company warranty.', 'Five year EMI from NPR 5,00,000 down.'] },

  { id: 'king19', type: 'van', brand: 'Kinglong', name: 'Kinglong 19 seater', price: 8100000, down: 500000,
    seatsMin: 19, seatsMax: 19, ac: true, img: IMG.king19,
    blurb: 'The largest electric van on our floor. Nineteen seats, and still five year financing.',
    specs: [['Seating', '19 persons'], ['Air conditioning', 'Yes']].concat(vanTerms('5,00,000')),
    highlights: ['Nineteen seats, the most of anything electric here.', 'Air conditioned throughout, company warranty.', 'Downpayment still NPR 5,00,000.'] },

  /* ------------------------------------------------------------- cars ----- */

  { id: 'g6', type: 'car', brand: 'Xpeng', name: 'Xpeng G6', price: 8499000, down: 0, img: IMG.g6,
    blurb: 'A coupe SUV with a five star Euro NCAP rating and 435 kilometres of range. The most car you can buy from us.',
    specs: [['Motor', '190 kW'], ['Range', '435 km'], ['Body', 'Coupe SUV, rear wheel drive'], ['0 to 100', '6.9 seconds'], ['Safety', '5 star Euro NCAP'], ['Distributor', 'CG Motors Nepal']],
    highlights: ['Four hundred thirty five kilometres on a charge.', 'Eight year battery warranty.', 'Easy EMI through our partner banks.'] },

  { id: 'aionv', type: 'car', brand: 'GAC Aion', name: 'GAC Aion V', price: null, down: 0, img: IMG.aionv,
    blurb: 'A long range premium SUV with Level 2 plus driver assistance. Priced at the counter.',
    specs: [['Drivetrain', 'Electric'], ['Range', '500+ km'], ['Body', 'SUV'], ['Seats', '5'], ['Assistance', 'Level 2+ ADAS']],
    highlights: ['Over five hundred kilometres of range.', 'Level 2 plus driver assistance.', 'Easy EMI available.'] },

  { id: 'aiony', type: 'car', brand: 'GAC Aion', name: 'GAC Aion Y', price: null, down: 0, img: IMG.aiony,
    blurb: 'The compact Aion. Best value for money in the GAC range and the one that moves fastest off our floor.',
    specs: [['Drivetrain', 'Electric'], ['Range', '430 km'], ['Body', 'Crossover'], ['Seats', '5']],
    highlights: ['Four hundred thirty kilometres of range.', 'Best value in the GAC range.', 'Easy EMI available.'] },

  { id: 'rid2', type: 'car', brand: 'Ridaara', name: 'Ridaara 2WD', price: null, down: 0, img: IMG.rid2,
    blurb: 'A rear wheel drive electric SUV with long range, and the cheaper of the two Ridaara trims.',
    specs: [['Drivetrain', 'Electric, rear wheel drive'], ['Range', 'Long range'], ['Body', 'SUV'], ['Seats', '5']],
    highlights: ['Rear wheel drive, long range.', 'Cheaper of the two Ridaara trims.', 'Easy EMI available.'] },

  { id: 'rid4', type: 'car', brand: 'Ridaara', name: 'Ridaara 4WD', price: null, down: 0, img: IMG.rid4,
    blurb: 'The all wheel drive Ridaara, for people who leave the valley often.',
    specs: [['Drivetrain', 'Electric, 4WD / AWD'], ['Range', 'Long range'], ['Body', 'SUV'], ['Seats', '5']],
    highlights: ['All wheel drive for rough roads.', 'Performance trim of the Ridaara.', 'Easy EMI available.'] },

  { id: 'hvh', type: 'car', brand: 'Dayun Henry Volts', name: 'Henry Volts Model H', price: null, down: 0, img: IMG.hvh,
    blurb: 'An electric sedan with a spacious cabin. The family car of the Henry Volts range.',
    specs: [['Drivetrain', 'Electric'], ['Range', 'Long range'], ['Body', 'Sedan'], ['Seats', '5']],
    highlights: ['Spacious sedan interior.', 'Smart drive features.', 'Easy EMI available.'] },

  { id: 'hvc', type: 'car', brand: 'Dayun Henry Volts', name: 'Henry Volts Model C', price: null, down: 0, img: IMG.hvc,
    blurb: 'A compact hatchback built for city running. Efficient and easy to park.',
    specs: [['Drivetrain', 'Electric'], ['Range', 'Urban range'], ['Body', 'Hatchback'], ['Seats', '5']],
    highlights: ['Compact enough for city traffic.', 'Efficient urban range.', 'Easy EMI available.'] },

  { id: 'naami', type: 'car', brand: 'Naami', name: 'Naami Box E3', price: null, down: 0, img: IMG.naami,
    blurb: 'A mini four seater, and the most affordable way into an electric car here.',
    specs: [['Drivetrain', 'Electric'], ['Range', 'City range'], ['Body', 'Mini car'], ['Seats', '4']],
    highlights: ['Most affordable electric car we stock.', 'Four seats, city range.', 'Easy EMI available.'] },

  { id: 'deepal', type: 'car', brand: 'Deepal (Changan)', name: 'Deepal', price: null, down: 0, img: IMG.deepal,
    status: 'Pre-booking open',
    blurb: 'Changan’s luxury electric line with Huawei technology inside. Not landed yet — pre-booking is open.',
    specs: [['Drivetrain', 'Electric'], ['Segment', 'Premium'], ['Body', 'Sedan and SUV'], ['Seats', '5'], ['Status', 'Pre-booking open']],
    highlights: ['Pre-booking is open now.', 'Huawei technology inside.', 'Register your interest at the counter.'] },

  { id: 'seres', type: 'car', brand: 'Seres (Huawei)', name: 'Seres', price: null, down: 0, img: IMG.seres,
    status: 'Coming soon',
    blurb: 'Huawei’s intelligent electric SUV, in five and seven seat layouts. Arriving soon.',
    specs: [['Drivetrain', 'Electric'], ['Software', 'Huawei smart drive'], ['Body', 'SUV'], ['Seats', '5 to 7'], ['Status', 'Coming soon']],
    highlights: ['Huawei smart drive software.', 'Five to seven seats.', 'Register your interest at the counter.'] },

  /* --------------------------------------------------------- scooters ----- */

  { id: 'mnk3', type: 'scooter', brand: 'Luyuan', name: 'Luyuan MNK3', price: 192600,
    priceLabel: 'NPR 1,92,600 – 2,37,600', down: 0, img: IMG.mnk3,
    blurb: 'The cheapest electric scooter on our floor, with NFC security and an oil cooled hub motor.',
    specs: [['Rated motor', '1500W oil cooled hub'], ['Peak power', '2800 W'], ['Battery', '72V 38AH graphene gel'], ['Charging time', '5 – 6 hours'], ['Range', 'Up to 120 km'], ['Speed', '60 – 65 km/h'], ['Brakes', 'Front and rear disc'], ['Security', 'NFC, anti theft, wheel lock'], ['Display', 'LCD with LED DRL'], ['Extras', 'USB charging, 180mm clearance']],
    highlights: ['Lowest priced electric scooter we sell.', 'NFC security and LED daytime running lights.', 'Up to one hundred twenty kilometres of range.'] },

  { id: 'winger', type: 'scooter', brand: 'Sarathi', name: 'Sarathi Winger', price: 209700,
    priceLabel: 'NPR 2,09,700 – 2,54,700', down: 0, img: IMG.winger,
    blurb: 'A city commuter from the Sarathi ZER Electric range, sold in a few trims.',
    specs: [['Type', 'Electric scooter'], ['Battery', 'Gel battery'], ['Brand', 'ZER Electric / Sarathi'], ['Brakes', 'Disc brakes'], ['Range', 'Long range'], ['Charging', '5 – 6 hours'], ['Security', 'Anti theft alarm'], ['Features', 'Digital display, LED lights']],
    highlights: ['Stylish urban commuter with easy EMI.', 'Gel battery pack.', 'Several trims to choose from at the showroom.'] },

  { id: 's90', type: 'scooter', brand: 'Luyuan', name: 'Luyuan S90', price: 215000,
    priceLabel: 'NPR 2,15,000 – 2,60,000', down: 0, img: IMG.s90,
    blurb: 'A 3000W oil cooled motor, three riding modes and a reverse gear. IP67 rated.',
    specs: [['Rated motor', '1500W oil cooled'], ['Peak power', '3000 W'], ['Battery', '72V 38AH graphene gel'], ['Range', 'Up to 120 km'], ['Speed modes', 'Eco, Comfort, Sport'], ['Top speed', '65 km/h'], ['Brakes', 'Front and rear disc'], ['Security', 'NFC, anti theft, wheel lock, reverse gear'], ['Display', 'Dual display, projector DRL'], ['Water resistance', 'IP67']],
    highlights: ['Three speed modes and a reverse gear.', 'IP67 rated against water and dust.', 'NFC security.'] },

  { id: 'e3g', type: 'scooter', brand: 'Ecooter', name: 'Ecooter E3 Graphene', price: 225000, down: 0, img: IMG.e3g,
    blurb: 'The graphene battery version of the E3. Cruise control and keyless entry as standard.',
    specs: [['Rated motor', '1500 W'], ['Peak power', '3000 W'], ['Battery', '72V 38AH graphene gel'], ['Charging time', '5 – 6 hours'], ['Range', '100 – 120 km'], ['Top speed', '65 km/h'], ['Max torque', '170 N.m'], ['Brakes', 'Front and rear disc'], ['Security', 'Anti theft and wheel lock'], ['Features', 'Cruise control, keyless, USB, parking sensor']],
    highlights: ['One hundred to one hundred twenty kilometres on a charge.', 'Cruise control and keyless entry.', 'Cheaper than the lithium version.'] },

  { id: 'e3l', type: 'scooter', brand: 'Ecooter', name: 'Ecooter E3 Lithium', price: 270000, down: 0, img: IMG.e3l,
    blurb: 'Same scooter, lithium pack. Lighter, longer lasting, and priced accordingly.',
    specs: [['Rated motor', '1500 W'], ['Peak power', '3000 W'], ['Battery', 'Lithium'], ['Charging time', '5 – 6 hours'], ['Range', '100 – 120 km'], ['Top speed', '65 km/h'], ['Max torque', '170 N.m'], ['Brakes', 'Front and rear disc'], ['Security', 'Anti theft and wheel lock'], ['Features', 'Cruise control, keyless, USB, parking sensor']],
    highlights: ['Higher range and longer battery life.', 'Keyless entry and USB charging.', 'Same 1500W motor as the graphene version.'] },

  { id: 'garow', type: 'scooter', brand: 'Garow', name: 'Garow FY100', price: null, down: 0, img: IMG.garow,
    status: 'New arrival',
    blurb: 'The newest scooter on the floor. Priced at the counter while the first batch settles in.',
    specs: [['Model', 'FY100'], ['Type', 'Electric scooter'], ['Drive', 'Hub motor'], ['Brakes', 'Front disc'], ['Design', 'Urban commuter'], ['Features', 'LED headlamp, digital dash'], ['Status', 'New arrival']],
    highlights: ['Newest electric scooter we stock.', 'LED headlamp and digital dash.', 'Ask at the counter for the current price.'] },

  /* ------------------------------------------------------------ bikes ----- */

  { id: 'ntorq', type: 'bike', brand: 'TVS', name: 'TVS Ntorq 125 Race Edition', price: 279900, down: 0, img: IMG.ntorq,
    blurb: 'The scooter with a Bluetooth console. Race Edition trim, and a favourite with younger riders.',
    specs: [['Engine', '124.8cc'], ['Mileage', '47 kmpl'], ['Power', '9.38 PS'], ['Console', 'Bluetooth connected'], ['Trim', 'Race Edition']],
    highlights: ['Bluetooth connected console.', 'Forty seven kilometres to the litre.', 'Easy EMI financing available.'] },

  { id: 'shine', type: 'bike', brand: 'Honda', name: 'Honda Shine 125 BS6', price: 292900, down: 0, img: IMG.shine,
    blurb: 'The commuter most people in Kathmandu end up buying. Sixty five kilometres to the litre.',
    specs: [['Engine', '124cc'], ['Mileage', '65 kmpl'], ['Power', '10.5 PS'], ['Brakes', 'Disc'], ['Emission', 'BS6']],
    highlights: ['Sixty five kilometres to the litre.', 'Disc brake at the front.', 'Easy EMI financing available.'] },

  { id: 'rayzr', type: 'bike', brand: 'Yamaha', name: 'Yamaha RayZR 125 FI Hybrid', price: 316900, down: 0, img: IMG.rayzr,
    blurb: 'The most economical two wheeler here at seventy one kilometres to the litre, thanks to the hybrid assist.',
    specs: [['Engine', '125cc'], ['Mileage', '71 kmpl'], ['Power', '8.2 PS'], ['System', 'Hybrid assist'], ['Fuel', 'Fuel injected']],
    highlights: ['Seventy one kilometres to the litre, the best here.', 'Hybrid assist off the line.', 'Easy EMI financing available.'] },

  { id: 'dio', type: 'bike', brand: 'Honda', name: 'Honda Dio 125', price: 325900, down: 0, img: IMG.dio,
    blurb: 'Honda’s automatic scooter, and our best selling two wheeler.',
    specs: [['Engine', '286cc'], ['Mileage', '30 kmpl'], ['Power', '31 PS'], ['Brakes', 'Dual ABS']],
    highlights: ['Our best selling two wheeler.', 'Dual channel ABS.', 'Easy EMI financing available.'] },

  { id: 'apache', type: 'bike', brand: 'TVS', name: 'TVS Apache RTR 200 4V', price: 399900, down: 0, img: IMG.apache,
    blurb: 'Fuel injected, ABS equipped, and one of the quickest things in our two wheeler line up.',
    specs: [['Engine', '197.75cc'], ['Mileage', '40 kmpl'], ['Power', '20.8 PS'], ['Brakes', 'FI with ABS']],
    highlights: ['Twenty point eight horsepower.', 'Fuel injection with ABS.', 'Easy EMI financing available.'] },

  { id: 'fzs', type: 'bike', brand: 'Yamaha', name: 'Yamaha FZS FI V3 Deluxe', price: 410900, down: 0, img: IMG.fzs,
    blurb: 'The deluxe FZS, with LED lighting and front ABS. Yamaha’s answer to the 150cc street bikes.',
    specs: [['Engine', '149cc'], ['Mileage', '45 kmpl'], ['Power', '12.4 PS'], ['Brakes', 'Front ABS'], ['Lighting', 'Full LED']],
    highlights: ['Full LED lighting on the deluxe trim.', 'Front channel ABS.', 'Easy EMI financing available.'] },

  { id: 'ns200', type: 'bike', brand: 'Bajaj', name: 'Bajaj Pulsar NS 200', price: 451900, down: 0, img: IMG.ns200,
    blurb: 'Two hundred cc, dual channel ABS, and the most power of anything on this floor.',
    specs: [['Engine', '199.5cc'], ['Mileage', '35 kmpl'], ['Power', '24.5 PS'], ['Brakes', 'Dual ABS']],
    highlights: ['Twenty four and a half horsepower.', 'Dual channel ABS.', 'Easy EMI financing available.'] }
];

/* The rest of the two wheeler floor, from the showroom price list. Compact
   rows because that is all the source gives us: brand, name, rupee price, the
   spec line as published, and a photograph where we have one. Anything without
   a photograph falls back to a placeholder card — drop a file into assets/ and
   add it as the fifth field to fix that.

   Not every model is on the floor on any given day; the counter confirms. */
const TWO_WHEELER_LIST = [
  ['Honda', 'Honda Shine 125', 260900, '124cc · 65 kmpl · 10.5 PS · Disc', IMG.hondaShine],
  ['Honda', 'Honda SP 125', 275000, '124cc · 65 kmpl · 10.9 PS · Disc', IMG.hondaSp125],
  ['Honda', 'Honda Unicorn', 295000, '162.7cc · 55 kmpl · 13.3 PS · Disc'],
  ['Honda', 'Honda Hornet 2.0', 345000, '184.4cc · 45 kmpl · 17.26 PS · Dual disc ABS'],
  ['Honda', 'Honda CB300R', 625000, '286cc · 30 kmpl · 31 PS · Dual ABS'],
  ['Honda', 'Honda Activa 125', 215000, '124cc · 60 kmpl · 8.1 PS · Drum'],
  ['Honda', 'Honda Dio', 185000, '109cc · 55 kmpl · 7.8 PS · Drum', IMG.hondaDio110],

  ['TVS', 'TVS XL 100', 157900, '99.7cc · Moped · 4 PS'],
  ['TVS', 'TVS Radeon Fi', 229900, '109.7cc · 65 kmpl · 8.19 PS'],
  ['TVS', 'TVS Ntorq 125 Drum', 248900, '124.8cc · 47 kmpl · 9.38 PS'],
  ['TVS', 'TVS Stryker 125', 251900, '124.8cc · 62 kmpl · 9.4 PS'],
  ['TVS', 'TVS Jupiter 2025', 257900, '109.7cc · 55 kmpl · 7.5 PS · Scooter'],
  ['TVS', 'TVS Ntorq 125 Disc', 271900, '124.8cc · 47 kmpl · 9.38 PS · Disc'],
  ['TVS', 'TVS Raider', 276900, '124.8cc · 67 kmpl · 11.4 PS'],
  ['TVS', 'TVS Ntorq Disc Fi', 288900, '124.8cc · 47 kmpl · 9.38 PS · Disc + FI'],
  ['TVS', 'TVS Raider Fi', 299900, '124.8cc · 67 kmpl · 11.4 PS · FI'],
  ['TVS', 'TVS Raider iGo', 309900, '124.8cc · 67 kmpl · 11.4 PS · Hybrid'],
  ['TVS', 'TVS Ntorq RTFI BS6', 313900, '124.8cc · 47 kmpl · 9.38 PS · RTFI'],
  ['TVS', 'TVS Apache RTR 160 2V', 321900, '159.7cc · 52 kmpl · 15.8 PS'],
  ['TVS', 'TVS Ntorq XP', 332900, '124.8cc · 47 kmpl · 9.38 PS · XP Edition'],
  ['TVS', 'TVS Apache RTR 160 4V FD', 339900, '159.7cc · 45 kmpl · 17.63 PS'],
  ['TVS', 'TVS Apache RTR 160 2V FI', 347900, '159.7cc · 52 kmpl · 15.8 PS · FI'],
  ['TVS', 'TVS Apache RTR 160 4V ABS', 359900, '159.7cc · 45 kmpl · 17.63 PS · ABS'],
  ['TVS', 'TVS Apache RTR 160 4V SE', 389900, '159.7cc · 45 kmpl · 17.63 PS · Special edition'],
  ['TVS', 'TVS Apache RTR 200 4V ABS', 393900, '197.75cc · 40 kmpl · 20.8 PS · ABS'],
  ['TVS', 'TVS Apache RTR 200 4V RTFI', 399900, '197.75cc · 40 kmpl · 20.8 PS · FI + ABS'],
  ['TVS', 'TVS Ronin', 459900, '225.9cc · 40 kmpl · 20.4 PS · ABS'],
  ['TVS', 'TVS RR 310', 799900, '312.2cc · 30 kmpl · 34 PS · ABS'],

  ['Yamaha', 'Yamaha Saluto 125 Disc', 282900, '125cc · 55 kmpl · 8.4 PS · Disc'],
  ['Yamaha', 'Yamaha RayZR 125 Hybrid Disc', 312900, '125cc · 71 kmpl · 8.2 PS · Hybrid · Disc'],
  ['Yamaha', 'Yamaha RayZR SR Hybrid', 332900, '125cc · 71 kmpl · 8.2 PS · Street Rally'],
  ['Yamaha', 'Yamaha FZ FI V2', 366900, '149cc · 45 kmpl · 12.4 PS · Disc'],
  ['Yamaha', 'Yamaha FZS FI V2', 384900, '149cc · 45 kmpl · 12.4 PS · Disc'],
  ['Yamaha', 'Yamaha FZ FI V3 Standard', 384900, '149cc · 45 kmpl · 12.4 PS · ABS'],
  ['Yamaha', 'Yamaha Aerox 155 BS6', 499900, '155cc · 48 kmpl · 15 PS · ABS · TCS · VVA'],

  ['Bajaj', 'Bajaj Pulsar N125', 210000, '124.45cc · 55 kmpl · 11.8 PS'],
  ['Bajaj', 'Bajaj Pulsar 150', 255000, '149.5cc · 50 kmpl · 14 PS · Disc'],
  ['Bajaj', 'Bajaj Pulsar N160', 310000, '164.82cc · 45 kmpl · 16 PS · ABS'],
  ['Bajaj', 'Bajaj Pulsar N250', 480000, '249.07cc · 35 kmpl · 24.5 PS · Dual ABS'],
  ['Bajaj', 'Bajaj Dominar 400', 680000, '373.27cc · 30 kmpl · 40 PS · Dual ABS']
];

/* The published spec line is a single string. Label each part by what it
   looks like so the detail page can lay it out as a proper table. */
function specRows(line) {
  return line.split('·').map(function (s) { return s.trim(); }).filter(Boolean)
    .map(function (part) {
      if (/cc$/i.test(part)) return ['Engine', part];
      if (/kmpl$/i.test(part)) return ['Mileage', part];
      if (/\bPS$/i.test(part)) return ['Power', part];
      if (/disc|abs|drum/i.test(part)) return ['Brakes', part];
      return ['Feature', part];
    });
}

/* Fold the price list into the catalogue. A model already listed above with a
   photograph and a write up wins — those entries are the featured ones. */
TWO_WHEELER_LIST.forEach(function (row) {
  var brand = row[0], name = row[1], price = row[2], line = row[3], img = row[4];
  if (CATALOGUE.some(function (v) { return v.name === name; })) return;

  CATALOGUE.push({
    id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
    type: 'bike',
    brand: brand,
    name: name,
    price: price,
    down: 0,
    img: img || null,
    specs: specRows(line).concat([['Financing', 'Easy EMI available']])
  });
});

const DOCS = [
  { id: 'citizenship', label: 'Citizenship certificate', note: 'Original plus one photocopy' },
  { id: 'pan', label: 'PAN card', note: 'If you have one registered' },
  { id: 'income', label: 'Income proof', note: 'Salary slip, or business registration and audit report' },
  { id: 'bank', label: 'Bank statement', note: 'Last six months' },
  { id: 'photo', label: 'Passport photographs', note: 'Two recent' },
  { id: 'licence', label: 'Driving licence', note: 'Valid for the category you are buying' }
];

const TYPE_LABEL = {
  van: 'Electric van',
  car: 'Electric car',
  scooter: 'Electric scooter',
  bike: 'Petrol bike'
};

/* Financing defaults. The bank sets the real rate once papers are checked. */
const FINANCE_DEFAULTS = {
  interestRate: 8,
  vanTermMonths: 60
};

const CONTACT = {
  address: 'Panipokhari, Kathmandu — opposite NIMB Bank, next to the Nepal Police Hospital gate.',
  addressShort: 'Panipokhari, Kathmandu — opposite NIMB Bank',
  hours: 'Sunday to Friday, 9am – 7pm',
  landlines: ['01-5917150', '01-4972150', '01-5925150'],
  mobiles: ['9766874435', '9820115050', '9861608199'],
  whatsapp: '9779766874435',
  whatsappDisplay: '9766874435'
};

const TRUST_STATS = [
  ['500+', 'happy customers across Nepal'],
  ['60+', 'models across four categories'],
  ['5%', 'lowest EMI interest rate'],
  ['5 Years', 'longest EMI tenure on a van']
];

const HOW_TO_BUY = [
  ['Browse and select', 'Explore the full range of electric and petrol vehicles. Compare specs, prices and features here before you come in.'],
  ['Contact us', 'WhatsApp or call. Visit the showroom at Panipokhari for a test drive — no appointment needed, though a slot saves you the wait.'],
  ['Submit documents', 'Citizenship, PAN, income proof and bank statements. Anything missing, we will tell you how to get it.'],
  ['Book and finance', 'Pay the NPR 50,000 booking amount. Our team handles the bank paperwork and sets up the EMI for you.'],
  ['Drive home', 'Sign the loan documents, clear the balance, and take the vehicle home. Most files finish in three working days.']
];

const COMPANY = {
  storyTitle: 'From an 81 square foot stall to 12,000 square feet',
  story: [
    'TapaikoBazar began with a simple belief: buying a vehicle in Nepal should not be complicated. For years, Nepalis outside Kathmandu faced enormous barriers — no guarantor, no local property, no chance of getting bike or scooter finance from a city bank.',
    'We changed that. Starting from an 81 square foot stall, our founder Sushil Shangroula built a platform that brings easy EMI financing, transparent pricing and access to 60+ vehicle models under one roof, with no collateral required.',
    'Today TapaikoBazar spans 12,000 square feet at Panipokhari, Kathmandu, serving hundreds of customers across Nepal with everything from petrol bikes to the latest electric vans and cars.'
  ],
  quote: 'We don’t just sell vehicles, we simplify your decision.',
  quoteBy: 'Sushil Shangroula, Chairman, TapaikoBazar',

  values: [
    ['Transparent pricing', 'No hidden charges. What you see is what you pay. Real prices and real EMI breakdowns for every vehicle we list.'],
    ['EV first Nepal', 'Nepal’s future is electric. We make EV ownership affordable for ordinary families through accessible financing.'],
    ['No collateral finance', 'We broke the barrier. Anyone with a valid KYC can get vehicle finance — no guarantor, no property, no complications.'],
    ['Multi brand choice', 'Honda, Yamaha, Bajaj, TVS, KYC, Kinglong, Danfe, Xpeng, GAC Aion and more, all in one place and all verified.'],
    ['Recondition programme', 'Bring your old bike, scooter or car and get the best trade in value toward your next vehicle.'],
    ['Community first', 'We serve customers from across Nepal, including rural areas and small towns, not just the valley.']
  ],

  leaders: [
    { name: 'Sushil Shangroula', role: 'Chairman and Founder', img: '/assets/team/sushil-shangroula.jpg',
      bio: 'Starting from an 81 square foot stall, Sushil has built TapaikoBazar into Nepal’s most trusted multi brand vehicle marketplace. His aim — to make vehicle ownership reachable for every Nepali — has taken the company to 500+ customers and 60+ models across vans, scooters, cars and bikes.',
      note: 'Featured in Auto Nepal Magazine · 4+ years in the auto industry' },
    { name: 'Maya Lama', role: 'Chief Executive Officer', img: null,
      bio: 'Maya leads operations at TapaikoBazar, driving strategy, customer experience and growth. Under her leadership the company has widened its range across electric vans, scooters, cars and petrol bikes, serving customers across Nepal with easy EMI and transparent pricing.',
      note: '' }
  ],

  team: [
    ['Sabindra Thapa', 'Business Head', '/assets/team/sabindra-thapa.jpg'],
    ['Rahul Karna', 'Showroom Incharge', '/assets/team/rahul-karna.jpg'],
    ['Amit Kayastha', 'Sales Officer', '/assets/team/amit-kayastha.jpg'],
    ['Bishal Sherpa', 'Sales Officer', '/assets/team/bishal-sherpa.jpg'],
    ['Hemanta DC', 'Sales Officer', '/assets/team/hemanta-dc.jpg'],
    ['Sashi Waiba', 'Sales Officer', '/assets/team/sashi-waiba.jpg'],
    ['Parbati Karki', 'Front Desk Officer', '/assets/team/parbati-karki.jpg'],
    ['Smriti Dangol', 'Front Desk Officer', '/assets/team/smriti-dangol.jpg'],
    ['Shankar Sharma', 'Content Creator', '/assets/team/shankar-sharma.jpg'],
    ['Deepesh Gahatraj', 'Content Creator', '/assets/team/deepesh-gahatraj.jpg'],
    ['Thakendra Khadka', 'IT Officer, Navodaya Intelligence', '/assets/team/thakendra-khadka.jpg'],
    ['Sagar Shrestha', 'Ex Sales Officer', '/assets/team/sagar-shrestha.jpg'],
    ['Sovit Nepal', 'Ex Sales Officer', '/assets/team/sovit-nepal.jpg']
  ],

  gallery: [
    ['/assets/tapaikobazar-team.jpg', 'The TapaikoBazar team at Panipokhari'],
    ['/assets/cg-collab.jpg', 'With CG Motors, on the electric van range'],
    ['/assets/hiring-post.webp', 'We are hiring — ask at the counter']
  ],

  press: {
    title: 'As featured in Auto Nepal',
    text: 'Sushil Shangroula on the cover of Auto Nepal — “TapaikoBazar, revolutionising vehicle finance in Nepal”.',
    img: 'https://eautonepal.com/wp-content/uploads/2026/02/unnamed-1-scaled.jpg'
  }
};

const RECONDITION = {
  title: 'Maha Recondition Camp',
  lede: 'Bring your old petrol or diesel vehicle to Panipokhari and get a bonus valuation applied straight to your new EV purchase. Our team values it on the spot.',
  points: [
    ['Any brand accepted', 'Petrol, diesel or gas vehicles'],
    ['Best market valuation', 'Fair price plus the EV bonus'],
    ['Hassle free paperwork', 'We handle transfer and registration'],
    ['Same day offer letter', 'Walk in and get your valuation today']
  ]
};

export {
  IMG, HERO_SLIDES, CATALOGUE, TWO_WHEELER_LIST, DOCS, TYPE_LABEL,
  FINANCE_DEFAULTS, CONTACT, TRUST_STATS, HOW_TO_BUY,
  COMPANY, RECONDITION, vanTerms, specRows
};
