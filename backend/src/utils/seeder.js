import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Service from '../models/Service.js';
import TeamMember from '../models/TeamMember.js';

// Load environment variables
dotenv.config();

// Connect to database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Initial services data
const services = [
  {
    name: 'La Coupe',
    description: 'Coupe sur mesure adaptée à votre style et morphologie. Consultation personnalisée incluse.',
    price: 25,
    currency: 'CHF',
    duration: 30,
    icon: '✂️',
    order: 1,
  },
  {
    name: 'La Barbe',
    description: 'Taille et modelage professionnel de la barbe. Finitions précises au rasoir.',
    price: 17,
    currency: 'CHF',
    duration: 20,
    icon: '🪒',
    order: 2,
  },
  {
    name: 'Coupe + Barbe',
    description: 'Forfait complet : coupe de cheveux et taille de barbe. Le combo parfait.',
    price: 40,
    currency: 'CHF',
    duration: 45,
    icon: '💈',
    order: 3,
  },
  {
    name: 'La Coloration',
    description: 'Coloration professionnelle. Produits de qualité pour un résultat impeccable.',
    price: 30,
    currency: 'CHF',
    duration: 60,
    icon: '🎨',
    order: 4,
  },
  {
    name: 'Enfants',
    description: 'Coupe spéciale pour les enfants dans une ambiance conviviale et rassurante.',
    price: 20,
    currency: 'CHF',
    duration: 25,
    icon: '👶',
    order: 5,
  },
  {
    name: 'Shampooing & Séchage',
    description: 'Lavage professionnel et séchage soigné pour un résultat parfait.',
    price: 10,
    currency: 'CHF',
    duration: 15,
    icon: '🧴',
    order: 6,
  },
  {
    name: 'Épilation au Fil',
    description: 'Épilation précise au fil traditionnel. Technique douce et efficace.',
    price: 10,
    currency: 'CHF',
    duration: 15,
    icon: '✨',
    order: 7,
  },
];

// Initial team members data
const teamMembers = [
  {
    name: 'Kamaran',
    experience: 20,
    phone: '+41788700244',
    whatsappNumber: '9647701540481',
    email: 'kamaran@coiffuremelimelo.ch',
    photoUrl: 'https://i.imgur.com/Bn6KMCd.jpeg',
    specialties: ['Coupe Moderne', 'Dégradé', 'Barbe'],
    bio: 'Barbier passionné avec 20 ans d\'expérience',
    order: 1,
    workingHours: {
      monday: false,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: false,
    },
  },
  {
    name: 'Hassan Duske',
    experience: 25,
    phone: '+41765320878',
    whatsappNumber: '41765320878',
    email: 'hassan@coiffuremelimelo.ch',
    photoUrl: 'https://i.imgur.com/O1l7ccG.jpeg',
    specialties: ['Coupe Classique', 'Coloration', 'Rasage Traditionnel'],
    bio: 'Maître barbier avec 25 ans d\'expérience internationale',
    order: 2,
    workingHours: {
      monday: false,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: false,
    },
  },
  {
    name: 'Shuana Arif',
    experience: 5,
    phone: '+41765971395',
    whatsappNumber: '41765971395',
    email: 'rahimshuana@gmail.com',
    photoUrl: 'https://i.imgur.com/GmEHC3F.jpeg',
    specialties: ['Coupe Moderne', 'Épilation au Fil', 'Style Tendance'],
    bio: 'Jeune barbier dynamique avec un œil pour les tendances actuelles',
    order: 3,
    workingHours: {
      monday: false,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: false,
    },
  },
];

// Seed data
const seedData = async () => {
  try {
    console.log('Seeding database...');

    // Clear existing data
    await Service.deleteMany();
    await TeamMember.deleteMany();
    console.log('✓ Cleared existing data');

    // Insert services
    await Service.insertMany(services);
    console.log('✓ Services seeded');

    // Insert team members
    await TeamMember.insertMany(teamMembers);
    console.log('✓ Team members seeded');

    console.log('\n✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run seeder
connectDB().then(() => {
  seedData();
});
