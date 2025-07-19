import { type RouteObject, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Home from '@/pages/HomePage';


const PuzzlePage = lazy(() => import('@/pages/PuzzlePage'));
const SearchSolutionPage = lazy(() => import('@/pages/SearchSolutionPage'));
const HistoryPage = lazy(() => import('@/pages/HistoryPage'));
const DetailPage = lazy(() => import('@/pages/DetailsPage'));


// Composant de loading
const PageLoader = () => (
  <div className="h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
  </div>
);

// Wrapper pour lazy loading
const LazyWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<PageLoader />}>
    {children}
  </Suspense>
);

export const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <LazyWrapper>
        <Home />
      </LazyWrapper>
    ),
  },
  {
    path: '/puzzle',
    element: (
      <LazyWrapper>
        <PuzzlePage />
      </LazyWrapper>
    ),
  },
  {
    path: '/search',
    element: (
      <LazyWrapper>
        <SearchSolutionPage />
      </LazyWrapper>
    ),
  },
  {
    path: '/history',
    element: (
      <LazyWrapper>
        <HistoryPage />
      </LazyWrapper> 
    ),
  }, 
   {
    path: '/details',
    element: (
      <LazyWrapper>
        <DetailPage />
      </LazyWrapper> 
    ),
  }, 
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
];