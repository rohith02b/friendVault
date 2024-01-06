import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';

const ContentViewer = ({ open, setOpen, url, mimeType }) => {
  const isImage = mimeType.startsWith('image/');
  const isVideo = mimeType.startsWith('video/');

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as='div'
        className='fixed inset-0 overflow-y-auto z-50 flex items-center justify-center'
        onClose={() => setOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0 scale-95'
          enterTo='opacity-100 scale-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100 scale-100'
          leaveTo='opacity-0 scale-95'
        >
          <div className='relative w-[70vw] h-[70vh] p-6 bg-white rounded-lg shadow-xl flex justify-center items-center'>
            <div className='text-center'>
              {isImage && (
                <img
                  src={url}
                  className='max-w-full max-h-[60vh] object-contain'
                  alt='Image'
                />
              )}
              {isVideo && (
                <video
                  controls
                  className='max-w-full max-h-[60vh]'
                  style={{ outline: 'none' }}
                >
                  <source src={url} type={mimeType} />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
};

export default ContentViewer;
