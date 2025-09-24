import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GalleryProps, GalleryItem } from '../types';
import GalleryItemComponent from './GalleryItem';
import Lightbox from './Lightbox';
import FilterBar from './FilterBar';
import SearchBar from './SearchBar';

const StunningGallery: React.FC<GalleryProps> = ({
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
    const cats = [...new Set(items.map(item => item.category).filter(Boolean))] as string[];
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

  return (
    <div className={`stunning-gallery ${theme === 'dark' ? 'dark' : ''} ${className}`}>
      {/* Search Bar */}
      {showSearch && (
        <SearchBar
          onSearchChange={handleSearchChange}
          placeholder="Search your gallery..."
        />
      )}

      {/* Filter Bar */}
      {showFilters && categories.length > 0 && (
        <FilterBar
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
      )}

      {/* Gallery Container */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`${getLayoutClasses()}`}
        style={{ gap: `${gap}px` }}
      >
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className={getItemClasses()}
            >
              <GalleryItemComponent
                item={item}
                index={index}
                hoverEffect={hoverEffect}
                animationDuration={animationDuration}
                onClick={handleItemClick}
                enableLazyLoading={enableLazyLoading}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* No Results */}
      {filteredItems.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
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
        </motion.div>
      )}

      {/* Lightbox */}
      {showLightbox && (
        <Lightbox
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          currentItem={filteredItems[currentLightboxIndex] || null}
          items={filteredItems}
          currentIndex={currentLightboxIndex}
          onNext={handleLightboxNext}
          onPrevious={handleLightboxPrevious}
        />
      )}
    </div>
  );
};

export default StunningGallery;
