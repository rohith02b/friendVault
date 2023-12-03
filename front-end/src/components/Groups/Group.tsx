import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Layout from '../Layouts/Layout';
import { useEffect, useState } from 'react';
import axios from '../../axiosInstance';
import { IconFolderFilled, IconUpload } from '@tabler/icons-react';
import { IconFileFilled } from '@tabler/icons-react';
import error from '../assets/error.json';
import Lottie from 'lottie-react';
import nofolder from '../assets/nofolders.json';
import nofiles from '../assets/nofiles.json';
import UploadFiles from './UploadFiles';
import { toast, Toaster } from 'sonner';
import fetchLoading from '../assets/fetch-loading.json';
import UploadFolder from './UploadFolder';

const Group = () => {
  const [allFolders, setAllFolders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allFiles, setAllFiles] = useState([]);
  const { groupId, '*': path } = useParams();
  const [folder, setFolder] = useState<any>(`/${path}`);
  const location = useLocation();
  const navigate = useNavigate();
  const [err, setError] = useState('');
  const [open, setOpen] = useState(false);
  const [folderOpen, setFolderOpen] = useState(false);

  const fetchContent = () => {
    setLoading(true);
    axios
      .get(`/api/files/${groupId}`, {
        params: {
          path: `/${path}`,
        },
      })
      .then((response: any) => {
        setTimeout(() => {
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
          setLoading(false);
        }, 1000);
      })
      .catch((error: any) => {
        setError(error?.response?.data);
      })
      .then(() => {});
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

  const handleSuccess = (type: any) => {
    if (type === 'files') toast.success('Uploaded successfully');
    else {
      toast.success('Created successfully');
    }
    fetchContent();
  };

  const handleError = () => {
    toast.error('An error occured');
  };

  if (err) {
    return (
      <div className='grid h-screen place-content-center'>
        <Lottie className='h-80' animationData={error} />
        <div className='text-2xl text-red-400 text-center'>{err}</div>
        <Link to={'/'} className='flex justify-center'>
          <button className='bg-blue-600 px-4 py-2 text-white rounded-md mt-6 hover:bg-blue-800'>
            Back to home page
          </button>
        </Link>
      </div>
    );
  }

  return (
    <Layout>
      <Toaster richColors position='top-right' />
      <div className='mt-8 flex justify-between items-center mb-6'>
        <div className='h3 text-3xl'>Folders</div>
        <div
          className='px-6 py-2 bg-trsnaprent border border-green-500 py-3 text-slate-700 rounded-lg cursor-pointer hover:border hover:border-green-400 hover:bg-green-300 transition-all duration-200 text-center flex gap-3 '
          onClick={() => setFolderOpen(true)}
        >
          <IconUpload />
          <button>Create folder</button>
        </div>
      </div>
      {loading ? (
        <>
          <Lottie className='h-32' animationData={fetchLoading} />
        </>
      ) : (
        <>
          {allFolders?.length > 0 ? (
            <div className='grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-6 mt-8 gap-8'>
              {allFolders?.map((each: any) => {
                const truncatedName =
                  each.content_name.length > 20
                    ? `${each.content_name.substring(0, 20)}...`
                    : each.content_name;
                return (
                  <div
                    key={each.id}
                    className='p-3 hover:bg-blue-100  bg-slate-200  rounded-lg transition-all duration-200 flex-col justify-center items-center cursor-pointer '
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
            <div className='grid place-items-center mt-6'>
              <Lottie animationData={nofolder} className='w-[70%] md:w-[20%]' />
            </div>
          )}
        </>
      )}

      <div className='border border-lg border-slate-100 mt-6 '></div>
      <div className='mt-8 flex justify-between items-center mb-6'>
        <div className='h3 text-3xl'>Files</div>
        <div
          className='px-6 py-2 bg-trsnaprent border border-green-500 py-3 text-slate-700 rounded-lg cursor-pointer hover:border hover:border-green-400 hover:bg-green-300 transition-all duration-200 text-center flex gap-3 '
          onClick={() => setOpen(true)}
        >
          <IconUpload />
          <button>Upload files</button>
        </div>
      </div>
      {loading ? (
        <>
          <Lottie className='h-32' animationData={fetchLoading} />
        </>
      ) : (
        <>
          {allFiles?.length > 0 ? (
            <div className='grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 mt-8 gap-10'>
              {allFiles?.map((each: any) => {
                const truncatedName =
                  each.content_name.length > 20
                    ? `${each.content_name.substring(0, 16)}...`
                    : each.content_name;

                // let extension = each.content_name.split('.')[1];
                // let type = imageExtensions.includes(extension)
                //   ? 'image'
                //   : videoExtensions.includes(extension)
                //   ? 'video'
                //   : null;

                return (
                  <Link
                    key={each.id}
                    className='p-5 hover:bg-blue-100  bg-slate-200  rounded-lg transition-all duration-200 flex-column justify-center items-center cursor-pointer'
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

              <UploadFiles
                open={open}
                setOpen={setOpen}
                handleSuccess={handleSuccess}
                handleError={handleError}
              />
              <UploadFolder
                open={folderOpen}
                setOpen={setFolderOpen}
                handleSuccess={handleSuccess}
                handleError={handleError}
              />
            </div>
          ) : (
            <div className='grid place-items-center'>
              <Lottie animationData={nofiles} className='w-[100%] md:w-[30%]' />
            </div>
          )}
        </>
      )}
    </Layout>
  );
};

export default Group;
