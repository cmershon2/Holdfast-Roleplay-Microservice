'use client';

import { Avatar, Dropdown, Navbar } from 'flowbite-react';
import { LogoutButton, ThemeButton } from './buttons.components';
import { User } from '@/types/user/types';

export default function TopbarNavigation( user: User ) {

  return (
    <Navbar
      fluid
      border
    >
      <Navbar.Brand href="/">
        <img
          alt="Holdfast Roleplay Logo"
          className="mr-3 h-6 sm:h-9"
          src="/logo.png"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Holdfast Roleplay Admin
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <ThemeButton />

        <Dropdown
          inline
          label={<Avatar alt="User settings" img={user.avatar} rounded/>}
        >
          <Dropdown.Header>
            <span className="block text-sm">
              {user.name}
            </span>
            <span className="block truncate text-sm font-medium">
              {user.email}
            </span>
          </Dropdown.Header>
          <Dropdown.Item>
            User Settings
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>
            <LogoutButton />
          </Dropdown.Item>
        </Dropdown>
      </div>
    </Navbar>
  )
}