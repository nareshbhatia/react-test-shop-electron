import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MemoryRouter as Router } from 'react-router-dom';
import * as yup from 'yup';
import { App } from './App';
import { ErrorBoundary, Loading } from './components';
import { EnvProvider } from './contexts';
import { yupLocale } from './utils';
import './services/AxiosInterceptors';
import './styles/main.global.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

// set up yup errors
yup.setLocale(yupLocale);

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<Loading />}>
      <ErrorBoundary>
        <EnvProvider>
          <QueryClientProvider client={queryClient}>
            <Router>
              <App />
            </Router>
          </QueryClientProvider>
        </EnvProvider>
      </ErrorBoundary>
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);
