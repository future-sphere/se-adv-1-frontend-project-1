import { Menu, Popover, Transition } from '@headlessui/react';
import { BellIcon, MenuIcon, SearchIcon, XIcon } from '@heroicons/react/solid';
import React, { Fragment } from 'react';
import { classNames } from '../../helpers';
import { navigation } from '../../constants';
import { Link } from 'react-router-dom';
import SearchBox from '../SearchBox';
import axios from 'axios';
import { Post } from '../../interfaces';

type Props = {};

const user = {
  name: 'Chelsea Hagon',
  email: 'chelsea.hagon@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};

const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
];

const Topnav = (props: Props) => {
  const profilePic = window.localStorage.getItem('profilePic');
  const userId = window.localStorage.getItem('userId');
  const [query, setQuery] = React.useState('');
  const [data, setData] = React.useState<Post[]>([]);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };
  const fetchData = async () => {
    const response = await axios.post(
      'http://localhost:4000/posts/search?query=' + query.toString(),
    );
    setData(response.data);
  };

  React.useEffect(() => {
    fetchData();
  }, [query]);

  return (
    <Popover
      as='header'
      className={({ open }) =>
        classNames(
          open ? 'fixed inset-0 z-40 overflow-y-auto' : '',
          'bg-white shadow-sm lg:static lg:overflow-y-visible',
        )
      }
    >
      {({ open }) => (
        <>
          <div className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
            <div className='relative flex justify-between xl:grid xl:grid-cols-12 lg:gap-8'>
              <div className='flex md:absolute md:left-0 md:inset-y-0 lg:static xl:col-span-2'>
                <div className='flex items-center flex-shrink-0'>
                  <Link to='/'>
                    <img
                      className='block w-auto h-8'
                      src='https://tailwindui.com/img/logos/workflow-mark.svg?color=rose&shade=500'
                      alt='Workflow'
                    />
                  </Link>
                </div>
              </div>
              <div className='flex-1 min-w-0 md:px-8 lg:px-0 xl:col-span-6'>
                <div className='flex items-center px-6 py-4 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0'>
                  <div className='w-full'>
                    <SearchBox
                      data={data}
                      handleInputChange={handleInputChange}
                      query={query}
                    />
                  </div>
                </div>
              </div>
              <div className='flex items-center md:absolute md:right-0 md:inset-y-0 lg:hidden'>
                {/* Mobile menu button */}
                <Popover.Button className='inline-flex items-center justify-center p-2 -mx-2 text-gray-400 rounded-md hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-rose-500'>
                  <span className='sr-only'>Open menu</span>
                  {open ? (
                    <XIcon className='block w-6 h-6' aria-hidden='true' />
                  ) : (
                    <MenuIcon className='block w-6 h-6' aria-hidden='true' />
                  )}
                </Popover.Button>
              </div>
              <div className='hidden lg:flex lg:items-center lg:justify-end xl:col-span-4'>
                <a
                  href='#'
                  className='flex-shrink-0 p-1 ml-5 text-gray-400 bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500'
                >
                  <span className='sr-only'>View notifications</span>
                  <BellIcon className='w-6 h-6' aria-hidden='true' />
                </a>

                {/* Profile dropdown */}
                <Menu as='div' className='relative flex-shrink-0 ml-5'>
                  <div>
                    <Menu.Button className='flex bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500'>
                      <span className='sr-only'>Open user menu</span>
                      <img
                        className='w-8 h-8 rounded-full'
                        src={profilePic}
                        alt=''
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter='transition ease-out duration-100'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'
                  >
                    <Menu.Items className='absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <a
                              href={
                                item.name === 'Your Profile'
                                  ? `/user/${userId}`
                                  : item.href
                              }
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block py-2 px-4 text-sm text-gray-700',
                              )}
                            >
                              {item.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>

                <Link
                  to='/create'
                  className='inline-flex items-center px-4 py-2 ml-6 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500'
                >
                  New Post
                </Link>
              </div>
            </div>
          </div>

          <Popover.Panel as='nav' className='lg:hidden' aria-label='Global'>
            <div className='max-w-3xl px-2 pt-2 pb-3 mx-auto space-y-1 sm:px-4'>
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  aria-current={item.current ? 'page' : undefined}
                  className={classNames(
                    item.current
                      ? 'bg-gray-100 text-gray-900'
                      : 'hover:bg-gray-50',
                    'block rounded-md py-2 px-3 text-base font-medium',
                  )}
                >
                  {item.name}
                </a>
              ))}
            </div>
            <div className='pt-4 border-t border-gray-200'>
              <div className='flex items-center max-w-3xl px-4 mx-auto sm:px-6'>
                <div className='flex-shrink-0'>
                  <img
                    className='w-10 h-10 rounded-full'
                    src={user.imageUrl}
                    alt=''
                  />
                </div>
                <div className='ml-3'>
                  <div className='text-base font-medium text-gray-800'>
                    {user.name}
                  </div>
                  <div className='text-sm font-medium text-gray-500'>
                    {user.email}
                  </div>
                </div>
                <button
                  type='button'
                  className='flex-shrink-0 p-1 ml-auto text-gray-400 bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500'
                >
                  <span className='sr-only'>View notifications</span>
                  <BellIcon className='w-6 h-6' aria-hidden='true' />
                </button>
              </div>
              <div className='max-w-3xl px-2 mx-auto mt-3 space-y-1 sm:px-4'>
                {userNavigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className='block px-3 py-2 text-base font-medium text-gray-500 rounded-md hover:bg-gray-50 hover:text-gray-900'
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>

            <div className='max-w-3xl px-4 mx-auto mt-6 sm:px-6'>
              <a
                href='#'
                className='flex items-center justify-center w-full px-4 py-2 text-base font-medium text-white border border-transparent rounded-md shadow-sm bg-rose-600 hover:bg-rose-700'
              >
                New Post
              </a>

              <div className='flex justify-center mt-6'>
                <a
                  href='#'
                  className='text-base font-medium text-gray-900 hover:underline'
                >
                  Go Premium
                </a>
              </div>
            </div>
          </Popover.Panel>
        </>
      )}
    </Popover>
  );
};

export default Topnav;
