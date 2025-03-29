import React, { useState, useEffect} from 'react'
import { getMedias } from '../../services/mediaServices';
import { MediaCard } from '../media/MediaCard';
import { MediaNew } from './MediaNew';

export const MediaView = () => {

  const [ Medias, setMedias] = useState([]);
  const [openModal, setOpenModal] = useState(false);


  const listMedias = async () =>{

    try{

      const { data } = await getMedias();
      console.log(data);
      setMedias(data);

    }catch(error){
      console.log(error);
    }
  }

  useEffect(() =>{
    listMedias();

  },[]);

  const handleOpenModal = () => {
    setOpenModal (!openModal)
  }

  return (
    <div className='container-fluid'>
      <div className="mt-2 mb-2 row row-cols-1 row-cols-md-4 g-4">
        {
          Medias.map((media) =>{
            return <MediaCard key = { media._id } media = { media } />
          })
        }
    
    </div>
    {
      openModal ? <MediaNew
      handleOpenModal={ handleOpenModal }
      listMedias = { listMedias } /> :
      <button className='btn btn-primary Agregar' onClick={ handleOpenModal } >
      <i class="fa-solid fa-plus"></i>
      </button>  
    }
    </div> 
  )
}


