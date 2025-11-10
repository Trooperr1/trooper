import { useEffect } from 'react';

/**
 * Custom hook for custom cursor effect
 */
export function useCustomCursor() {
  useEffect(() => {
    // Only enable on desktop
    if (window.innerWidth < 1024) return;

    const cursor = document.createElement('div');
    const cursorOutline = document.createElement('div');

    cursor.className = 'cursor-dot';
    cursorOutline.className = 'cursor-outline';

    document.body.appendChild(cursor);
    document.body.appendChild(cursorOutline);
    document.body.classList.add('custom-cursor');

    const moveCursor = (e: MouseEvent) => {
      cursor.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      cursorOutline.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`;
    };

    const handleMouseEnter = () => {
      cursor.classList.add('hover');
      cursorOutline.classList.add('hover');
    };

    const handleMouseLeave = () => {
      cursor.classList.remove('hover');
      cursorOutline.classList.remove('hover');
    };

    // Track mouse movement
    document.addEventListener('mousemove', moveCursor);

    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, select');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
      document.body.removeChild(cursor);
      document.body.removeChild(cursorOutline);
      document.body.classList.remove('custom-cursor');
    };
  }, []);
}
