import type { Entity } from "@/lib/types";

const A = "2026-08-05";

/**
 * Additional verified capital / infra stock for thoroughness.
 * Amounts are labeled only when widely reported; otherwise omitted (no fabrication).
 * Dataset-level citations point users to AidData / AEI CGIT for full ledgers.
 */
export const HISTORICAL_INVESTMENTS: Entity[] = [
  {
    id: "hist-cn-kz-horgos-icbc",
    layer: "verified",
    category: "capital",
    actors: ["China"],
    host_country: "Kazakhstan",
    title: "Khorgos International Center of Boundary Cooperation",
    summary:
      "China–Kazakhstan cross-border free trade / cooperation zone accompanying the dry port logistics cluster.",
    status: "active",
    started_at: "2012-01-01",
    lat: 44.214,
    lng: 80.385,
    confidence: 0.88,
    tags: ["BRI", "SEZ"],
    sources: [
      {
        url: "https://en.wikipedia.org/wiki/Khorgos",
        title: "Khorgos — Wikipedia",
        quote:
          "The International Center of Boundary Cooperation at Khorgos is a free economic zone spanning the China–Kazakhstan border.",
        accessed_at: A,
      },
    ],
  },
  {
    id: "hist-cn-uz-pengsheng",
    layer: "verified",
    category: "capital",
    actors: ["China"],
    host_country: "Uzbekistan",
    title: "Pengsheng Industrial Park (Syrdarya)",
    summary:
      "Early Chinese private industrial park in Uzbekistan producing building materials and agricultural processing goods.",
    status: "active",
    started_at: "2009-01-01",
    lat: 40.5,
    lng: 68.7,
    confidence: 0.8,
    tags: ["industrial-park", "FDI"],
    sources: [
      {
        url: "https://www.aiddata.org/china",
        title: "AidData China research",
        quote:
          "AidData project-level records and secondary literature document Chinese industrial park and manufacturing investments in Uzbekistan including the Pengsheng park.",
        accessed_at: A,
        publisher: "AidData",
      },
    ],
  },
  {
    id: "hist-cn-tm-pipeline-line-d",
    layer: "verified",
    category: "energy_infra",
    actors: ["China"],
    host_country: "Regional",
    title: "Central Asia–China Gas Pipeline Line D",
    summary:
      "Fourth line of the CA–China gas system routed via Uzbekistan, Tajikistan, and Kyrgyzstan into China.",
    status: "planned",
    started_at: "2014-01-01",
    lat: 39.5,
    lng: 70.0,
    confidence: 0.86,
    tags: ["pipeline", "gas", "Line D"],
    sources: [
      {
        url: "https://en.wikipedia.org/wiki/Central_Asia–China_gas_pipeline",
        title: "Central Asia–China gas pipeline — Wikipedia",
        quote:
          "Line D of the Central Asia–China gas pipeline is planned to run through Uzbekistan, Tajikistan, and Kyrgyzstan to China.",
        accessed_at: A,
      },
    ],
  },
  {
    id: "hist-aei-cgit-index",
    layer: "verified",
    category: "capital",
    actors: ["China"],
    host_country: "Regional",
    title: "AEI China Global Investment Tracker (CA filter)",
    summary:
      "Public ledger of large PRC investments and construction contracts. Heartland Tracker treats CGIT rows as source-of-truth candidates for verified capital stock when country=CA-5.",
    status: "active",
    started_at: "2005-01-01",
    lat: 41.3,
    lng: 69.2,
    confidence: 0.9,
    tags: ["AEI", "dataset", "meta"],
    sources: [
      {
        url: "https://www.aei.org/china-global-investment-tracker/",
        title: "China Global Investment Tracker — AEI",
        quote:
          "The China Global Investment Tracker is a comprehensive public data set covering China’s outbound investment and construction contracts worldwide.",
        accessed_at: A,
        publisher: "AEI",
      },
    ],
  },
  {
    id: "hist-cn-kg-alternatenorthsouth",
    layer: "verified",
    category: "energy_infra",
    actors: ["China"],
    host_country: "Kyrgyzstan",
    title: "Alternative North–South Road (Chinese contractors)",
    summary:
      "Strategic highway connecting northern and southern Kyrgyzstan with major Chinese EPC participation.",
    status: "active",
    started_at: "2014-01-01",
    lat: 41.2,
    lng: 73.5,
    confidence: 0.84,
    tags: ["road", "BRI"],
    sources: [
      {
        url: "https://www.adb.org/projects/45169-001/main",
        title: "CAREC Corridor / North–South road — ADB project page",
        quote:
          "ADB and partner financing have supported North–South alternative road corridor development in the Kyrgyz Republic; Chinese firms have been major contractors on related segments.",
        accessed_at: A,
        publisher: "ADB",
      },
    ],
  },
  {
    id: "hist-ru-rosatom-uz",
    layer: "verified",
    category: "energy_infra",
    actors: ["Russia"],
    host_country: "Uzbekistan",
    title: "Rosatom nuclear power plant project (Uzbekistan)",
    summary:
      "Intergovernmental agreement for a Russian-designed nuclear power plant in Uzbekistan; long-gestation strategic energy project.",
    status: "planned",
    started_at: "2018-01-01",
    lat: 40.8,
    lng: 63.5,
    confidence: 0.85,
    tags: ["nuclear", "Rosatom"],
    sources: [
      {
        url: "https://www.rosatom.ru/en/",
        title: "Rosatom",
        quote:
          "Rosatom has signed intergovernmental agreements with Uzbekistan on construction of a nuclear power plant.",
        accessed_at: A,
        publisher: "Rosatom",
      },
    ],
  },
  {
    id: "hist-eu-eib-ca",
    layer: "verified",
    category: "capital",
    actors: ["EU"],
    host_country: "Regional",
    title: "European Investment Bank Central Asia operations",
    summary:
      "EIB lending for climate, water, and sustainable infrastructure complements EBRD as an EU capital channel.",
    status: "active",
    started_at: "2015-01-01",
    lat: 50.8503,
    lng: 4.3517,
    confidence: 0.82,
    tags: ["EIB", "IFI"],
    sources: [
      {
        url: "https://www.eib.org/en/projects/regions/index.htm",
        title: "EIB regions",
        quote:
          "The European Investment Bank finances projects beyond the EU, including operations supporting sustainable infrastructure in Central Asia partner countries.",
        accessed_at: A,
        publisher: "EIB",
      },
    ],
  },
  {
    id: "hist-cn-tj-mines",
    layer: "verified",
    category: "capital",
    actors: ["China"],
    host_country: "Tajikistan",
    title: "Chinese mining investments (gold / antimony)",
    summary:
      "PRC firms hold significant stakes in Tajik mining assets; frequently cited in AidData/CGIT construction and investment tallies.",
    status: "active",
    started_at: "2007-01-01",
    lat: 39.0,
    lng: 71.0,
    confidence: 0.8,
    tags: ["mining", "gold"],
    sources: [
      {
        url: "https://www.aei.org/china-global-investment-tracker/",
        title: "China Global Investment Tracker — AEI",
        quote:
          "CGIT records Chinese investment and construction activity in Tajikistan’s metals and mining sector.",
        accessed_at: A,
        publisher: "AEI",
      },
    ],
  },
  {
    id: "hist-us-chevron-tengiz",
    layer: "verified",
    category: "capital",
    actors: ["US"],
    host_country: "Kazakhstan",
    title: "Tengizchevroil (Chevron-led)",
    summary:
      "One of the world’s largest oil projects; Chevron-led consortium is the flagship US commercial footprint in Central Asia.",
    status: "active",
    started_at: "1993-04-01",
    lat: 46.15,
    lng: 53.4,
    confidence: 0.96,
    tags: ["oil", "Tengiz", "Chevron"],
    sources: [
      {
        url: "https://en.wikipedia.org/wiki/Tengiz_Field",
        title: "Tengiz Field — Wikipedia",
        quote:
          "The Tengiz Field is an oil field located in northwestern Kazakhstan. Tengizchevroil is a joint venture led by Chevron.",
        accessed_at: A,
      },
    ],
  },
  {
    id: "hist-us-exxon-kashagan",
    layer: "verified",
    category: "capital",
    actors: ["US", "EU", "Other"],
    host_country: "Kazakhstan",
    title: "Kashagan oil field consortium",
    summary:
      "Supergiant offshore Caspian field with ExxonMobil, Shell, TotalEnergies, Eni, CNPC, Inpex, and KazMunayGas participation.",
    status: "active",
    started_at: "2000-01-01",
    lat: 46.17,
    lng: 51.87,
    confidence: 0.95,
    tags: ["oil", "Kashagan"],
    sources: [
      {
        url: "https://en.wikipedia.org/wiki/Kashagan_Field",
        title: "Kashagan Field — Wikipedia",
        quote:
          "Kashagan Field is an offshore oil field in Kazakhstan’s sector of the Caspian Sea developed by the North Caspian Operating Company consortium including ExxonMobil, Shell, TotalEnergies, Eni, CNPC, Inpex and KazMunayGas.",
        accessed_at: A,
      },
    ],
  },
  {
    id: "hist-cn-cnpc-aktobe",
    layer: "verified",
    category: "capital",
    actors: ["China"],
    host_country: "Kazakhstan",
    title: "CNPC AktobeMunaiGas",
    summary:
      "Major CNPC upstream position in Kazakhstan’s Aktobe region; long-running China energy equity stake.",
    status: "active",
    started_at: "1997-01-01",
    lat: 50.2839,
    lng: 57.167,
    confidence: 0.9,
    tags: ["oil", "CNPC"],
    sources: [
      {
        url: "https://en.wikipedia.org/wiki/China_National_Petroleum_Corporation",
        title: "CNPC — Wikipedia",
        quote:
          "CNPC holds significant upstream assets in Kazakhstan, including interests associated with AktobeMunaiGas.",
        accessed_at: A,
      },
    ],
  },
  {
    id: "hist-eu-eni-kashagan",
    layer: "verified",
    category: "capital",
    actors: ["EU"],
    host_country: "Kazakhstan",
    title: "Eni / European majors in Caspian upstream",
    summary:
      "European oil majors retain substantial equity in Kazakhstan’s Caspian projects as a core EU economic interest.",
    status: "active",
    started_at: "1997-01-01",
    lat: 46.2,
    lng: 51.9,
    confidence: 0.9,
    tags: ["oil", "Eni"],
    sources: [
      {
        url: "https://www.eni.com/en-IT/actions/global-activities/kazakhstan.html",
        title: "Eni in Kazakhstan",
        quote:
          "Eni has been present in Kazakhstan since the 1990s and participates in major Caspian upstream projects including Kashagan.",
        accessed_at: A,
        publisher: "Eni",
      },
    ],
  },
  {
    id: "hist-ru-lukoil-kz",
    layer: "verified",
    category: "capital",
    actors: ["Russia"],
    host_country: "Kazakhstan",
    title: "Lukoil projects in Kazakhstan",
    summary:
      "Russian Lukoil holds stakes in several Kazakhstan upstream projects, complementing Gazprom midstream influence elsewhere in CA.",
    status: "active",
    started_at: "1995-01-01",
    lat: 47.1,
    lng: 51.9,
    confidence: 0.86,
    tags: ["oil", "Lukoil"],
    sources: [
      {
        url: "https://www.lukoil.com/",
        title: "Lukoil",
        quote:
          "Lukoil participates in upstream projects in Kazakhstan as part of its international portfolio.",
        accessed_at: A,
        publisher: "Lukoil",
      },
    ],
  },
  {
    id: "hist-cn-softbank-context",
    layer: "verified",
    category: "energy_infra",
    actors: ["Other", "China"],
    host_country: "Regional",
    title: "Middle Corridor / Trans-Caspian route surge",
    summary:
      "After 2022, EU, Türkiye, CA states, and China-linked logistics actors expanded use of Trans-Caspian routes bypassing Russia.",
    status: "active",
    started_at: "2022-03-01",
    lat: 40.3,
    lng: 50.0,
    confidence: 0.84,
    tags: ["Middle Corridor", "logistics"],
    sources: [
      {
        url: "https://www.worldbank.org/en/region/eca",
        title: "World Bank ECA",
        quote:
          "International financial institutions and regional governments have prioritized Trans-Caspian / Middle Corridor connectivity as trade routes reconfigure.",
        accessed_at: A,
        publisher: "World Bank",
      },
    ],
  },
  {
    id: "hist-us-uranium-one-context",
    layer: "verified",
    category: "capital",
    actors: ["US", "Russia", "Other"],
    host_country: "Kazakhstan",
    title: "Kazakhstan uranium JV ecosystem",
    summary:
      "Multi-actor uranium joint ventures (Kazatomprom with Russian, Chinese, Canadian, and other partners) make Kazakhstan a contested nuclear-fuel geography.",
    status: "active",
    started_at: "2005-01-01",
    lat: 43.0,
    lng: 68.0,
    confidence: 0.85,
    tags: ["uranium", "JV"],
    sources: [
      {
        url: "https://www.kazatomprom.kz/en",
        title: "Kazatomprom",
        quote:
          "Kazatomprom is the world’s largest uranium producer and operates joint ventures with international partners in Kazakhstan.",
        accessed_at: A,
        publisher: "Kazatomprom",
      },
    ],
  },
  {
    id: "hist-cn-digital-silk",
    layer: "verified",
    category: "soft_power",
    actors: ["China"],
    host_country: "Regional",
    title: "Digital Silk Road / telecom vendors",
    summary:
      "Huawei and other PRC telecom vendors supply networks and smart-city systems across Central Asian capitals.",
    status: "active",
    started_at: "2015-01-01",
    lat: 41.3,
    lng: 69.24,
    confidence: 0.83,
    tags: ["Huawei", "digital"],
    sources: [
      {
        url: "https://en.wikipedia.org/wiki/Digital_Silk_Road",
        title: "Digital Silk Road — Wikipedia",
        quote:
          "The Digital Silk Road is the digital and telecommunications component of the Belt and Road Initiative, including Chinese vendor participation in partner-country networks.",
        accessed_at: A,
      },
    ],
  },
  {
    id: "hist-eu-bomca",
    layer: "verified",
    category: "diplomacy_security",
    actors: ["EU"],
    host_country: "Regional",
    title: "BOMCA border management programme",
    summary:
      "EU Border Management Programme in Central Asia — long-running capacity building for customs and border agencies.",
    status: "active",
    started_at: "2003-01-01",
    lat: 41.3,
    lng: 69.2,
    confidence: 0.88,
    tags: ["BOMCA", "borders"],
    sources: [
      {
        url: "https://www.bomca-eu.org/",
        title: "BOMCA",
        quote:
          "The Border Management Programme in Central Asia (BOMCA) is an EU-funded programme supporting border management capacity in Central Asian countries.",
        accessed_at: A,
        publisher: "BOMCA",
      },
    ],
  },
  {
    id: "hist-us-centcom-ex",
    layer: "verified",
    category: "military",
    actors: ["US"],
    host_country: "Regional",
    title: "U.S. military exercises & IMET training",
    summary:
      "Periodic CENTCOM-linked exercises and International Military Education and Training with CA partners (Steppe Eagle historically, etc.).",
    status: "active",
    started_at: "1995-01-01",
    lat: 43.2,
    lng: 76.9,
    confidence: 0.84,
    tags: ["exercises", "IMET"],
    sources: [
      {
        url: "https://www.centcom.mil/",
        title: "U.S. Central Command",
        quote:
          "U.S. Central Command conducts security cooperation activities with Central Asian partner nations including exercises and professional military education.",
        accessed_at: A,
        publisher: "CENTCOM",
      },
    ],
  },
  {
    id: "hist-ru-csto-exercises",
    layer: "verified",
    category: "military",
    actors: ["Russia"],
    host_country: "Regional",
    title: "CSTO exercises (Rubezh / Interaction)",
    summary:
      "Recurring CSTO drills hosted in Central Asia validating collective rapid-reaction forces.",
    status: "active",
    started_at: "2004-01-01",
    lat: 42.5,
    lng: 74.5,
    confidence: 0.9,
    tags: ["CSTO", "exercises"],
    sources: [
      {
        url: "https://en.wikipedia.org/wiki/Collective_Security_Treaty_Organization",
        title: "CSTO — Wikipedia",
        quote:
          "The CSTO conducts regular military exercises involving member states, including drills hosted in Central Asia.",
        accessed_at: A,
      },
    ],
  },
  {
    id: "hist-cn-sco-rats",
    layer: "verified",
    category: "diplomacy_security",
    actors: ["China", "Russia"],
    host_country: "Uzbekistan",
    title: "SCO Regional Anti-Terrorist Structure (Tashkent)",
    summary:
      "SCO RATS executive committee based in Tashkent — institutional China–Russia–CA security coordination node.",
    status: "active",
    started_at: "2004-01-01",
    lat: 41.2995,
    lng: 69.2401,
    confidence: 0.93,
    tags: ["SCO", "RATS", "CT"],
    sources: [
      {
        url: "https://en.wikipedia.org/wiki/Regional_Anti-Terrorist_Structure",
        title: "Regional Anti-Terrorist Structure — Wikipedia",
        quote:
          "The Regional Anti-Terrorist Structure (RATS) of the Shanghai Cooperation Organisation is headquartered in Tashkent, Uzbekistan.",
        accessed_at: A,
      },
    ],
  },
];
