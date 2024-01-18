import { Suspense, lazy } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { SvgIcon } from '@/components/icon';
import { CircleLoading } from '@/components/loading';

import { AppRouteObject } from '#/router';

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;

const HomePage = lazy(() => import(`@/pages/dashboard/workbench`));
const Analysis = lazy(() => import('@/pages/dashboard/analysis'));

const dashboard: AppRouteObject = {
  order: 2,
  path: 'electra',
  element: (
    <Suspense fallback={<CircleLoading />}>
      <Outlet />
    </Suspense>
  ),
  meta: {
    label: 'sys.menu.electra',
    icon: <SvgIcon icon="ic-motor" className="ant-menu-item-icon" size="24" />,
    key: '/electra',
  },
  children: [
    {
      index: true,
      element: <Navigate to="motor" replace />,
    },
    // {
    //   path: 'workbench',
    //   element: <HomePage />,
    //   meta: { label: 'sys.menu.home', key: HOMEPAGE },
    // },
    {
      path: 'motor',
      meta: { label: 'sys.menu.motor', key: '/electra/motor' },
      children: [
        {
          index: true,
          element: <Navigate to="highvoltage" replace />,
        },
        {
          path: 'highvoltage',
          element: <Analysis />,
          meta: { label: 'sys.menu.highvoltage', key: '/electra/motor/highvoltage' },
        },
        // {
        //   path: 'lowvoltage',
        //   element: <Analysis />,
        //   meta: { label: 'sys.menu.lowvoltage', key: '/electra/motor/lowvoltage' },
        // },
        // {
        //   path: 'manage',
        //   element: <Analysis />,
        //   meta: { label: 'sys.menu.manage', key: '/electra/motor/manage' },
        //   children: [
        //     {
        //       index: true,
        //       element: <Navigate to="manage" replace />,
        //     },
        //     {
        //       path: 'lowvoltage',
        //       element: <Analysis />,
        //       meta: { label: 'sys.menu.lowvoltage', key: '/electra/motor/manage/lowvoltage' },
        //     },
        //   ],
        // },
      ],
    },
  ],
};

export default dashboard;
