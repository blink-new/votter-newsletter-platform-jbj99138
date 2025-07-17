import { Heart, MessageCircle, Bookmark, MoreHorizontal } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'

interface NewsletterCardProps {
  title: string
  excerpt: string
  author: {
    name: string
    avatar?: string
    handle: string
  }
  publishedAt: string
  readTime: string
  category: string
  likes: number
  comments: number
  isLiked?: boolean
  isBookmarked?: boolean
  coverImage?: string
}

export function NewsletterCard({
  title,
  excerpt,
  author,
  publishedAt,
  readTime,
  category,
  likes,
  comments,
  isLiked = false,
  isBookmarked = false,
  coverImage
}: NewsletterCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-200 border-gray-200 hover:border-gray-300">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          {/* Author Avatar */}
          <Avatar className="h-10 w-10 flex-shrink-0">
            <AvatarImage src={author.avatar} />
            <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
          </Avatar>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Author Info */}
            <div className="flex items-center space-x-2 mb-2">
              <span className="font-medium text-gray-900">{author.name}</span>
              <span className="text-gray-500">@{author.handle}</span>
              <span className="text-gray-400">·</span>
              <span className="text-gray-500 text-sm">{publishedAt}</span>
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              {title}
            </h3>

            {/* Excerpt */}
            <p className="text-gray-600 text-sm mb-3 line-clamp-3">
              {excerpt}
            </p>

            {/* Cover Image */}
            {coverImage && (
              <div className="mb-4">
                <img
                  src={coverImage}
                  alt={title}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            )}

            {/* Meta Info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Badge variant="secondary" className="text-xs">
                  {category}
                </Badge>
                <span className="text-gray-500 text-sm">{readTime} read</span>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`h-8 px-2 ${isLiked ? 'text-red-500' : 'text-gray-500'} hover:text-red-500`}
                >
                  <Heart className={`h-4 w-4 mr-1 ${isLiked ? 'fill-current' : ''}`} />
                  <span className="text-xs">{likes}</span>
                </Button>

                <Button variant="ghost" size="sm" className="h-8 px-2 text-gray-500 hover:text-gray-700">
                  <MessageCircle className="h-4 w-4 mr-1" />
                  <span className="text-xs">{comments}</span>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className={`h-8 px-2 ${isBookmarked ? 'text-primary' : 'text-gray-500'} hover:text-primary`}
                >
                  <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
                </Button>

                <Button variant="ghost" size="sm" className="h-8 px-2 text-gray-500 hover:text-gray-700">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}