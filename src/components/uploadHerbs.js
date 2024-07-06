const { db } = require('../Firebase/setupFirebaseAdmin');
const herbs = [
  {
    id: "1",
    name: "Chamomile",
    category: "Digestive",
    description: "Chamomile is commonly used to help with sleep and digestive issues.",
    imageUrl: "https://example.com/images/chamomile.jpg",
    isAvailable: true,
  },
  {
    id: "2",
    name: "Peppermint",
    category: "Digestive",
    description: "Peppermint is known for its ability to soothe digestive issues and freshen breath.",
    imageUrl: "https://example.com/images/peppermint.jpg",
    isAvailable: true,
  },
  {
    id: "3",
    name: "Echinacea",
    category: "Immune Support",
    description: "Echinacea is often used to boost the immune system and fight infections.",
    imageUrl: "https://example.com/images/echinacea.jpg",
    isAvailable: false,
  },
  {
    id: "4",
    name: "Ginseng",
    category: "Nervous System",
    description: "Ginseng is used to improve energy levels and mental clarity.",
    imageUrl: "https://example.com/images/ginseng.jpg",
    isAvailable: true,
  },
  {
    id: "5",
    name: "Lavender",
    category: "Nervous System",
    description: "Lavender is popular for its calming effects and is often used to help with anxiety and insomnia.",
    imageUrl: "https://example.com/images/lavender.jpg",
    isAvailable: true,
  },
  {
    id: "6",
    name: "Hawthorn",
    category: "Cardiovascular",
    description: "Hawthorn is used to support cardiovascular health and improve circulation.",
    imageUrl: "https://example.com/images/hawthorn.jpg",
    isAvailable: false,
  },
  {
    id: "7",
    name: "Ginger",
    category: "Digestive",
    description: "Ginger is widely used to help with nausea and digestion.",
    imageUrl: "https://example.com/images/ginger.jpg",
    isAvailable: true,
  },
  {
    id: "8",
    name: "Valerian",
    category: "Nervous System",
    description: "Valerian is used to help with sleep disorders and anxiety.",
    imageUrl: "https://example.com/images/valerian.jpg",
    isAvailable: false,
  },
  {
    id: "9",
    name: "St. John's Wort",
    category: "Nervous System",
    description: "St. John's Wort is commonly used to treat depression and mood disorders.",
    imageUrl: "https://example.com/images/st-johns-wort.jpg",
    isAvailable: true,
  },
  {
    id: "10",
    name: "Turmeric",
    category: "Digestive",
    description: "Turmeric is known for its anti-inflammatory properties and is used to support digestive health.",
    imageUrl: "https://example.com/images/turmeric.jpg",
    isAvailable: true,
  },
];

async function registerHerb(herb) {
  try {
    await db.collection('herbs').doc(herb.id.toString()).set({
      id: herb.id,
      name: herb.name,
      category: herb.category,
      description: herb.description,
      imageUrl: herb.imageUrl,
      isAvailable: herb.isAvailable
    });
    console.log(`Successfully registered herb: ${herb.name}`);
  } catch (error) {
    console.error('Error registering herb:', herb.name, error);
  }
}

// Loop through all herbs and register them
herbs.forEach(herb => registerHerb(herb));
