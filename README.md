# 🌟 Stunning Gallery

The most beautiful, feature-rich gallery component you've ever seen! Built with React, TypeScript, and Framer Motion for stunning animations and effects.

![Gallery Preview](https://via.placeholder.com/800x400/667eea/ffffff?text=Stunning+Gallery)

## 🎮 Live Demo

**Try the interactive demo right now!**

👉 **[View Live Demo](https://afaq-khan2000.github.io/stunning-gallery/demo/)** 👈

The demo showcases all the amazing features including:
- Multiple layout options (Masonry, Grid, Carousel, Stack)
- Interactive theme switching (Light, Dark, Auto)
- Various hover effects (Scale, Glow, Slide, Rotate)
- Real-time search and filtering
- Beautiful animations and transitions

## ✨ Features

- 🎨 **Multiple Layouts**: Masonry, Grid, Carousel, and Stack layouts
- ✨ **Stunning Animations**: Smooth transitions powered by Framer Motion
- 🔍 **Smart Search**: Find images instantly with real-time search
- 🏷️ **Category Filters**: Organize and filter by categories
- 💡 **Lightbox View**: Full-screen image viewing with navigation
- 📱 **Responsive Design**: Perfect on all devices and screen sizes
- 🎯 **Lazy Loading**: Optimized performance with intersection observer
- 🌙 **Theme Support**: Light, dark, and auto themes
- 🎭 **Hover Effects**: Scale, glow, slide, rotate, and more
- ♿ **Accessibility**: Full keyboard navigation and screen reader support

## 🚀 Installation

```bash
npm install stunning-gallery
```

## 📦 Usage

### Basic Usage

```tsx
import React from 'react';
import { StunningGallery } from 'stunning-gallery';
import 'stunning-gallery/dist/styles.css';

const App = () => {
  const images = [
    {
      id: '1',
      src: 'https://example.com/image1.jpg',
      alt: 'Beautiful landscape',
      title: 'Mountain View',
      description: 'A breathtaking mountain landscape',
      category: 'Nature',
      tags: ['mountains', 'landscape']
    },
    // ... more images
  ];

  return (
    <StunningGallery
      items={images}
      layout="masonry"
      showLightbox={true}
      showFilters={true}
      showSearch={true}
    />
  );
};
```

### Advanced Configuration

```tsx
import React from 'react';
import { StunningGallery } from 'stunning-gallery';

const AdvancedGallery = () => {
  const handleItemClick = (item, index) => {
    console.log('Clicked item:', item);
  };

  const handleFilterChange = (category) => {
    console.log('Filter changed to:', category);
  };

  const handleSearchChange = (query) => {
    console.log('Search query:', query);
  };

  return (
    <StunningGallery
      items={images}
      layout="grid"
      columns={4}
      gap={20}
      showLightbox={true}
      showFilters={true}
      showSearch={true}
      enableLazyLoading={true}
      animationDuration={500}
      hoverEffect="glow"
      theme="dark"
      onItemClick={handleItemClick}
      onFilterChange={handleFilterChange}
      onSearchChange={handleSearchChange}
    />
  );
};
```

## 🎨 Layout Options

### Masonry Layout (Default)
```tsx
<StunningGallery items={images} layout="masonry" />
```

### Grid Layout
```tsx
<StunningGallery 
  items={images} 
  layout="grid" 
  columns={3} 
  gap={16} 
/>
```

### Carousel Layout
```tsx
<StunningGallery items={images} layout="carousel" />
```

### Stack Layout
```tsx
<StunningGallery items={images} layout="stack" />
```

## 🎭 Hover Effects

Choose from various hover effects:

- `scale` - Scales the image on hover
- `glow` - Adds a glowing effect
- `slide` - Slides the image up
- `rotate` - Slight rotation effect
- `none` - No hover effect

```tsx
<StunningGallery 
  items={images} 
  hoverEffect="glow" 
/>
```

## 🌙 Themes

### Auto Theme (Default)
```tsx
<StunningGallery items={images} theme="auto" />
```

### Light Theme
```tsx
<StunningGallery items={images} theme="light" />
```

### Dark Theme
```tsx
<StunningGallery items={images} theme="dark" />
```

## 📝 API Reference

### StunningGallery Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `GalleryItem[]` | **Required** | Array of gallery items |
| `layout` | `'masonry' \| 'grid' \| 'carousel' \| 'stack'` | `'masonry'` | Layout type |
| `columns` | `number` | `3` | Number of columns for grid layout |
| `gap` | `number` | `16` | Gap between items in pixels |
| `showLightbox` | `boolean` | `true` | Show lightbox on item click |
| `showFilters` | `boolean` | `true` | Show category filters |
| `showSearch` | `boolean` | `true` | Show search bar |
| `enableLazyLoading` | `boolean` | `true` | Enable lazy loading |
| `animationDuration` | `number` | `500` | Animation duration in ms |
| `hoverEffect` | `'scale' \| 'glow' \| 'slide' \| 'rotate' \| 'none'` | `'scale'` | Hover effect type |
| `theme` | `'light' \| 'dark' \| 'auto'` | `'auto'` | Theme mode |
| `className` | `string` | `''` | Additional CSS classes |
| `onItemClick` | `(item: GalleryItem, index: number) => void` | - | Item click handler |
| `onFilterChange` | `(filter: string) => void` | - | Filter change handler |
| `onSearchChange` | `(query: string) => void` | - | Search change handler |

### GalleryItem Interface

```tsx
interface GalleryItem {
  id: string;                    // Unique identifier
  src: string;                   // Image source URL
  alt: string;                   // Alt text for accessibility
  title?: string;                // Optional title
  description?: string;          // Optional description
  category?: string;             // Optional category for filtering
  tags?: string[];               // Optional tags for search
  width?: number;                // Optional width
  height?: number;               // Optional height
}
```

## 🎯 Examples

### Photo Portfolio
```tsx
const portfolioImages = [
  {
    id: '1',
    src: '/photos/portrait1.jpg',
    alt: 'Portrait photography',
    title: 'Professional Portrait',
    category: 'Portraits',
    tags: ['portrait', 'professional', 'studio']
  },
  // ... more images
];

<StunningGallery
  items={portfolioImages}
  layout="masonry"
  hoverEffect="glow"
  theme="dark"
/>
```

### Product Gallery
```tsx
const productImages = [
  {
    id: '1',
    src: '/products/shoes1.jpg',
    alt: 'Running shoes',
    title: 'Nike Air Max',
    category: 'Shoes',
    tags: ['sports', 'running', 'nike']
  },
  // ... more products
];

<StunningGallery
  items={productImages}
  layout="grid"
  columns={4}
  hoverEffect="scale"
/>
```

## 🛠️ Development

### Prerequisites
- Node.js 16+
- npm or yarn

### Setup
```bash
git clone https://github.com/yourusername/stunning-gallery.git
cd stunning-gallery
npm install
```

### Build
```bash
npm run build
```

### Development
```bash
npm run dev
```

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

Made with ❤️ and lots of ☕
