import React, { useState, useMemo, useCallback } from 'react';
import { GalleryProps, GalleryItem } from '../types';

const SimpleGallery: React.FC<GalleryProps> = ({
  items,
  layout = 'masonry',
  columns = 3,
  gap = 16,
  showLightbox = true,
  showFilters = true,
  showSearch = true,
  enableLazyLoading = true,
  animationDuration = 500,
  hoverEffect = 'scale',
  theme = 'auto',
  className = '',
  onItemClick,
  onFilterChange,
  onSearchChange,
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentLightboxIndex, setCurrentLightboxIndex] = useState(0);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = [...new Set(items.map(item => item.category).filter(Boolean))];
    return cats;
  }, [items]);

  // Filter and search items
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch = searchQuery === '' || 
        item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.alt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesCategory && matchesSearch;
    });
  }, [items, selectedCategory, searchQuery]);

  const handleItemClick = useCallback((item: GalleryItem, index: number) => {
    if (onItemClick) {
      onItemClick(item, index);
    }
    
    if (showLightbox) {
      setCurrentLightboxIndex(index);
      setLightboxOpen(true);
    }
  }, [onItemClick, showLightbox]);

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
    if (onFilterChange) {
      onFilterChange(category);
    }
  }, [onFilterChange]);

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
    if (onSearchChange) {
      onSearchChange(query);
    }
  }, [onSearchChange]);

  const handleLightboxNext = useCallback(() => {
    setCurrentLightboxIndex((prev) => (prev + 1) % filteredItems.length);
  }, [filteredItems.length]);

  const handleLightboxPrevious = useCallback(() => {
    setCurrentLightboxIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
  }, [filteredItems.length]);

  const getLayoutClasses = () => {
    switch (layout) {
      case 'grid':
        return `grid grid-cols-${columns} gap-${gap}`;
      case 'carousel':
        return 'flex overflow-x-auto gap-4 pb-4';
      case 'stack':
        return 'flex flex-col gap-4';
      case 'masonry':
      default:
        return 'columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4';
    }
  };

  const getItemClasses = () => {
    switch (layout) {
      case 'grid':
        return 'break-inside-avoid';
      case 'carousel':
        return 'flex-shrink-0 w-80';
      case 'stack':
        return 'w-full';
      case 'masonry':
      default:
        return 'break-inside-avoid mb-4';
    }
  };

  const getHoverClasses = () => {
    switch (hoverEffect) {
      case 'scale':
        return 'hover:scale-105';
      case 'glow':
        return 'hover:shadow-lg hover:shadow-blue-500/25';
      case 'slide':
        return 'hover:-translate-y-2';
      case 'rotate':
        return 'hover:rotate-1';
      default:
        return '';
    }
  };

  return (
    <div className={`stunning-gallery ${theme === 'dark' ? 'dark' : ''} ${className}`}>
      {/* Search Bar */}
      {showSearch && (
        <div className="relative mb-6">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search your gallery..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </div>
          </div>
        </div>
      )}

      {/* Filter Bar */}
      {showFilters && categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => handleCategoryChange('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedCategory === 'all'
                ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300'
            }`}
          >
            All
          </button>
          
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {/* Gallery Container */}
      <div className={`${getLayoutClasses()}`} style={{ gap: `${gap}px` }}>
        {filteredItems.map((item, index) => (
          <div
            key={item.id}
            className={`${getItemClasses()} group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer ${getHoverClasses()}`}
            onClick={() => handleItemClick(item, index)}
          >
            <img
              src={item.src}
              alt={item.alt}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              loading={enableLazyLoading ? "lazy" : "eager"}
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="text-white text-center p-4">
                {item.title && (
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                )}
                {item.description && (
                  <p className="text-sm text-gray-200">{item.description}</p>
                )}
                {item.category && (
                  <span className="inline-block px-2 py-1 bg-blue-500 rounded-full text-xs mt-2">
                    {item.category}
                  </span>
                )}
              </div>
            </div>

            {/* Floating tags */}
            {item.tags && item.tags.length > 0 && (
              <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                {item.tags.slice(0, 3).map((tag, tagIndex) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-white/90 text-gray-800 text-xs rounded-full shadow-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 dark:text-gray-400 text-lg">
            No images found matching your criteria
          </div>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Lightbox */}
      {showLightbox && lightboxOpen && filteredItems[currentLightboxIndex] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
          <div className="relative max-w-7xl max-h-[90vh] w-full mx-4">
            {/* Close Button */}
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
            >
              ✕
            </button>

            {/* Navigation Buttons */}
            {filteredItems.length > 1 && (
              <>
                <button
                  onClick={handleLightboxPrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                >
                  ‹
                </button>
                
                <button
                  onClick={handleLightboxNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                >
                  ›
                </button>
              </>
            )}

            {/* Image */}
            <img
              src={filteredItems[currentLightboxIndex].src}
              alt={filteredItems[currentLightboxIndex].alt}
              className="w-full h-full object-contain rounded-lg shadow-2xl"
            />

            {/* Image Info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
              <div className="flex items-center justify-between">
                <div className="text-white">
                  <h3 className="text-xl font-semibold mb-1">
                    {filteredItems[currentLightboxIndex].title || filteredItems[currentLightboxIndex].alt}
                  </h3>
                  {filteredItems[currentLightboxIndex].description && (
                    <p className="text-gray-300 text-sm">
                      {filteredItems[currentLightboxIndex].description}
                    </p>
                  )}
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                    <span>{currentLightboxIndex + 1} of {filteredItems.length}</span>
                    {filteredItems[currentLightboxIndex].category && (
                      <span className="px-2 py-1 bg-white/20 rounded-full">
                        {filteredItems[currentLightboxIndex].category}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SimpleGallery;
