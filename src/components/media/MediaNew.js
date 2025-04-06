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

  const [valoresForm, setValoresForm] = useState({
    serial: '',
    titulo: '',
    sinopsis: '',
    url: '',
    imagen: '',
    anoEstreno: '',
    generoPrincipal: '',
    directorPrincipal: '',
    productora: '',
    tipo: ''
  });

  const {
    serial,
    titulo,
    sinopsis,
    url,
    imagen,
    anoEstreno,
    generoPrincipal,
    directorPrincipal,
    productora,
    tipo
  } = valoresForm;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [directoresRes, generosRes, productorasRes, tiposRes] = await Promise.all([
          getDirectores(),
          getGeneros(),
          getProductoras(),
          getTipos()
        ]);
        setDirectores(directoresRes.data);
        setGeneros(generosRes.data);
        setProductoras(productorasRes.data);
        setTipos(tiposRes.data);
      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    };
    fetchData();
  }, []);

  const handleOnChange = ({ target }) => {
    const { name, value } = target;
    setValoresForm(prev => ({ ...prev, [name]: value }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const media = {
      serial,
      titulo,
      sinopsis,
      url,
      imagen,
      anoEstreno,
      generoPrincipal,
      directorPrincipal,
      productora,
      tipo
    };
    
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();

      await createMedia(media);
      Swal.close();
      Swal.fire('Guardado', 'La película fue registrada correctamente', 'success');

      handleOpenModal();
      listMedias();

      setValoresForm({
        serial: '',
        titulo: '',
        sinopsis: '',
        url: '',
        imagen: '',
        anoEstreno: '',
        generoPrincipal: '',
        directorPrincipal: '',
        productora: '',
        tipo: ''
      });
    } catch (error) {
      console.error('Error al guardar:', error.response?.data || error.message);
      Swal.close();
      Swal.fire('Error', error.response?.data?.message || 'No se pudo guardar la película', 'error');
    }
    
  };

  return (
    <div className='sidebar'>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col'>
            <div className='sidebar-header'>
              <h3>Nueva Película</h3>
              <i className="fa-solid fa-xmark" onClick={handleOpenModal}></i>
            </div>
          </div>
        </div>
        <hr />
        <form onSubmit={handleOnSubmit}>
          <div className='row'>
            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Serial</label>
                <input type="text" name='serial' value={serial} onChange={handleOnChange} required className='form-control' />
              </div>
            </div>
            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Título</label>
                <input type="text" name='titulo' value={titulo} onChange={handleOnChange} required className='form-control' />
              </div>
            </div>
            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Sinopsis</label>
                <input type="text" name='sinopsis' value={sinopsis} onChange={handleOnChange} required className='form-control' />
              </div>
            </div>
            <div className='col'>
              <div className="mb-3">
                <label className="form-label">URL</label>
                <input type="url" name='url' value={url} onChange={handleOnChange} required className='form-control' />
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Imagen</label>
                <input type="url" name='imagen' value={imagen} onChange={handleOnChange} required className='form-control' />
              </div>
            </div>
            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Año Estreno</label>
                <input type="number" name='anoEstreno' value={anoEstreno} onChange={handleOnChange} required className='form-control' />
              </div>
            </div>
            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Género Principal</label>
                <select className='form-select' name='generoPrincipal' value={generoPrincipal} onChange={handleOnChange} required>
                  <option value="">--SELECCIONE--</option>
                  {generos.map(({ _id, name }) => (
                    <option key={_id} value={_id}>{name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Director</label>
                <select className='form-select' name='directorPrincipal' value={directorPrincipal} onChange={handleOnChange} required>
                  <option value="">--SELECCIONE--</option>
                  {directores.map(({ _id, name }) => (
                    <option key={_id} value={_id}>{name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Productora</label>
                <select className='form-select' name='productora' value={productora} onChange={handleOnChange} required>
                  <option value="">--SELECCIONE--</option>
                  {productoras.map(({ _id, name }) => (
                    <option key={_id} value={_id}>{name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Tipo</label>
                <select className='form-select' name='tipo' value={tipo} onChange={handleOnChange} required>
                  <option value="">--SELECCIONE--</option>
                  {tipos.map(({ _id, name }) => (
                    <option key={_id} value={_id}>{name}</option>
                  ))}
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
  );
};
