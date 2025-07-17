import { Tabs, TabsList, TabsTrigger } from './ui/tabs'

const categories = [
  'For you',
  'Technology',
  'Business',
  'Design',
  'Politics',
  'Culture',
  'Science',
  'Health',
  'Finance',
  'Education'
]

interface CategoryTabsProps {
  activeCategory: string
  onCategoryChange: (category: string) => void
}

export function CategoryTabs({ activeCategory, onCategoryChange }: CategoryTabsProps) {
  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="container mx-auto px-4">
        <Tabs value={activeCategory} onValueChange={onCategoryChange} className="w-full">
          <TabsList className="h-12 w-full justify-start bg-transparent p-0 space-x-8">
            {categories.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className="relative h-12 rounded-none border-b-2 border-transparent bg-transparent px-0 pb-3 pt-2 font-medium text-gray-600 shadow-none transition-all data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none hover:text-gray-900"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </div>
  )
}