const { useState, useMemo } = React;
const { motion } = Motion;

// Sample gallery data with beautiful images
const sampleImages = [
  {
    id: '1',
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    alt: 'Mountain Landscape',
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
  },
  {
    id: '7',
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=900&fit=crop',
    alt: 'Desert Dunes',
    title: 'Sand Symphony',
    description: 'Endless dunes under the desert sun',
    category: 'Nature',
    tags: ['desert', 'sand', 'dunes']
  },
  {
    id: '8',
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    alt: 'Modern Building',
    title: 'Glass Tower',
    description: 'Reflections in modern architecture',
    category: 'Urban',
    tags: ['building', 'glass', 'reflection']
  },
  {
    id: '9',
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=700&fit=crop',
    alt: 'Flower Garden',
    title: 'Blooming Beauty',
    description: 'Colorful flowers in full bloom',
    category: 'Nature',
    tags: ['flowers', 'garden', 'colorful']
  },
  {
    id: '10',
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop',
    alt: 'Street Art',
    title: 'Urban Canvas',
    description: 'Vibrant street art on city walls',
    category: 'Art',
    tags: ['street art', 'urban', 'colorful']
  }
];

// Demo component
function Demo() {
  const [selectedLayout, setSelectedLayout] = useState('masonry');
  const [selectedTheme, setSelectedTheme] = useState('auto');
  const [selectedHoverEffect, setSelectedHoverEffect] = useState('scale');

  const layoutOptions = [
    { value: 'masonry', label: 'Masonry' },
    { value: 'grid', label: 'Grid' },
    { value: 'carousel', label: 'Carousel' },
    { value: 'stack', label: 'Stack' }
  ];

  const themeOptions = [
    { value: 'auto', label: 'Auto' },
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' }
  ];

  const hoverOptions = [
    { value: 'scale', label: 'Scale' },
    { value: 'glow', label: 'Glow' },
    { value: 'slide', label: 'Slide' },
    { value: 'rotate', label: 'Rotate' },
    { value: 'none', label: 'None' }
  ];

  return React.createElement('div', { className: 'min-h-screen p-8' },
    // Header
    React.createElement(motion.div, {
      initial: { opacity: 0, y: -50 },
      animate: { opacity: 1, y: 0 },
      className: 'text-center mb-12'
    },
      React.createElement('h1', {
        className: 'text-6xl font-bold text-white mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent'
      }, 'Stunning Gallery'),
      React.createElement('p', {
        className: 'text-xl text-white/80 mb-8'
      }, 'The most beautiful gallery component you\'ve ever seen'),
      
      // Controls
      React.createElement('div', {
        className: 'demo-container rounded-2xl p-6 max-w-4xl mx-auto'
      },
        React.createElement('div', {
          className: 'grid grid-cols-1 md:grid-cols-3 gap-4'
        },
          // Layout Selector
          React.createElement('div', { className: 'space-y-2' },
            React.createElement('label', {
              className: 'block text-white font-medium'
            }, 'Layout'),
            React.createElement('select', {
              value: selectedLayout,
              onChange: (e) => setSelectedLayout(e.target.value),
              className: 'w-full p-2 rounded-lg bg-white/10 border border-white/20 text-white'
            },
              ...layoutOptions.map(option =>
                React.createElement('option', {
                  key: option.value,
                  value: option.value,
                  className: 'bg-gray-800 text-white'
                }, option.label)
              )
            )
          ),
          
          // Theme Selector
          React.createElement('div', { className: 'space-y-2' },
            React.createElement('label', {
              className: 'block text-white font-medium'
            }, 'Theme'),
            React.createElement('select', {
              value: selectedTheme,
              onChange: (e) => setSelectedTheme(e.target.value),
              className: 'w-full p-2 rounded-lg bg-white/10 border border-white/20 text-white'
            },
              ...themeOptions.map(option =>
                React.createElement('option', {
                  key: option.value,
                  value: option.value,
                  className: 'bg-gray-800 text-white'
                }, option.label)
              )
            )
          ),
          
          // Hover Effect Selector
          React.createElement('div', { className: 'space-y-2' },
            React.createElement('label', {
              className: 'block text-white font-medium'
            }, 'Hover Effect'),
            React.createElement('select', {
              value: selectedHoverEffect,
              onChange: (e) => setSelectedHoverEffect(e.target.value),
              className: 'w-full p-2 rounded-lg bg-white/10 border border-white/20 text-white'
            },
              ...hoverOptions.map(option =>
                React.createElement('option', {
                  key: option.value,
                  value: option.value,
                  className: 'bg-gray-800 text-white'
                }, option.label)
              )
            )
          )
        )
      )
    ),
    
    // Gallery Demo
    React.createElement(motion.div, {
      initial: { opacity: 0, y: 50 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: 0.3 },
      className: 'demo-container rounded-2xl p-6 max-w-7xl mx-auto'
    },
      React.createElement('h2', {
        className: 'text-3xl font-bold text-white mb-6 text-center'
      }, 'Gallery Preview'),
      
      // Note: In a real implementation, you would use the actual StunningGallery component
      // For this demo, we'll create a simplified version
      React.createElement('div', {
        className: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'
      },
        ...sampleImages.map((image, index) =>
          React.createElement(motion.div, {
            key: image.id,
            initial: { opacity: 0, scale: 0.8 },
            animate: { opacity: 1, scale: 1 },
            transition: { delay: index * 0.1 },
            whileHover: { scale: 1.05 },
            className: 'group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer'
          },
            React.createElement('img', {
              src: image.src,
              alt: image.alt,
              className: 'w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110'
            }),
            React.createElement('div', {
              className: 'absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'
            },
              React.createElement('div', {
                className: 'text-white text-center p-4'
              },
                React.createElement('h3', {
                  className: 'text-lg font-semibold mb-2'
                }, image.title),
                React.createElement('p', {
                  className: 'text-sm text-gray-200'
                }, image.description),
                React.createElement('span', {
                  className: 'inline-block px-2 py-1 bg-blue-500 rounded-full text-xs mt-2'
                }, image.category)
              )
            )
          )
        )
      )
    ),
    
    // Features Section
    React.createElement(motion.div, {
      initial: { opacity: 0, y: 50 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: 0.6 },
      className: 'mt-16 text-center'
    },
      React.createElement('h2', {
        className: 'text-4xl font-bold text-white mb-8'
      }, 'Amazing Features'),
      
      React.createElement('div', {
        className: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto'
      },
        [
          { icon: '🎨', title: 'Multiple Layouts', desc: 'Masonry, Grid, Carousel & Stack' },
          { icon: '✨', title: 'Stunning Animations', desc: 'Smooth transitions & hover effects' },
          { icon: '🔍', title: 'Smart Search', desc: 'Find images instantly' },
          { icon: '🏷️', title: 'Category Filters', desc: 'Organize by categories' },
          { icon: '💡', title: 'Lightbox View', desc: 'Full-screen image viewing' },
          { icon: '📱', title: 'Responsive Design', desc: 'Perfect on all devices' }
        ].map((feature, index) =>
          React.createElement(motion.div, {
            key: index,
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.8 + index * 0.1 },
            whileHover: { scale: 1.05 },
            className: 'demo-container rounded-xl p-6 text-center'
          },
            React.createElement('div', {
              className: 'text-4xl mb-4'
            }, feature.icon),
            React.createElement('h3', {
              className: 'text-xl font-semibold text-white mb-2'
            }, feature.title),
            React.createElement('p', {
              className: 'text-white/70'
            }, feature.desc)
          )
        )
      )
    )
  );
}

// Render the demo
ReactDOM.render(React.createElement(Demo), document.getElementById('root'));
