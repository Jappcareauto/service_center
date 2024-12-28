import IMAGES from '@/assets/images';
import { AppointmentRoutes } from '@/modules/appointment/infra/routes/Router';
import { DashboardRoutes } from '@/modules/dashboard/infra/routes/Router';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import CalendarIcon from './icons/CalendarIcon';
import ChatIcon from './icons/ChatIcon';
import HomeIcon from './icons/HomeIcon';
import InvoiceIcon from './icons/InvoiceIcon';
import ProfileIcon from './icons/ProfileIcon';
import StatisticIcon from './icons/StatisticIcon';

interface MenuItem {
  title: string;
  icon: React.ReactElement,
  route: string,
}

const menuItems = (): MenuItem[] => [
  {
    title: 'Dashboard',
    icon: <HomeIcon />,
    route: DashboardRoutes.dashboard,
  },
  {
    title: 'Appointments',
    icon: <CalendarIcon />,
    route: AppointmentRoutes.appointment,
  },
  {
    title: 'Emergency Assistance',
    icon: <CalendarIcon />,
    route: DashboardRoutes.emergency,
  },
  {
    title: 'Chats',
    icon: <ChatIcon />,
    route: '#',
  },
  {
    title: 'Statistics',
    icon: <StatisticIcon />,
    route: DashboardRoutes.statistics,
  },
  {
    title: 'Invoices',
    icon: <InvoiceIcon />,
    route: '#',
  },
  {
    title: 'Profile',
    icon: <ProfileIcon />,
    route: DashboardRoutes.profile,
  }
];



const SideMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div className='w-[270px] border-r border-r-borderColor h-screen px-4 pt-10'>

      <p className='mb-4'>Good Morning</p>
      <button className='flex items-center px-4 py-3 border border-borderColor rounded-2xl w-full gap-x-4 mb-6 font-medium'>
        <div className='rounded-full border-[2px] border-primary p-[1.5px]'>
          <img src={IMAGES.avatar} alt="" className='w-12 h-12' />
        </div>
        <p>Dave’s Garage</p>
      </button>

      <div className='flex flex-col gap-y-2'>
        {
          menuItems().map((item, index) => {
            const isSelected = location.pathname.includes(item.route);

            return <button
              onClick={() => navigate(item.route)}
              key={'menu-item-' + index}
              className={
                twMerge(
                  'flex gap-x-4 h-14 rounded-xl items-center px-5 font-light hover:bg-primaryAccent hover:text-primary',
                  isSelected ? "bg-primaryAccent text-primary" : "",
                  !index ? 'mb-16' : '',
                )
              }>
              {item.icon} <span className='text-textColor text-sm'>{item.title}</span>
            </button>
          })
        }
      </div>
    </div>
  )
}

export default SideMenu
