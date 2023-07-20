import { RefObject, useRef, useEffect } from 'react';
type Handler = () => void

export const useClickOutside = (callback: Handler): RefObject<HTMLDivElement> => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (elementRef.current && !elementRef.current.contains(event.target as any)) {
        callback();
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [callback, elementRef]);

  return elementRef;
};