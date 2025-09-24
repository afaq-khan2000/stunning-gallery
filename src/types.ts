export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  title?: string;
  description?: string;
  category?: string;
  tags?: string[];
  width?: number;
  height?: number;
}

export interface GalleryProps {
  items: GalleryItem[];
  layout?: 'masonry' | 'grid' | 'carousel' | 'stack';
  columns?: number;
  gap?: number;
  showLightbox?: boolean;
  showFilters?: boolean;
  showSearch?: boolean;
  enableLazyLoading?: boolean;
  animationDuration?: number;
  hoverEffect?: 'scale' | 'glow' | 'slide' | 'rotate' | 'none';
  theme?: 'light' | 'dark' | 'auto';
  className?: string;
  onItemClick?: (item: GalleryItem, index: number) => void;
  onFilterChange?: (filter: string) => void;
  onSearchChange?: (query: string) => void;
}

export interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  currentItem: GalleryItem | null;
  items: GalleryItem[];
  currentIndex: number;
  onNext: () => void;
  onPrevious: () => void;
}

export interface FilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export interface SearchProps {
  onSearchChange: (query: string) => void;
  placeholder?: string;
}
