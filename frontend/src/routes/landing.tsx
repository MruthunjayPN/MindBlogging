import { Link } from '@tanstack/react-router';
import { ShinyButton } from '@/components/magicui/shiny-button';
import { Marquee } from "@/components/magicui/marquee";

const testimonials = [
  { 
    id: 1, 
    text: "Mind-Blogging has transformed how I share my technical insights. The platform's markdown support and code highlighting features make it perfect for creating detailed programming tutorials.", 
    author: "John Doe, Senior Software Engineer" 
  },
  { 
    id: 2, 
    text: "As a tech writer, I've tried many platforms, but Mind-Blogging stands out with its clean interface and excellent SEO features. My articles now reach a much wider audience.", 
    author: "Jane Smith, Technical Content Creator" 
  },
  { 
    id: 3, 
    text: "The developer-focused features like GitHub integration and automatic syntax highlighting have made this my go-to platform for publishing engineering articles.", 
    author: "Mike Johnson, Systems Architect" 
  }
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-20 pb-32">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
              MindBlogging
            </span>
          </h1>
          <p className="text-2xl text-slate-600 dark:text-slate-300 mb-12">
            The ultimate platform for developers to share their knowledge, experiences, and insights with the global tech community.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/login">
              <ShinyButton className="px-8 py-3 text-lg">
                Login
              </ShinyButton>
            </Link>
            <Link to="/register">
              <ShinyButton className="px-8 py-3 text-lg">
                Register
              </ShinyButton>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white/50 dark:bg-slate-800/50 py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-4">Markdown Support</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Write your posts in Markdown with advanced code highlighting and formatting options.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-4">SEO Optimized</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Built-in SEO tools to help your content reach a wider audience.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-4">Developer Community</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Connect with like-minded developers and share your expertise.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-24">
        <Marquee className="[--gap:theme(spacing.8)]" pauseOnHover>
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm rounded-xl p-6 w-96 mx-4"
            >
              <p className="text-slate-700 dark:text-slate-200 mb-4">{testimonial.text}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">- {testimonial.author}</p>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
}