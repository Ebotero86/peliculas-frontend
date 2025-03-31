import React, { useState, useEffect } from 'react';
import { getProductoras, createProductora, updateProductora } from '../../services/productoraServices';
import Swal from 'sweetalert2';
const moment = require('moment');

export const ProductoraView = () => {
  
  const [valuesForm, setValuesForm] = useState({});
  const [productoras, setProductoras] = useState([]);
  const { name = '', state = '', Slogan = '', description = '' } = valuesForm;
  const [productoraSelect, setProductoraSelect] = useState(null);

  const listProductoras = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();
      const resp = await getProductoras();
      setProductoras(resp.data);
      Swal.close();
    } catch (error) {
      console.error(error);
      Swal.close();
    }
  }

  useEffect(() => {
    listProductoras();
  }, []);

  const handleOnChange = (e) => {
    setValuesForm({ ...valuesForm, [e.target.name]: e.target.value });
  }

  const handleCreateProductora = async (e) => {
    e.preventDefault();
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Guardando...'
      });
      Swal.showLoading();
      if (productoraSelect) {
        await updateProductora(valuesForm, productoraSelect);
        setProductoraSelect(null);
      } else {
        await createProductora(valuesForm);
      }
      setValuesForm({ name: '', state: '', Slogan: '', description: '' });
      listProductoras();
      Swal.close();
    } catch (error) {
      console.error(error);
      Swal.close();
    }
  }

  const handleUpdateProductora = (e, productora) => {
    e.preventDefault();
    setValuesForm({ name: productora.name, state: productora.state, Slogan: productora.Slogan, description: productora.description });
    setProductoraSelect(productora._id);
  }

  return (
    <div className='container-fluid mt-4'>
      <form onSubmit={(e) => handleCreateProductora(e)} >
        <div className="row">
          <div className="col-lg-6">
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input required name='name' value={name} type="text" className="form-control" 
               onChange={(e) => handleOnChange(e)} />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="mb-3">
              <label className="form-label">Estado</label>
              <select required name='state' value={state} className="form-select" 
                onChange={(e) => handleOnChange(e)} >
                <option value="">--SELECCIONE--</option>
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="mb-3">
              <label className="form-label">Slogan</label>
              <input required name='Slogan' value={Slogan} type="text" className="form-control" 
              onChange={(e) => handleOnChange(e)} />
            </div>
          </div>
          <div className="col-lg-12">
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
            <th scope="col">Estado</th>
            <th scope="col">Slogan</th>
            <th scope="col">Descripción</th>
            <th scope='col'>Fecha Creación</th>
            <th scope='col'>Fecha Actualización</th>
            <th scope='col'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            productoras.length > 0 && productoras.map((productora, index) => {
              return <tr>
              <th scope='row'>{index + 1}</th>
              <td>{productora.name}</td>
              <td>{productora.state}</td>
              <td>{productora.Slogan}</td>
              <td>{productora.description}</td>
              <td>{moment(productora.createdAt).format('DD-MM-YYYY HH:mm')}</td>
              <td>{moment(productora.updatedAt).format('DD-MM-YYYY HH:mm')}</td>
              <td>
                <button className='btn btn-success btn-sm me-2' onClick={(e) => handleUpdateProductora(e, productora)}>Actualizar</button>                
              </td>
            </tr>
            })
          }             
        </tbody>
      </table>
    </div>
  );
}
