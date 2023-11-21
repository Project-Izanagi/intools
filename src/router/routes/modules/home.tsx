import { Suspense, lazy } from 'react';
// import { Navigate, Outlet } from 'react-router-dom';

import { SvgIcon } from '@/components/icon';
import { CircleLoading } from '@/components/loading';

import { AppRouteObject } from '#/router';

// const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;

const HomePage = lazy(() => import(`@/pages/dashboard/workbench`));
// const Analysis = lazy(() => import('@/pages/dashboard/analysis'));

const motor: AppRouteObject = {
  order: 1,
  path: 'home',
  element: (
    <Suspense fallback={<CircleLoading />}>
      <HomePage />,
    </Suspense>
  ),
  meta: {
    label: 'sys.menu.home',
    icon: <SvgIcon icon="ic-dashboard" className="ant-menu-item-icon" size="24" />,
    key: '/home',
  },
};

export default motor;
