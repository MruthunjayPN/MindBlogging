
import { Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Edit3, 
  Search, 
  Share2, 
  TrendingUp, 
  Layout, 
  Zap, 
  Shield, 
  Code,
  Feather,
  Users,
  BarChart,
  Globe,
  Brain
} from 'lucide-react';
import { TypewriterEffect } from "@/components/ui/type-writer-effect";
import { TextAnimate } from "@/components/magicui/text-animate";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { FocusCards } from "@/components/ui/focus-cards";

const features = [
  {
    icon: Edit3,
    title: "Rich Text Editing",
    description: "Advanced markdown support with real-time preview and code syntax highlighting"
  },
  {
    icon: Search,
    title: "SEO Optimized",
    description: "Built-in SEO tools and semantic markup for maximum visibility"
  },
  {
    icon: Share2,
    title: "Easy Sharing",
    description: "One-click sharing to social media with customizable previews"
  },
  {
    icon: TrendingUp,
    title: "Analytics",
    description: "Detailed insights into your content's performance and reader engagement"
  }
];

const benefits = [
  {
    title: "Custom Domains",
    src: "https://images.unsplash.com/photo-1483478550801-ceba5fe50e8e?q=80&w=1920&auto=format&fit=crop",
    icon: Layout,
    description: "Use your own domain name for a professional presence"
  },
  {
    title: "Lightning Fast",
    src: "https://images.unsplash.com/photo-1621839673705-6617adf9e890?q=80&w=1920&auto=format&fit=crop",
    icon: Zap,
    description: "Optimized performance with global CDN distribution"
  },
  {
    title: "Enhanced Security",
    src: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=1920&auto=format&fit=crop",
    icon: Shield,
    description: "Advanced encryption and protection for your content"
  },
  {
    title: "Developer Friendly",
    src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1920&auto=format&fit=crop",
    icon: Code,
    description: "API access and markdown support for technical content"
  }
];

export function LandingPage() {
  const taglineWords = [
    { text: "A", className: "text-zinc-200" },
    { text: "minimalist", className: "text-zinc-200" },
    { text: "blogging", className: "text-zinc-200" },
    { text: "platform", className: "text-zinc-200" },
    { text: "for", className: "text-zinc-200" },
    { text: "modern", className: "text-blue-500" },
    { text: "writers.", className: "text-blue-500" },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-zinc-900" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ 
              marginBottom: '3rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <div className="relative w-24 h-24 mb-6">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white via-zinc-300 to-zinc-600 animate-pulse" />
              <div className="absolute inset-1 rounded-full bg-black" />
              <Brain className="absolute inset-0 w-full h-full p-5 text-white" />
            </div>
            <h1 className="text-6xl font-bold tracking-tighter">
              <span className="bg-gradient-to-r from-white via-zinc-300 to-zinc-500 bg-clip-text text-transparent">
                Mind
              </span>
              <span className="bg-gradient-to-r from-zinc-500 via-zinc-300 to-white bg-clip-text text-transparent">
                Blogging
              </span>
            </h1>
          </motion.div>

          {/* Main headline using TextAnimate */}
          <div className="flex flex-col items-center gap-4 mb-8">
            <TextAnimate
              by="word"
              animation="blurInUp"
              className="text-7xl font-bold"
              delay={0.5}
              duration={0.5}
            >
              Write. Share. Impact.
            </TextAnimate>
          </div>

          {/* Tagline with TypewriterEffect */}
          <div className="mb-8">
            <TypewriterEffect 
              words={taglineWords} 
              className="text-xl"
              cursorClassName="h-6"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            style={{ 
              marginBottom: '3rem',
              display: 'flex',
              justifyContent: 'center',
              gap: '1rem',
              alignItems: 'center'
            }}
          >
            <Link 
              to="/register" 
              className="group px-8 py-4 bg-gradient-to-r from-white via-zinc-200 to-zinc-300 text-black rounded-lg font-medium hover:opacity-90 transition-all"
            >
              Start Writing
              <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/login" 
              className="px-8 py-4 border border-zinc-400 rounded-lg font-medium hover:bg-white hover:text-black transition-all"
            >
              Sign In
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-32 bg-night">
        <DotPattern
          width={24}
          height={24}
          cx={1}
          cy={1}
          cr={1}
          className="opacity-20"
          glow={true}
        />
        <div className="relative z-10 container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-white">Crafted for Excellence</h2>
          <p className="text-flashwhite text-center mb-16 max-w-2xl mx-auto">
            Every feature is thoughtfully designed to enhance your writing experience and help you reach a wider audience.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                variants={{
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 }
                }}
                style={{
                  padding: '2rem',
                  backgroundColor: '#dee2e6', // platinum color
                  borderRadius: '0.75rem',
                  border: '1px solid rgb(228 228 231)',
                  transition: 'border-color 0.2s ease'
                }}
                whileHover={{
                  borderColor: 'rgb(212 212 216)'
                }}
              >
                <feature.icon className="w-8 h-8 mb-4 text-black" />
                <h3 className="text-xl font-semibold mb-2 text-black">{feature.title}</h3>
                <p className="text-zinc-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-32 bg-gradient-to-b from-night to-space">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-white">Why Choose Us</h2>
          <p className="text-zinc-400 text-center mb-16 max-w-2xl mx-auto">
            Built with modern technology and designed for serious writers who value quality and performance.
          </p>
          <FocusCards 
            cards={benefits.map(benefit => ({
              title: benefit.title,
              src: benefit.src
            }))}
          />
        </div>
      </section>

      {/* Stats Section with Description */}
      <section className="py-32 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Growing Community</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Join thousands of writers and millions of readers who trust our platform for quality content.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: Feather, number: "100K+", label: "Active Writers" },
              { icon: Users, number: "1M+", label: "Monthly Readers" },
              { icon: BarChart, number: "500K+", label: "Articles Published" },
              { icon: Globe, number: "150+", label: "Countries Reached" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                style={{
                  padding: '1.5rem'
                }}
              >
                <stat.icon className="w-8 h-8 mb-4 mx-auto text-white" />
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-zinc-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 bg-platinum overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4 text-black">Ready to Start Writing?</h2>
          <p className="text-zinc-600 mb-8 max-w-2xl mx-auto">
            Join our community of writers and start sharing your stories with the world.
            No credit card required.
          </p>
          <Link 
            to="/register" 
            className="inline-flex items-center px-8 py-4 bg-black text-white rounded-lg font-medium hover:bg-zinc-800 transition-colors"
          >
            Create Your Blog
            <ArrowRight className="ml-2" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-zinc-900 border-t border-zinc-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-bold mb-4">MindBlogging</h3>
              <p className="text-zinc-400">Modern platform for modern writers.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-zinc-400">
                <li><Link to="/features">Features</Link></li>
                <li><Link to="/pricing">Pricing</Link></li>
                <li><Link to="/templates">Templates</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-zinc-400">
                <li><Link to="/about">About</Link></li>
                <li><Link to="/careers">Careers</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-zinc-400">
                <li><Link to="/privacy">Privacy</Link></li>
                <li><Link to="/terms">Terms</Link></li>
                <li><Link to="/security">Security</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-zinc-800 text-center text-zinc-500">
            <p>© 2024 MindBlogging. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

