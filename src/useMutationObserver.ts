import { useEffect, RefObject } from 'react';

export function useMutationObserver(
  ref: RefObject<HTMLElement | null>,
  callback: MutationCallback,
  options: MutationObserverInit
) {
  useEffect(() => {
    if (ref.current) {
      const observer = new MutationObserver(callback);
      observer.observe(ref.current, options);
      return () => {
        observer.disconnect();
      };
    }

    return;
  }, [ref, callback, options]);
}
