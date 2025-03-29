import React from 'react';

export const MediaNew = ({ handleOpenModal }) => {
  return (
    <div className='sidebar'>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col'>
            <div className='sidebar-header'>
              <h3>Nueva Pelicula</h3>
              <i className="fa-solid fa-xmark fa-2x"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
