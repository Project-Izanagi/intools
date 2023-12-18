import { Navigate } from 'react-router-dom';

import { authRoutes } from './auth';
import { mainRoutes } from './main';
import { moduleRoutes } from './module';

export const routes = [
  authRoutes,
  moduleRoutes,
  mainRoutes,
  // No match 404
  { path: '*', element: <Navigate to="/home" replace /> },
];
