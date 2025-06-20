import { useEffect, useRef, useMemo, useState } from "react";

function useContainerSize(ref) {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const resizeObserver = new ResizeObserver((entries) => {
      if (!Array.isArray(entries) || !entries.length) return;

      const { width, height } = entries[0].contentRect;
      setSize({ width, height });
    });

    resizeObserver.observe(node);

    return () => {
      if (node) resizeObserver.unobserve(node);
    };
  }, [ref]);

  return size;
}

export default useContainerSize;
