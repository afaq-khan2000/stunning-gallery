import React from 'react';
import { StunningGallery } from 'stunning-gallery';
import 'stunning-gallery/dist/styles.css';

// Example usage of the Stunning Gallery
const ExampleGallery = () => {
  // Sample gallery data
  const galleryItems = [
    {
      id: '1',
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      alt: 'Beautiful Mountain Landscape',
      title: 'Majestic Mountains',
      description: 'A breathtaking view of snow-capped peaks',
      category: 'Nature',
      tags: ['mountains', 'landscape', 'snow']
    },
    {
      id: '2',
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=1000&fit=crop',
      alt: 'Ocean Waves',
      title: 'Ocean Waves',
      description: 'Powerful waves crashing against the shore',
      category: 'Nature',
      tags: ['ocean', 'waves', 'blue']
    },
    {
      id: '3',
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop',
      alt: 'Forest Path',
      title: 'Enchanted Forest',
      description: 'A mystical path through ancient trees',
      category: 'Nature',
      tags: ['forest', 'trees', 'path']
    },
    {
      id: '4',
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=700&fit=crop',
      alt: 'City Skyline',
      title: 'Urban Dreams',
      description: 'Modern architecture against the sky',
      category: 'Urban',
      tags: ['city', 'architecture', 'modern']
    },
    {
      id: '5',
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      alt: 'Sunset Beach',
      title: 'Golden Hour',
      description: 'The perfect sunset over the ocean',
      category: 'Nature',
      tags: ['sunset', 'beach', 'golden']
    },
    {
      id: '6',
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=800&fit=crop',
      alt: 'Abstract Art',
      title: 'Colorful Chaos',
      description: 'Vibrant abstract composition',
      category: 'Art',
      tags: ['abstract', 'colorful', 'art']
    }
  ];

  // Event handlers
  const handleItemClick = (item: any, index: number) => {
    console.log('Clicked item:', item, 'at index:', index);
  };

  const handleFilterChange = (category: string) => {
    console.log('Filter changed to:', category);
  };

  const handleSearchChange = (query: string) => {
    console.log('Search query:', query);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Stunning Gallery Examples
        </h1>
        
        {/* Basic Gallery */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
            Basic Gallery
          </h2>
          <StunningGallery
            items={galleryItems}
            layout="masonry"
            showLightbox={true}
            showFilters={true}
            showSearch={true}
            onItemClick={handleItemClick}
            onFilterChange={handleFilterChange}
            onSearchChange={handleSearchChange}
          />
        </section>

        {/* Grid Layout */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
            Grid Layout
          </h2>
          <StunningGallery
            items={galleryItems}
            layout="grid"
            columns={4}
            gap={20}
            hoverEffect="glow"
            theme="dark"
          />
        </section>

        {/* Carousel Layout */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
            Carousel Layout
          </h2>
          <StunningGallery
            items={galleryItems}
            layout="carousel"
            hoverEffect="scale"
          />
        </section>

        {/* Stack Layout */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
            Stack Layout
          </h2>
          <StunningGallery
            items={galleryItems.slice(0, 3)} // Show only 3 items for stack
            layout="stack"
            hoverEffect="slide"
          />
        </section>
      </div>
    </div>
  );
};

export default ExampleGallery;
