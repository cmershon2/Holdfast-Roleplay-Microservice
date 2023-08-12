'use client';
import { Card } from 'flowbite-react';

export const HeroSection = () => {

return(
    <section>
        
        <Card>
        <h1 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
            Work fast from anywhere
        </h1>
        <p className="mb-5 text-base text-gray-500 dark:text-gray-400 sm:text-lg">
            Stay up to date and move work forward with Flowbite on iOS & Android. Download the app today.
        </p>
        </Card>

    </section>
)
}