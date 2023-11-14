import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { FormikValues, useFormik } from 'formik';
import axios from 'axios';

const CreateGroup = ({ open, setOpen, handleClose }: any) => {
  const [option, setOption] = useState('');
  const [error, setError] = useState('');
  const BASEURL = import.meta.env.VITE_AUTH_SERVICE_URL;
  const formik = useFormik({
    initialValues: {
      code: '',
      name: '',
    },

    onSubmit: (values: any) => {
      if (option === 'Create a group') {
        axios
          .post(`${BASEURL}/api/groups/`, values)
          .then((response: any) => {
            handleClose();
          })
          .catch((error: any) => {
            setError(error?.response?.data);
          });
      } else {
        axios
          .put(`${BASEURL}/api/groups/`, values)
          .then((response: any) => {
            handleClose();
          })
          .catch((error: any) => {
            setError(error?.response?.data);
          });
      }
    },
  });

  return (
    <Transition.Root show={open}>
      {' '}
      <Dialog as='div' className='relative z-10' onClose={setOpen}>
        {' '}
        <Transition.Child
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          {' '}
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />{' '}
        </Transition.Child>{' '}
        <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
          {' '}
          <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
            {' '}
            <Transition.Child
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              {' '}
              <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6'>
                <div>
                  <label
                    htmlFor='option'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Choose an option
                  </label>
                  <select
                    id='location'
                    name='location'
                    className='mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    value={option}
                    onChange={(e: any) => setOption(e.target.value)}
                  >
                    <option>Select</option>
                    <option>Create a group</option>
                    <option>Join an existing group</option>
                  </select>
                </div>

                {option === 'Create a group' ? (
                  <form onSubmit={formik?.handleSubmit}>
                    <label
                      htmlFor='code'
                      className='block text-sm font-medium leading-6 text-gray-900 mt-6'
                    >
                      Code
                    </label>
                    <div className='mt-2'>
                      <input
                        type='text'
                        name='code'
                        id='code'
                        required
                        onChange={formik?.handleChange}
                        className='pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                        placeholder='nanospark'
                      />
                      <p
                        className='mt-2 text-sm text-gray-500'
                        id='code-description'
                      >
                        You must share this code with your friends so that they
                        can join the group.
                      </p>
                    </div>
                    <label
                      htmlFor='name'
                      className='block text-sm font-medium leading-6 text-gray-900 mt-6'
                    >
                      Group name
                    </label>
                    <div className='mt-2'>
                      <input
                        type='text'
                        name='name'
                        id='name'
                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                        placeholder='Missing ;'
                        onChange={formik?.handleChange}
                        required
                      />
                    </div>
                    <div className='mt-12 flex justify-center gap-8'>
                      <button
                        className='py-2 px-6 bg-green-500 hover:bg-green-600 transition-all duration-200 text-white rounded-lg'
                        type='submit'
                      >
                        Save
                      </button>
                      <button
                        className='py-2 px-6 bg-red-500 hover:bg-red-600 transition-all duration-200 text-white rounded-lg'
                        onClick={() => setOpen(false)}
                      >
                        Cancel
                      </button>
                    </div>
                    <p className='mt-6 text-sm text-red-500 flex justify-center '>
                      {error}
                    </p>
                  </form>
                ) : option === 'Join an existing group' ? (
                  <form onSubmit={formik?.handleSubmit}>
                    <label
                      htmlFor='code'
                      className='block text-sm font-medium leading-6 text-gray-900 mt-6'
                    >
                      Code
                    </label>
                    <div className='mt-2'>
                      <input
                        type='code'
                        name='code'
                        id='code'
                        onChange={formik?.handleChange}
                        className='pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                        placeholder='nanospark'
                      />
                      <p
                        className='mt-2 text-sm text-gray-500'
                        id='code-description'
                      >
                        Enter the code to join an existing group
                      </p>
                    </div>
                    <div className='mt-12 flex justify-center gap-8'>
                      <button
                        className='py-2 px-6 bg-green-500 hover:bg-green-600 transition-all duration-200 text-white rounded-lg'
                        type='submit'
                      >
                        Save
                      </button>
                      <button
                        className='py-2 px-6 bg-red-500 hover:bg-red-600 transition-all duration-200 text-white rounded-lg'
                        onClick={() => setOpen(false)}
                      >
                        Cancel
                      </button>
                    </div>
                    <p className='mt-6 text-sm text-red-500 flex justify-center '>
                      {error}
                    </p>
                  </form>
                ) : null}
              </Dialog.Panel>{' '}
            </Transition.Child>{' '}
          </div>{' '}
        </div>{' '}
      </Dialog>{' '}
    </Transition.Root>
  );
};

export default CreateGroup;
