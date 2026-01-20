import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
  MutationCache,
} from '@tanstack/react-query';
import { ReactNode, useState, useEffect, useRef } from 'react';
import useError from '@/hooks/useError';

interface ProvidersProps {
  children: ReactNode;
}

const QueryProviders = ({ children }: ProvidersProps) => {
  const errorHandler = useError();

  // 최신 에러 핸들러 유지
  const errorHandlerRef = useRef(errorHandler);

  useEffect(() => {
    errorHandlerRef.current = errorHandler;
  }, [errorHandler]);

  // QueryClient 최초 1회 생성
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: Infinity,
            gcTime: 1000 * 60 * 15,
            retry: 0,
            refetchOnWindowFocus: false,
          },
          mutations: {
            onError: (error) => {
              errorHandlerRef.current(error);
            },
          },
        },
        queryCache: new QueryCache({
          onError: (error) => {
            errorHandlerRef.current(error);
          },
        }),
        mutationCache: new MutationCache({
          onError: (error) => {
            errorHandlerRef.current(error);
          },
        }),
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProviders;
