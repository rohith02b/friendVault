import { useEffect, useState } from 'react';
import Layout from '../Layouts/Layout';
import folderIcon from '/assets/folderIcon.png';
import axios from '../../axiosInstance';
import CreateGroup from './CreateGroup';
import { PlusIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { IconFolderFilled } from '@tabler/icons-react';
import Lottie from 'lottie-react';
import nogroups from '../assets/nogroups.json';
import fetchLoading from '../assets/fetch-loading.json';

const Home = () => {
  const [groups, setGroups] = useState<Array<any>>();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchGroups = () => {
    setLoading(true);
    axios
      .get(`/api/groups/`)
      .then((response: any) => {
        setTimeout(() => {
          setGroups(response?.data);
          setLoading(false);
        }, 1000);
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
          className='w-[60vw] bg-green-300 border border-green-500 py-2 text-slate-700 rounded-lg cursor-pointer hover:border hover:border-green-400 hover:bg-transparent transition-all duration-200 mb-6 text-center'
          onClick={() => setOpen(true)}
        >
          <button>Create or join an existing group</button>
        </div>
      </div>

      <div className='bg-slate-100 w-full mb-6 h-0.5' />
      {loading ? (
        <div className='mt-12'>
          <Lottie className='h-32' animationData={fetchLoading} />
        </div>
      ) : (
        <>
          {groups?.length > 0 ? (
            <div className='grid grid-cols-3 sm:grid-cols-5 xl:grid-cols-8 mt-8 gap-8'>
              {groups?.map((each: any) => {
                return (
                  <Link
                    key={each.code}
                    className='p-3 hover:bg-blue-100 rounded-lg transition-all duration-200 flex justify-center flex-col items-center cursor-pointer'
                    to={`${each.id}`}
                  >
                    <IconFolderFilled width={60} height={60} />
                    <div className='mt-3 text-center'>{each.name}</div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className='grid place-items-center'>
              <Lottie
                animationData={nogroups}
                className='w-[100%] md:w-[50%] lg:w-[40%]'
              />
            </div>
          )}
        </>
      )}

      <CreateGroup open={open} setOpen={setOpen} handleClose={handleClose} />
    </Layout>
  );
};

export default Home;
