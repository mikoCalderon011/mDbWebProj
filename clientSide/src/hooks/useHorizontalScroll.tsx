import { useEffect, useRef } from "react";

export function useHorizontalScroll() {
  const elRef = useRef();

  useEffect(() => {
    const el = elRef.current;
    if (el) {
      const onWheel = (e) => {
        if (e.deltaY === 0) return;
        e.preventDefault();
        
        const scrollAmount = e.deltaY * 2; 
        el.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });
      };

      el.addEventListener("wheel", onWheel, { passive: false }); // Set passive to false for `preventDefault` to work
      return () => el.removeEventListener("wheel", onWheel);
    }
  }, []);

  return elRef;
}
