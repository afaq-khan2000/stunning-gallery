import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GalleryItem as GalleryItemType } from '../types';

interface GalleryItemProps {
  item: GalleryItemType;
  index: number;
  hoverEffect: 'scale' | 'glow' | 'slide' | 'rotate' | 'none';
  animationDuration: number;
  onClick: (item: GalleryItemType, index: number) => void;
  enableLazyLoading: boolean;
}

const GalleryItemComponent: React.FC<GalleryItemProps> = ({
  item,
  index,
  hoverEffect,
  animationDuration,
  onClick,
  enableLazyLoading,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const shouldLoad = !enableLazyLoading || inView;

  const getHoverEffect = () => {
    switch (hoverEffect) {
      case 'scale':
        return {
          whileHover: { scale: 1.05 },
          transition: { duration: 0.2 }
        };
      case 'glow':
        return {
          whileHover: { 
            boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)',
            scale: 1.02
          },
          transition: { duration: 0.2 }
        };
      case 'slide':
        return {
          whileHover: { y: -5 },
          transition: { duration: 0.2 }
        };
      case 'rotate':
        return {
          whileHover: { rotate: 2 },
          transition: { duration: 0.2 }
        };
      default:
        return {};
    }
  };

  const hoverProps = getHoverEffect();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={shouldLoad ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ 
        duration: animationDuration / 1000,
        delay: index * 0.1 
      }}
      whileHover={hoverProps.whileHover}
      className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
      onClick={() => onClick(item, index)}
    >
      {shouldLoad && (
        <>
          {!imageError ? (
            <motion.img
              src={item.src}
              alt={item.alt}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              className={`w-full h-full object-cover transition-all duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              loading="lazy"
            />
          ) : (
            <div className="w-full h-64 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <span className="text-gray-500 dark:text-gray-400">Failed to load image</span>
            </div>
          )}
          
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
          )}

          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileHover={{ scale: 1, opacity: 1 }}
              className="text-white text-center p-4"
            >
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
            </motion.div>
          </motion.div>

          {/* Floating tags */}
          {item.tags && item.tags.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileHover={{ opacity: 1, y: 0 }}
              className="absolute top-2 left-2 flex flex-wrap gap-1"
            >
              {item.tags.slice(0, 3).map((tag, tagIndex) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: tagIndex * 0.1 }}
                  className="px-2 py-1 bg-white/90 text-gray-800 text-xs rounded-full shadow-sm"
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          )}
        </>
      )}
    </motion.div>
  );
};

export default GalleryItemComponent;
