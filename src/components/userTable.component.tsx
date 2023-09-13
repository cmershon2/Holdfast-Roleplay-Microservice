'use client'

import { User } from '@/types/user/types';
import { Table, Pagination, Button, Avatar } from 'flowbite-react';
import { GiMailbox } from 'react-icons/gi';
import { useState } from 'react';

export default function UserTable(allUsers : User[]) {
  const [currentPage, setCurrentPage] = useState(1);
  const onPageChange = (page: number) => setCurrentPage(page);
  
  return (
    <>
      <div className='mb-4'>
        <Button color="gray">
          <GiMailbox className="mr-3 h-4 w-4" />
          <p>
            Invite Users
          </p>
        </Button>
      </div>
      <Table>
        <Table.Head>
          <Table.HeadCell>
            Avatar
          </Table.HeadCell>
          <Table.HeadCell>
            Name
          </Table.HeadCell>
          <Table.HeadCell>
            Role
          </Table.HeadCell>
          <Table.HeadCell>
            Email
          </Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">
              Edit
            </span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="p-4">
              <Avatar
                alt="avatar of Code Ducky"
                img="https://api.dicebear.com/6.x/shapes/svg?seed=Code Ducky"
                rounded
              />
            </Table.Cell>
            <Table.Cell className="font-medium text-gray-900 dark:text-white">
              Code Ducky
            </Table.Cell>
            <Table.Cell>
              <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">Admin</span>
            </Table.Cell>
            <Table.Cell>
              Laptop
            </Table.Cell>
            <Table.Cell>
              <a
                className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                href="/tables"
              >
                <p>
                  Edit
                </p>
              </a>
            </Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="w-4">
              <Avatar
                  alt="avatar of Code Ducky"
                  img="https://api.dicebear.com/6.x/shapes/svg?seed=Mass Perfection"
                  rounded
                />
            </Table.Cell>
            <Table.Cell className="font-medium text-gray-900 dark:text-white">
              <p>
                Mass Perfection
              </p>
            </Table.Cell>
            <Table.Cell>
              <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">Admin</span>
            </Table.Cell>
            <Table.Cell>
              Laptop PC
            </Table.Cell>
            <Table.Cell>
              <a
                className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                href="/tables"
              >
                <p>
                  Edit
                </p>
              </a>
            </Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="p-4">
              <Avatar
                  alt="avatar of Code Ducky"
                  img="https://api.dicebear.com/6.x/shapes/svg?seed=Default Admin"
                  rounded
                />
            </Table.Cell>
            <Table.Cell className="font-medium text-gray-900 dark:text-white">
              Default Admin
            </Table.Cell>
            <Table.Cell>
              <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">Admin</span>
            </Table.Cell>
            <Table.Cell>
              Accessories
            </Table.Cell>
            <Table.Cell>
              <a
                className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                href="/tables"
              >
                <p>
                  Edit
                </p>
              </a>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <div className="flex items-center justify-left text-center mt-4">
        <Pagination
          currentPage={1}
          layout="table"
          onPageChange={page=>{setCurrentPage(page)}}
          showIcons
          totalPages={4}
        />
      </div>
    </>
  )
}