import React from 'react'

export const MediaCard = (props) => {

    const { media } = props;

  return (
    <div className="col">
        <div className="card">
            <img src={media.imagen} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">PELICULAS</h5>
                <hr/>
                <p className="card-text">{`Serial: ${media.serial}`}</p>
                <p className="card-text">{`Titulo: ${media.titulo}`}</p>
                <p className="card-text">{`Sinopsis: ${media.sinopsis}`}</p>
                <p className="card-text">{`Url: ${media.url}`}</p>
                <p className="card-text">{`Año estreno: ${media.anoEstreno}`}</p>
                <p className="card-text">{`Genero: ${media.generoPrincipal}`}</p>
                <p className="card-text">{`Director: ${media.directorPrincipal}`}</p>
                <p className="card-text">{`Productora: ${media.productora}`}</p>
                <p className="card-text">{`Tipo: ${media.tipo}`}</p>
            </div>
        </div>
    </div>
  );
};