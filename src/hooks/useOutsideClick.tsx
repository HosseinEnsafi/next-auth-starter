import { RefObject, useEffect } from "react";

export default function useOutsideClick<T extends HTMLElement>(
  ref: RefObject<T>,
  handler: () => void,
) {
  const handleClickOutside = (event: MouseEvent | TouchEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      handler();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [ref]);
}
