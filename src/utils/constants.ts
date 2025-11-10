import { Service, Testimonial, Stat, Certification, NavLink } from '../types';

// Navigation Links
export const NAV_LINKS: NavLink[] = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Projects', path: '/projects' },
  { label: 'About', path: '/about' },
  { label: 'Book Now', path: '/booking' },
  { label: 'Contact', path: '/contact' },
];

// Services Data
export const SERVICES: Service[] = [
  {
    id: '1',
    icon: '🚨',
    title: 'Emergency Repairs',
    description: '24/7 emergency plumbing services for urgent issues. Lightning-fast response times with expert solutions.',
    features: [
      'Burst pipe repairs',
      'Water heater failures',
      'Severe drain clogs',
      'Gas leak detection',
      'Flooding emergencies',
      '30-minute response time',
    ],
    price: 'From $149',
    category: 'emergency',
  },
  {
    id: '2',
    icon: '🚿',
    title: 'Bathroom Plumbing',
    description: 'Complete bathroom plumbing services from installations to luxury renovations.',
    features: [
      'Toilet installation & repair',
      'Shower/tub services',
      'Sink & faucet work',
      'Full bathroom remodels',
      'Luxury fixtures',
      'Water pressure optimization',
    ],
    price: 'Custom Quote',
    category: 'residential',
  },
  {
    id: '3',
    icon: '🍽️',
    title: 'Kitchen Plumbing',
    description: 'Professional kitchen plumbing for functionality, efficiency, and modern aesthetics.',
    features: [
      'Garbage disposal services',
      'Dishwasher installation',
      'Kitchen sink repair',
      'Water line installation',
      'Ice maker hookups',
      'Reverse osmosis systems',
    ],
    price: 'From $199',
    category: 'residential',
  },
  {
    id: '4',
    icon: '♨️',
    title: 'Water Heaters',
    description: 'Expert water heater installation, repair, and maintenance for maximum efficiency.',
    features: [
      'Tank & tankless heaters',
      'Repair & replacement',
      'Energy-efficient options',
      'Regular maintenance',
      'Solar water heating',
      'Smart water heaters',
    ],
    price: 'From $899',
    category: 'residential',
  },
  {
    id: '5',
    icon: '🌊',
    title: 'Drain Cleaning',
    description: 'Advanced drain cleaning and hydro-jetting for stubborn clogs and preventive care.',
    features: [
      'Video camera inspection',
      'Hydro-jetting services',
      'Root removal',
      'Preventive maintenance',
      'Grease trap cleaning',
      'Storm drain services',
    ],
    price: 'From $129',
    category: 'maintenance',
  },
  {
    id: '6',
    icon: '🏠',
    title: 'Pipe Services',
    description: 'Complete pipe installation, repair, and replacement with modern materials.',
    features: [
      'Leak detection & repair',
      'Pipe replacement',
      'Re-piping services',
      'Sewer line repair',
      'Trenchless technology',
      'Pipe insulation',
    ],
    price: 'Custom Quote',
    category: 'residential',
  },
  {
    id: '7',
    icon: '💧',
    title: 'Water Filtration',
    description: 'Clean, safe, and great-tasting water with our advanced filtration systems.',
    features: [
      'Whole-house filters',
      'Water softeners',
      'Reverse osmosis systems',
      'Water quality testing',
      'UV purification',
      'Salt-free systems',
    ],
    price: 'From $599',
    category: 'residential',
  },
  {
    id: '8',
    icon: '🏢',
    title: 'Commercial Plumbing',
    description: 'Professional plumbing services for businesses and commercial properties.',
    features: [
      'Restaurant plumbing',
      'Office buildings',
      'Retail spaces',
      'Maintenance contracts',
      'Code compliance',
      'Industrial solutions',
    ],
    price: 'Enterprise Pricing',
    category: 'commercial',
  },
];

// Statistics
export const STATS: Stat[] = [
  {
    id: '1',
    value: 25,
    label: 'Years of Excellence',
    suffix: '+',
  },
  {
    id: '2',
    value: 15000,
    label: 'Projects Completed',
    suffix: '+',
  },
  {
    id: '3',
    value: 99,
    label: 'Customer Satisfaction',
    suffix: '%',
  },
  {
    id: '4',
    value: 50,
    label: 'Expert Technicians',
    suffix: '+',
  },
];

// Testimonials
export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Homeowner',
    avatar: 'SJ',
    rating: 5,
    comment: 'Elite Plumbing saved my home! Had a major pipe burst at 3 AM and they arrived within 20 minutes. Professional, efficient, and incredibly skilled. They even cleaned up perfectly after the job. Cannot recommend them enough!',
    date: '2024-11-05',
    verified: true,
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'Restaurant Owner',
    avatar: 'MC',
    rating: 5,
    comment: 'We use Elite Plumbing for all our commercial properties. Their emergency service is outstanding, and their preventive maintenance program has saved us thousands. True professionals who understand business needs.',
    date: '2024-10-28',
    verified: true,
  },
  {
    id: '3',
    name: 'Jennifer Martinez',
    role: 'Property Manager',
    avatar: 'JM',
    rating: 5,
    comment: 'Managing 50+ units, I need reliability. Elite Plumbing delivers every single time. Their team is courteous, skilled, and their pricing is always fair. They\'re my go-to for everything plumbing-related.',
    date: '2024-10-15',
    verified: true,
  },
  {
    id: '4',
    name: 'David Thompson',
    role: 'Homeowner',
    avatar: 'DT',
    rating: 5,
    comment: 'They completely remodeled our master bathroom plumbing. The attention to detail was incredible, and they finished ahead of schedule. The new water pressure is amazing! Worth every penny.',
    date: '2024-09-30',
    verified: true,
  },
  {
    id: '5',
    name: 'Lisa Anderson',
    role: 'Business Owner',
    avatar: 'LA',
    rating: 5,
    comment: 'Professional from start to finish. They installed a complex water filtration system for our office, and the difference in water quality is remarkable. Their expertise is unmatched.',
    date: '2024-09-12',
    verified: true,
  },
  {
    id: '6',
    name: 'Robert Williams',
    role: 'Homeowner',
    avatar: 'RW',
    rating: 5,
    comment: 'Best plumbing experience I\'ve ever had. They replaced our old water heater with an energy-efficient tankless system. Lower bills and endless hot water. These guys know their stuff!',
    date: '2024-08-25',
    verified: true,
  },
];

// Certifications
export const CERTIFICATIONS: Certification[] = [
  {
    id: '1',
    name: 'Master Plumber License',
    issuer: 'State Licensing Board',
    year: 1999,
    icon: '🏆',
  },
  {
    id: '2',
    name: 'EPA Lead-Safe Certified',
    issuer: 'Environmental Protection Agency',
    year: 2010,
    icon: '🌿',
  },
  {
    id: '3',
    name: 'OSHA Safety Certified',
    issuer: 'Occupational Safety & Health Admin',
    year: 2015,
    icon: '🛡️',
  },
  {
    id: '4',
    name: 'BBB A+ Rating',
    issuer: 'Better Business Bureau',
    year: 2020,
    icon: '⭐',
  },
  {
    id: '5',
    name: 'Green Plumber Certified',
    issuer: 'Green Plumbers USA',
    year: 2018,
    icon: '♻️',
  },
  {
    id: '6',
    name: 'Backflow Prevention',
    issuer: 'American Backflow Prevention Association',
    year: 2016,
    icon: '🔒',
  },
];

// Time Slots for Booking
export const TIME_SLOTS = [
  '8:00 AM - 10:00 AM',
  '10:00 AM - 12:00 PM',
  '12:00 PM - 2:00 PM',
  '2:00 PM - 4:00 PM',
  '4:00 PM - 6:00 PM',
  '6:00 PM - 8:00 PM',
];

// Contact Information
export const CONTACT_INFO = {
  phone: '(555) 123-4567',
  emergencyPhone: '(555) 911-HELP',
  email: 'info@eliteplumbing.com',
  emergencyEmail: 'emergency@eliteplumbing.com',
  address: '123 Plumbing Avenue',
  city: 'Your City',
  state: 'ST',
  zip: '12345',
  hours: {
    weekday: 'Monday - Friday: 7:00 AM - 7:00 PM',
    saturday: 'Saturday: 8:00 AM - 5:00 PM',
    sunday: 'Sunday: Emergency Only',
    emergency: '24/7 Emergency Service Available',
  },
};

// Company Timeline
export const TIMELINE = [
  {
    year: '1999',
    title: 'Company Founded',
    description: 'Started as a small family business with a focus on quality and customer service.',
  },
  {
    year: '2005',
    title: 'Expanded Services',
    description: 'Added commercial plumbing services and grew our team to 15 technicians.',
  },
  {
    year: '2010',
    title: 'Green Certification',
    description: 'Became certified Green Plumbers, focusing on eco-friendly solutions.',
  },
  {
    year: '2015',
    title: 'Technology Integration',
    description: 'Invested in cutting-edge technology including hydro-jetting and camera inspections.',
  },
  {
    year: '2020',
    title: 'Award-Winning Service',
    description: 'Received multiple industry awards for excellence and customer satisfaction.',
  },
  {
    year: '2024',
    title: 'Industry Leaders',
    description: 'Now serving 15,000+ customers with 50+ expert technicians.',
  },
];
