import React, { useState, useEffect } from 'react';
import { getDirectores } from '../../services/directorServices';  
import { getGeneros } from '../../services/generoServices';
import { getProductoras } from '../../services/productoraServices';
import { getTipos } from '../../services/tipoServices';
import { createMedia } from '../../services/mediaServices';
import Swal from 'sweetalert2';

export const MediaNew = ({ handleOpenModal, listMedias }) => {
  const [directores, setDirectores] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [productoras, setProductoras] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [valoresForm, setValoresForm] = useState({});
  
  const { serial = '', titulo = '', sinopsis = '', url = '', imagen = '', anoEstreno = '', 
    generoPrincipal = '', directorPrincipal = '', productora = '', tipo = '' } = valoresForm;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [directoresData, generosData, productorasData, tiposData] = await Promise.all([
          getDirectores(),
          getGeneros(),
          getProductoras(),
          getTipos()
        ]);
        setDirectores(directoresData.data);
        setGeneros(generosData.data);
        setProductoras(productorasData.data);
        setTipos(tiposData.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleOnChange = ({ target }) => {
    const { name, value } = target;
    setValoresForm({ ...valoresForm, [name]: value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const media = {
      serial, titulo, sinopsis, url, imagen, anoEstreno,
      generoPrincipal: { _id: generoPrincipal },
      directorPrincipal: { _id: directorPrincipal },
      productora: { _id: productora },
      tipo: { _id: tipo }
    };
    console.log(media);

    try {
      Swal.fire({ allowOutsideClick: false, text: 'Cargando...' });
      Swal.showLoading();
      await createMedia(media);
      handleOpenModal();
      listMedias();
      Swal.close();
    } catch (error) {
      console.error(error);
      Swal.close();
    }
  };

  return (
    <div className='sidebar'>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col'>
            <div className='sidebar-header'>
              <h3>Nueva Media</h3>
              <i className='fa-solid fa-xmark' onClick={handleOpenModal}></i>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <hr />
            </div>
        </div>
        <form onSubmit={handleOnSubmit}>
          <div className='row'>
            <div className='col'>
              <div className='mb-3'>
                <label className='form-label'>Serial</label>
                <input type='text' name='serial' value={serial} onChange={handleOnChange} required className='form-control' />
              </div>
            </div>
            <div className='col'>
              <div className='mb-3'>
                <label className='form-label'>Título</label>
                <input type='text' name='titulo' value={titulo} onChange={handleOnChange} required className='form-control' />
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col'>
              <div className='mb-3'>
                <label className='form-label'>Sinopsis</label>
                <textarea name='sinopsis' value={sinopsis} onChange={handleOnChange} required className='form-control'></textarea>
              </div>
            </div>
            <div className='col'>
              <div className='mb-3'>
                <label className='form-label'>URL</label>
                <input type='url' name='url' value={url} onChange={handleOnChange} required className='form-control' />
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col'>
              <div className='mb-3'>
                <label className='form-label'>Imagen</label>
                <input type='text' name='imagen' value={imagen} onChange={handleOnChange} required className='form-control' />
              </div>
            </div>
            <div className='col'>
              <div className='mb-3'>
                <label className='form-label'>Año de Estreno</label>
                <input type='number' name='anoEstreno' value={anoEstreno} onChange={handleOnChange} required className='form-control' />
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col'>
              <div className='mb-3'>
                <label className='form-label'>Género Principal</label>
                <select name='generoPrincipal' value={generoPrincipal} onChange={handleOnChange} required className='form-select'>
                  <option value=''>--SELECCIONE--</option>
                  {generos.map(({ _id, name }) => <option key={_id} value={_id}>{name}</option>)}
                </select>
              </div>
            </div>
            <div className='col'>
              <div className='mb-3'>
                <label className='form-label'>Productora</label>
                <select name='productora' value={productora} onChange={handleOnChange} required className='form-select'>
                  <option value=''>--SELECCIONE--</option>
                  {productoras.map(({ _id, name }) => <option key={_id} value={_id}>{name}</option>)}
                </select>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col'>
              <button className='btn btn-primary'>Guardar</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
