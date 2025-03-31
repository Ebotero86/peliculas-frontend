import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMediaForId, updateMedia } from '../../services/mediaServices';
import { getDirectores } from '../../services/directorServices';
import { getGeneros } from '../../services/generoServices';
import { getProductoras } from '../../services/productoraServices';
import { getTipos } from '../../services/tipoServices';
import Swal from 'sweetalert2';

export const MediaUpdate = () => {
  const { mediaId = '' } = useParams();
  const [media, setMedia] = useState();
  const [directores, setDirectores] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [productoras, setProductoras] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [valoresForm, setValoresForm] = useState([]);
  const { serial = '', titulo = '', sinopsis = '', url = '', imagen = '', anoestreno = '', genero = '', productora, director, descripcion } = valoresForm;

  const listDirectores = async () => {
    try {
      const { data } = await getDirectores();
      setDirectores(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listDirectores();
  }, []);

  const listGeneros = async () => {
    try {
      const { data } = await getGeneros();
      setGeneros(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listGeneros();
  }, []);

  const listProductoras = async () => {
    try {
      const { data } = await getProductoras();
      setProductoras(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listProductoras();
  }, []);

  const listTipos = async () => {
    try {
      const { data } = await getTipos();
      setTipos(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listTipos();
  }, []);

  const getMedia = async () => {
    try {
      const { data } = await getMediaForId(mediaId);
      setMedia(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMedia();
  }, [mediaId]);

  useEffect(() => {
    if (media) {
      setValoresForm({
        serial: media.serial,
        titulo: media.titulo,
        sinopsis: media.sinopsis,
        url: media.url,
        imagen: media.imagen,
        anoestreno: media.anoestreno,
        genero: media.genero,
        productora: media.productora,
        director: media.director,
        descripcion: media.descripcion
      });
    }
  }, [media]);

  const handleOnChange = ({ target }) => {
    const { name, value } = target;
    setValoresForm({ ...valoresForm, [name]: value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const updatedMedia = {
      serial, titulo, sinopsis, url, imagen, anoestreno,
      genero: { _id: genero },
      productora: { _id: productora },
      director: { _id: director },
      descripcion
    };

    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();
      await updateMedia(mediaId, updatedMedia);
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  };

  return (
    <div className='container-fluid mt-3 mb-2'>
      <div className='card'>
        <div className='card-header'>
          <h5 className='card-title'>Actualizar Pelicula</h5>
        </div>
        <div className='card-body'>
          <form onSubmit={handleOnSubmit}>
            <div className='mb-3'>
              <label className='form-label'>Título</label>
              <input type='text' name='titulo' value={titulo} onChange={handleOnChange} required className='form-control' />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Sinopsis</label>
              <textarea name='sinopsis' value={sinopsis} onChange={handleOnChange} required className='form-control'></textarea>
            </div>
            <div className='mb-3'>
              <label className='form-label'>URL</label>
              <input type='url' name='url' value={url} onChange={handleOnChange} required className='form-control' />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Año de Estreno</label>
              <input type='number' name='anoestreno' value={anoestreno} onChange={handleOnChange} required className='form-control' />
            </div>
            <button type='submit' className='btn btn-primary'>Guardar</button>
          </form>
        </div>
      </div>
    </div>
  );
};
