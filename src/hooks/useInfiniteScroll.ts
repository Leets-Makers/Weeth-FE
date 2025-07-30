import { useEffect, useRef, useState } from 'react';
import useGetBoardInfo from '@/api/useGetBoardInfo';

interface Content {
  id: number;
  name: string;
  title: string;
  content: string;
  time: string;
  commentCount: number;
  hasFile: boolean;
  position: string;
  role: string;
}

interface UseInfiniteScrollOptions {
  path: string;
}

const useInfiniteScroll = ({ path }: UseInfiniteScrollOptions) => {
  const [posts, setPosts] = useState<Content[]>([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [observerLoading, setObserverLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const fetchData = async () => {
    if (!observerLoading && hasMore) {
      await useGetBoardInfo(
        path,
        pageNumber,
        setPosts,
        setHasMore,
        setObserverLoading,
      );
      setPageNumber((prev) => prev + 1);
      if (loading) setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // 최초 호출

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting) {
          fetchData();
        }
      },
      { threshold: 0.1 },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [hasMore, observerLoading, pageNumber]);

  return {
    posts,
    observerRef,
    loading,
    hasMore,
  };
};

export default useInfiniteScroll;
