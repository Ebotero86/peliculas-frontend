import React, { useState, useEffect} from 'react'
import { getMedias } from '../../services/mediaServices';
import { MediaCard } from '../media/MediaCard';
import { MediaNew } from './MediaNew';
import Swal from 'sweetalert2';

export const MediaView = () => {

  const [ Medias, setMedias] = useState([]);
  const [openModal, setOpenModal] = useState(false);


  const listMedias = async () =>{

    try{
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();
      const { data } = await getMedias();
      Swal.close();
      setMedias(data);

    }catch(error){
      console.log(error);
      Swal.close();
    }
  }

  useEffect(() =>{
    listMedias();

  },[]);

  const handleOpenModal = () => {
    setOpenModal (!openModal)
  }
  
  return (
    <div className="background-color-page">
      <div className="container">
        <div className="mt-2 mb-2 row row-cols-1 row-cols-md-4 g-4">
          {
            Medias.map((media) => {
              return <MediaCard key={media._id} media={media} />
            })
          }
        </div> 
        {
          openModal ? <MediaNew
              handleOpenModal={handleOpenModal}
              listMedias={listMedias} />:            
             <button className='btn btn-primary Agregar' onClick={handleOpenModal}>
              <i className="fa-solid fa-plus"></i>
            </button>          
        }
      </div>
    </div>
  )
}  