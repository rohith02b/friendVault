import { useEffect, useState } from 'react';
import Layout from '../Layouts/Layout';
import folderIcon from '/assets/folderIcon.png';
import axios from 'axios';
import CreateGroup from './CreateGroup';
import { PlusIcon } from '@heroicons/react/24/outline';

const Home = () => {
  const [groups, setGroups] = useState([]);
  const BASEURL = import.meta.env.VITE_AUTH_SERVICE_URL;
  const [open, setOpen] = useState(false);

  const fetchGroups = () => {
    axios
      .get(`${BASEURL}/api/groups/`)
      .then((response: any) => {
        setGroups(response?.data);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const handleClose = () => {
    setOpen(false);
    fetchGroups();
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  return (
    <Layout>
      <div className='flex justify-center'>
        <div
          className='w-[60vw]  bg-green-300 py-2 text-slate-700 rounded-lg cursor-pointer hover:shadow-lg transition-all duration-200 mb-6 text-center'
          onClick={() => setOpen(true)}
        >
          <button>Create or join an existing group</button>
        </div>
      </div>

      <div className='bg-slate-100 w-full mb-6 h-0.5' />
      {groups.length > 0 ? (
        <div className='grid grid-cols-3 sm:grid-cols-5 xl:grid-cols-8 mt-8 gap-8'>
          {groups?.map((each: any) => {
            return (
              <div
                key={each.code}
                className='p-3 hover:bg-slate-50 hover:shadow-lg transition-all duration-200 flex justify-center flex-col items-center cursor-pointer'
              >
                <img
                  src={folderIcon}
                  width={100}
                  height={150}
                  alt='Folder icon'
                  className=''
                />
                <div className='mt-3 text-center'>{each.name}</div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className='grid place-items-center'>No Groups</div>
      )}

      <CreateGroup open={open} setOpen={setOpen} handleClose={handleClose} />
    </Layout>
  );
};

export default Home;
