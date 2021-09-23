import { useEffect, useRef, useState } from "react";

export const useInfiniteScroll = ({
  root = null,
  rootMargin = "0px",
  threshold = 0,
}: IntersectionObserverInit) => {
  const [entry, updateEntry] = useState<IntersectionObserverEntry>();
  const [node, setNode] = useState<HTMLDivElement | null>(null);

  const observer = useRef(
    new window.IntersectionObserver(
      ([entry]: IntersectionObserverEntry[]) => {
        updateEntry(entry);
      },
      {
        root,
        rootMargin,
        threshold,
      }
    )
  );

  useEffect(() => {
    const { current: currentObserver } = observer;
    currentObserver.disconnect();

    if (node) currentObserver.observe(node);

    return () => currentObserver.disconnect();
  }, [node]);

  return [setNode, entry as IntersectionObserverEntry] as const;
};
