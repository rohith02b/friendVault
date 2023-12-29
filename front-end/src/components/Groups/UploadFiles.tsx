import { Dialog, Transition } from '@headlessui/react';
import { PhotoIcon } from '@heroicons/react/24/outline';
import { useFormik } from 'formik';
import axios from '../../axiosInstance';
import React, { Fragment, useState } from 'react';
import { useParams } from 'react-router-dom';
import GlobalLoader from '../GlobalLoader';
import uniqueId from 'uniqid';

const UploadFiles = ({ open, setOpen, handleSuccess, handleError }) => {
  const BASEURL = import.meta.env.VITE_AUTH_SERVICE_URL;
  const { groupId, '*': path } = useParams();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      fileUpload: [],
    },

    onSubmit: (values: any) => {
      const fileData = [];
      values.fileUpload.map((each: any) => {
        fileData.push({
          content_id: uniqueId.time(),
          group_id: groupId,
          url: 'Not generated yet',
          path: '/' + path,
          content_name: each.name,
          content_type: 'file',
          content_mimetype: each.type,
          uploaded: false,
        });
      });

      axios
        .post(`/api/files/${groupId}`, fileData)
        .then((response: any) => {
          setTimeout(() => {
            values.fileUpload.map((file: any, idx: number) => {
              uploadFileWithSas(
                file,
                response?.data?.url,
                fileData[idx].content_id
              );
            });
          }, 2000);
          formik.resetForm();
          handleSuccess('files');
        })
        .catch((error: any) => {
          handleError();
        })
        .then(() => {
          setOpen(false);
          setLoading(false);
        });
    },
  });

  const uploadFileWithSas = async (file, url, content_id) => {
    const sasUrl = url.split('?');
    const id = uniqueId.time();
    const name = file.name.split('.');
    const fileUrl =
      sasUrl[0] +
      `/${groupId}/${path}/${name[0]}-${id}.${name[1]}?` +
      sasUrl[1];

    try {
      const response = await fetch(fileUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
          'x-ms-blob-type': 'BlockBlob',
        },
      });

      if (response.ok) {
        await axios.put(`/api/files/${groupId}`, {
          content_id: content_id,
          url: decodeURIComponent(response.url.split('?')[0]),
        });
        handleSuccess('UpdatedFile');
      } else {
        console.error('Error uploading file:', response.statusText);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

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
              <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl sm:p-6'>
                <form onSubmit={formik?.handleSubmit}>
                  <div className='flex lg:flex-row flex-col'>
                    <div
                      className={`${
                        formik?.values?.fileUpload?.length > 0
                          ? 'lg:w-1/2'
                          : 'w-[100%]'
                      }`}
                    >
                      <div className='mt-1 mb-4'>
                        <div className='text-xl'>Upload files</div>
                      </div>
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
                                onChange={(event) => {
                                  // Check if files were selected
                                  if (event.currentTarget.files) {
                                    // Set Formik field value with selected files
                                    formik.setFieldValue(
                                      'fileUpload',
                                      Array.from(event.currentTarget.files)
                                    );
                                  }
                                }}
                              />
                            </label>
                            <p className='pl-1'>or drag and drop</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {formik?.values?.fileUpload?.length > 0 ? (
                      <div className='lg:w-1/2 w-[100%] mt-11'>
                        <div className='pl-5'>
                          <ul
                            style={{
                              overflowY: 'scroll',
                              overflowX: 'hidden',
                            }}
                            className='max-h-24 lg:max-h-44'
                          >
                            {formik?.values?.fileUpload.map((file, index) => (
                              <li key={index} className='mt-1'>
                                {file.name}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ) : null}
                  </div>
                  <div className='mt-8 flex justify-center gap-8'>
                    <button
                      className='py-2 px-6 bg-green-500 hover:bg-green-600 transition-all duration-200 text-white rounded-lg'
                      type='submit'
                      disabled={
                        formik?.values?.fileUpload?.length > 0 ? false : true
                      }
                    >
                      Save
                    </button>
                    <button
                      className='py-2 px-6 bg-red-500 hover:bg-red-600 transition-all duration-200 text-white rounded-lg'
                      onClick={(e) => {
                        e.preventDefault(); // Prevent default form submission
                        setOpen(false); // Close the dialog
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

export default UploadFiles;
