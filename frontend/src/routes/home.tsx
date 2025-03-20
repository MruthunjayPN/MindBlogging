import { useQuery } from '@tanstack/react-query';
import { blogApi } from '@/lib/api/blog';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Skeleton } from "@/components/ui/skeleton";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import type { Post } from '@/types/api';
import { useState, useRef } from 'react';
import { useOutsideClick } from '@/hooks/useOutsideClick';

export default function HomePage() {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const blogRef = useRef<HTMLDivElement>(null);
  
  useOutsideClick(blogRef as React.RefObject<HTMLDivElement>, () => {
    setSelectedPost(null);
  });

  const { data: posts, isLoading } = useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: async () => {
      const response = await blogApi.getPosts();
      return response.data;
    },
  });

  const BlogSkeleton = () => (
    <Card className="cursor-not-allowed">
      <CardHeader>
        <Skeleton className="h-8 w-3/4" />
      </CardHeader>
      <CardContent className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
      </CardContent>
    </Card>
  );

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          {[1, 2, 3].map((index) => (
            <BlogSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  const hoverItems = posts?.map(post => ({
    title: post.title,
    description: post.content.substring(0, 150) + "...",
    link: '#',
    onClick: () => setSelectedPost(post)
  })) || [];

  return (
    <div className="relative">
      {/* Main content */}
      <div className={`container mx-auto bg-flashwhite dark:bg-night px-4 py-8 transition-all duration-300 ${selectedPost ? 'blur-sm' : ''}`}>
        <h1 className="text-4xl font-bold mb-8 text-center">Latest Posts</h1>
        <HoverEffect items={hoverItems} className="max-w-3xl mx-auto" />
      </div>

      {/* Selected post overlay */}
      {selectedPost && (
        <div className="fixed inset-0 bg-eblack/80 dark:bg-night/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div 
            ref={blogRef}
            className="bg-flashwhite dark:bg-onyx rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border scrollbar-thin scrollbar-thumb-slate-400 border-slategray dark:border-onyx dark:scrollbar-thumb-slate-700 scrollbar-track-transparent"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgb(148 163 184) transparent'
            }}
          >
            <Card className="border-none shadow-none bg-transparent">
              <CardHeader className="px-10 pt-10">
                <CardTitle className="text-3xl">
                  {selectedPost.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="px-10 pb-10">
                <div className="prose prose-lg max-w-none dark:prose-invert">
                  {selectedPost.content}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
