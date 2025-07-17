import { useState } from 'react'
import { Header } from './Header'
import { CategoryTabs } from './CategoryTabs'
import { NewsletterCard } from './NewsletterCard'
import { Sidebar } from './Sidebar'

// Mock data for newsletters
const mockNewsletters = [
  {
    title: "The Future of Remote Work: 5 Trends That Will Shape 2024",
    excerpt: "As we move into 2024, remote work continues to evolve. From AI-powered collaboration tools to new management philosophies, here are the key trends every leader should know about.",
    author: {
      name: "Sarah Chen",
      handle: "sarahchen",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    publishedAt: "2 hours ago",
    readTime: "8 min",
    category: "Business",
    likes: 142,
    comments: 23,
    isLiked: false,
    isBookmarked: true,
    coverImage: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=300&fit=crop"
  },
  {
    title: "Building Accessible Design Systems: A Complete Guide",
    excerpt: "Accessibility shouldn't be an afterthought. Learn how to build design systems that work for everyone, from the ground up. This comprehensive guide covers everything from color contrast to screen reader compatibility.",
    author: {
      name: "Marcus Johnson",
      handle: "marcusj",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    publishedAt: "4 hours ago",
    readTime: "12 min",
    category: "Design",
    likes: 89,
    comments: 15,
    isLiked: true,
    isBookmarked: false
  },
  {
    title: "The Psychology Behind Viral Content: What Makes People Share?",
    excerpt: "After analyzing 10,000 viral posts, we discovered the psychological triggers that make content irresistible. Here's what we learned and how you can apply it to your own content strategy.",
    author: {
      name: "Elena Rodriguez",
      handle: "elenarod",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    publishedAt: "6 hours ago",
    readTime: "6 min",
    category: "Culture",
    likes: 234,
    comments: 45,
    isLiked: false,
    isBookmarked: false,
    coverImage: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=300&fit=crop"
  },
  {
    title: "Cryptocurrency Regulation: What's Coming in 2024",
    excerpt: "New regulations are reshaping the crypto landscape. From SEC guidelines to international cooperation, here's what investors and developers need to know about the changing regulatory environment.",
    author: {
      name: "David Kim",
      handle: "davidkim",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    publishedAt: "8 hours ago",
    readTime: "10 min",
    category: "Finance",
    likes: 156,
    comments: 67,
    isLiked: false,
    isBookmarked: true
  },
  {
    title: "The Science of Sleep: How to Optimize Your Rest for Peak Performance",
    excerpt: "Sleep isn't just downtime—it's when your brain consolidates memories, repairs itself, and prepares for the next day. Discover the latest research on sleep optimization and practical tips for better rest.",
    author: {
      name: "Dr. Lisa Thompson",
      handle: "drlisathompson",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face"
    },
    publishedAt: "12 hours ago",
    readTime: "9 min",
    category: "Health",
    likes: 198,
    comments: 34,
    isLiked: true,
    isBookmarked: false,
    coverImage: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&h=300&fit=crop"
  },
  {
    title: "Machine Learning in Healthcare: Breakthrough Applications",
    excerpt: "From drug discovery to personalized treatment plans, AI is revolutionizing healthcare. Explore the most promising applications of machine learning in medicine and their potential impact on patient outcomes.",
    author: {
      name: "Dr. James Wilson",
      handle: "drjameswilson",
      avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face"
    },
    publishedAt: "1 day ago",
    readTime: "11 min",
    category: "Science",
    likes: 267,
    comments: 52,
    isLiked: false,
    isBookmarked: false
  }
]

export function HomePage() {
  const [activeCategory, setActiveCategory] = useState('For you')

  const filteredNewsletters = activeCategory === 'For you' 
    ? mockNewsletters 
    : mockNewsletters.filter(newsletter => newsletter.category === activeCategory)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <CategoryTabs 
        activeCategory={activeCategory} 
        onCategoryChange={setActiveCategory} 
      />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {filteredNewsletters.length > 0 ? (
                filteredNewsletters.map((newsletter, index) => (
                  <NewsletterCard key={index} {...newsletter} />
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">No newsletters found in this category.</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Sidebar />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}