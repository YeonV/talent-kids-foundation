import { ImpactLevel, MissionItem, TeamMember, Trainer } from "@/types";

export const impactLevels: ImpactLevel[] = [
  {
    value: 10,
    label: "Ballkorb",
    text: "Du füllst den Ballkorb, damit die Kinder losspielen können.",
  },
  {
    value: 15,
    label: "Trainerstunde",
    text: "Du schenkst eine Trainerstunde voll echter Begeisterung.",
  },
  {
    value: 20,
    label: "Material",
    text: "Du gibst einem Kind das passende Material in die Hand und machst aus Frust ein Erfolgserlebnis.",
  },
  {
    value: 30,
    label: "Spielfeld",
    text: "Du baust mit Trainingsmaterialien ein Spielfeld voller Bewegungs-Möglichkeiten.",
  },
  {
    value: 40,
    label: "Sportnachmittag",
    text: "Du finanzierst einen Sportnachmittag für eine Schulklasse",
  },
  {
    value: 50,
    label: "Sportvormittag",
    text: "Bewegung statt Klassenzimmer: Du verwandelst einen Schulvormittag in ein Sporterlebnis.",
  },
  {
    value: 75,
    label: "Mini-Sportevent",
    text: "Du bringst ein Mini-Sportevent an eine Schule.",
  },
  {
    value: 100,
    label: "Sport für 50 Kinder",
    text: "Du ermöglichst 50 Kindern ihren ersten Zugang zu organisiertem Sport",
  },
  {
    value: 125,
    label: "Mehrere Stunden",
    text: "Du machst mehrere Übungs- und Spiel-Stunden für Kinder möglich, die sonst keine Chance hätten.",
  },
  {
    value: 150,
    label: "Kompletter Aktionstag",
    text: "Du schenkst einen kompletten Aktionstag voller Sport, Spaß und neuer Erfahrungen.",
  },
  {
    value: 175,
    label: "Bus zur Sportanlage",
    text: "Du organisierst den Bus für eine Schulklasse zur Sportanlage.",
  },
  {
    value: 200,
    label: "Vierwöchiges Projekt",
    text: "Du finanzierst ein vierwöchiges Sportprojekt an einer Schule",
  },
];

export const missionItems: MissionItem[] = [
  {
    iconKey: "child",
    title: "Chancengleichheit",
    description:
      "Wir bringen olympischen und paralympischen Sport direkt in Kitas und Schulen. Kostenlos und barrierefrei für jedes Kind.",
  },
  {
    iconKey: "heart",
    title: "Werte & Stärke",
    description:
      "Judo ist mehr als Sport. Wir vermitteln Respekt, Disziplin und Selbstvertrauen.",
  },
  {
    iconKey: "medal",
    title: "Talentförderung",
    description:
      "Wir sehen Potenziale. Über die Academy begleiten wir junge Talente in den Leistungssport.",
  },
];

export const teamData: TeamMember[] = [
  {
    id: "1",
    name: "Benjamin Behrla",
    role: "Gründer & Vorstand",
    image: "/img/team/BennyBehrla.jpg",
    tags: ["Olympian", "Judo"],
    bio: 'Gemeinsam mit seiner Frau Anna entwickelte der Olympia-Teilnehmer (Peking 2008) das Konzept "Judo für Alle". Seine Vision: Jedes Kind soll Zugang zu Sport finden - unabhängig von Herkunft oder Geldbeutel. Was 2023 als Pilotprojekt begann, wurde 2024 zur Stiftung.',
  },
  {
    id: "2",
    name: "Oliver Rychter",
    role: "Vorstand & Sportl. Leitung",
    image: "/img/team/OliverRychter.jpg",
    tags: ["Dipl. Sportlehrer", "Coach"],
    bio: "Als ehemaliger Landestrainer entdeckte er einst Benny als Talent. Heute bringt er seine pädagogische Expertise ein. Besonders wichtig sind ihm die 'Big Five' – die fünf Grundwerte des Sports, die wir den Kindern vermitteln.",
  },
  {
    id: "3",
    name: "Dr. David Kasprowiak",
    role: "Vorstand & Finanzen",
    image: "/img/team/DrDavidKasprowiak.jpg",
    tags: ["Zahnmediziner", "Strategie"],
    bio: "Jugendfreund von Benny und Zahnmediziner. Er kümmert sich um die strategische Ausrichtung und die Finanzen der Stiftung, damit jeder gespendete Euro maximalen Impact erzielt.",
  },
  {
    id: "4",
    name: "Alicia Sommer",
    role: "Kommunikation & Orga",
    image: null,
    tags: ["Management", "PR"],
    bio: "Alicia ist die organisatorische Seele. Sie koordiniert die Termine mit Schulen, Kitas und Partnern und sorgt dafür, dass im Hintergrund alles reibungslos läuft.",
  },
  {
    id: "5",
    name: "Dr. Timo Marks",
    role: "",
    image: "/img/team/DrTimoMarks.jpg",
    tags: ["Trainer", "Active Athlete"],
    bio: "Lucas ist aktiver Judoka und gibt seine Leidenschaft direkt an die Kinder weiter. Seine Stunden sind geprägt von Spaß und technischer Präzision.",
  },
];

export const navLinks = [
  { name: "Startseite", target: "top" },
  { name: "Mission", target: "mission" },
  { name: "Team", target: "team" },
  { name: "Spenden", target: "donate" },
];

export const legalLinks = [
  { name: "Impressum", href: "/impressum" },
  { name: "Datenschutz", href: "/datenschutz" },
];

export const navItems = [
  // { label: 'Mission', target: 'founder' },
  // { label: 'Konzept', target: 'program' },
  { label: 'Success Story', target: 'success-story' },
  { label: 'Ambassadors', target: 'ambassadors' },
  // { label: 'Team', target: 'team' },
];

export const ecosystem = [
  {
    title: 'EduProSports gGmbH',
    role: 'Der Träger',
    iconKey: 'building', 
    logo: '/img/partners/epsgmbh.png',
    desc: 'Die gemeinnützige Dachorganisation. Sie stellt sicher, dass alle Mittel zweckgebunden verwendet werden und bildet den rechtlichen Rahmen.'
  },
  {
    title: 'Sport Kids e.V.',
    role: 'Der Verein',
    iconKey: 'users',
    logo: '/img/partners/sportskidsev.png',
    desc: 'Unser Partner für die Nachhaltigkeit. Nach den 6-Wochen-Kursen können Kinder hier direkt in den regulären Vereinsbetrieb wechseln.'
  },
  {
    title: 'EduProSports Academy',
    role: 'Die Elite-Förderung',
    iconKey: 'graduation-cap',
    logo: null, // Hier evtl. später ein Logo ergänzen
    desc: 'Für außergewöhnliche Talente. Hier werden zukünftige Olympioniken durch Individualtraining und Karriereplanung gezielt gefördert.'
  }
];

export const partners = [
  { name: 'Stadt Köln', color: '#E3000F' },
  { name: 'Deutsche Sportjugend', color: '#FFD700' },
  { name: 'Kreissparkasse', color: '#FF0000' },
  { name: 'Lokale Schulen', color: '#000000' },
];

export const steps = [
  {
    id: '01',
    title: 'Das Mobile Dojo',
    iconKey: 'truck',
    text: 'Wir beseitigen alle Hürden. Unsere Trainer kommen direkt in die Schule oder Kita. Wir bringen Matten, Judo-Anzüge und alles Equipment mit.',
    highlight: 'Kein Aufwand für Eltern.'
  },
  {
    id: '02',
    title: '6 Wochen Training',
    iconKey: 'ninja',
    text: 'Basierend auf unserem Kinderbuch "Kouki und der sanfte Weg" lernen die Kinder spielerisch Werte: Respekt, Höflichkeit und Hilfsbereitschaft stehen im Fokus.',
    highlight: 'Sport & Sozialkompetenz.'
  },
  {
    id: '03',
    title: 'Das Finale',
    iconKey: 'trophy',
    text: 'Am Ende steht die erste Gürtelprüfung. Jedes Kind erhält eine Urkunde und den weiß-gelben Gurt. Talente werden für die Academy gesichtet.',
    highlight: 'Erfolgserlebnisse garantiert.'
  }
];


export const trainerData: Trainer[] = [
  {
    id: 't1',
    name: 'Lucas Heerde',
    sport: 'Judo',
    role: 'Head Coach Judo',
    image: '/img/trainers/LucasHeerde.jpg', 
    bio: 'Lucas ist ein Vorbild auf der Matte. Er verbindet technische Brillanz mit der Fähigkeit, Kinder zu begeistern. Seine Trainingseinheiten sind legendär für die perfekte Mischung aus Spaß und Disziplin.',
    tags: ['Schwarzgurt', 'Wettkampf-Erfahrung']
  },
  {
    id: 't2',
    name: 'Marie Sophie Happel',
    sport: 'Gymnastik',
    role: 'Trainerin Gymnastik',
    image: '/img/trainers/MarieSophieHappel.jpg', 
    bio: 'Marie Sophie bringt Eleganz und Körperbeherrschung in unser Programm. Sie zeigt den Kindern, wie wichtig Beweglichkeit und Koordination für jede Sportart sind.',
    tags: ['Rhythmische Sportgymnastik', 'Tanz']
  },
  {
      id: 't3',
      name: 'Luca Heinrich',
      sport: 'Judo',
      role: 'Trainer Judo',
      image: '/img/trainers/LucaHeinrich.jpg', 
      bio: 'Luca ist spezialisiert auf die Einführungskurse. Er hat eine Engelsgeduld und sorgt dafür, dass auch die schüchternsten Kinder sich trauen, den ersten Wurf zu machen.',
      tags: ['Kinder-Spezialist', 'Pädagogik']
    },
    {
        id: 't4',
        name: 'Adrian Breitling',
        sport: 'Judo',
        role: 'Trainer Assistenz',
        image: null, 
        bio: 'Adrian unterstützt das Team bei den Schulprojekten. Seine ruhige Art gibt den Kindern Sicherheit bei den ersten Fallübungen.',
        tags: ['Nachwuchs-Coach', 'Judo']
    },
    {
        id: 't5',
        name: 'Luis Boshuizen',
        sport: 'Judo',
        role: 'Trainer Assistenz',
        image: null, 
        bio: 'Luis ist selbst noch jung und hat einen direkten Draht zu den Kids. Er zeigt, dass Judo cool ist und verbindet traditionelle Werte mit modernem Training.',
        tags: ['Judo', 'Motivator']
    },
    {
      id: 't6',
      name: 'Beispiel Trainerin',
      sport: 'Gymnastik',
      role: 'Trainerin Gymnastik',
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2070&auto=format&fit=crop', 
      bio: 'Marie Sophie bringt Eleganz und Körperbeherrschung in unser Programm. Sie zeigt den Kindern, wie wichtig Beweglichkeit und Koordination für jede Sportart sind.',
      tags: ['Rhythmische Sportgymnastik', 'Tanz']
    },
  {
      id: 't7',
      name: 'Beispiel Trainer',
      sport: 'Judo',
      role: 'Trainer Judo',
      image: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=2070&auto=format&fit=crop', 
      bio: 'Luca ist spezialisiert auf die Einführungskurse. Er hat eine Engelsgeduld und sorgt dafür, dass auch die schüchternsten Kinder sich trauen, den ersten Wurf zu machen.',
      tags: ['Kinder-Spezialist', 'Pädagogik']
    },
];