import { useEffect, useState } from 'react';

/**
 * IntersectionObserver API를 사용하여 특정 DOM 요소의 가시성 변화를 감지합니다.
 */
export default function useIntersectionObserver({ ref, options: { threshold = 0.2, root = null, rootMargin = '0%' } }) {
  const [entry, setEntry] = useState();

  const updateEntry = (entries) => {
    setEntry(entries[0]);
  };

  useEffect(() => {
    const node = ref?.current;
    const hasIOSupport = Boolean(window.IntersectionObserver);

    // IntersectionObserver API를 지원하지 않거나 ref로 참조한 DOM 요소가 없는 경우 함수를 종료합니다.
    if (!hasIOSupport || !node) return;

    const observerParams = { threshold, root, rootMargin };
    const observer = new IntersectionObserver(updateEntry, observerParams);

    // ref로 참조한 DOM 요소 관찰을 시작합니다.
    observer.observe(node);

    return () => observer.disconnect();
  }, [ref, threshold, root, rootMargin]);

  return entry;
}