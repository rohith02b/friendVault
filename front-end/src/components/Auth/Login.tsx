import { FormikValues, useFormik } from 'formik';
import * as yup from 'yup';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Example() {
  const [error, setError] = useState<any>();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },

    onSubmit: (values: any) => {
      console.log(`${import.meta.env.VITE_AUTH_SERVICE_URL}`);
      axios
        .post(`${import.meta.env.VITE_AUTH_SERVICE_URL}/api/auth/login`, values)
        .then((response: any) => {
          localStorage.setItem('user', JSON.stringify(response?.data));
          navigate(import.meta.env.VITE_BASE_ROUTE);
        })
        .catch((error) => {
          setError(error?.response?.data);
        });
    },
  });

  return (
    <>
      <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <img
            className='mx-auto h-24 w-auto mt-5'
            src='/assets/logo.png'
            alt='Your Company'
          />
          <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
            Sign in to your account
          </h2>
        </div>

        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <form className='space-y-6' onSubmit={formik?.handleSubmit}>
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Email address
              </label>
              <div className='mt-2'>
                <input
                  id='email'
                  name='email'
                  value={formik?.values?.email}
                  onChange={formik?.handleChange}
                  type='email'
                  autoComplete='email'
                  required
                  className='block w-full rounded-md pl-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div>
              <div className='flex items-center justify-between'>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Password
                </label>
              </div>
              <div className='mt-2'>
                <input
                  id='password'
                  name='password'
                  value={formik?.values?.password}
                  onChange={formik?.handleChange}
                  type='password'
                  autoComplete='current-password'
                  required
                  className='block w-full rounded-md pl-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div>
              <button
                type='submit'
                className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              >
                Sign in
              </button>
            </div>
          </form>

          <p className='mt-10 text-center text-sm text-red-500'>{error}</p>

          <p className='mt-10 text-center text-sm text-gray-500'>
            Not a member?{' '}
            <a
              href='auth/register'
              className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'
            >
              Register
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
