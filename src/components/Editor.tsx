import { useState, useRef, useEffect } from 'react'
import { 
  Bold, 
  Italic, 
  Underline, 
  Link, 
  Image, 
  Quote, 
  List, 
  ListOrdered, 
  Heading1, 
  Heading2, 
  Heading3,
  Code,
  Minus,
  Eye,
  Save,
  Send,
  Settings,
  X,
  Upload,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo,
  Redo,
  MoreHorizontal
} from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { Separator } from './ui/separator'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Label } from './ui/label'
import { Switch } from './ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'

interface EditorProps {
  onClose?: () => void
}

export function Editor({ onClose }: EditorProps) {
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [content, setContent] = useState('')
  const [coverImage, setCoverImage] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState('')
  const [isPreview, setIsPreview] = useState(false)
  const [isDraft, setIsDraft] = useState(true)
  const [publishSettings, setPublishSettings] = useState({
    emailSubscribers: true,
    socialShare: true,
    comments: true,
    paywall: false
  })
  
  const editorRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Auto-save functionality
  useEffect(() => {
    const interval = setInterval(() => {
      if (title || content) {
        // Auto-save logic would go here
        console.log('Auto-saving draft...')
      }
    }, 30000) // Auto-save every 30 seconds

    return () => clearInterval(interval)
  }, [title, content])

  const formatText = (command: string, value?: string) => {
    document.execCommand(command, false, value)
    editorRef.current?.focus()
  }

  const insertImage = () => {
    fileInputRef.current?.click()
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string
        document.execCommand('insertImage', false, imageUrl)
      }
      reader.readAsDataURL(file)
    }
  }

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      addTag()
    }
  }

  const saveDraft = () => {
    console.log('Saving draft...', { title, subtitle, content, tags, coverImage })
    // Save draft logic would go here
  }

  const publishPost = () => {
    console.log('Publishing post...', { 
      title, 
      subtitle, 
      content, 
      tags, 
      coverImage, 
      publishSettings 
    })
    // Publish logic would go here
  }

  const ToolbarButton = ({ icon: Icon, tooltip, onClick, isActive = false }: {
    icon: any
    tooltip: string
    onClick: () => void
    isActive?: boolean
  }) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={isActive ? "default" : "ghost"}
            size="sm"
            onClick={onClick}
            className="h-8 w-8 p-0"
          >
            <Icon className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
              <div className="flex items-center space-x-2">
                <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-white font-bold text-sm">V</span>
                </div>
                <span className="font-semibold">Votter</span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Badge variant={isDraft ? "secondary" : "default"}>
                {isDraft ? "Draft" : "Published"}
              </Badge>
              
              <Button variant="ghost" size="sm" onClick={() => setIsPreview(!isPreview)}>
                <Eye className="h-4 w-4 mr-2" />
                {isPreview ? "Edit" : "Preview"}
              </Button>
              
              <Button variant="ghost" size="sm" onClick={saveDraft}>
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>

              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-primary hover:bg-primary/90">
                    <Send className="h-4 w-4 mr-2" />
                    Publish
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Publish Settings</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-subscribers">Email to subscribers</Label>
                      <Switch
                        id="email-subscribers"
                        checked={publishSettings.emailSubscribers}
                        onCheckedChange={(checked) => 
                          setPublishSettings(prev => ({ ...prev, emailSubscribers: checked }))
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="social-share">Enable social sharing</Label>
                      <Switch
                        id="social-share"
                        checked={publishSettings.socialShare}
                        onCheckedChange={(checked) => 
                          setPublishSettings(prev => ({ ...prev, socialShare: checked }))
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="comments">Allow comments</Label>
                      <Switch
                        id="comments"
                        checked={publishSettings.comments}
                        onCheckedChange={(checked) => 
                          setPublishSettings(prev => ({ ...prev, comments: checked }))
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="paywall">Behind paywall</Label>
                      <Switch
                        id="paywall"
                        checked={publishSettings.paywall}
                        onCheckedChange={(checked) => 
                          setPublishSettings(prev => ({ ...prev, paywall: checked }))
                        }
                      />
                    </div>
                    <Button onClick={publishPost} className="w-full">
                      Publish Now
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {!isPreview ? (
          /* Editor Mode */
          <div className="space-y-6">
            {/* Cover Image */}
            <div className="space-y-2">
              <Label>Cover Image (Optional)</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                {coverImage ? (
                  <div className="relative">
                    <img 
                      src={coverImage} 
                      alt="Cover" 
                      className="max-h-64 mx-auto rounded-lg"
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => setCoverImage('')}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="h-8 w-8 mx-auto text-gray-400" />
                    <div>
                      <Button variant="outline" onClick={() => document.getElementById('cover-upload')?.click()}>
                        Upload Cover Image
                      </Button>
                      <input
                        id="cover-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            const reader = new FileReader()
                            reader.onload = (e) => setCoverImage(e.target?.result as string)
                            reader.readAsDataURL(file)
                          }
                        }}
                      />
                    </div>
                    <p className="text-sm text-gray-500">
                      Drag and drop an image, or click to browse
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <Input
                placeholder="Post title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-3xl font-bold border-none px-0 py-4 placeholder:text-gray-400 focus-visible:ring-0"
              />
            </div>

            {/* Subtitle */}
            <div className="space-y-2">
              <Textarea
                placeholder="Write a subtitle or summary..."
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className="text-lg text-gray-600 border-none px-0 py-2 resize-none placeholder:text-gray-400 focus-visible:ring-0"
                rows={2}
              />
            </div>

            <Separator />

            {/* Formatting Toolbar */}
            <div className="sticky top-16 z-40 bg-white border rounded-lg p-2">
              <div className="flex items-center space-x-1 flex-wrap gap-1">
                <ToolbarButton
                  icon={Undo}
                  tooltip="Undo"
                  onClick={() => document.execCommand('undo')}
                />
                <ToolbarButton
                  icon={Redo}
                  tooltip="Redo"
                  onClick={() => document.execCommand('redo')}
                />
                
                <Separator orientation="vertical" className="h-6 mx-2" />
                
                <ToolbarButton
                  icon={Heading1}
                  tooltip="Heading 1"
                  onClick={() => formatText('formatBlock', 'h1')}
                />
                <ToolbarButton
                  icon={Heading2}
                  tooltip="Heading 2"
                  onClick={() => formatText('formatBlock', 'h2')}
                />
                <ToolbarButton
                  icon={Heading3}
                  tooltip="Heading 3"
                  onClick={() => formatText('formatBlock', 'h3')}
                />
                
                <Separator orientation="vertical" className="h-6 mx-2" />
                
                <ToolbarButton
                  icon={Bold}
                  tooltip="Bold"
                  onClick={() => formatText('bold')}
                />
                <ToolbarButton
                  icon={Italic}
                  tooltip="Italic"
                  onClick={() => formatText('italic')}
                />
                <ToolbarButton
                  icon={Underline}
                  tooltip="Underline"
                  onClick={() => formatText('underline')}
                />
                
                <Separator orientation="vertical" className="h-6 mx-2" />
                
                <ToolbarButton
                  icon={AlignLeft}
                  tooltip="Align Left"
                  onClick={() => formatText('justifyLeft')}
                />
                <ToolbarButton
                  icon={AlignCenter}
                  tooltip="Align Center"
                  onClick={() => formatText('justifyCenter')}
                />
                <ToolbarButton
                  icon={AlignRight}
                  tooltip="Align Right"
                  onClick={() => formatText('justifyRight')}
                />
                
                <Separator orientation="vertical" className="h-6 mx-2" />
                
                <ToolbarButton
                  icon={List}
                  tooltip="Bullet List"
                  onClick={() => formatText('insertUnorderedList')}
                />
                <ToolbarButton
                  icon={ListOrdered}
                  tooltip="Numbered List"
                  onClick={() => formatText('insertOrderedList')}
                />
                <ToolbarButton
                  icon={Quote}
                  tooltip="Quote"
                  onClick={() => formatText('formatBlock', 'blockquote')}
                />
                
                <Separator orientation="vertical" className="h-6 mx-2" />
                
                <ToolbarButton
                  icon={Link}
                  tooltip="Insert Link"
                  onClick={() => {
                    const url = prompt('Enter URL:')
                    if (url) formatText('createLink', url)
                  }}
                />
                <ToolbarButton
                  icon={Image}
                  tooltip="Insert Image"
                  onClick={insertImage}
                />
                <ToolbarButton
                  icon={Code}
                  tooltip="Code"
                  onClick={() => formatText('formatBlock', 'pre')}
                />
                <ToolbarButton
                  icon={Minus}
                  tooltip="Divider"
                  onClick={() => formatText('insertHorizontalRule')}
                />
              </div>
            </div>

            {/* Content Editor */}
            <div className="space-y-4">
              <div
                ref={editorRef}
                contentEditable
                className="min-h-[400px] p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 prose prose-lg max-w-none"
                style={{ 
                  lineHeight: '1.6',
                  fontSize: '18px'
                }}
                onInput={(e) => setContent(e.currentTarget.innerHTML)}
                suppressContentEditableWarning={true}
                placeholder="Start writing your newsletter..."
              />
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <Label>Tags</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="px-2 py-1">
                    {tag}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 ml-1 hover:bg-transparent"
                      onClick={() => removeTag(tag)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
              <div className="flex space-x-2">
                <Input
                  placeholder="Add a tag..."
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                />
                <Button onClick={addTag} variant="outline">
                  Add
                </Button>
              </div>
            </div>
          </div>
        ) : (
          /* Preview Mode */
          <div className="space-y-6">
            {coverImage && (
              <img 
                src={coverImage} 
                alt="Cover" 
                className="w-full max-h-96 object-cover rounded-lg"
              />
            )}
            
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-gray-900">{title || "Untitled Post"}</h1>
              {subtitle && (
                <p className="text-xl text-gray-600 leading-relaxed">{subtitle}</p>
              )}
              
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>By You</span>
                <span>•</span>
                <span>{new Date().toLocaleDateString()}</span>
                <span>•</span>
                <span>5 min read</span>
              </div>
              
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <Separator />

            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: content || "<p>Start writing to see your preview...</p>" }}
            />
          </div>
        )}
      </div>
    </div>
  )
}