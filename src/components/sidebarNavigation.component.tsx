'use client'

import { SideBarAdminStructure, SideBarStructure } from "@/constants/entities/sideBarStructure";
import { sideBarLink } from "@/types/navigation/types";
import { User } from "@/types/user/types";
import { CustomFlowbiteTheme, Sidebar } from "flowbite-react"

import { usePathname } from "next/navigation";


const customTheme: CustomFlowbiteTheme['sidebar'] = {
    root: {
      base: "mt-16 h-full",
      collapsed: {
        on: "w-16",
        off: "w-64"
      },
      inner: "fixed left-0 z-40 w-64 h-screen pt-4 px-4 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
    },
    "collapse": {
      "button": "group flex w-full items-center rounded-lg p-2 text-base font-normal text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700",
      "icon": {
        "base": "h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white",
        "open": {
          "off": "",
          "on": "text-gray-900"
        }
      },
      "label": {
        "base": "ml-3 flex-1 whitespace-nowrap text-left",
        "icon": "h-6 w-6"
      },
      "list": "space-y-2 py-2"
    },
    "cta": {
      "base": "mt-6 rounded-lg p-4 bg-gray-100 dark:bg-gray-700",
      "color": {
        "blue": "bg-cyan-50 dark:bg-cyan-900",
        "dark": "bg-dark-50 dark:bg-dark-900",
        "failure": "bg-red-50 dark:bg-red-900",
        "gray": "bg-alternative-50 dark:bg-alternative-900",
        "green": "bg-green-50 dark:bg-green-900",
        "light": "bg-light-50 dark:bg-light-900",
        "red": "bg-red-50 dark:bg-red-900",
        "purple": "bg-purple-50 dark:bg-purple-900",
        "success": "bg-green-50 dark:bg-green-900",
        "yellow": "bg-yellow-50 dark:bg-yellow-900",
        "warning": "bg-yellow-50 dark:bg-yellow-900"
      }
    },
    "item": {
      "base": "flex items-center justify-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700",
      "active": "bg-gray-100 dark:bg-gray-700",
      "collapsed": {
        "insideCollapse": "group w-full pl-8 transition duration-75",
        "noIcon": "font-bold"
      },
      "content": {
        "base": "px-3 flex-1 whitespace-nowrap"
      },
      "icon": {
        "base": "h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white",
        "active": "text-gray-700 dark:text-gray-100"
      },
      "label": "",
      "listItem": ""
    },
    "items": "",
    "itemGroup": "mt-4 space-y-2 border-t border-gray-200 pt-4 first:mt-0 first:border-t-0 first:pt-0 dark:border-gray-700",
    "logo": {
      "base": "mb-5 flex items-center pl-2.5",
      "collapsed": {
        "on": "hidden",
        "off": "self-center whitespace-nowrap text-xl font-semibold dark:text-white"
      },
      "img": "mr-3 h-6 sm:h-7"
    }
  }

const SidebarLink = ( link : sideBarLink ) => {
  const router = usePathname();
  let activeChild = false;

  // open parent dropdown if child is active
  if(link.links != undefined) {
    link.links.map((nestedLink : sideBarLink) => {
      if(router === nestedLink.href)
      {
        activeChild = true;
      }
    })
  }

  return (
    <>
      {link.links != undefined && (
        <Sidebar.Collapse icon={link.icon} label={link.label} open={activeChild}>
          {link.links.map((nestedLink : sideBarLink) => (
              <SidebarLink key={nestedLink.label} {...nestedLink} />
          ))}
        </Sidebar.Collapse>
      )}
      { link.links == undefined && (
        <Sidebar.Item href={link.href} icon={link.icon} active={router === link.href ? true : false}>
          <p>{link.label}</p>
      </Sidebar.Item>
      )}
    </>
  );
};

export const SidebarNavigation = ( user: User ) => {

  return(
    <Sidebar theme={customTheme} aria-label="Sidebar Navigation">
      <Sidebar.Items>
          <Sidebar.ItemGroup>
              {
                SideBarStructure.map((data) => (
                    <SidebarLink key={data.label} {...data} />
                ))
              }              
          </Sidebar.ItemGroup>
          {user.role == 'ADMIN' && (
            <Sidebar.ItemGroup>
              {
                SideBarAdminStructure.map((data) => (
                    <SidebarLink key={data.label} {...data} />
                ))
              }
            </Sidebar.ItemGroup>
          )}
      </Sidebar.Items>
    </Sidebar>
  )
}