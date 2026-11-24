import React, { useCallback, useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { flushSync } from "react-dom";

const destinations = [
  {
    title: "Heritage of Cebu Monument",
    category: "HERITAGE · PARIAN",
    location: "Parian, Cebu City",
    experiences: ["Heritage"],
    image: "/source-photos/Tourist-Spots/HeritageOfCebu.jpg",
    alt: "The sculpted figures of the Heritage of Cebu Monument in Parian",
    description: "Read Cebu's layered history in a striking monument set in the heart of old Parian.",
    info: "Step into historic Parian to see a sculpted tribute to Cebu’s people and past. The monument brings together stories from different chapters of the island’s history.",
    fact: "Look closely at the bronze scenes: they depict key moments in Cebuano history, from early settlement to more recent milestones.",
    map: "Heritage of Cebu Monument, Cebu City"
  },
  {
    title: "Cebu Taoist Temple",
    category: "CULTURE · CEBU CITY",
    location: "Cebu City",
    experiences: ["Heritage"],
    image: "/source-photos/Tourist-Spots/ToistTemple.jpg",
    alt: "Colorful details of Cebu Taoist Temple among the hillside greenery",
    description: "Take in ornate architecture and peaceful views from the Beverly Hills hillside.",
    info: "Visit this colorful hillside temple in Beverly Hills, Cebu City, for ornate architecture and peaceful surroundings. Please be respectful of worshippers and follow posted visitor rules.",
    fact: "The temple’s elevated setting offers wide views across Cebu City and the nearby coastline.",
    map: "Cebu Taoist Temple, Cebu City"
  },
  {
    title: "Oslob Whale Shark Interaction",
    category: "OCEAN · OSLOB",
    location: "Oslob",
    experiences: ["Adventure", "Nature"],
    image: "/source-photos/Tourist-Spots/Oslob.jpg",
    alt: "A whale shark swimming in the clear waters off Oslob",
    description: "Meet the gentle giants of Oslob's coast, and follow local wildlife guidelines.",
    info: "Oslob is known for whale shark encounters along Cebu’s southern coast. If you visit, follow local wildlife guidelines: keep your distance, never touch or feed the animals, and listen to your guide.",
    fact: "Whale sharks are fish, not whales—and they are the largest fish alive.",
    map: "Whale Shark Interaction, Oslob, Cebu"
  },
  {
    title: "Tumalog Falls",
    category: "WATERFALLS · OSLOB",
    location: "Oslob",
    experiences: ["Nature", "Adventure", "Waterfalls"],
    image: "/source-photos/Tourist-Spots/TumalogFalls.jpg",
    alt: "Water cascading over the lush limestone cliffs at Tumalog Falls",
    description: "Cool off beneath a delicate curtain of water tucked into Oslob's green hills.",
    info: "Tucked into the green hills of Oslob, Tumalog Falls is known for water spilling over a broad limestone face. Check local conditions before travelling, especially after heavy rain.",
    fact: "The water spreads into a delicate, curtain-like cascade as it runs down the rock.",
    map: "Tumalog Falls, Oslob, Cebu"
  },
  {
    title: "Olango Island Wildlife Sanctuary",
    category: "WILDLIFE · OLANGO ISLAND",
    location: "Olango Island, Lapu-Lapu City",
    experiences: ["Islands", "Nature"],
    image: "/source-photos/Tourist-Spots/OlangoSanctuary.jpg",
    alt: "The coastal wetlands of Olango Island Wildlife Sanctuary",
    description: "Look out across tidal flats that welcome migratory birds and coastal wildlife.",
    info: "Explore coastal wetlands on Olango Island, a protected stop for migratory birds. Visit during suitable tides, bring binoculars, and keep a respectful distance from wildlife.",
    fact: "Olango’s wetlands are an important stopover for birds travelling along the East Asian–Australasian Flyway.",
    map: "Olango Island Wildlife Sanctuary, Lapu-Lapu City, Cebu"
  },
  {
    title: "Bantayan Island",
    category: "ISLAND LIFE · NORTHERN CEBU",
    location: "Bantayan Island · Santa Fe",
    experiences: ["Islands"],
    image: "/source-photos/Tourist-Spots/BantayanIsland.jpg",
    alt: "Bright sand and blue water along Bantayan Island's Santa Fe coast",
    description: "Settle into unhurried island days, clear water, and white-sand beaches.",
    info: "Slow down on Bantayan Island, where quiet coastal villages, wide beaches, and clear water make for an easygoing island escape. Ferries commonly arrive at Santa Fe.",
    fact: "Santa Fe, on Bantayan Island’s southeast coast, is a popular starting point for beach-hopping.",
    map: "Bantayan Island, Cebu"
  },
  {
    title: "Malapascua Island",
    category: "ISLAND LIFE · DAANBANTAYAN",
    location: "Daanbantayan",
    experiences: ["Islands", "Adventure"],
    image: "/source-photos/Tourist-Spots/MalapascuaIsland.jpg",
    alt: "A tropical sunset over the beach at Malapascua Island",
    description: "Find a laid-back island escape known for its diving and vivid sunsets.",
    info: "Off Cebu’s northern tip, Malapascua is a relaxed island getaway and a well-known base for scuba diving. Boat schedules and sea conditions can change, so plan ahead.",
    fact: "Malapascua’s name comes from Spanish words meaning “bad Easter”—a striking contrast to its bright beaches and famous dive sites.",
    map: "Malapascua Island, Daanbantayan, Cebu"
  }
];

const introDestinations = [
  "Cebu Taoist Temple",
  "Oslob Whale Shark Interaction",
  "Tumalog Falls"
].map((title) => destinations.find((destination) => destination.title === title)).filter(Boolean);

const additionalDestinations = [
  {
    title: "Magellan’s Cross",
    location: "Cebu City",
    experiences: ["Heritage"],
    category: "HERITAGE · CEBU CITY",
    image: "/source-photos/Tourist-Spots/MagellanCross.jpg",
    alt: "The chapel and cross at Magellan’s Cross in Cebu City",
    description: "Visit one of Cebu City's best-known historic landmarks.",
    info: "Find the small octagonal pavilion near the Basilica Minore del Santo Niño in the heart of Cebu City. The cross is associated with the arrival of Christianity in the Philippines.",
    fact: "The cross is housed inside a pavilion beside the Basilica Minore del Santo Niño.",
  },
  {
    title: "Basilica Minore del Santo Niño",
    location: "Cebu City",
    experiences: ["Heritage"],
    category: "CULTURE · CEBU CITY",
    image: "/source-photos/Tourist-Spots/BasilicaSantoNino.jpg",
    alt: "The Basilica Minore del Santo Niño during a nighttime mass in Cebu City",
    description: "Step into a landmark of Cebu's living faith and history.",
    info: "Visit this historic church near Magellan’s Cross in downtown Cebu. Check service schedules and visitor guidance, and be respectful during worship.",
    fact: "The Santo Niño image enshrined here is among the Philippines’ most venerated religious images.",
  },
  {
    title: "Fort San Pedro",
    location: "Cebu City",
    experiences: ["Heritage"],
    category: "HISTORY · CEBU CITY",
    image: "/source-photos/Tourist-Spots/FortSanPedro.jpg",
    alt: "The historic walls of Fort San Pedro in Cebu City",
    description: "Explore a Spanish-era fort beside Cebu City's waterfront.",
    info: "Walk the compact grounds of this historic fort near the port and learn about Cebu’s colonial-era past. Confirm current opening hours before visiting.",
    fact: "Fort San Pedro has a triangular plan with stone walls and bastions.",
  },
  {
    title: "Temple of Leah",
    location: "Cebu City",
    experiences: ["Heritage"],
    category: "ARCHITECTURE · CEBU CITY",
    image: "/source-photos/Tourist-Spots/TempleOfLea.jpg",
    alt: "The classical architecture of the Temple of Leah in Cebu",
    description: "Take in grand architecture and hillside views in Busay.",
    info: "This Roman-inspired landmark sits in the hills above Cebu City. The elevated location is a scenic stop; check local visitor rules and weather before heading up.",
    fact: "The temple is known for its columns, statues, and hillside setting.",
  },
  {
    title: "Sirao Flower Garden",
    location: "Cebu City",
    experiences: ["Nature"],
    category: "GARDENS · CEBU CITY",
    image: "/source-photos/Tourist-Spots/SiraoGarden.jpg",
    alt: "Colorful flower beds at Sirao Garden in Cebu City's highlands",
    description: "Wander among colorful blooms in Cebu City's highlands.",
    info: "Sirao Flower Garden is a hillside stop known for its seasonal blooms and photo spots. Flower displays change through the year, so check local conditions before travelling.",
    fact: "Sirao is often nicknamed Cebu’s Little Amsterdam for its flower gardens.",
  },
  {
    title: "Tops Lookout",
    location: "Cebu City",
    experiences: ["Adventure", "Mountain views"],
    category: "VIEWPOINT · CEBU CITY",
    image: "/source-photos/Tourist-Spots/TopsLookout.jpg",
    alt: "Cebu City and the Mactan-Cebu Channel at night, viewed from Tops Lookout",
    description: "Look out over the city and coastline from the Busay hills.",
    info: "Tops Lookout is a popular elevated viewpoint above Cebu City. Bring a light layer for the cooler hilltop air and check current access details before your visit.",
    fact: "The lookout’s high setting offers wide views across Metro Cebu.",
  },
  {
    title: "Colon Street",
    location: "Cebu City",
    experiences: ["Heritage"],
    category: "CITY LIFE · CEBU CITY",
    image: "/source-photos/Tourist-Spots/ColonStreet.jpg",
    alt: "Colon Street in the historic center of Cebu City",
    description: "Trace Cebu City's story along a busy downtown street.",
    info: "Colon Street runs through the historic center of Cebu City, surrounded by shops, transport, and heritage sites. Visit during daylight and stay aware of traffic and your belongings.",
    fact: "The street’s name comes from Cristóbal Colón, the Spanish name for Christopher Columbus.",
  },
  {
    title: "Casa Gorordo Museum",
    location: "Cebu City",
    experiences: ["Heritage"],
    category: "MUSEUM · CEBU CITY",
    image: "/source-photos/Tourist-Spots/CasaGorordoMuseum.jpg",
    alt: "Devotional artifacts displayed inside Casa Gorordo Museum",
    description: "Get a glimpse of domestic life in old Cebu.",
    info: "This restored heritage house in the Parian district offers a look at Cebuano life and architecture from an earlier era. Check museum hours and visitor guidelines before you go.",
    fact: "Casa Gorordo preserves a traditional house associated with Cebu’s 19th-century history.",
  },
  {
    title: "Mactan Shrine",
    location: "Lapu-Lapu City",
    experiences: ["Heritage"],
    category: "HERITAGE · LAPU-LAPU CITY",
    image: "/source-photos/Tourist-Spots/MactanShrine.jpg",
    alt: "The Mactan Shrine monument in Lapu-Lapu City",
    description: "Visit a memorial to the historic Battle of Mactan.",
    info: "The Mactan Shrine in Lapu-Lapu City commemorates the Battle of Mactan and local hero Lapu-Lapu. Take time to read the site displays and respect the memorial grounds.",
    fact: "The battle took place on Mactan Island in 1521.",
  },
  {
    title: "Kawasan Falls",
    location: "Badian",
    experiences: ["Nature", "Adventure", "Waterfalls"],
    category: "WATERFALLS · BADIAN",
    image: "/source-photos/Tourist-Spots/KawasanFalls.jpg",
    alt: "The turquoise water and lush surroundings of Kawasan Falls",
    description: "Follow the river to Badian's famous blue-green falls.",
    info: "Kawasan Falls is a multi-tiered waterfall area in Badian. Water levels and access can change, so follow local guidance and use a registered guide for canyoning.",
    fact: "The falls are part of the Matutinao River system in southwest Cebu.",
  },
  {
    title: "Osmeña Peak",
    location: "Dalaguete",
    experiences: ["Nature", "Adventure", "Mountain views"],
    category: "HIGHLANDS · DALAGUETE",
    image: "/source-photos/Tourist-Spots/OsmenaPeak.jpg",
    alt: "Jagged hills and a wide view from the summit of Osmeña Peak",
    description: "Hike to a summit framed by Cebu's distinctive hills.",
    info: "Osmeña Peak is a popular highland hike in Dalaguete. Conditions can be cool or wet, so check the weather, wear suitable footwear, and follow local trail guidance.",
    fact: "The summit looks across clusters of jagged hills in Cebu’s Mantalungon range.",
  },
  {
    title: "Sumilon Island and Sandbar",
    location: "Oslob",
    experiences: ["Islands", "Nature"],
    category: "ISLAND LIFE · OSLOB",
    image: "/source-photos/Tourist-Spots/SumilonIsland.jpg",
    alt: "The shifting sandbar of Sumilon Island extending into the Cebu Strait",
    description: "Take a boat out to an island known for its shifting sandbar.",
    info: "Sumilon Island sits off Oslob’s coast. Boat access and sandbar conditions depend on the weather and tides, so arrange your trip locally and follow site guidance.",
    fact: "The sandbar’s shape and size change with the tides and season.",
  },
  {
    title: "Moalboal Sardine Run",
    location: "Moalboal",
    experiences: ["Islands", "Nature", "Adventure"],
    category: "MARINE LIFE · MOALBOAL",
    image: "/source-photos/Tourist-Spots/MoalboalSardineRun.jpg",
    alt: "A school of sardines moving above the seafloor off Moalboal",
    description: "Watch vast schools of sardines move through clear coastal water.",
    info: "The sardine run is a well-known marine encounter off Moalboal. Keep a respectful distance, never touch or feed wildlife, and follow your guide’s instructions.",
    fact: "Large schools of sardines can gather close to shore in Moalboal.",
  },
  {
    title: "Pescador Island",
    location: "Moalboal",
    experiences: ["Islands", "Nature", "Adventure"],
    category: "DIVING · MOALBOAL",
    image: "/source-photos/Tourist-Spots/PescadorIsland.jpg",
    alt: "Pescador Island rising from the sea off Moalboal, Cebu",
    description: "Explore a celebrated offshore reef and marine sanctuary.",
    info: "Pescador Island is a popular snorkeling and diving destination off Moalboal. Sea conditions can change quickly; use a licensed local operator and avoid disturbing marine life.",
    fact: "The island is known for its reef and clear-water diving.",
  },
  {
    title: "Camotes Islands and Lake Danao",
    location: "Camotes Islands · Pacijan Island",
    experiences: ["Islands", "Nature"],
    category: "ISLAND LIFE · CAMOTES",
    image: "/source-photos/Tourist-Spots/CamotesLakeDanao.jpg",
    alt: "Freshwater Lake Danao surrounded by green hills on Camotes Island",
    description: "Pair a quiet island escape with a visit to a freshwater lake.",
    info: "The Camotes Islands offer beaches, caves, and inland scenery. Lake Danao is a peaceful freshwater stop; check ferry schedules and local conditions when planning your trip.",
    fact: "Lake Danao is a freshwater lake on Pacijan Island, part of the Camotes group.",
  },
  {
    title: "Simala Shrine",
    location: "Sibonga",
    experiences: ["Heritage"],
    category: "CULTURE · SIBONGA",
    image: "/source-photos/Tourist-Spots/Simala.jpg",
    alt: "The towers and ornate facade of Simala Shrine",
    description: "See the distinctive hilltop shrine in southern Cebu.",
    info: "Simala Shrine is a Marian pilgrimage site in Sibonga. Dress respectfully, expect a busy visit on pilgrimage days, and follow posted rules inside the grounds.",
    fact: "The shrine is also known as the Monastery of the Holy Eucharist.",
  },
  {
    title: "Bojo River",
    location: "Aloguinsan",
    experiences: ["Nature", "Adventure"],
    category: "RIVER · ALOGUINSAN",
    image: "/source-photos/Tourist-Spots/BojoRiver.jpg",
    alt: "The green waters and banks of Bojo River in Aloguinsan",
    description: "Take a guided river cruise through a green coastal landscape.",
    info: "Bojo River in Aloguinsan is known for community-led ecotourism. Book with local guides and follow their advice to protect the river and surrounding habitat.",
    fact: "The river tour is managed with participation from the local community.",
  },
  {
    title: "Mantayupan Falls",
    location: "Barili",
    experiences: ["Nature", "Adventure", "Waterfalls"],
    category: "WATERFALLS · BARILI",
    image: "/source-photos/Tourist-Spots/MantayupanFalls.jpg",
    alt: "Water cascading down Mantayupan Falls in Barili, Cebu",
    description: "Cool off beside one of Cebu's most impressive waterfalls.",
    info: "Mantayupan Falls is a scenic stop in Barili. Check local access and water conditions before visiting, and use care on wet paths.",
    fact: "The falls are known for their dramatic height and two cascades.",
  },
];

const allDestinations = [
  ...destinations,
  ...additionalDestinations.map((destination) => ({
    ...destination,
    map: `${destination.title}, ${destination.location}`,
  })),
];

const featuredDestinations = [
  {
    title: "Sinulog Festival",
    category: "FESTIVAL · CEBU CITY",
    location: "Cebu City",
    experiences: ["Culture", "Festivals"],
    image: "/tspots-Cebu/chloe-evans-CXgipFEHrq4-unsplash.jpg",
    alt: "A colorful Sinulog Festival performer",
    description: "Experience Cebu's vibrant street celebration of faith, music, dance, and color.",
    info: "Sinulog is Cebu's most recognizable festival. Major performances and processions take place around Cebu City; check current schedules and public access arrangements before attending.",
    fact: "Sinulog is closely associated with devotion to the Santo Niño.",
    map: "Sinulog Festival, Cebu City",
  },
  {
    title: "Fort San Pedro",
    category: "HERITAGE · CEBU CITY",
    location: "Cebu City",
    experiences: ["Heritage"],
    image: "/tspots-Cebu/irish-francisco-CrZ0QeurNds-unsplash.jpg",
    alt: "The historic entrance of Fort San Pedro",
    description: "Step into one of Cebu City's best-known Spanish-era landmarks.",
    info: "Fort San Pedro stands near the port area in Cebu City. Visit the grounds and learn about the fort's triangular layout and its role in Cebu's history.",
    fact: "Fort San Pedro is known for its triangular stone fortification.",
    map: "Fort San Pedro, Cebu City",
  },
  {
    title: "Simala Shrine",
    category: "CULTURE · SIBONGA",
    location: "Sibonga",
    experiences: ["Heritage", "Culture"],
    image: "/tspots-Cebu/hitoshi-namura-l-fiuqSVU3s-unsplash.jpg",
    alt: "The ornate architecture of Simala Shrine",
    description: "Discover the distinctive Marian shrine and pilgrimage landmark in southern Cebu.",
    info: "Simala Shrine in Sibonga is a popular pilgrimage destination. Dress respectfully and follow posted visitor rules, especially during busy feast days.",
    fact: "The site is also known as the Monastery of the Holy Eucharist.",
    map: "Simala Shrine, Sibonga, Cebu",
  },
  {
    title: "Oslob Whale Shark",
    category: "OCEAN · OSLOB",
    location: "Oslob",
    experiences: ["Nature", "Adventure"],
    image: "/tspots-Cebu/jeremiah-del-mar-0lgdsiAdg3k-unsplash.jpg",
    alt: "A whale shark swimming underwater",
    description: "Explore Cebu's southern coast through a remarkable marine wildlife experience.",
    info: "Oslob is known for whale shark encounters. Follow local conservation rules, keep a respectful distance, and never touch or feed the animals.",
    fact: "Whale sharks are the largest species of fish in the world.",
    map: "Whale Shark Interaction, Oslob, Cebu",
  },
  {
    title: "Cebu Highlands",
    category: "VIEWPOINT · CEBU",
    location: "Cebu",
    experiences: ["Mountain views", "Nature"],
    image: "/tspots-Cebu/ken-suarez-KdTL0ik0Fm8-unsplash.jpg",
    alt: "A modern viewpoint surrounded by Cebu's mountain landscape",
    description: "Look across Cebu's hills, towns, and wide mountain scenery.",
    info: "Cebu's highland destinations offer cool air and panoramic views. Check access details and weather conditions before travelling to an elevated attraction.",
    fact: "The island's central mountains create cooler viewpoints and dramatic landscapes.",
    map: "Cebu Highlands, Cebu",
  },
  {
    title: "Cebu Island View",
    category: "COAST · CEBU",
    location: "Cebu",
    experiences: ["Nature", "Mountain views"],
    image: "/tspots-Cebu/ken-suarez-_Mwi4HUYCVM-unsplash.jpg",
    alt: "A scenic view of Cebu's island landscape",
    description: "See Cebu through sweeping landscapes that connect the island's coast and city.",
    info: "Cebu offers many elevated and coastal viewpoints. Confirm opening hours and local access guidelines before planning a visit.",
    fact: "Cebu extends about 225 kilometers from north to south.",
    map: "Cebu Island, Cebu",
  },
  {
    title: "Cebu Waterfall",
    category: "NATURE · CEBU",
    location: "Cebu",
    experiences: ["Nature", "Adventure", "Waterfalls"],
    image: "/tspots-Cebu/toa-heftiba-LBMvueaBKT8-unsplash.jpg",
    alt: "A turquoise waterfall surrounded by lush greenery",
    description: "Discover Cebu's refreshing waterfalls and green natural landscapes.",
    info: "Waterfall access and conditions vary across Cebu. Check local weather and trail guidance, and use registered guides where they are required.",
    fact: "Cebu's waterfalls are shaped by the island's mountain rivers and limestone terrain.",
    map: "Cebu waterfalls, Cebu",
  },
];

const cebuStories = [
  {
    number: "01",
    category: "THE PEOPLE",
    title: "A welcome that feels like Cebu.",
    description: "From market sellers to coastal diners, Cebu is best understood through the people who share its everyday rhythm. A local tip or a warm hello can turn a stop into a story.",
    quote: "A good day starts with a hello.",
    image: "/source-photos/Food/Sutukil.jpg",
    alt: "Diners sharing a meal at a Cebu sutukil restaurant",
  },
  {
    number: "02",
    category: "COMMERCE",
    title: "A city that moves at market pace.",
    description: "At neighborhood markets and late-night food spots, sellers, makers, and cooks keep Cebu’s everyday energy alive. Follow a familiar scent and discover something new.",
    quote: "Made here, shared with pride.",
    image: "/source-photos/Food/SugboMercado.jpg",
    alt: "An aerial view of market stalls at Sugbo Mercado",
  },
  {
    number: "03",
    category: "CULTURE",
    title: "Tradition moves with the city.",
    description: "Sinulog’s music and devotion, historic landmarks, and living traditions give Cebu a rhythm that carries from one generation to the next.",
    quote: "The rhythm stays with you.",
    image: "/source-photos/Tourist-Spots/BasilicaSantoNino.jpg",
    alt: "The Basilica Minore del Santo Niño in Cebu City",
  },
  {
    number: "04",
    category: "EXPERIENCE",
    title: "The table is part of the journey.",
    description: "From Cebu lechon and puso to sweet mangoes and coastal catches, local favorites make every stop its own experience. Come hungry; leave with a new favorite.",
    quote: "Leave room for one more bite.",
    image: "/source-photos/Food/CebuLechon.jpg",
    alt: "Cebu lechon served ready to share",
  },
];

const foods = [
  {
    name: "Cebu Lechon",
    type: "Main · shareable meal",
    image: "/source-photos/Food/CebuLechon.jpg",
    alt: "Cebu lechon with crisp golden-brown skin and tender roasted meat",
    description: "Cebu’s celebrated whole-roasted pig is all about fragrant seasoning, juicy meat, and crackling skin.",
    where: "Puso Village in Cebu City, or lechon stalls and restaurants in Carcar.",
    map: "Puso Village, Cebu City",
  },
  {
    name: "Puso (Hanging Rice)",
    type: "Rice side",
    image: "/source-photos/Food/PusoHangingRice.jpg",
    alt: "Puso rice wrapped in woven coconut leaves, served with scallops",
    description: "Rice steamed in a woven coconut-leaf pouch: an easy-to-carry Cebuano staple made for pairing with grilled food.",
    where: "Order it with barbecue at Larsian near Fuente Osmeña or at neighborhood grill stalls.",
    map: "Larsian, Fuente Osmeña Circle, Cebu City",
  },
  {
    name: "Ngohiong",
    type: "Snack · street food",
    image: "/source-photos/Food/NgohiongCebuFoodTrip.jpg",
    alt: "A crisp Cebu-style ngohiong roll served with dipping sauce",
    description: "A crunchy, five-spice roll with heart of palm and vegetables, served hot with a sweet-spiced dipping sauce.",
    where: "Cebu Ngohiong on Junquera Street and ngohiong stalls around downtown Cebu City.",
    map: "Cebu Ngohiong, Junquera Street, Cebu City",
  },
  {
    name: "Tuslob Buwa",
    type: "Shared meal",
    image: "/source-photos/Food/TuslobBuwa.jpg",
    alt: "Loy's Tuslob Buwa stall at The Barracks food market in Cebu City",
    description: "A bubbling, savory Cebuano dip traditionally shared with puso. Order it fresh and follow the stall’s serving guidance.",
    where: "Pasil, its historic home, and local stalls such as Loy’s at The Barracks in Carbon Market.",
    map: "The Barracks, Carbon Market, Cebu City",
  },
  {
    name: "Sutukil",
    type: "Seafood meal",
    image: "/source-photos/Food/Sutukil.jpg",
    alt: "Smiley Larsian By The Sea Sutukil at IL Corso Food Yard in Cebu City",
    description: "Choose fresh seafood prepared as sugba (grilled), tuwa (stewed), or kilaw (citrus-cured)—often together at one table.",
    where: "Seafood houses near Mactan Shrine in Lapu-Lapu City, or Smiley Larsian By The Sea at IL Corso.",
    map: "Smiley Larsian By The Sea Sutukil, IL Corso Food Yard, Cebu City",
  },
  {
    name: "Danggit",
    type: "Breakfast",
    image: "/source-photos/Food/Danggit.jpg",
    alt: "Rows of dried fish, including danggit, at a Cebu public market",
    description: "Cebu’s thin, salted rabbitfish is sun-dried, then quickly fried for a crisp, savory breakfast.",
    where: "Taboan Public Market in Cebu City is a popular stop for dried danggit and other buwad.",
    map: "Taboan Public Market, Cebu City",
  },
  {
    name: "Dried Mangoes",
    type: "Snack · pasalubong",
    image: "/source-photos/Food/DriedMangoes.jpg",
    alt: "A Cebu Best dried mangoes pack, a popular Cebu pasalubong",
    description: "Ripe Cebu mangoes become a chewy, sweet-tart snack and an easy-to-pack island souvenir.",
    where: "Taboan Public Market and pasalubong shops around Cebu City; look for local makers such as Cebu’s Best.",
    map: "Taboan Public Market, Cebu City",
  },
  {
    name: "Otap",
    type: "Snack · pasalubong",
    image: "/source-photos/Food/Otap.jpg",
    alt: "Sugar-dusted, flaky oval otap pastries from Cebu",
    description: "A light, crisp, sugar-sprinkled puff pastry that flakes into delicate layers with every bite.",
    where: "Shamrock Pasalubong Center and other Cebu City bakeries and souvenir shops.",
    map: "Shamrock Pasalubong Center, Cebu City",
  },
  {
    name: "Rosquillos",
    type: "Snack · pasalubong",
    image: "/source-photos/Food/Rosquillos.jpg",
    alt: "A box of Titay’s rosquillos ring-shaped cookies from Liloan",
    description: "A gently sweet, ring-shaped Cebu biscuit created in Liloan and still made by the Titay’s bakery.",
    where: "Titay’s in Liloan or pasalubong shops across Cebu.",
    map: "Titay’s Rosquillos, Liloan, Cebu",
  },
];

const experienceFilters = [
  { value: "All", label: "All places" },
  { value: "Islands", label: "Beaches & islands" },
  { value: "Waterfalls", label: "Waterfalls" },
  { value: "Mountain views", label: "Mountain views" },
  { value: "Nature", label: "Nature" },
  { value: "Adventure", label: "Adventure" },
  { value: "Heritage", label: "Heritage" },
];

const imageCredits = [
  {
    name: "Heritage of Cebu Monument",
    imageUrl: "https://commons.wikimedia.org/wiki/File:Heritage_of_Cebu_monument_detail.jpg",
    author: "Headshop5",
    license: "CC0",
    licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/"
  },
  {
    name: "Tumalog Falls",
    imageUrl: "https://commons.wikimedia.org/wiki/File:Tumalog_Falls_in_Oslob,_Cebu_01.jpg",
    author: "Iampjanz",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/"
  },
  {
    name: "Olango Island Wildlife Sanctuary",
    imageUrl: "https://commons.wikimedia.org/wiki/File:Wildlife_Sanctuary_in_Olango_Island.jpg",
    author: "Herbert Kikoy",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/"
  },
  {
    name: "Bantayan Island",
    imageUrl: "https://commons.wikimedia.org/wiki/File:Bantayan_island_beach,_Santa_Fe,_Cebu_-_panoramio.jpg",
    author: "Mats Sjödin",
    license: "CC BY 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by/3.0/"
  },
  {
    name: "Malapascua Island",
    imageUrl: "https://commons.wikimedia.org/wiki/File:Malapascua_Island,_Sunset_on_the_beach_2,_Philippines.jpg",
    author: "Vyacheslav Argenberg",
    license: "CC BY 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/"
  },
  {
    name: "Sirao Flower Garden",
    imageUrl: "https://commons.wikimedia.org/wiki/File:Sirao_Garden.jpg",
    author: "Maria Glenda Perico",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/"
  },
  {
    name: "Tops Lookout",
    imageUrl: "https://commons.wikimedia.org/wiki/File:Wikinights_Cebu_-_Tops_Lookout_(019).jpg",
    author: "Bjeweld",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/"
  },
  {
    name: "Colon Street",
    imageUrl: "https://commons.wikimedia.org/wiki/File:Colon_Street_(Cebu_City;_01-14-2023).jpg",
    author: "Patrickroque01",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/"
  },
  {
    name: "Basilica Minore del Santo Niño",
    imageUrl: "https://commons.wikimedia.org/wiki/File:Basilica_Minore_del_Santo_Nino_de_Cebu_night_view_Sinulog_2023_(Osme%C3%B1a_Boulevard,_Cebu_City;_01-14-2023).jpg",
    author: "Patrickroque01",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/"
  },
  {
    name: "Casa Gorordo Museum",
    imageUrl: "https://commons.wikimedia.org/wiki/File:Items_of_Devotion_%E2%80%93_Found_Inside_Casa_Gorordo_Museum_2.jpg",
    author: "Bim24",
    license: "CC BY 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/"
  },
  {
    name: "Osmeña Peak",
    imageUrl: "https://commons.wikimedia.org/wiki/File:Osme%C3%B1a_Peak,_Cebu,_Philippines.jpg",
    author: "Tyrll Adolf Itong",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/"
  },
  {
    name: "Sumilon Island sandbar",
    imageUrl: "https://commons.wikimedia.org/wiki/File:Sumilon_Island_sandbar.jpg",
    author: "Warrendering",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/"
  },
  {
    name: "Moalboal sardine run",
    imageUrl: "https://commons.wikimedia.org/wiki/File:Sardine_run_over_seafloor_in_Moalboal_01.jpg",
    author: "Iampjanz",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/"
  },
  {
    name: "Pescador Island",
    imageUrl: "https://commons.wikimedia.org/wiki/File:Pescador_Island.JPG",
    author: "P199",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/"
  },
  {
    name: "Lake Danao, Camotes",
    imageUrl: "https://commons.wikimedia.org/wiki/File:Lake_Danao_in_Camotes_Island.jpg",
    author: "choypictures",
    license: "CC0",
    licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/"
  },
  {
    name: "Bojo River",
    imageUrl: "https://commons.wikimedia.org/wiki/File:Bojo_River,_Cebu.jpg",
    author: "FroyAgta",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/"
  },
  {
    name: "Mantayupan Falls",
    imageUrl: "https://commons.wikimedia.org/wiki/File:Mantayupan_Falls_of_Barili,_Cebu.jpg",
    author: "StrangerNbystander",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/"
  },
  {
    name: "Cebu Lechon",
    imageUrl: "https://commons.wikimedia.org/wiki/File:Lechon_Cebu_1.jpg",
    author: "Bim24",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/"
  },
  {
    name: "Puso with scallops",
    imageUrl: "https://commons.wikimedia.org/wiki/File:Puso_(hanging_rice_)_with_Butter_Garlic_Scallops_2.jpg",
    author: "Bim24",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/"
  },
  {
    name: "Ngohiong",
    imageUrl: "https://commons.wikimedia.org/wiki/File:Cebu_Food_Trip_(11051264125).jpg",
    author: "RM Bulseco",
    license: "CC BY 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0/"
  },
  {
    name: "Tuslob Buwa",
    imageUrl: "https://commons.wikimedia.org/wiki/File:Loy%27s_Tuslob_Buwa_at_the_Carbon_Market_The_Barracks_(2024-04-10).jpg",
    author: "Wide Awake!",
    license: "CC BY 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/"
  },
  {
    name: "Sutukil",
    imageUrl: "https://commons.wikimedia.org/wiki/File:Smiley_Larsian_By_The_Sea_Sutukil_at_the_IL_Corso_Food_Yard_(2025-10-05).jpg",
    author: "Wide Awake!",
    license: "CC BY 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/"
  },
  {
    name: "Danggit",
    imageUrl: "https://commons.wikimedia.org/wiki/File:Many_Kinds_of_Dried_fish_at_Toledo_Public_Market_25.jpg",
    author: "QueenCityCebu",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/"
  },
  {
    name: "Cebu dried mangoes",
    imageUrl: "https://commons.wikimedia.org/wiki/File:Cebu_Best_Dried_Mango.jpg",
    author: "Ralff Nestor Nacor",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/"
  },
  {
    name: "Otap",
    imageUrl: "https://commons.wikimedia.org/wiki/File:Otap_(Utap)_puff_pastry.jpg",
    author: "Obsidian Soul",
    license: "CC0",
    licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/"
  },
  {
    name: "Titay’s Rosquillos",
    imageUrl: "https://commons.wikimedia.org/wiki/File:Titay%27s_Rosquillos_Corazon.jpg",
    author: "Obsidian Soul",
    license: "CC0",
    licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/"
  }
];

function Brand({ footer = false }) {
  return (
    <a className={`brand${footer ? " footer-brand" : ""}`} href="#home" aria-label="Lipad Cebu home">
      <span className="brand-mark" aria-hidden="true">L</span>
      <span>LIPAD <span className="brand-light">CEBU</span></span>
    </a>
  );
}

function DestinationCard({ destination, index, onSelect }) {
  const bestFor = destination.experiences.includes("Waterfalls")
    ? "Waterfalls"
    : destination.experiences.includes("Mountain views")
      ? "Mountain views"
      : destination.experiences[0];

  return (
    <button
      type="button"
      className="destination-card"
      data-reveal
      style={{ "--reveal-delay": `${Math.min(index % 4, 3) * 90}ms` }}
      onClick={() => onSelect(destination)}
      aria-label={`View story: ${destination.title}`}
      aria-haspopup="dialog"
    >
      <img
        src={destination.image}
        alt={destination.alt}
        loading={index === 0 ? "eager" : "lazy"}
        fetchPriority={index === 0 ? "high" : "auto"}
      />
      <span className="card-shade" />
      <span className="card-content">
        <span className="card-category">{destination.category}</span>
        <span className="card-location">{destination.location}</span>
        <span className="card-best-for">Best for {bestFor}</span>
        <span className="card-title">{destination.title}</span>
        <span className="card-description">{destination.description}</span>
        <span className="card-action">View story <span aria-hidden="true">↗</span></span>
      </span>
      <span className="card-number">{String(index + 1).padStart(2, "0")}</span>
    </button>
  );
}

function FoodCard({ food, index }) {
  return (
    <article
      className="food-card"
      data-reveal
      style={{ "--reveal-delay": `${Math.min(index % 3, 2) * 90}ms` }}
    >
      <img src={food.image} alt={food.alt} loading="lazy" />
      <div className="food-card-copy">
        <p className="food-type">{food.type}</p>
        <h3>{food.name}</h3>
        <p className="food-description">{food.description}</p>
        <div className="food-where">
          <span className="food-where-label">TRY IT AT</span>
          <p>{food.where}</p>
          <a
            className="food-map-link"
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(food.map)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${food.map} on Google Maps`}
          >
            View on map <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </article>
  );
}

function FeaturedSlideshow({ places }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
  const touchStart = useRef(null);
  const activePlace = places[activeIndex];

  useEffect(() => {
    if (isAutoplayPaused || places.length < 2) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setActiveIndex((index) => (index + 1) % places.length);
    }, 8000);

    return () => window.clearTimeout(timer);
  }, [activeIndex, isAutoplayPaused, places.length]);

  const goToSlide = (index) => {
    setActiveIndex((index + places.length) % places.length);
  };

  const handleTouchStart = (event) => {
    const touch = event.changedTouches[0];
    if (touch) touchStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (event) => {
    const touch = event.changedTouches[0];
    const start = touchStart.current;
    touchStart.current = null;
    if (!touch || !start) return;

    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;
    if (Math.abs(deltaX) < 48 || Math.abs(deltaX) < Math.abs(deltaY)) return;

    goToSlide(activeIndex + (deltaX < 0 ? 1 : -1));
  };

  return (
    <div
      className="featured-slideshow"
      data-reveal
      role="group"
      aria-roledescription="carousel"
      aria-label="Featured Cebu destinations"
    >
      <div
        className="slideshow-frame"
        id="featured-slides"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={() => { touchStart.current = null; }}
      >
        {places.map((place, index) => {
          const isActive = index === activeIndex;

          return (
            <article
              className={`slideshow-slide${isActive ? " is-active" : ""}`}
              key={place.title}
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${index + 1} of ${places.length}: ${place.title}`}
              aria-hidden={!isActive}
              inert={!isActive}
            >
              <img src={place.image} alt={place.alt} loading={index === 0 ? "eager" : "lazy"} />
            </article>
          );
        })}
        <button
          type="button"
          className="slideshow-arrow slideshow-previous"
          aria-label="Previous featured destination"
          aria-controls="featured-slides"
          onClick={() => goToSlide(activeIndex - 1)}
        >
          <span aria-hidden="true">←</span>
        </button>
        <button
          type="button"
          className="slideshow-arrow slideshow-next"
          aria-label="Next featured destination"
          aria-controls="featured-slides"
          onClick={() => goToSlide(activeIndex + 1)}
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>

      <div className="slideshow-controls">
        <p
          className="slideshow-status"
          aria-live={isAutoplayPaused ? "polite" : "off"}
          aria-atomic="true"
        >
          <span className="slideshow-current">{String(activeIndex + 1).padStart(2, "0")}</span>
          <span className="slideshow-total"> / {String(places.length).padStart(2, "0")}</span>
          <span className="slideshow-status-title">{activePlace.title}</span>
        </p>
        <div className="slideshow-pagination" role="group" aria-label="Choose a featured destination">
          {places.map((place, index) => (
            <button
              type="button"
              key={place.title}
              aria-label={`Show slide ${index + 1}: ${place.title}`}
              aria-current={index === activeIndex ? "true" : undefined}
              onClick={() => goToSlide(index)}
            >
              <span aria-hidden="true" />
            </button>
          ))}
        </div>
        <button
          type="button"
          className="slideshow-play-toggle"
          aria-label={isAutoplayPaused ? "Resume slideshow autoplay" : "Pause slideshow autoplay"}
          aria-pressed={isAutoplayPaused}
          onClick={() => setIsAutoplayPaused((paused) => !paused)}
        >
          {isAutoplayPaused ? "Play slideshow" : "Pause slideshow"}
        </button>
      </div>
    </div>
  );
}

function IntroOverlay({ onFinish }) {
  const [isExiting, setIsExiting] = useState(false);
  const hasStartedExit = useRef(false);
  const exitTimer = useRef(null);
  const dialogRef = useRef(null);

  const finishIntro = useCallback(() => {
    if (hasStartedExit.current) return;

    hasStartedExit.current = true;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      onFinish();
      return;
    }

    setIsExiting(true);
    exitTimer.current = window.setTimeout(onFinish, 550);
  }, [onFinish]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return undefined;

    dialog.showModal();
    dialog.classList.remove("is-entering");
    void dialog.offsetWidth;
    dialog.classList.add("is-entering");

    return () => {
      window.clearTimeout(exitTimer.current);
      if (dialog.open) dialog.close();
    };
  }, []);

  return (
    <dialog
      className={`intro-screen${isExiting ? " is-exiting" : ""}`}
      ref={dialogRef}
      aria-labelledby="intro-title"
      onCancel={(event) => {
        event.preventDefault();
        finishIntro();
      }}
    >
      <div className="intro-topline" aria-hidden="true">
        <span>LIPAD CEBU</span>
        <span>ISLAND STORIES · 10° 19′ N</span>
      </div>
      <div className="intro-copy">
        <p className="intro-eyebrow"><span /> A CEBU JOURNEY, YOUR WAY</p>
        <h1 className="intro-title" id="intro-title">Your Cebu story<br /><em>starts here.</em></h1>
        <p className="intro-description">Island-blue horizons, waterfall trails, storied streets, and flavors worth a detour—find your own way around Cebu.</p>
        <button className="intro-skip" type="button" onClick={finishIntro} autoFocus>
        Start exploring <span aria-hidden="true">↗</span>
        </button>
        <p className="intro-caption">A FEW PLACES TO BEGIN</p>
        <div className="intro-featured" role="list" aria-label="Featured Cebu destinations">
          {introDestinations.map((destination, index) => (
            <article
              className="intro-featured-card"
              key={destination.title}
              role="listitem"
              style={{ "--intro-delay": `${index * 110}ms` }}
            >
              <img src={destination.image} alt={destination.alt} />
              <span className="intro-featured-shade" aria-hidden="true" />
              <div className="intro-featured-copy">
                <p>{destination.category}</p>
                <h2>{destination.title}</h2>
              </div>
            </article>
          ))}
        </div>
      </div>

    </dialog>
  );
}

function DestinationDialog({ destination, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (destination && !dialog.open) {
      dialog.showModal();
    } else if (!destination && dialog.open) {
      dialog.close();
    }
  }, [destination]);

  return (
    <dialog
      className="destination-dialog"
      ref={dialogRef}
      aria-labelledby="destination-dialog-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      {destination && (
        <div className="dialog-layout">
          <div className="dialog-image-wrap">
            <img className="dialog-image" src={destination.image} alt={destination.alt} />
          </div>
          <div className="dialog-copy">
            <button type="button" className="dialog-close" onClick={onClose} aria-label="Close destination details">×</button>
            <p className="eyebrow eyebrow-dark">
              <span className="eyebrow-line" />
              {destination.category}
            </p>
            <h2 id="destination-dialog-title">{destination.title}</h2>
            <p className="dialog-location">{destination.location}</p>
            <p className="dialog-description">{destination.info}</p>
            <aside className="fun-fact">
              <span className="fun-fact-label">A FUN FACT</span>
              <p>{destination.fact}</p>
            </aside>
            <div className="dialog-actions">
              <a
                className="map-link"
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(destination.map)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                See location on Google Maps <span aria-hidden="true">↗</span>
              </a>
              <button type="button" className="dialog-dismiss" onClick={onClose}>Back to Cebu</button>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}

function Homepage() {
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [selectedExperience, setSelectedExperience] = useState("All");
  const [showIntro, setShowIntro] = useState(() => {
    try {
      return window.sessionStorage.getItem("lipad-cebu-intro-seen") !== "true";
    } catch {
      return true;
    }
  });
  const visibleDestinations = selectedExperience === "All"
    ? allDestinations
    : allDestinations.filter((destination) => destination.experiences.includes(selectedExperience));
  const finishIntro = useCallback(() => {
    try {
      window.sessionStorage.setItem("lipad-cebu-intro-seen", "true");
    } catch {
      // Keep the intro usable when browser storage is unavailable.
    }
    setShowIntro(false);
  }, []);
  const replayIntro = useCallback(() => setShowIntro(true), []);
  const selectExperience = (experience) => {
    if (experience === selectedExperience) return;

    const updateSelection = () => {
      flushSync(() => setSelectedExperience(experience));
    };

    if (
      typeof document.startViewTransition === "function" &&
      !window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      document.startViewTransition(updateSelection);
      return;
    }

    setSelectedExperience(experience);
  };

  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      return undefined;
    }

    const revealTargets = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -36px 0px" });

    revealTargets.forEach((target) => {
      if (target.classList.contains("reveal-on-scroll")) {
        observer.observe(target);
        return;
      }

      target.classList.add("reveal-on-scroll");
      observer.observe(target);
    });

    return () => {
      observer.disconnect();
    };
  }, [selectedExperience]);

  return (
    <>
      {showIntro && <IntroOverlay onFinish={finishIntro} />}
      <a className="skip-link" href="#main-content">Skip to content</a>

      <main id="main-content">
        <section className="landing-stage" aria-label="Lipad Cebu introduction">
          <div className="landing-backdrop" aria-hidden="true" />
          <div className="device-frame">
            <div className="device-screen">
              <header className="site-header hero-header">
                <nav className="hero-nav hero-nav-left" aria-label="Main navigation">
                  <a href="#destinations">Places</a>
                  <a href="#food">Food</a>
                  <a href="#about">About</a>
                </nav>
                <Brand />
                <nav className="hero-nav hero-nav-right" aria-label="Quick links">
                  <a href="#destinations">Explore Cebu <span aria-hidden="true">↗</span></a>
                  <button className="hero-replay" type="button" onClick={replayIntro}>Replay intro</button>
                </nav>
              </header>

              <section className="hero" id="home" aria-labelledby="hero-title">
                <div className="hero-content" data-reveal>
                  <p className="eyebrow"><span className="eyebrow-line" /> CEBU · CENTRAL VISAYAS</p>
                  <h1 id="hero-title"><span>ESCAPE INTO</span><em>ISLAND STORIES</em></h1>
                </div>
                <p className="hero-note">From clear-water shores to old city streets, discover the many sides of Cebu at your own pace.</p>
                <nav className="hero-bottom-nav" aria-label="Explore Cebu">
                  <a href="#destinations">Island escapes</a>
                  <a href="#destinations">Waterfalls</a>
                  <a href="#destinations">Heritage</a>
                  <a href="#food">Cebuano flavors</a>
                  <a href="#about">Our story <span aria-hidden="true">↗</span></a>
                </nav>
              </section>
            </div>
          </div>
        </section>

        <section className="featured-places section-wrap" aria-labelledby="featured-places-title">
          <div className="section-heading" data-reveal>
            <div>
              <p className="eyebrow eyebrow-dark"><span className="eyebrow-line" /> CEBU · FEATURED PLACES</p>
              <h2 id="featured-places-title">A closer look at<br /><em>island stories.</em></h2>
            </div>
          </div>
          <FeaturedSlideshow places={featuredDestinations} />
        </section>

        <section className="cebu-stories section-wrap" id="stories" aria-labelledby="cebu-stories-title">
          <div className="cebu-stories-heading" data-reveal>
            <p className="eyebrow eyebrow-dark"><span className="eyebrow-line" /> THE ISLAND · FOUR STORIES</p>
            <h2 id="cebu-stories-title">
              People, commerce, culture, experience
              <span>— the four winds of Cebu.</span>
            </h2>
          </div>

          <div className="cebu-stories-grid">
            {cebuStories.map((story, index) => (
              <article
                className="cebu-story"
                data-reveal
                key={story.number}
                style={{ "--reveal-delay": `${(index % 2) * 80}ms` }}
              >
                <div className="cebu-story-image">
                  <img src={story.image} alt={story.alt} loading="lazy" />
                </div>
                <div className="cebu-story-copy">
                  <p className="cebu-story-kicker"><span>{story.number}</span> — {story.category}</p>
                  <h3>{story.title}</h3>
                  <p className="cebu-story-description">{story.description}</p>
                  <p className="cebu-story-quote">“{story.quote}”</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="destinations section-wrap" id="destinations" aria-labelledby="destinations-title">
          <div className="section-heading" data-reveal>
            <div>
              <p className="eyebrow eyebrow-dark"><span className="eyebrow-line" /> CEBU · TOURIST SPOTS</p>
              <h2 id="destinations-title">Find your kind of<br /><em>island story.</em></h2>
            </div>
            <p className="section-intro">Browse beaches and islands, waterfalls, mountain views, adventures, and heritage landmarks. Each card includes a specific location and what it’s best for.</p>
          </div>

          <div className="destination-explorer">
            <div className="experience-filters" role="group" aria-label="Filter destinations by experience">
              {experienceFilters.map(({ value, label }) => {
                const count = value === "All"
                  ? allDestinations.length
                  : allDestinations.filter((destination) => destination.experiences.includes(value)).length;

                return (
                  <button
                    key={value}
                    type="button"
                    className="experience-filter"
                    aria-pressed={selectedExperience === value}
                    onClick={() => selectExperience(value)}
                  >
                    {label}<span aria-hidden="true">{count}</span>
                  </button>
                );
              })}
            </div>
            <div className="destination-summary">
              <p className="destination-count" aria-live="polite">
                Showing {visibleDestinations.length} of {allDestinations.length} places
              </p>
              <p className="filter-note">Category counts can overlap; a place may appear in more than one category.</p>
            </div>
          </div>

          <div className="destination-grid">
            {visibleDestinations.map((destination, index) => (
              <DestinationCard
                key={destination.title}
                destination={destination}
                index={index}
                onSelect={setSelectedDestination}
              />
            ))}
          </div>
        </section>

        <section className="food-section section-wrap" id="food" aria-labelledby="food-title">
          <div className="section-heading" data-reveal>
            <div>
              <p className="eyebrow eyebrow-dark"><span className="eyebrow-line" /> CEBU · LOCAL FAVORITES</p>
              <h2 id="food-title">Must-Try Cebuano<br /><em>Food.</em></h2>
            </div>
            <p className="section-intro">From smoky lechon to sweet otap, taste the island one delicious stop at a time.</p>
          </div>
          <div className="food-grid">
            {foods.map((food, index) => (
              <FoodCard key={food.name} food={food} index={index} />
            ))}
          </div>
          <aside className="food-crawl">
            <div>
              <p className="food-crawl-label">A SIMPLE CITY FOOD CRAWL</p>
              <p>Try ngohiong on Junquera Street, share tuslob buwa at The Barracks in Carbon, then pick up otap at Shamrock.</p>
            </div>
            <a
              className="food-crawl-link"
              href="https://www.google.com/maps/dir/?api=1&origin=Cebu+Ngohiong%2C+Junquera+Street%2C+Cebu+City&destination=Shamrock+Pasalubong+Center%2C+Cebu+City&waypoints=The+Barracks%2C+Carbon+Market%2C+Cebu+City"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open crawl in Google Maps <span aria-hidden="true">↗</span>
            </a>
          </aside>
        </section>

        <section className="about" id="about" aria-labelledby="about-title">
          <div className="about-image" role="img" aria-label="Magellan's Cross, one of Cebu City's historic landmarks" />
          <div className="about-copy" data-reveal>
            <p className="eyebrow"><span className="eyebrow-line" /> ONE ISLAND, MANY STORIES</p>
            <h2 id="about-title">Come for the views.<br /><em>Stay for the feeling.</em></h2>
            <p>Cebu brings together island adventures, welcoming communities, and a history that lives on in every street and shoreline. Take it slow, look around, and let the island surprise you.</p>
            <a className="text-link" href="#destinations">Find your next stop <span aria-hidden="true">↗</span></a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <Brand footer />
        <p className="footer-copy">Made for curious hearts. <span>© {new Date().getFullYear()} Lipad Cebu</span></p>
        <p className="footer-credit">Created by <strong>IVM.Tools</strong></p>
        <a href="#home" className="back-top">BACK TO TOP ↑</a>
        <details className="image-credits">
          <summary>Photo credits &amp; licenses</summary>
          <ul>
            {imageCredits.map((credit) => (
              <li key={credit.name}>
                <a href={credit.imageUrl} target="_blank" rel="noopener noreferrer">{credit.name}</a>
                {" — "}{credit.author},{" "}
                <a href={credit.licenseUrl} target="_blank" rel="noopener noreferrer">{credit.license}</a>
              </li>
            ))}
          </ul>
        </details>
      </footer>

      <DestinationDialog
        destination={selectedDestination}
        onClose={() => setSelectedDestination(null)}
      />
    </>
  );
}

createRoot(document.getElementById("react-root")).render(<Homepage />);
