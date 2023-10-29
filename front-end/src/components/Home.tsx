import { useState } from 'react'

export default function Example() {
  return (
    <div className='bg-white h-screen grid place-items-center overflow-y-hidden'>
      <div className='relative isolate px-6 lg:px-8'>
        <div className='flex justify-center'>
          <img
            src='./assets/logo.png'
            alt='FriendVault'
            className='w-32 h-32 mb-6'
          />
        </div>
        <div className='mx-auto max-w-3xl '>
          <div className='text-center'>
            <h1 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-6xl'>
              Shared Secure Memories with Friend Vault
            </h1>
            <p className='mt-6 text-lg leading-8 text-gray-600'>
              Safely store, share, and cherish memories with friends. Encrypted,
              seamless file storage for your collective experiences and moments.
            </p>
            <div className='mt-8 flex items-center justify-center gap-x-6'>
              <a
                href='vault/app/auth/register'
                className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              >
                Get started
              </a>
              <a
                href='vault/app/auth/login'
                className='rounded-md bg-indigo-600 px-7 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              >
                Login
              </a>
            </div>
          </div>
        </div>
        <div
          className='absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]'
          aria-hidden='true'
        >
          <div
            className='relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]'
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
      </div>
    </div>
  )
}
