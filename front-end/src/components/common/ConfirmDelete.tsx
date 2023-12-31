import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

import { IconAlertTriangleFilled } from '@tabler/icons-react';
const ConfirmDelete = ({
  open,
  setOpen,
  handleConfirmDelete,
  handleCancel,
}) => {
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
                <div className='flex justify-center '>
                  <div className='flex flex-col '>
                    <IconAlertTriangleFilled
                      width={100}
                      height={100}
                      className='mx-auto'
                    />
                    <p className='text-xl text-center'>
                      Are you sure you want to delete ?
                    </p>
                    <div className='flex gap-8 mt-4 justify-center'>
                      <button
                        onClick={handleConfirmDelete}
                        className='px-6 py-2 border border-md rounded-md border-slate-900 hover:bg-red-500 hover:text-white transition-all duration-300'
                      >
                        Delete
                      </button>
                      <button
                        onClick={handleCancel}
                        className='px-6 py-2 border border-md rounded-md border-slate-900 hover:bg-blue-100  transition-all duration-300'
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ConfirmDelete;
