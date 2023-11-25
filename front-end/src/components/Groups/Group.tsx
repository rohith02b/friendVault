import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Layout from '../Layouts/Layout';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { IconFolderFilled } from '@tabler/icons-react';
import { IconFileFilled } from '@tabler/icons-react';
import error from '../assets/error.json';
import Lottie from 'lottie-react';

const Group = () => {
  const [allFolders, setAllFolders] = useState([]);
  const [allFiles, setAllFiles] = useState([]);
  const { groupId, '*': path } = useParams();
  const [folder, setFolder] = useState<any>(`/${path}`);
  const location = useLocation();
  const navigate = useNavigate();
  const [err, setError] = useState('');
  const BASEURL = import.meta.env.VITE_AUTH_SERVICE_URL;

  const fetchContent = () => {
    axios
      .get(`${BASEURL}/api/files/${groupId}`, {
        params: {
          path: `/${path}`,
        },
      })
      .then((response: any) => {
        if (response?.data) {
          const data = response?.data;
          let files = [];
          let folders = [];
          data?.map((each: any) => {
            if (each?.content_type === 'file') {
              files.push(each);
            } else {
              folders.push(each);
            }
          });

          setAllFiles(files);
          setAllFolders(folders);
        }
      })
      .catch((error: any) => {
        setError(error?.response?.data);
      });
  };

  const handleClick = (folder: any) => {
    const pathToRedirect = location.pathname + `/${folder}`;
    setFolder(`/${folder}`);
    navigate(pathToRedirect);
  };

  useEffect(() => {
    fetchContent();
  }, [folder]); // Watch for changes in the 'folder' state

  useEffect(() => {
    setFolder(`/${path}`); // Update 'folder' state when 'path' changes
  }, [path]);

  return (
    <>
      {err ? (
        <div className='grid h-screen place-content-center'>
          <Lottie className='h-80' animationData={error} />
          <div className='text-2xl text-red-400 text-center'>{err}</div>
          <Link to={'/'} className='flex justify-center'>
            <button className='bg-blue-600 px-4 py-2 text-white rounded-md mt-6 hover:bg-blue-800'>
              Back to home page
            </button>
          </Link>
        </div>
      ) : (
        <Layout>
          <div className='h3'>Folders</div>
          {allFolders?.length > 0 ? (
            <div className='grid grid-cols-3 sm:grid-cols-5 xl:grid-cols-8 mt-8 gap-8'>
              {allFolders?.map((each: any) => {
                const truncatedName =
                  each.content_name.length > 20
                    ? `${each.content_name.substring(0, 20)}...`
                    : each.content_name;
                return (
                  <div
                    key={each.id}
                    className='p-3 hover:bg-blue-100 w-48 rounded-lg transition-all duration-200 flex-col justify-center items-center cursor-pointer'
                    onClick={() => handleClick(each.content_name)}
                  >
                    <IconFolderFilled
                      width={60}
                      height={50}
                      className='mx-auto'
                    />
                    <div className='mt-1 text-center -mt-0'>
                      {truncatedName}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className='grid place-items-center mt-6'>No Folders</div>
          )}

          <div className='h3 mt-12'>Files</div>
          {allFiles?.length > 0 ? (
            <div className='grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 mt-8 gap-10'>
              {allFiles?.map((each: any) => {
                const truncatedName =
                  each.content_name.length > 20
                    ? `${each.content_name.substring(0, 20)}...`
                    : each.content_name;
                return (
                  <Link
                    key={each.id}
                    className='p-3 hover:bg-blue-100 w-48  rounded-lg transition-all duration-200 flex-column justify-center items-center cursor-pointer'
                    to={`${each.url}`}
                    title={each.content_name}
                  >
                    <IconFileFilled
                      width={40}
                      height={40}
                      className='mx-auto'
                    />
                    <div className='mt-1 text-center'>{truncatedName}</div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className='grid place-items-center'>No Content</div>
          )}
        </Layout>
      )}
    </>
  );
};

export default Group;
