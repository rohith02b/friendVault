import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { PhotoIcon } from '@heroicons/react/24/outline';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import GlobalLoader from './GlobalLoader';

const AddContent = ({ open, handleClose, handleSave }: any) => {
  const [option, setOption] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const BASEURL = import.meta.env.VITE_AUTH_SERVICE_URL;
  const { groupId, '*': path } = useParams();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      fileUpload: undefined,
    },

    onSubmit: (values: any) => {
      setLoading(true);
      const formData = new FormData();
      if (values.fileUpload && values.fileUpload.length > 0) {
        for (let i = 0; i < values.fileUpload.length; i++) {
          formData.append(`files`, values.fileUpload[i]);
        }
      }

      axios
        .post(`${BASEURL}/api/files/${groupId}`, formData, {
          params: {
            path: `/${path}`,
          },
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response: any) => {
          console.log(response);
          handleClose();
        })
        .catch((error: any) => {
          console.log(error);
        })
        .then(() => {
          window.location.reload();
        });
    },
  });

  const folderCreation = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: (values) => {
      axios
        .post(`${BASEURL}/api/files/create/${groupId}`, values, {
          params: {
            path: `/${path}`,
          },
        })
        .then((response: any) => {
          window.location.reload();
          handleClose();
        })
        .catch((error: any) => {
          console.log(error);
        });
    },
  });

  return (
    <Transition.Root show={open}>
      {' '}
      <Dialog as='div' className='relative z-10' onClose={handleClose}>
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
          <div className='flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0'>
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
                    className='block text-sm font-medium leading-6 w-full text-gray-900'
                  >
                    Choose an option
                  </label>
                  <select
                    id='location'
                    name='location'
                    className='mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600  sm:text-sm sm:leading-6'
                    value={option}
                    onChange={(e: any) => setOption(e.target.value)}
                  >
                    <option>Select</option>
                    <option>Upload files</option>
                    <option>Create a folder</option>
                  </select>
                </div>

                {loading ? <GlobalLoader /> : null}

                {option === 'Upload files' ? (
                  <form onSubmit={formik?.handleSubmit}>
                    <div className='w-80 col-span-full mt-12'>
                      <div className='mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10'>
                        <div className='text-center'>
                          <PhotoIcon
                            className='mx-auto h-12 w-12 text-gray-300'
                            aria-hidden='true'
                          />
                          <div className='mt-4 flex text-sm leading-6 text-gray-600'>
                            <label
                              htmlFor='fileUpload'
                              className='relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500'
                            >
                              <span>Upload files</span>
                              <input
                                multiple
                                id='fileUpload'
                                name='fileUpload'
                                type='file'
                                className='sr-only'
                                // Remove the value attribute to let React manage the input value
                                onChange={(event) => {
                                  // Check if files were selected
                                  if (event.currentTarget.files) {
                                    // Set Formik field value with selected files
                                    formik.setFieldValue(
                                      'fileUpload',
                                      event.currentTarget.files
                                    );
                                  }
                                }}
                              />
                            </label>
                            <p className='pl-1'>or drag and drop</p>
                          </div>
                          <p className='text-xs leading-5 text-gray-600'>
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </div>
                      </div>
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
                        onClick={handleClose}
                      >
                        Cancel
                      </button>
                    </div>
                    <p className='mt-6 text-sm text-red-500 flex justify-center '>
                      {error}
                    </p>
                  </form>
                ) : option === 'Create a folder' ? (
                  <form onSubmit={folderCreation?.handleSubmit}>
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
                        onChange={folderCreation?.handleChange}
                        className='pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                        placeholder='Coorg'
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
                        onClick={handleClose}
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

export default AddContent;
