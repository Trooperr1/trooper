import { useState, useEffect, useRef } from 'react';

interface UseCounterOptions {
  start?: number;
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

/**
 * Custom hook for animated counter
 */
export function useCounter({
  start = 0,
  end,
  duration = 2000,
  suffix = '',
  prefix = '',
}: UseCounterOptions) {
  const [count, setCount] = useState(start);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const value = Math.floor(progress * (end - start) + start);
      setCount(value);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [isVisible, start, end, duration]);

  return {
    count,
    ref,
    displayValue: `${prefix}${count}${suffix}`,
  };
}
