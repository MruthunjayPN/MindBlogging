import { useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { userAuthSchema } from '@/common/validations/auth.schema';
import { useAuth } from '@/contexts/auth-context';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ShinyButton } from '@/components/magicui/shiny-button';
import { ShineBorder } from "@/components/magicui/shine-border";
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
  },
  { 
    id: 4, 
    text: "What sets Mind-Blogging apart is its amazing community. The feedback system and peer reviews have helped me improve my technical writing significantly.", 
    author: "Sarah Wilson, DevOps Engineer" 
  },
  { 
    id: 5, 
    text: "The analytics dashboard provides invaluable insights into how my articles perform. It's helped me understand my audience better and create more engaging content.", 
    author: "Alex Brown, Full Stack Developer" 
  },
];

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(userAuthSchema.signup)
  });

  const onSubmit = async (data: z.infer<typeof userAuthSchema.signup>) => {
    try {
      await registerUser(data.email, data.password, data.name);
      navigate({ to: '/' });
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  const TestimonialCard = ({ text, author }: { text: string, author: string }) => (
    <div className="bg-primary/5 backdrop-blur-sm border border-primary/10 rounded-lg p-6 mx-4 w-96">
      <p className="text-base text-primary leading-relaxed">{text}</p>
      <p className="text-sm text-primary/60 mt-3 font-medium">- {author}</p>
    </div>
  );

  return (
    <div className="min-h-screen grid grid-cols-2">
      {/* Left side - Registration Form */}
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-md relative overflow-hidden">
          <ShineBorder className="absolute inset-0" />
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl flex justify-center">Register</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <Input
                    placeholder="Name"
                    {...register('name')}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500">{errors.name.message as string}</p>
                  )}
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Email"
                    {...register('email')}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email.message as string}</p>
                  )}
                </div>
                <div>
                  <Input
                    type="password"
                    placeholder="Password"
                    {...register('password')}
                  />
                  {errors.password && (
                    <p className="text-sm text-red-500">{errors.password.message as string}</p>
                  )}
                </div>
                <ShinyButton className="w-full mt-2">
                  Register
                </ShinyButton>
              </form>
              <div className="text-center mt-4">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{' '}
                  <a href="/login" className="text-primary hover:underline">
                    Signin
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right side - Testimonials */}
      <div className="bg-slate-50 flex flex-col justify-center overflow-hidden">
        <div className="py-24 space-y-24">
          <Marquee className="[--gap:theme(spacing.6)]" pauseOnHover>
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} {...testimonial} />
            ))}
          </Marquee>
          <Marquee className="[--gap:theme(spacing.6)]" reverse pauseOnHover>
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} {...testimonial} />
            ))}
          </Marquee>
        </div>
      </div>
    </div>
  );
} 