import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ArrowRight, Filter } from 'lucide-react';

// Sample project data with Unsplash images
const PROJECTS = [
  {
    id: '1',
    title: 'Luxury Bathroom Remodel',
    category: 'residential',
    description: 'Complete bathroom transformation with custom fixtures and modern design.',
    beforeImage: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&h=600&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&h=600&fit=crop&sat=-100',
    completionDate: '2024-10-15',
    location: 'Beverly Hills, CA',
  },
  {
    id: '2',
    title: 'Restaurant Kitchen Plumbing',
    category: 'commercial',
    description: 'Industrial-grade plumbing system for high-volume restaurant.',
    beforeImage: 'https://images.unsplash.com/photo-1556910096-6f5e72db6803?w=800&h=600&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1556910096-6f5e72db6803?w=800&h=600&fit=crop&sat=-100',
    completionDate: '2024-09-22',
    location: 'Los Angeles, CA',
  },
  {
    id: '3',
    title: 'Emergency Pipe Burst Repair',
    category: 'emergency',
    description: 'Rapid response to major pipe burst with complete restoration.',
    beforeImage: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600&fit=crop&sat=-100',
    completionDate: '2024-11-01',
    location: 'Santa Monica, CA',
  },
  {
    id: '4',
    title: 'Whole-House Re-piping',
    category: 'residential',
    description: 'Complete copper pipe replacement for 4-bedroom home.',
    beforeImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop&sat=-100',
    completionDate: '2024-08-10',
    location: 'Pasadena, CA',
  },
  {
    id: '5',
    title: 'Office Building Water System',
    category: 'commercial',
    description: 'Modern water filtration and distribution system installation.',
    beforeImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop&sat=-100',
    completionDate: '2024-07-18',
    location: 'Downtown LA, CA',
  },
  {
    id: '6',
    title: 'Kitchen Renovation Plumbing',
    category: 'residential',
    description: 'High-end kitchen plumbing with designer fixtures.',
    beforeImage: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&h=600&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&h=600&fit=crop&sat=-100',
    completionDate: '2024-06-25',
    location: 'Malibu, CA',
  },
];

type Category = 'all' | 'residential' | 'commercial' | 'emergency';

// Before/After Image Comparison Component
function BeforeAfterSlider({ beforeImage, afterImage, title }: { beforeImage: string; afterImage: string; title: string }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging && e.type !== 'click') return;

    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const position = ((x - rect.left) / rect.width) * 100;

    setSliderPosition(Math.min(Math.max(position, 0), 100));
  };

  return (
    <div
      className="relative w-full h-80 overflow-hidden rounded-xl cursor-col-resize select-none"
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseMove={handleMove}
      onMouseLeave={() => setIsDragging(false)}
      onTouchStart={() => setIsDragging(true)}
      onTouchEnd={() => setIsDragging(false)}
      onTouchMove={handleMove}
      onClick={handleMove}
    >
      {/* After Image */}
      <img
        src={afterImage}
        alt={`${title} - After`}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Before Image with Clip */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img
          src={beforeImage}
          alt={`${title} - Before`}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Slider Line */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center">
          <div className="flex gap-1">
            <div className="w-0.5 h-4 bg-gray-800"></div>
            <div className="w-0.5 h-4 bg-gray-800"></div>
          </div>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 px-3 py-1 bg-black/70 rounded-full text-white text-sm font-semibold">
        Before
      </div>
      <div className="absolute top-4 right-4 px-3 py-1 bg-black/70 rounded-full text-white text-sm font-semibold">
        After
      </div>
    </div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState<Category>('all');

  const filteredProjects = filter === 'all'
    ? PROJECTS
    : PROJECTS.filter(project => project.category === filter);

  const categories: { value: Category; label: string }[] = [
    { value: 'all', label: 'All Projects' },
    { value: 'residential', label: 'Residential' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'emergency', label: 'Emergency' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-6 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1920')] opacity-5 bg-cover bg-center"></div>
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6">
              Our <span className="gradient-text">Projects</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore our portfolio of successful plumbing projects. See the quality and
              craftsmanship that goes into every job we complete.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="section bg-dark-800/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-4 flex-wrap"
          >
            <Filter className="w-5 h-5 text-primary-400" />
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setFilter(category.value)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  filter === category.value
                    ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/50'
                    : 'bg-dark-700/50 text-gray-300 hover:bg-dark-700'
                }`}
              >
                {category.label}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card group"
              >
                {/* Before/After Slider */}
                <BeforeAfterSlider
                  beforeImage={project.beforeImage}
                  afterImage={project.afterImage}
                  title={project.title}
                />

                {/* Project Info */}
                <div className="mt-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <h3 className="text-2xl font-bold text-white group-hover:text-primary-400 transition-colors">
                      {project.title}
                    </h3>
                    <span className="px-3 py-1 bg-primary-500/20 border border-primary-500/40 rounded-full text-xs font-semibold text-primary-300 uppercase">
                      {project.category}
                    </span>
                  </div>

                  <p className="text-gray-400 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary-400" />
                      {new Date(project.completionDate).toLocaleDateString('en-US', {
                        month: 'long',
                        year: 'numeric',
                      })}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary-400" />
                      {project.location}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* No Results */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400 text-xl">No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-white/90">
              Let us transform your plumbing project into a success story.
            </p>
            <button className="px-12 py-5 bg-white text-primary-600 font-bold rounded-lg hover:bg-gray-100 transform hover:-translate-y-1 transition-all duration-300 uppercase tracking-wider shadow-xl">
              Get Free Estimate
              <ArrowRight className="w-5 h-5 inline ml-2" />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
