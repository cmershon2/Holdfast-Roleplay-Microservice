'use client';
import { Card } from 'flowbite-react';
import {GiScrollUnfurled} from 'react-icons/gi';

export const HeroSection = () => {

return(
    <section className="flex items-center justify-center h-screen">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
            <div className='flex justify-center'>
                <img className='h-48 w-48' src='/logo.png' />
            </div>

            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Holdfast Roleplay Admin</h1>
            <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">This project aims to provide an easy-to-use online interface and API for managing roleplaying content within the popular game "Holdfast: Nations At War" on modded servers.</p>
            
            <div className='flex justify-center'>
                <Card className="max-w-sm mx-2" href="/docs" >

                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Documentation
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                        Learn about the best practices, getting started, & check out the avaliable API endpoints.
                    </p>
                </Card>
                <Card
                className="max-w-sm mx-2"
                href="/app"
                >
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Application
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                        Build out & manage your roleplay environment through our interactive interface.
                    </p>
                </Card>
            </div>
            
        </div>
    </section>
)
}