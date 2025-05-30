import React from 'react';
import { Breadcrumb } from 'antd';
import { Link, useLocation, matchPath } from 'react-router-dom';

const routeLabels: { path: string; label: string }[] = [
  { path: '/', label: 'Home' },
  { path: '/forgot-password', label: 'Forgot Password' },
  { path: '/reset-password/:email', label: 'Reset Password' },
  { path: '/dashboard', label: 'Dashboard' },
  { path: '/emergency', label: 'Emergency' },
  { path: '/profile', label: 'Profile' },
  { path: '/profile/setting', label: 'Setting' },
  { path: '/statistics', label: 'Statistics' },
  { path: '/chat', label: 'Chat' },
  { path: '/chat/:id', label: 'Chat Details' },
  { path: '/appointments', label: 'Appointments' },
  { path: '/appointment/:id', label: 'Appointment Details' },
  { path: '/invoices', label: 'Invoices' },
  { path: '/invoice/:id', label: 'Invoice Details' },
  { path: '/create-invoice', label: 'Create Invoice' },
  { path: '/payment', label: 'Payment' },
];

const AppBreadcrumb: React.FC = () => {
  const location = useLocation();
  const pathSnippets = location.pathname.split('/').filter(i => i);

  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;

    // Find the first matching route
    const matchedRoute = routeLabels.find(route =>
      matchPath({ path: route.path, end: false }, url)
    );

    if (!matchedRoute) {
      return {
        title: <span>{url}</span>,
      };
    }

    return {
      title: <Link to={url}>{matchedRoute.label}</Link>,
    };
  });

  const breadcrumbItems = [
    {
      title: <Link to="/">Home</Link>,
    },
    ...extraBreadcrumbItems,
  ];

  return <Breadcrumb items={breadcrumbItems} />;
};

export default AppBreadcrumb;
