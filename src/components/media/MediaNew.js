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
    generoPrincipal = '', directorPrincipal = '', productora = '', tipo = ''} = valoresForm;

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
      const { data } = await createMedia(media);
      handleOpenModal();
      listMedias();
      Swal.close();

    } catch (error) {
      console.log(error);
      Swal.close();
    }
  }

  return (
    <div className='sidebar'>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col'>
            <div className='sidebar-header'>
              <h3>Nueva Pelicula</h3>
              <i className="fa-solid fa-xmark" onClick={handleOpenModal}></i>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <hr />
          </div>
         </div>
          <form onSubmit={(e) => handleOnSubmit(e)}>
           <div className='row'>

           <div className='col'>
              <div className="mb-3">
                <label className="form-label">Serial</label>
                <input type="text" name='serial'
                  value={serial}
                  onChange={e => handleOnChange(e)}
                  required
                  className='form-control' />
              </div>
            </div>

            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Titulo </label>
                <input type="text" name='titulo'
                  value={titulo}
                  onChange={e => handleOnChange(e)}
                  required
                  className='form-control' />
              </div>
            </div>

            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Sinopsis </label>
                <input type="text" name='sinopsis'
                  value={sinopsis}
                  onChange={e => handleOnChange(e)}
                  required
                  className='form-control' />
              </div>
            </div>

            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Url </label>
                <input type="url" name='url'
                  value={url}
                  onChange={e => handleOnChange(e)}
                  required
                  className='form-control' />
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Imagen </label>
                <input type="url" name='imagen'
                  value={imagen}
                  onChange={e => handleOnChange(e)}
                  required
                  className='form-control' />
              </div>
            </div>
            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Año Estreno </label>
                <input type="date" name='anoEstreno'
                  value={anoEstreno}
                  onChange={e => handleOnChange(e)}
                  required
                  className='form-control' />
              </div>
            </div>            
            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Genero Principal</label>
                <select className='form-select'
                  required
                  name='generoPrincipal'
                  value={generoPrincipal}
                  onChange={e => handleOnChange(e)}>
                  <option value="">--SELECCIONE--</option>
                  {
                    generos.map(({ _id, name }) => {
                      return <option key={_id} value={_id}>{name}</option>
                    })
                  }
                </select>
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Director </label>
                <select className='form-select'
                  required
                  name='directorPrincipal'
                  value={directorPrincipal}
                  onChange={e => handleOnChange(e)}>
                  <option value="">--SELECCIONE--</option>
                  {
                    directores.map(({ _id, name }) => {
                      return <option key={_id} value={_id}>{name}</option>
                    })
                  }
                </select>
              </div>
            </div>
            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Productora</label>
                <select className='form-select'
                  required
                  name='productora'
                  value={productora}
                  onChange={e => handleOnChange(e)}>
                  <option value="">--SELECCIONE--</option>
                  {
                    productoras.map(({ _id, name }) => {
                      return <option key={_id} value={_id}>{name}</option>
                    })
                  }
                </select>
              </div>
            </div>
            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Tipo </label>
                <select className='form-select'
                  required
                  name='tipo'
                  value={tipo}
                  onChange={e => handleOnChange(e)}>
                  <option value="">--SELECCIONE--</option>
                  {
                    tipos.map(({ _id, name }) => {
                      return <option key={_id} value={_id}>{name}</option>
                    })
                  }
                </select>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col'>
              <button className="btn btn-primary">Guardar</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}