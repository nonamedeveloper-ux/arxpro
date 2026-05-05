export const menuLinks = [
  { path: '/', name: 'Home' },
  { path: '/about', name: 'About' },
  { path: '/news', name: 'News' },
  { path: '/contact', name: 'Contact' },
]

export const subMenuLinks = [
  { path: '/#projects', name: 'Projects' },
  { path: '/#architects', name: 'Architects' },
]

export const architects = [
  {
    fullName: 'Maria Doe',
    profession: 'HiTech Designer',
    rating: 4.9,
    image: '/images/architect-1.jpg',
    feedback:
      'Thank you for the fastest service ever, I liked how everything in the house was ready on time.',
    projects: [
      '/images/apartment.jpg',
      '/images/about-hero.png',
      '/images/bg-hero.png',
      '/images/apartment.jpg',
    ],
  },
  {
    fullName: 'John Carl',
    profession: 'HiTech Designer',
    rating: 5.0,
    image: '/images/architect-2.png',
    feedback:
      'Thank you for the fastest service ever, I liked how everything in the house was ready on time.',
    projects: [
      '/images/about-hero.png',
      '/images/bg-hero.png',
      '/images/apartment.jpg',
      '/images/about-hero.png',
    ],
  },
  {
    fullName: 'Amelie Muller',
    profession: 'HiTech Designer',
    rating: 4.8,
    image: '/images/architect-3.jpg',
    feedback:
      'Thank you for the fastest service ever, I liked how everything in the house was ready on time.',
    projects: [
      '/images/bg-hero.png',
      '/images/apartment.jpg',
      '/images/about-hero.png',
      '/images/bg-hero.png',
    ],
  },
  {
    fullName: 'Liam Smith',
    profession: 'Industrial Designer',
    rating: 4.7,
    image: '/images/architect-1.jpg',
    feedback: 'Great attention to detail and professional communication throughout the project.',
    projects: ['/images/apartment.jpg', '/images/about-hero.png'],
  },
  {
    fullName: 'Olivia Taylor',
    profession: 'Eco Architect',
    rating: 4.9,
    image: '/images/architect-2.png',
    feedback: 'The sustainable design exceeded our expectations. Truly a green masterpiece.',
    projects: ['/images/bg-hero.png', '/images/apartment.jpg'],
  },
  {
    fullName: 'Noah Williams',
    profession: 'Minimalist Expert',
    rating: 4.8,
    image: '/images/architect-3.jpg',
    feedback: 'Simple, elegant, and functional. Noah captured exactly what we wanted.',
    projects: ['/images/about-hero.png', '/images/bg-hero.png'],
  },
  {
    fullName: 'Sophia Brown',
    profession: 'Urban Planner',
    rating: 4.6,
    image: '/images/architect-1.jpg',
    feedback: 'Sophia helped us navigate complex urban constraints with ease.',
    projects: ['/images/apartment.jpg', '/images/bg-hero.png'],
  },
  {
    fullName: 'Lucas Garcia',
    profession: 'Landscape Architect',
    rating: 5.0,
    image: '/images/architect-2.png',
    feedback: 'The outdoor spaces Lucas created are breathtakingly beautiful.',
    projects: ['/images/about-hero.png', '/images/apartment.jpg'],
  },
  {
    fullName: 'Ava Martinez',
    profession: 'Interior Architect',
    rating: 4.9,
    image: '/images/architect-3.jpg',
    feedback: 'Ava has a unique eye for interior flow and lighting.',
    projects: ['/images/bg-hero.png', '/images/about-hero.png'],
  },
  {
    fullName: 'Isabella Lee',
    profession: 'Commercial Architect',
    rating: 4.8,
    image: '/images/architect-1.jpg',
    feedback: 'Professional and efficient. Isabella delivered a top-notch design for our retail space.',
    projects: ['/images/apartment.jpg', '/images/bg-hero.png'],
  },
  {
    fullName: 'Ethan Hall',
    profession: 'Residential Designer',
    rating: 4.9,
    image: '/images/architect-2.png',
    feedback: 'Ethan made our dream home a reality. His patience and creativity are unmatched.',
    projects: ['/images/about-hero.png', '/images/apartment.jpg'],
  },
  {
    fullName: 'Mia Young',
    profession: 'Green Building Consultant',
    rating: 4.7,
    image: '/images/architect-3.jpg',
    feedback: 'Mia provided invaluable insights into energy efficiency and sustainable materials.',
    projects: ['/images/bg-hero.png', '/images/about-hero.png'],
  },
  {
    fullName: 'Alexander King',
    profession: 'Structural Engineer',
    rating: 5.0,
    image: '/images/architect-1.jpg',
    feedback: 'Precision and safety are Alexander’s hallmarks. A true professional.',
    projects: ['/images/apartment.jpg', '/images/about-hero.png'],
  },
  {
    fullName: 'Charlotte Scott',
    profession: 'Historical Restoration',
    rating: 4.9,
    image: '/images/architect-2.png',
    feedback: 'Charlotte preserved the soul of our old building while modernizing its functions.',
    projects: ['/images/bg-hero.png', '/images/apartment.jpg'],
  },
  {
    fullName: 'Sebastian Green',
    profession: 'Sustainable Designer',
    rating: 4.8,
    image: '/images/architect-3.jpg',
    feedback: 'Innovation and sustainability go hand in hand with Sebastian’s work.',
    projects: ['/images/about-hero.png', '/images/bg-hero.png'],
  },
]

export const projects = [
  {
    title: 'Modern Villa',
    description: 'A stunning modern villa with open spaces and natural lighting.',
    image: '/images/project-1.png',
    clientThought: 'Archify team did an amazing job. The house feels alive!',
    architect: {
      name: 'Maria Doe',
      image: '/images/architect-1.jpg',
      rating: 4.9,
    },
  },
  {
    title: 'Skyline Apartment',
    description: 'Luxury apartment with a breathtaking view of the city skyline.',
    image: '/images/project-2.png',
    clientThought: 'Professional and timely. Exceeded all my expectations.',
    architect: {
      name: 'John Carl',
      image: '/images/architect-2.png',
      rating: 5.0,
    },
  },
  {
    title: 'Green Office',
    description: 'Eco-friendly office space designed for maximum productivity.',
    image: '/images/project-3.png',
    clientThought: 'The green concept is implemented perfectly. My staff loves it.',
    architect: {
      name: 'Amelie Muller',
      image: '/images/architect-3.jpg',
      rating: 4.8,
    },
  },
  {
    title: 'Classic Estate',
    description: 'Timeless classical architecture with modern interior elements.',
    image: '/images/project-4.png',
    clientThought: 'They managed to keep the classic soul while adding modern comfort.',
    architect: {
      name: 'Maria Doe',
      image: '/images/architect-1.jpg',
      rating: 4.9,
    },
  },
  {
    title: 'Urban Loft',
    description: 'Industrial style loft converted from an old warehouse.',
    image: '/images/project-5.png',
    clientThought: 'The raw aesthetic is exactly what I was looking for.',
    architect: {
      name: 'John Carl',
      image: '/images/architect-2.png',
      rating: 5.0,
    },
  },
  {
    title: 'Nordic Cabin',
    description: 'Minimalist wooden cabin in the snowy mountains.',
    image: '/images/project-6.png',
    clientThought: 'The insulation and design are perfect for this climate.',
    architect: {
      name: 'Amelie Muller',
      image: '/images/architect-3.jpg',
      rating: 4.8,
    },
  },
  {
    title: 'Desert Oasis',
    description: 'Luxury resort designed to blend with the sandy landscape.',
    image: '/images/project-7.png',
    clientThought: 'A true paradise in the middle of nowhere.',
    architect: {
      name: 'Maria Doe',
      image: '/images/architect-1.jpg',
      rating: 4.9,
    },
  },
  {
    title: 'Floating House',
    description: 'Innovative house design that floats on water.',
    image: '/images/project-8.png',
    clientThought: 'Living on water has never been this comfortable.',
    architect: {
      name: 'John Carl',
      image: '/images/architect-2.png',
      rating: 5.0,
    },
  },
  {
    title: 'Jungle Retreat',
    description: 'Eco-lodge built high up in the tropical rainforest.',
    image: '/images/project-9.png',
    clientThought: 'Waking up to the sounds of nature is priceless.',
    architect: {
      name: 'Amelie Muller',
      image: '/images/architect-3.jpg',
      rating: 4.8,
    },
  },
  {
    title: 'Penthouse Z',
    description: 'Ultra-modern penthouse with smart home integration.',
    image: '/images/project-10.png',
    clientThought: 'The technology integration is seamless.',
    architect: {
      name: 'Maria Doe',
      image: '/images/architect-1.jpg',
      rating: 4.9,
    },
  },
  {
    title: 'Beachside Condo',
    description: 'Bright and airy condos right on the sandy shore.',
    image: '/images/project-1.png',
    clientThought: 'Every day feels like a vacation here.',
    architect: {
      name: 'John Carl',
      image: '/images/architect-2.png',
      rating: 5.0,
    },
  },
  {
    title: 'Mountain Peak Hotel',
    description: 'Grand hotel perched on the highest peak.',
    image: '/images/project-2.png',
    clientThought: 'The views are simply unparalleled.',
    architect: {
      name: 'Amelie Muller',
      image: '/images/architect-3.jpg',
      rating: 4.8,
    },
  },
  {
    title: 'Eco Village',
    description: 'Sustainable community designed for 100% green living.',
    image: '/images/project-3.png',
    clientThought: 'Finally, a place that truly cares about the environment.',
    architect: {
      name: 'Maria Doe',
      image: '/images/architect-1.jpg',
      rating: 4.9,
    },
  },
  {
    title: 'Smart City Hall',
    description: 'Administrative building with futuristic design and tech.',
    image: '/images/project-4.png',
    clientThought: 'Efficient and impressive architecture.',
    architect: {
      name: 'John Carl',
      image: '/images/architect-2.png',
      rating: 5.0,
    },
  },
  {
    title: 'Art Gallery X',
    description: 'Minimalist art gallery with massive open halls.',
    image: '/images/project-5.png',
    clientThought: 'The space itself is a piece of art.',
    architect: {
      name: 'Amelie Muller',
      image: '/images/architect-3.jpg',
      rating: 4.8,
    },
  },
]

export const statistics = [
  { label: 'Downloads', amount: 1024, percentage: 22 },
  { label: 'Active Users', amount: 335, percentage: -14 },
  { label: 'Positive Feedbacks', amount: 846, percentage: 18 },
  { label: '5+ rating', amount: 564 },
]

export const footerMenuItems = [
  { label: 'TCP OPTIMIZATION', path: '/' },
  { label: 'CUSTOMERS', path: '/' },
  { label: 'BANDWIDTH MANAGEMENT', path: '/' },
  { label: 'NEWSROOM', path: '/' },
  { label: 'NETWORK VISIBILITY', path: '/' },
  { label: 'ABOUT', path: '/about' },
  { label: 'SQN PLATFORM', path: '/' },
  { label: 'CAREERS', path: '/' },
]

export const socialLinks = [
  { name: 'LINKEDIN', path: '/' },
  { name: 'TWITTER', path: '/' },
  { name: 'FACEBOOK', path: '/' },
  { name: 'INSTAGRAM', path: '/' },
  { name: 'YOUTUBE', path: '/' },
]

export const aboutUsPageImages = [
  '/images/about-hero.png',
  '/images/apartment.jpg',
  '/images/bg-hero.png',
]

export const aboutPageCategories = [
  {
    title: 'Software Development',
    description: 'Custom software solutions tailored to meet your unique business needs.',
  },
  {
    title: 'IT Consulting',
    description:
      'Expert advice to help you navigate the complex IT landscape and make informed decisions.',
  },
  {
    title: 'Cybersecurity',
    description: 'Robust security measures to protect your data and ensure business continuity.',
  },
  {
    title: 'Managed IT Services',
    description: 'Comprehensive IT support to keep your systems running smoothly and efficiently.',
  },
]

export const testimonials = [
  {
    fullName: 'John Doe',
    profession: 'SEO Optimizer',
    comment: "Archify helped us visualize our office space perfectly. The attention to detail is unmatched.",
  },
  {
    fullName: 'Sarah Jenkins',
    profession: 'Marketing Director',
    comment: "The collaborative process was so smooth. They really listened to our brand values.",
  },
  {
    fullName: 'Michael Chen',
    profession: 'Real Estate Investor',
    comment: "High ROI projects. Their designs sell themselves. Looking forward to more collaborations.",
  },
  {
    fullName: 'Emma Wilson',
    profession: 'Art Curator',
    comment: "They created a space that is both functional and a work of art. Truly impressive work.",
  },
  {
    fullName: 'Robert Taylor',
    profession: 'Tech Lead',
    comment: "Smart home integration was handled perfectly. The most futuristic house I've seen.",
  },
  {
    fullName: 'Lisa Brown',
    profession: 'Restaurant Owner',
    comment: "Our customers love the new ambiance. Archify transformed our dining experience.",
  },
  {
    fullName: 'David Miller',
    profession: 'Entrepreneur',
    comment: "Fast, professional, and creative. They turned my vision into reality in record time.",
  },
  {
    fullName: 'Sophia Garcia',
    profession: 'Landscape Architect',
    comment: "The way they blend interior and exterior spaces is masterclass. Highly recommended.",
  },
]
