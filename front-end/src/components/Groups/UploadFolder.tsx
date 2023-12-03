import { Dialog, Transition } from '@headlessui/react';
import { PhotoIcon } from '@heroicons/react/24/outline';
import { useFormik } from 'formik';
import axios from '../../axiosInstance';
import React, { Fragment, useState } from 'react';
import { useParams } from 'react-router-dom';
import GlobalLoader from '../GlobalLoader';

const UploadFolder = ({ open, setOpen, handleSuccess, handleError }) => {
  const { groupId, '*': path } = useParams();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
    },

    onSubmit: (values: any) => {
      setLoading(true);

      axios
        .post(`/api/files/create/${groupId}`, values, {
          params: {
            path: `/${path}`,
          },
        })
        .then((response: any) => {
          console.log(response);
          formik.resetForm();
          handleSuccess('Folder');
        })
        .catch((error: any) => {
          handleError();
        })
        .then(() => {
          setLoading(false);
          setOpen(false);
        });
    },
  });

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={() => setOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md sm:p-6'>
                <form onSubmit={formik?.handleSubmit}>
                  <label
                    htmlFor='code'
                    className='block text-sm font-medium leading-6 text-gray-900 mt-6'
                  >
                    Name of the folder
                  </label>
                  <div className='mt-2'>
                    <input
                      type='name'
                      name='name'
                      id='name'
                      onChange={formik?.handleChange}
                      className='pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                      placeholder='Name'
                      required
                    />
                    <p
                      className='mt-2 text-sm text-gray-500'
                      id='code-description'
                    >
                      Enter the name of the folder you want to create
                    </p>
                  </div>
                  <div className='mt-12 flex justify-center gap-8'>
                    <button className='py-2 px-6 bg-green-500 hover:bg-green-600 transition-all duration-200 text-white rounded-lg'>
                      Save
                    </button>
                    <button
                      className='py-2 px-6 bg-red-500 hover:bg-red-600 transition-all duration-200 text-white rounded-lg'
                      onClick={(e: any) => {
                        e.preventDefault();
                        setOpen(false);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
                <p className='mt-3 text-sm text-red-500 flex justify-center '>
                  {/* {error} */}
                </p>

                {loading ? <GlobalLoader /> : null}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default UploadFolder;
