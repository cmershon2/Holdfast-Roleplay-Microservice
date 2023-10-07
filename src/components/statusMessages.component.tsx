import Image from 'next/image'

export const SearchStatusScreen = ({title, message} : any) => {

    return(
        <div className='grid place-items-center my-10'>
            <Image 
                src="/status/search.svg"   
                width={500}
                height={500}
                alt='No data image'
            />
            <h5 className='mt-10 text-4xl font-extrabold dark:text-white'> {title} </h5>
            <p className='mt-6 text-center tracking-wide text-gray-500 md:text-lg dark:text-gray-400'> {message} </p>
        </div>
    )
}

export const AccessDeniedStatusScreen = ({title, message} : any) => {

    return(
        <div className='grid place-items-center my-10'>
            <Image 
                src="/status/denied.svg"   
                width={300}
                height={300}
                alt='Access Denied image'
            />
            <h5 className='mt-10 text-4xl font-extrabold dark:text-white'> {title} </h5>
            <p className='mt-6 text-center tracking-wide text-gray-500 md:text-lg dark:text-gray-400'> {message} </p>
        </div>
    )
}