import React, { useState, useEffect } from 'react';
import { getTipos, createTipo, updateTipo } from '../../services/tipoServices';
import Swal from 'sweetalert2';
const moment = require('moment');

export const TipoView = () => {
  
  const [valuesForm, setValuesForm] = useState({});
  const [tipos, setTipos] = useState([]);
  const { name = '', description = '' } = valuesForm;
  const [tipoSelect, setTipoSelect] = useState(null);

  const listTipos = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();
      const resp = await getTipos();
      setTipos(resp.data);
      Swal.close();
    } catch (error) {
      console.error(error);
      Swal.close();
    }
  }

  useEffect(() => {
    listTipos();
  }, [])

  const handleOnChange = (e) => {
    setValuesForm({ ...valuesForm, [e.target.name]: e.target.value });
  }

  const handleCreateTipo = async (e) => {
    e.preventDefault();
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Guardando...'
      });
      Swal.showLoading();
      if (tipoSelect) {
        await updateTipo(tipoSelect, valuesForm );
        setTipoSelect(null);
      } else {
        await createTipo(valuesForm);
      }
      setValuesForm({ name: '', description: '' });
      listTipos();
      Swal.close();
    } catch (error) {
      console.error(error);
      Swal.close();
    }
  }

  const handleUpdateTipo = (e, tipo) => {
    e.preventDefault();
    setValuesForm({ name: tipo.name, description: tipo.description });
    setTipoSelect(tipo._id);
  }

  return (
    <div className='container-fluid mt-4'>
      <form onSubmit={handleCreateTipo}>
        <div className="row">
          <div className="col-lg-6">
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input required name='name' value={name} type="text" className="form-control" 
               onChange={(e) => handleOnChange(e)} />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="mb-3">
              <label className="form-label">Descripción</label>
              <textarea required name='description' value={description} className="form-control" 
               onChange={(e) => handleOnChange(e)} />
            </div>
          </div>
        </div>
        <button className="btn btn-primary mb-3">Guardar</button>
      </form>

      <table className='table'>
        <thead>
          <tr>
            <th scope='row'>#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Descripción</th>
            <th scope='col'>Fecha Creación</th>
            <th scope='col'>Fecha Actualización</th>
            <th scope='col'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
           tipos.length > 0 && tipos.map((tipo, index) => {
            return <tr>
            <th scope='row'>{index + 1}</th>
            <td>{tipo.name}</td>
            <td>{tipo.description}</td>
            <td>{moment(tipo.createdAt).format('DD-MM-YYYY HH:mm')}</td>
            <td>{moment(tipo.updatedAt).format('DD-MM-YYYY HH:mm')}</td>
            <td><button className='btn btn-success btn-sm me-2' onClick={(e) => handleUpdateTipo(e, tipo)}>Actualizar</button>
           </td>
          </tr>
          })
         }            
        </tbody>
      </table>
    </div>
  )
}
