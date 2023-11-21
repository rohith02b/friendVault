import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Layout from '../Layouts/Layout'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { IconFolderFilled } from '@tabler/icons-react';
import { IconFileFilled } from '@tabler/icons-react';


const Group = () => {

 const [allFolders,setAllFolders] = useState([]);
 const [allFiles,setAllFiles] = useState([]);
 const {groupId , '*' : path } = useParams();
 const [folder,setFolder] = useState<any>(`/${path}`);
 const location = useLocation();
 const navigate = useNavigate();
 const BASEURL = import.meta.env.VITE_AUTH_SERVICE_URL;

 const fetchContent = () => {
  axios.get(`${BASEURL}/api/files/${groupId}`, {
   params : {
    path : folder
   }
  }).then((response : any) => {
    const data = response?.data;
    let files= [];
    let folders = [];
    data?.map((each : any) => {
      if(each?.content_type === 'file')
      {
        files.push(each)
      }
      else {
        folders.push(each)
      }
    })

    setAllFiles(files);
    setAllFolders(folders)
  })
 }


 const handleClick = (folder : any) => {
  const pathToRedirect = location.pathname + `/${folder}`
  setFolder(`/${folder}`)
  navigate(pathToRedirect);
 }

 useEffect(() => {
  fetchContent();
 },[folder])

  return (
    <Layout>
      <div className="h3">Folders</div>
      {allFolders?.length > 0 ? (
        <div className='grid grid-cols-3 sm:grid-cols-5 xl:grid-cols-8 mt-8 gap-8'>
          {allFolders?.map((each: any) => {
            return (
              <div
                key={each.id}
                className='p-3 hover:bg-blue-100 w-48 h-20 rounded-lg transition-all duration-200 flex justify-around flex-row items-center cursor-pointer'
                onClick={() => handleClick(each.content_name)}
              >
                <IconFolderFilled  width={40} height={40}/>
                <div className='mt-1 text-center -mt-0'>{each.content_name}</div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className='grid place-items-center mt-6'>No Folders</div>
      )}

      <div className="h3 mt-12">Files</div>
      {allFiles?.length > 0 ? (
        <div className='grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 mt-8 gap-10'>
          {allFiles?.map((each: any) => {
            return (
              <Link
                key={each.id}
                className='p-3 hover:bg-blue-100 w-48 h-20 rounded-lg transition-all duration-200 flex justify-around flex-row items-center cursor-pointer'
                to={`${each.url}`}
              >
                <IconFileFilled width={40} height={40}/>
                <div className='mt-1 text-center'>{each.content_name}</div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className='grid place-items-center'>No Content</div>
      )}
    </Layout>
  )
}

export default Group