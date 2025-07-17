import { TrendingUp, Star, Users, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'

interface TrendingItem {
  title: string
  author: string
  avatar?: string
  subscribers: string
  category: string
}

interface StaffPickItem {
  title: string
  author: string
  avatar?: string
  excerpt: string
}

const trendingItems: TrendingItem[] = [
  {
    title: "The Future of AI in Content Creation",
    author: "Sarah Chen",
    subscribers: "12.5K",
    category: "Technology"
  },
  {
    title: "Building Better Remote Teams",
    author: "Marcus Johnson",
    subscribers: "8.2K",
    category: "Business"
  },
  {
    title: "The Art of Minimalist Design",
    author: "Elena Rodriguez",
    subscribers: "15.1K",
    category: "Design"
  }
]

const staffPicks: StaffPickItem[] = [
  {
    title: "Why I Quit My Tech Job to Start a Newsletter",
    author: "David Kim",
    excerpt: "A personal journey from Silicon Valley to independent publishing..."
  },
  {
    title: "The Psychology of Color in Marketing",
    author: "Lisa Thompson",
    excerpt: "How different colors influence consumer behavior and decision making..."
  }
]

export function Sidebar() {
  return (
    <div className="space-y-6">
      {/* Trending */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-lg">
            <TrendingUp className="h-5 w-5 mr-2 text-primary" />
            Trending
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {trendingItems.map((item, index) => (
            <div key={index} className="flex items-start space-x-3 group cursor-pointer">
              <Avatar className="h-8 w-8 flex-shrink-0">
                <AvatarImage src={item.avatar} />
                <AvatarFallback>{item.author.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm text-gray-900 line-clamp-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h4>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs text-gray-600">{item.author}</span>
                  <span className="text-xs text-gray-400">·</span>
                  <span className="text-xs text-gray-500">{item.subscribers} subscribers</span>
                </div>
                <Badge variant="outline" className="text-xs mt-1">
                  {item.category}
                </Badge>
              </div>
            </div>
          ))}
          <Button variant="ghost" className="w-full justify-between text-sm">
            See all trending
            <ArrowRight className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>

      {/* Staff Picks */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-lg">
            <Star className="h-5 w-5 mr-2 text-primary" />
            Staff Picks
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {staffPicks.map((item, index) => (
            <div key={index} className="group cursor-pointer">
              <h4 className="font-medium text-sm text-gray-900 line-clamp-2 group-hover:text-primary transition-colors mb-1">
                {item.title}
              </h4>
              <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                {item.excerpt}
              </p>
              <span className="text-xs text-gray-500">by {item.author}</span>
            </div>
          ))}
          <Button variant="ghost" className="w-full justify-between text-sm">
            More staff picks
            <ArrowRight className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>

      {/* Discover Writers */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-lg">
            <Users className="h-5 w-5 mr-2 text-primary" />
            Discover Writers
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {trendingItems.slice(0, 3).map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={item.avatar} />
                  <AvatarFallback>{item.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-sm text-gray-900">{item.author}</div>
                  <div className="text-xs text-gray-500">{item.subscribers} subscribers</div>
                </div>
              </div>
              <Button size="sm" variant="outline" className="text-xs">
                Follow
              </Button>
            </div>
          ))}
          <Button variant="ghost" className="w-full justify-between text-sm">
            See all writers
            <ArrowRight className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}