import { ReactNode } from 'react';
import Topnav from '../components/Topnav';

type Props = {
  leftNav: ReactNode;
  rightNav: ReactNode;
  children: ReactNode;
};

const MainLayout = ({ leftNav, rightNav, children }: Props) => {
  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='min-h-full'>
        <Topnav />
        <div className='py-10'>
          <div className='max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8'>
            <div className='hidden lg:block lg:col-span-3 xl:col-span-2'>
              {leftNav}
            </div>
            <main className='lg:col-span-9 xl:col-span-6'>{children}</main>
            <aside className='hidden xl:block xl:col-span-4'>{rightNav}</aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
