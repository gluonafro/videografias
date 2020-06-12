import { useRef, useEffect } from 'react';
/**
 * Hook that allows us to retain a value and return its previous value.
 */
export default function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}
