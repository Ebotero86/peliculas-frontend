import React, {useState, useEffect } from 'react'
import { getDirectores } from '../../services/directorServices';

export const DirectorView = () => {

const[ directores, setDirector] = useState([]);

const ListDirectores = async () => {

  try{

    const { data } = await getDirectores();
     
  } catch(error){
    console.log(error);
  }
}

useEffect(() => {
  ListDirectores();
},[]);

  return (
    <div className='container-fluid'>
       DirectorView
    </div>
  )
}



