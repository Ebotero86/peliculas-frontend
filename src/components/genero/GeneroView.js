import React, { useState, useEffect } from 'react';
import { getGeneros, createGenero, updateGenero } from '../../services/generoServices';
import Swal from 'sweetalert2';
const moment = require('moment');

export const GeneroView = () => {
  
  const [valuesForm, setValuesForm] = useState({});
  const [generos, setGeneros] = useState([]);
  const { name = '', state = '' } = valuesForm;
  const [generoSelect, setGeneroSelect] = useState(null);

  const listGeneros = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();
      const resp = await getGeneros();
      setGeneros(resp.data);
      Swal.close();
    } catch (error) {
      console.error(error);
      Swal.close();
    }
  }

  useEffect(() => {
    listGeneros();
  }, []);

  const handleOnChange = (e) => {
    setValuesForm({ ...valuesForm, [e.target.name]: e.target.value });
  }

  const handleCreateGenero = async (e) => {
    e.preventDefault();
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Guardando...'
      });
      Swal.showLoading();
      if (generoSelect) {
        await updateGenero(valuesForm, generoSelect);
        setGeneroSelect(null);
      } else {
        await createGenero(valuesForm);
      }
      setValuesForm({ name: '', state: '' });
      listGeneros();
      Swal.close();
    } catch (error) {
      console.error(error);
      Swal.close();
    }
  }

  const handleUpdateGenero = (e, genero) => {
    e.preventDefault();
    setValuesForm({ name: genero.name, state: genero.state });
    setGeneroSelect(genero._id);
  }

  return (
    <div className='container-fluid mt-4'>
      <form onSubmit={handleCreateGenero}>
        <div className="row">
          <div className="col-lg-8">
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input required name='name' value={name} type="text" className="form-control" 
                onChange={handleOnChange} />
            </div>
          </div>
          <div className="col-lg-4">
            <div className="mb-3">
              <label className="form-label">Estado</label>
              <select required name='state' value={state} className="form-select" 
                onChange={handleOnChange}>
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
          {
           generos.length > 0 && generos.map((genero, index) => {
            return <tr>
              <th scope='row'>{index + 1}</th>
              <td>{genero.name}</td>
              <td>{genero.state}</td>
              <td>{moment(genero.createdAt).format('DD-MM-YYYY HH:mm')}</td>
              <td>{moment(genero.updatedAt).format('DD-MM-YYYY HH:mm')}</td>
              <td><button className='btn btn-success btn-sm me-2' onClick={(e) => handleUpdateGenero(e, genero)}>Actualizar</button>
             </td>
            </tr>
             })
           }
            
        </tbody>
      </table>
    </div>
  )
}

