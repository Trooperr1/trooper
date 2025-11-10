import { useEffect, useRef, RefObject } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

/**
 * Custom hook for scroll-triggered animations
 * Returns a ref to attach to the element you want to animate
 */
export function useScrollAnimation<T extends HTMLElement>(
  callback: (entry: IntersectionObserverEntry) => void,
  options: UseScrollAnimationOptions = {}
): RefObject<T> {
  const elementRef = useRef<T>(null);
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true,
  } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            callback(entry);
            if (triggerOnce) {
              observer.unobserve(entry.target);
            }
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [callback, threshold, rootMargin, triggerOnce]);

  return elementRef;
}

/**
 * Hook for fade-in animation on scroll
 */
export function useFadeIn<T extends HTMLElement>(
  options?: UseScrollAnimationOptions
): RefObject<T> {
  return useScrollAnimation<T>((entry) => {
    entry.target.classList.add('animate-fade-in');
  }, options);
}

/**
 * Hook for slide-up animation on scroll
 */
export function useSlideUp<T extends HTMLElement>(
  options?: UseScrollAnimationOptions
): RefObject<T> {
  return useScrollAnimation<T>((entry) => {
    entry.target.classList.add('animate-slide-up');
  }, options);
}
