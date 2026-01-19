import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
} from '@tanstack/react-query';
import { ReactNode, useMemo } from 'react';
import useError from '@/hooks/useError';

interface ProvidersProps {
  children: ReactNode;
}

const QueryProviders = ({ children }: ProvidersProps) => {
  const errorHandler = useError();

  const queryClient = useMemo(
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
            onError: errorHandler,
          },
        },
        queryCache: new QueryCache({
          onError: errorHandler,
        }),
      }),
    [errorHandler],
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProviders;
