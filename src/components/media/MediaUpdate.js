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
  const { serial = '', titulo = '', sinopsis = '', url = '', imagen = '', anoestreno = '', 
    descripcion='', genero, productora, director, tipo } = valoresForm

  const listDirectores = async () => {
    try {
      const { data } = await getDirectores();
      setDirectores(data);

    } catch (error) {
      console.log(error);

    }
  }

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
  }

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
  }

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
  }

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
  }

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
        tipo: media.tipo,
        descripcion: media.descripcion
      });
    }
  }, [media]);


  const handleOnChange = ({ target }) => {
    const { name, value } = target;
    setValoresForm({ ...valoresForm, [name]: value });
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const media = {
      serial, titulo, sinopsis, url, imagen, anoestreno,
      genero, descripcion,      
      director: {
        _id:director
      },
      productora: {
        _id:productora
      },
    }
    console.log(media);     
    

    try {

      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();
      const { data } = await updateMedia(mediaId, media);
      Swal.close();

    } catch (error) {
      console.log(error);
      Swal.close();

    }
  }

  return (
    <div className='container-fluid mt-3 mb-2'>
      <div className='card'>
        <div className='card-header'>
          <h5 className='card-title'>Actualizar Pelicula</h5>
        </div>
        <div className='card-body'>
          <div className='row'>
            <div className='mb-4'>
              <img src={media?.imagen} />
            </div>
            <div className='col-md-8'>
              <form onSubmit={(e) => handleOnSubmit(e)}>
                <div className='row'>

                  <div className='col'>
                    <div className='mb-3'>
                      <label className='form-label'>Serial</label>
                      <input type='text' name='serial'
                        value={serial}
                        onChange={e => handleOnChange(e)}
                        required
                        className='form-control'/>
                    </div>
                  </div>

                  <div className='col'>
                    <div className='mb-3'>
                      <label className='form-label'>Título</label>
                      <input type='text' name='titulo'
                        value={titulo}
                        onChange={e => handleOnChange(e)}
                        required
                        className='form-control'/>
                    </div>
                  </div>

                  <div className='col'>
                    <div className='mb-3'>
                      <label className='form-label'>Sinopsis</label>
                      <input type='text' name='sinopsis'
                        value={sinopsis}
                        onChange={e => handleOnChange(e)}
                        required
                        className='form-control'/>
                    </div>
                  </div>

                  <div className='col'>
                    <div className='mb-3'>
                      <label className='form-label'>URL</label>
                      <input type='url'name='url'
                        value={url}
                        onChange={e => handleOnChange(e)}
                        required
                        className='form-control'/>
                    </div>
                  </div>
                </div>

                <div className='row'>
                  <div className='col'>
                    <div className='mb-3'>
                      <label className='form-label'>Imagen</label>
                      <input type='url' name='imagen'
                        value={imagen}
                        onChange={e => handleOnChange(e)}
                        required
                        className='form-control'/>
                    </div>
                  </div>

                  <div className='col'>
                    <div className='mb-3'>
                      <label className='form-label'>Año Estreno</label>
                      <input type='date'name='anoestreno'
                        value={anoestreno}
                        onChange={e => handleOnChange(e)}
                        required
                        className='form-control'/>
                    </div>
                  </div>

                  <div className='col'>
                    <div className='mb-3'>
                      <label className='form-label'>Género</label>
                      <select className='form-select'
                        required
                        name='genero'
                        value={genero}
                        onChange={e => handleOnChange(e)}>                      
                        <option value=''>--SELECCIONE--</option>
                        {
                         generos.map(({ _id, name }) => {
                          <option key={_id} value={_id}>{name}</option>
                        })
                      }
                      </select>
                    </div>
                  </div>
                </div>

                <div className='row'>
                  <div className='col'>
                    <div className='mb-3'>
                      <label className='form-label'>Productora</label>
                      <select className='form-select'
                        required
                        name='productora'
                        value={productora}
                        onChange={e => handleOnChange(e)}>                      
                        <option value=''>--SELECCIONE--</option>
                        {
                          productoras.map(({ _id, name }) => {
                          <option key={_id} value={_id}>{name}</option>
                        })
                      }
                      </select>
                    </div>
                  </div>

                  <div className='col'>
                    <div className='mb-3'>
                      <label className='form-label'>Director</label>
                      <select className='form-select'
                        required
                        name='director'
                        value={director}
                        onChange={e => handleOnChange(e)}>                       
                        <option value=''>--SELECCIONE--</option>
                        {
                          directores.map(({ _id, name }) => {
                          <option key={_id} value={_id}>
                            {name}
                          </option>
                        })                      
                      }
                      </select>
                    </div>
                  </div>

                  <div className='col'>
                    <div className='mb-3'>
                      <label className='form-label'>Tipo</label>
                      <select className='form-select'
                        required
                        name='tipo'
                        value={tipo}
                        onChange={e => handleOnChange(e)}>                       
                        <option value=''>--SELECCIONE--</option>
                        {
                          tipos.map(({ _id, name }) => {
                          <option key={_id} value={_id}>
                            {name}
                          </option>
                        })
                      }
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
        </div>
      </div>
    </div>
  )
}
  
               