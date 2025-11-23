import { QueryClientProvider } from '@tanstack/react-query';
import { GlobalPortal, GlobalStyles } from 'tosslib';
import { Routes } from '@pages/Routes';
import { queryClient } from '@shared/lib/react-query/queryClient';

export function App() {
  return (
    <>
      <GlobalStyles />
      <QueryClientProvider client={queryClient}>
        <GlobalPortal.Provider>
          <Routes />
        </GlobalPortal.Provider>
      </QueryClientProvider>
    </>
  );
}
