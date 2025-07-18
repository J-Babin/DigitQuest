import { type RouteObject, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Home from '@/Pages/Home';
import PuzzlePage from '@/Pages/PuzzlePage';

// const PuzzlePage = lazy(() => import('@/Pages/PuzzlePage'));


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




//   {
//     path: '/dashboard',
//     element: (
//       <LazyWrapper>
//         <DashboardPage />
//       </LazyWrapper>
//     ),
//   },
//   {
//     path: '/solutions',
//     children: [
//       {
//         index: true,
//         element: (
//           <LazyWrapper>
//             <SolutionsPage />
//           </LazyWrapper>
//         ),
//       },
//       {
//         path: ':id',
//         element: (
//           <LazyWrapper>
//             <SolutionDetailPage />
//           </LazyWrapper>
//         ),
//       },
//     ],
//   },
//   {
//     path: '/history',
//     element: (
//       <LazyWrapper>
//         <HistoryPage />
//       </LazyWrapper>
//     ),
//   },
//   {
//     path: '/settings',
//     element: (
//       <LazyWrapper>
//         <SettingsPage />
//       </LazyWrapper>
//     ),
//   },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
];