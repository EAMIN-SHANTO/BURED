import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

interface BlogPost {
  title: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  createdAt: string;
  author: {
    username: string;
  };
}

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`${API_URL}/api/blog/${slug}`);
        const data = await res.json();

        if (data.success) {
          setPost(data.post);
        } else {
          setError('Failed to fetch blog post');
        }
      } catch (err) {
        setError('Failed to fetch blog post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug, API_URL]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
            {error || 'Post not found'}
          </div>
          <Link to="/blog" className="mt-4 inline-block text-blue-600 hover:underline">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/blog" className="text-blue-600 hover:underline">
          ← Back to Blog
        </Link>

        <div className="mt-8">
          <img
            src={post.coverImage.startsWith('/uploads') 
              ? `${API_URL}${post.coverImage}`
              : post.coverImage}
            alt={post.title}
            className="w-full h-64 object-cover rounded-lg"
            onError={(e) => {
              e.currentTarget.src = '/photos/other/placeholder.jpg';
            }}
          />

          <div className="mt-8">
            <div className="flex items-center gap-4 mb-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {post.category}
              </span>
              <span className="text-sm text-gray-500">
                {new Date(post.createdAt).toLocaleDateString()}
              </span>
            </div>

            <h1 className="text-4xl font-bold text-gray-900">{post.title}</h1>
            
            <div className="mt-4 flex items-center">
              <span className="text-gray-600">By {post.author.username}</span>
            </div>

            {post.tags.length > 0 && (
              <div className="mt-4 flex gap-2">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div 
              className="mt-8 prose prose-blue max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogPost; 