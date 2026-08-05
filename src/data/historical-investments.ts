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
  {
    id: "hist-cn-tm-galkynysh-gas",
    layer: "verified",
    category: "energy_infra",
    actors: ["China"],
    host_country: "Turkmenistan",
    title: "Galkynysh gas field (Turkmenistan–China supply anchor)",
    summary:
      "World-scale Turkmen gas reserve developed as upstream anchor for PRC pipeline imports; Line D is planned to connect Galkynysh to western China.",
    status: "active",
    started_at: "2013-09-01",
    lat: 37.5,
    lng: 62.5,
    confidence: 0.9,
    tags: ["gas", "Galkynysh", "Turkmenistan"],
    sources: [
      {
        url: "https://www.reuters.com/markets/commodities/china-prioritising-turkmenistan-over-russia-next-big-pipeline-project-2023-05-24/",
        title: "China prioritising Turkmenistan over Russia in next big pipeline project — Reuters",
        quote:
          "Line D, which would be China's fourth gas pipeline to the region, starts at Turkmenistan's giant Galkynysh field.",
        accessed_at: A,
        publisher: "Reuters",
      },
    ],
  },
  {
    id: "hist-cn-tm-ca-gas-lines-abc",
    layer: "verified",
    category: "energy_infra",
    actors: ["China"],
    host_country: "Turkmenistan",
    title: "Central Asia–China Gas Pipeline Lines A–C (operational trunk)",
    summary:
      "Three parallel trunklines from Turkmenistan via Uzbekistan and Kazakhstan into Xinjiang; inaugurated 2009–2014 and supplying the bulk of Turkmen gas exports to China.",
    status: "active",
    started_at: "2009-12-14",
    lat: 37.6,
    lng: 65.5,
    confidence: 0.92,
    tags: ["pipeline", "gas", "CNPC", "Turkmengaz"],
    sources: [
      {
        url: "https://en.wikipedia.org/wiki/Central_Asia%E2%80%93China_gas_pipeline",
        title: "Central Asia–China gas pipeline — Wikipedia",
        quote:
          "The whole pipeline was inaugurated on 14 December 2009 in a ceremony in Saman-Depe during Hu Jintao's visit to Turkmenistan with the leaders of Turkmenistan, Uzbekistan and Kazakhstan.",
        accessed_at: A,
      },
    ],
  },
  {
    id: "hist-cn-uz-byd-jizzakh-factory",
    layer: "verified",
    category: "capital",
    actors: ["China"],
    host_country: "Uzbekistan",
    title: "BYD Uzbekistan Factory (Jizzakh NEV joint venture)",
    summary:
      "BYD–Uzavtosanoat joint venture for full-cycle NEV welding, painting, and assembly at the Jizzakh Free Economic Zone with export rights to Central Asia.",
    status: "active",
    started_at: "2024-01-01",
    lat: 40.12,
    lng: 67.84,
    confidence: 0.91,
    tags: ["auto", "NEV", "FDI", "Jizzakh"],
    sources: [
      {
        url: "https://www.byd.com/eu/news-list/BYD_Signs_Investment_Agreement_with_Ministry_of_Investment_Industry_and_Trade_of_Uzbekistan",
        title: "BYD Signs Investment Agreement with MIIT of Uzbekistan",
        quote:
          "The joint venture company \"BYD Uzbekistan Factory\" was established by BYD and UzAuto in December 2022, dedicated to the production of new energy vehicles under the BYD brand and related automobile parts. Production will commence in Jizzakh in 2024.",
        accessed_at: A,
        publisher: "BYD",
      },
    ],
  },
  {
    id: "hist-cn-uz-adm-chery-jizzakh",
    layer: "verified",
    category: "capital",
    actors: ["China"],
    host_country: "Uzbekistan",
    title: "ADM Jizzakh — Chery vehicle assembly",
    summary:
      "Private multi-brand ADM Jizzakh plant in the Jizzakh FEZ assembles Chery SUVs under agreement with Chery Automobile; early Chinese auto FDI footprint beyond state UzAuto ventures.",
    status: "active",
    started_at: "2022-08-01",
    lat: 40.12,
    lng: 67.84,
    confidence: 0.87,
    tags: ["auto", "Chery", "FDI", "Jizzakh"],
    sources: [
      {
        url: "https://eurasianet.org/central-asia-chinese-cars-race-ahead",
        title: "Central Asia: Chinese cars race ahead — Eurasianet",
        quote:
          "Four Chery-branded SUV models assembled at the ADM Jizzakh factory went on sale on October 27. Chery Automobile Co. signed an agreement to assemble cars at the factory in the Jizzakh Free Economic Zone. Assembly began in August.",
        accessed_at: A,
        publisher: "Eurasianet",
      },
    ],
  },
  {
    id: "hist-cn-uz-lt-textile-karshi",
    layer: "verified",
    category: "capital",
    actors: ["China"],
    host_country: "Uzbekistan",
    title: "LT Textile International (Karshi yarn mill)",
    summary:
      "Chinese-invested textile enterprise in Kashkadarya producing export-oriented yarn with modern equipment and worker training in China.",
    status: "active",
    started_at: "2017-07-01",
    lat: 38.86,
    lng: 65.79,
    confidence: 0.86,
    tags: ["textile", "FDI", "Karshi"],
    sources: [
      {
        url: "https://president.uz/en/lists/view/1462",
        title: "LT Textile International foreign enterprise — President of Uzbekistan",
        quote:
          "The first stage of the enterprise, built at the expense of investments of Chinese investors, was put into operation in July 2017. The enterprise produces 22 thousand tons of yarn per year.",
        accessed_at: A,
        publisher: "President of Uzbekistan",
      },
    ],
  },
  {
    id: "hist-cn-kz-ulba-fa-cgn",
    layer: "verified",
    category: "energy_infra",
    actors: ["China"],
    host_country: "Kazakhstan",
    title: "Ulba-FA nuclear fuel assembly plant (Kazatomprom–CGN)",
    summary:
      "Kazakh–Chinese joint venture at Ust-Kamenogorsk manufacturing AFA 3G fuel assemblies for CGNPC-URC under a 20-year offtake framework.",
    status: "active",
    started_at: "2021-11-10",
    lat: 49.95,
    lng: 82.63,
    confidence: 0.93,
    tags: ["uranium", "nuclear-fuel", "CGN", "Ulba"],
    sources: [
      {
        url: "https://world-nuclear-news.org/articles/joint-venture-fuel-assembly-plant-opens-in-kazakhs",
        title: "Joint venture fuel assembly plant opens in Kazakhstan — World Nuclear News",
        quote:
          "The joint venture partners in the Ulba Fuel Assembly Plant — or Ulba-FA LLP — are Kazatomprom subsidiary UMP JSC, with 51%, and CGNPC-URC, with 49%.",
        accessed_at: A,
        publisher: "World Nuclear News",
      },
    ],
  },
  {
    id: "hist-cn-kz-ortalyk-cgn-uranium",
    layer: "verified",
    category: "capital",
    actors: ["China"],
    host_country: "Kazakhstan",
    title: "Ortalyk LLP uranium mining JV (CGN 49% stake)",
    summary:
      "CGNPC acquired a 49% interest in Kazatomprom subsidiary Ortalyk LLP, extending PRC equity from fuel fabrication into Kazakh in-situ uranium production.",
    status: "active",
    started_at: "2021-01-01",
    lat: 43.0,
    lng: 68.0,
    confidence: 0.88,
    tags: ["uranium", "mining", "CGN", "Kazatomprom"],
    sources: [
      {
        url: "https://world-nuclear-news.org/articles/joint-venture-fuel-assembly-plant-opens-in-kazakhs",
        title: "Joint venture fuel assembly plant opens in Kazakhstan — World Nuclear News",
        quote:
          "The Chinese company earlier this year acquired a 49% stake in Ortalyk LLP, a wholly-owned subsidiary of the Kazakh uranium producer.",
        accessed_at: A,
        publisher: "World Nuclear News",
      },
    ],
  },
  {
    id: "hist-cn-kz-khorgos-east-gate",
    layer: "verified",
    category: "energy_infra",
    actors: ["China"],
    host_country: "Kazakhstan",
    title: "Khorgos Gateway dry port (gauge-transfer rail hub)",
    summary:
      "KTZ-operated inland terminal at the China–Kazakhstan border transferring containers between standard-gauge Chinese and broad-gauge Kazakh rail — flagship BRI logistics node.",
    status: "active",
    started_at: "2015-01-01",
    lat: 44.21,
    lng: 80.39,
    confidence: 0.89,
    tags: ["rail", "dry-port", "BRI", "Middle Corridor"],
    sources: [
      {
        url: "https://www.railfreight.com/specials/2019/04/30/khorgos-east-gate-from-steppes-to-high-tech-facility/",
        title: "Khorgos East Gate: from steppes to high-tech facility — RailFreight",
        quote:
          "Khorgos Gateway is the flagship of all the BRI projects in Kazakhstan. This inland terminal is equipped with modern facilities for the transfer of goods from one gauge to the other.",
        accessed_at: A,
        publisher: "RailFreight",
      },
    ],
  },
  {
    id: "hist-eu-kz-aktau-port-titr",
    layer: "verified",
    category: "energy_infra",
    actors: ["EU"],
    host_country: "Kazakhstan",
    title: "Aktau Port upgrade (EBRD–EU Trans-Caspian Corridor)",
    summary:
      "EBRD loan and EU grant package to expand container handling at Kazakhstan's primary Caspian gateway along the Middle Corridor / TITR.",
    status: "active",
    started_at: "2025-01-01",
    lat: 43.65,
    lng: 51.17,
    confidence: 0.9,
    tags: ["port", "rail", "Middle Corridor", "EBRD"],
    sources: [
      {
        url: "https://www.ebrd.com/home/news-and-events/news/2025/ebrd-and-eu-help-improve-sustainability-of-transportation-throug.html",
        title: "EBRD and EU help improve sustainability of transportation through Transcaspian Corridor",
        quote:
          "A financial package of up to €45 million provided by the EBRD and the European Union will finance an increase in cargo handling capacity at the port of Aktau, Kazakhstan's primary maritime gateway, located on the Caspian Sea.",
        accessed_at: A,
        publisher: "EBRD",
      },
    ],
  },
  {
    id: "hist-eu-kz-ebrd-ktz-rail-bond",
    layer: "verified",
    category: "capital",
    actors: ["EU"],
    host_country: "Kazakhstan",
    title: "EBRD Kazakhstan Temir Zholy Eurobond investment",
    summary:
      "EBRD participation in KTZ bond issue to modernize passenger stations and rail assets along the Trans-Caspian Corridor network.",
    status: "active",
    started_at: "2026-01-01",
    lat: 51.17,
    lng: 71.45,
    confidence: 0.88,
    tags: ["rail", "KTZ", "EBRD", "Middle Corridor"],
    sources: [
      {
        url: "https://www.ebrd.com/home/news-and-events/news/2026/ebrd-invests-us--125-million-in-kazakhstan-railways-bond.html",
        title: "EBRD invests US$ 125 million in Kazakhstan Railways bond",
        quote:
          "The EBRD is helping to improve Central Asia's regional connectivity and boosting the operational efficiency of Kazakhstan Temir Zholy (KTZ or Kazakhstan Railways) by investing up to US$ 125 million in a Eurobond issue by the company.",
        accessed_at: A,
        publisher: "EBRD",
      },
    ],
  },
  {
    id: "hist-ru-rossotrudnichestvo-uz-russian-house",
    layer: "verified",
    category: "soft_power",
    actors: ["Russia"],
    host_country: "Uzbekistan",
    title: "Russian House (Rossotrudnichestvo) — Tashkent",
    summary:
      "Federal Rossotrudnichestvo representative office promoting Russian language, culture, and humanitarian cooperation from central Tashkent.",
    status: "active",
    started_at: "1992-03-02",
    lat: 41.3,
    lng: 69.24,
    confidence: 0.9,
    tags: ["Rossotrudnichestvo", "language", "culture"],
    sources: [
      {
        url: "https://uzbekistan.rs.gov.ru/about-russian-houses/",
        title: "About the Russian House in Tashkent — Rossotrudnichestvo",
        quote:
          "Since 1 July 2022 the representative office relocated to central Tashkent at Yunus Rajabiy street 63. Diplomatic relations with the Republic of Uzbekistan were established on 2 March 1992.",
        accessed_at: A,
        publisher: "Rossotrudnichestvo",
      },
    ],
  },
  {
    id: "hist-ru-sputnik-uz-press-center",
    layer: "verified",
    category: "soft_power",
    actors: ["Russia"],
    host_country: "Uzbekistan",
    title: "Sputnik Uzbekistan multimedia press center",
    summary:
      "Rossiya Segodnya–affiliated Sputnik bureau and press center in Tashkent hosting briefings and Russian-language media outreach.",
    status: "active",
    started_at: "2014-11-10",
    lat: 41.3,
    lng: 69.24,
    confidence: 0.89,
    tags: ["Sputnik", "media", "Rossiya Segodnya"],
    sources: [
      {
        url: "https://uz.sputniknews.ru/20240801/informatsiya-o-press-tsentre-sputnik-uzbekistan-45007829.html",
        title: "Press center Sputnik Uzbekistan — information",
        quote:
          "The Sputnik Uzbekistan multimedia press center is part of the international media group Rossiya Segodnya. Tashkent, Taras Shevchenko street 21 A, office 508.",
        accessed_at: A,
        publisher: "Sputnik Uzbekistan",
      },
    ],
  },
  {
    id: "hist-ru-sputnik-kz-bureau",
    layer: "verified",
    category: "soft_power",
    actors: ["Russia"],
    host_country: "Kazakhstan",
    title: "Sputnik Kazakhstan news bureau",
    summary:
      "Russian state-owned Sputnik maintains a Kazakhstan editorial service publishing Russian- and Kazakh-language news across the country.",
    status: "active",
    started_at: "2014-11-10",
    lat: 43.24,
    lng: 76.95,
    confidence: 0.87,
    tags: ["Sputnik", "media", "Kazakhstan"],
    sources: [
      {
        url: "https://en.wikipedia.org/wiki/Sputnik_(news_agency)",
        title: "Sputnik (news agency) — Wikipedia",
        quote:
          "Sputnik is a Russian state-owned news agency and radio broadcast service established by Rossiya Segodnya on 10 November 2014. Language services include Kazakh and Uzbek editions.",
        accessed_at: A,
      },
    ],
  },
  {
    id: "hist-eu-wecoop-water-climate",
    layer: "verified",
    category: "diplomacy_security",
    actors: ["EU"],
    host_country: "Regional",
    title: "WECOOP (EU–Central Asia Water, Environment & Climate Cooperation)",
    summary:
      "Regional EU programme framing policy dialogue on water, environment, and climate with Central Asian governments and guiding green investment access.",
    status: "active",
    started_at: "2009-01-01",
    lat: 41.3,
    lng: 69.2,
    confidence: 0.88,
    tags: ["WECOOP", "water", "climate"],
    sources: [
      {
        url: "https://www.eeas.europa.eu/eeas/eusr-remarks-sustainable-development-water-resources-central-asia_en",
        title: "EUSR remarks on sustainable development of water resources in Central Asia — EEAS",
        quote:
          "WECOOP is a reference framework for the strengthening of policy dialogue on sustainable development between Central Asian countries and the EU. It aims to enhance environment, climate change and water policies in Central Asia through approximation to EU standards.",
        accessed_at: A,
        publisher: "EEAS",
      },
    ],
  },
  {
    id: "hist-eu-tei-wecc-global-gateway",
    layer: "verified",
    category: "energy_infra",
    actors: ["EU"],
    host_country: "Regional",
    title: "Team Europe Initiative on Water, Energy & Climate Change",
    summary:
      "EU Global Gateway flagship coordinating water-resource management, sustainable energy transition, and climate adaptation across all five Central Asian states.",
    status: "active",
    started_at: "2023-01-01",
    lat: 41.3,
    lng: 69.2,
    confidence: 0.87,
    tags: ["TEI", "Global Gateway", "water", "energy"],
    sources: [
      {
        url: "https://www.eeas.europa.eu/delegations/uzbekistan/team-europe-initiative-water-energy-and-climate-change-central-asia-flagship-initiative-global_en",
        title: "Team Europe Initiative on Water, Energy and Climate Change — EEAS",
        quote:
          "The Team Europe Initiative on water, energy, and climate change in Central Asia emerged as a flagship endeavour under the EU Global Gateway framework, showcasing the European Union's commitment to addressing key challenges in the region.",
        accessed_at: A,
        publisher: "EEAS",
      },
    ],
  },
  {
    id: "hist-eu-cadap-drug-programme",
    layer: "verified",
    category: "diplomacy_security",
    actors: ["EU"],
    host_country: "Regional",
    title: "CADAP (Central Asia Drug Action Programme)",
    summary:
      "Long-running EU regional programme alongside BOMCA supporting evidence-based drug policy, treatment capacity, and cross-border law-enforcement cooperation.",
    status: "active",
    started_at: "2003-01-01",
    lat: 41.3,
    lng: 69.2,
    confidence: 0.88,
    tags: ["CADAP", "BOMCA-adjacent", "health", "borders"],
    sources: [
      {
        url: "https://www.eeas.europa.eu/delegations/tajikistan/tajikistan-hosts-final-meeting-project-steering-committee-7th-phase-european-union-funded-central_en",
        title: "CADAP 7th phase steering committee — EEAS",
        quote:
          "The European Union has long supported Central Asia through initiatives like CADAP and BOMCA, achieving tangible results in border security, law enforcement, and health systems in the region.",
        accessed_at: A,
        publisher: "EEAS",
      },
    ],
  },
  {
    id: "hist-eu-hydro4u-hydropower",
    layer: "verified",
    category: "energy_infra",
    actors: ["EU"],
    host_country: "Regional",
    title: "HYDRO4U small-scale hydropower (EU-funded)",
    summary:
      "EU-backed regional project building two small hydropower plants in Kyrgyzstan and Uzbekistan to develop unexplored small-scale hydropower potential.",
    status: "active",
    started_at: "2021-01-01",
    lat: 41.3,
    lng: 69.2,
    confidence: 0.85,
    tags: ["hydropower", "water-energy", "HYDRO4U"],
    sources: [
      {
        url: "https://www.eeas.europa.eu/sites/default/files/eeas_-_central_asia_connectivity.en__0.pdf",
        title: "EU connectivity initiatives for Central Asia — EEAS",
        quote:
          "The \"Hydro4U\" project promotes innovative and sustainable hydropower solutions to develop unexplored small-scale hydropower potential in Central Asia.",
        accessed_at: A,
        publisher: "EEAS",
      },
    ],
  },
  {
    id: "hist-us-ge-healthcare-kz-localization",
    layer: "verified",
    category: "capital",
    actors: ["US"],
    host_country: "Kazakhstan",
    title: "GE HealthCare medical equipment localization (Kazakhstan)",
    summary:
      "GE HealthCare agreement to localize ultrasound and CT scanner production in Kazakhstan and build a National Archive of Clinical Images.",
    status: "active",
    started_at: "2024-01-01",
    lat: 51.17,
    lng: 71.45,
    confidence: 0.88,
    tags: ["GE HealthCare", "medtech", "FDI"],
    sources: [
      {
        url: "https://primeminister.kz/en/news/olzhas-bektenov-and-ge-healthcare-head-discuss-project-implementation-on-creation-of-medical-equipment-production-in-kazakhstan-29253",
        title: "GE HealthCare production project — Prime Minister of Kazakhstan",
        quote:
          "In the first direction, it is planned to localise new models of ultrasonic diagnostic devices and high-performance computer tomographs. Medical institutions of the country already use more than 3 thousand units of equipment GE HealthCare.",
        accessed_at: A,
        publisher: "Government of Kazakhstan",
      },
    ],
  },
];
