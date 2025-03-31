import React, { useState, useEffect } from 'react';
import { getDirectores, createDirector, updateDirector } from '../../services/directorServices';
import Swal from 'sweetalert2';
const moment = require('moment');

export const DirectorView = () => {
  
  const [valuesForm, setValuesForm] = useState({});
  const [directores, setDirectores] = useState([]);
  const { name = '', state = '' } = valuesForm;
  const [directorSelect, setDirectorSelect] = useState(null);

  const listDirectores = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();
      const resp = await getDirectores();
      setDirectores(resp.data);
      Swal.close();
    } catch (error) {
      console.error(error);
      Swal.close();
    }
  }

  useEffect(() => {
    listDirectores();
  }, []);

  const handleOnChange = (e) => {
    setValuesForm({ ...valuesForm, [e.target.name]: e.target.value });
  }

  const handleCreateDirector = async (e) => {
    e.preventDefault();
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Guardando...'
      });
      Swal.showLoading();
      if (directorSelect) {
        await updateDirector(valuesForm, directorSelect);
        setDirectorSelect(null);
      } else {
        await createDirector(valuesForm);
      }
      setValuesForm({ name: '', state: '' });
      listDirectores();
      Swal.close();
    } catch (error) {
      console.error(error);
      Swal.close();
    }
  }

  const handleUpdateDirector = (e, director) => {
    e.preventDefault();
    setValuesForm({ name: director.name, state: director.state });
    setDirectorSelect(director._id);
  }

  return (
    <div className='container-fluid mt-4'>
      <form onSubmit={handleCreateDirector}>
        <div className="row">
          <div className="col-lg-8">
            <div className="mb-3">
             <div className='col'>Crear Director</div>
              <label className="form-label">Nombre</label>
              <input required name='name' value={name} type="text" className="form-control" onChange={handleOnChange} />
            </div>
          </div>
          <div className="col-lg-4">
            <div className="mb-3">
              <label className="form-label">Estado</label>
              <select required name='state' value={state} className="form-select" onChange={handleOnChange}>
                <option value="">--SELECCIONE--</option>
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
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
            <th scope="col">Estado</th>
            <th scope='col'>Fecha Creación</th>
            <th scope='col'>Fecha Actualización</th>
            <th scope='col'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {directores.length > 0 && directores.map((director, index) => (
            <tr key={director._id}>
              <th scope='row'>{index + 1}</th>
              <td>{director.name}</td>
              <td>{director.state}</td>
              <td>{moment(director.createdAt).format('DD-MM-YYYY HH:mm')}</td>
              <td>{moment(director.updatedAt).format('DD-MM-YYYY HH:mm')}</td>
              <td>
                <button className='btn btn-success btn-sm me-2' onClick={(e) => handleUpdateDirector(e, director)}>Actualizar</button>
                <button className='btn btn-danger btn-sm'>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
