import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { getMediaForId, updateMedia } from '../../services/mediaServices';
import { getDirectores } from '../../services/directorServices';
import { getGeneros } from '../../services/generoServices';
import { getProductoras } from '../../services/productoraServices';
import { getTipos } from '../../services/tipoServices';
import Swal from "sweetalert2";

export const MediaUpdate = () => {

  const { MediaId = '' } = useParams();
  const [ media, setMedia ] = useState();
  const [ directores, setDirectores ] = useState([]);
  const [ generos, setGeneros ] = useState([]);
  const [ productoras, setProductoras ] = useState([]);
  const [ tipos, setTipos ] = useState([]);
  const [ valoresForm, setValoresForm ] = useState([]);
  const { serial = '', titulo = '', sinopsis = '', url = '', imagen = '',
    anoEstreno = '', generoPrincipal, directorPrincipal, productora, tipo } = valoresForm;

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
      const { data } = await getMediaForId(MediaId);
      console.log(data);

      setMedia(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getMedia();
  }, [MediaId]);

  useEffect(() => {
    if (media) {
      setValoresForm({
        serial: media.serial,
        titulo: media.titulo,
        sinopsis: media.sinopsis,
        url: media.url,
        imagen: media.imagen,
        anoEstreno: media.anoEstreno,
        generoPrincipal: media.generoPrincipal,
        directorPrincipal: media.directorPrincipal,
        productora: media.productora,
        tipo: media.tipo
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
      serial, titulo, sinopsis, url, imagen, anoEstreno,
      generoPrincipal: { 
        _id: generoPrincipal 
      },
      directorPrincipal: { 
        _id: directorPrincipal 
      },
      productora: { 
        _id: productora 
      },
      tipo: { 
        _id: tipo 
      }
    }
    console.log(media);

    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();
      await updateMedia(MediaId, media);
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
            <div className='col-md-4'>
              <img src={media?.imagen} />
            </div>
            <div className='col-md-8'>
              <form onSubmit={(e) => handleOnSubmit(e)}>
                <div className='row'>

                  <div className='col'>
                    <label className="form-label">Serial</label>
                    <input type="text" name='serial' 
                    value={serial} 
                    onChange={e => handleOnChange(e)}
                    required 
                    className='form-control' />
                  </div>

                  <div className='col'>
                    <label className="form-label">Título</label>
                    <input type="text" name='titulo' 
                    value={titulo} 
                    onChange={e => handleOnChange(e)}
                    required 
                    className='form-control' />
                  </div>

                  <div className='col'>
                    <label className="form-label">Sinopsis</label>
                    <input type="text" name='sinopsis' 
                    value={sinopsis} 
                    onChange={e => handleOnChange(e)} 
                    required 
                    className='form-control' />
                  </div>

                  <div className='col'>
                    <label className="form-label">URL</label>
                    <input type="url" name='url' 
                    value={url} 
                    onChange={e => handleOnChange(e)}
                    required 
                    className='form-control' />
                  </div>
                </div>

                <div className='row'>
                  <div className='col'>
                    <label className="form-label">Imagen</label>
                    <input type="url" name='imagen' 
                    value={imagen} 
                    onChange={e => handleOnChange(e)}
                    required 
                    className='form-control' />
                  </div>

                  <div className='col'>
                    <label className="form-label">Año Estreno</label>
                    <input type="number" name='anoEstreno' 
                    value={anoEstreno} 
                    onChange={e => handleOnChange(e)}
                    required 
                    className='form-control' />
                  </div>

                  <div className='col'>
                    <label className="form-label">Género</label>
                    <select name="generoPrincipal" 
                    value={generoPrincipal} 
                    onChange={e => handleOnChange(e)}
                    className='form-select' 
                    required>
                      <option value="">--SELECCIONE--</option>
                      {generos.map(({ _id, name }) => (
                        <option key={_id} value={_id}>{name}</option>
                      ))}
                    </select>
                  </div>

                  <div className='col'>
                    <label className="form-label">Director</label>
                    <select name="directorPrincipal" 
                    value={directorPrincipal} 
                    onChange={e => handleOnChange(e)}
                    className='form-select' 
                    required>
                      <option value="">--SELECCIONE--</option>
                      {directores.map(({ _id, name }) => (
                        <option key={_id} value={_id}>{name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className='row'>
                  <div className='col'>
                    <label className="form-label">Productora</label>
                    <select name="productora" 
                    value={productora} 
                    onChange={e => handleOnChange(e)}
                    className='form-select' 
                    required>
                      <option value="">--SELECCIONE--</option>
                      {productoras.map(({ _id, name }) => (
                        <option key={_id} value={_id}>{name}</option>
                      ))}
                    </select>
                  </div>

                  <div className='col'>
                    <label className="form-label">Tipo</label>
                    <select name="tipo" 
                    value={tipo} 
                    onChange={e => handleOnChange(e)}
                    className='form-select' 
                    required>
                      <option value="">--SELECCIONE--</option>
                      {tipos.map(({ _id, name }) => (
                        <option key={_id} value={_id}>{name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className='row mt-3'>
                  <div className='col'>
                    <button className="btn btn-primary">Guardar</button>
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
