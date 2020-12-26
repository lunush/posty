import { useEffect } from 'react';

export const useComponentVisible = (
  ref: React.MutableRefObject<null>,
  isVisible: boolean,
  toggle: React.Dispatch<React.SetStateAction<boolean>>
) => {
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      // @ts-ignore
      if (ref.current && !ref.current.contains(event.target)) {
        toggle(!isVisible);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [ref]);
};
