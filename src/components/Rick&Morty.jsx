import './Rick&Morty.css';
import { useEffect, useState } from 'react';

export const RickAndMorty = () => {

    const [chapters, setChapters] = useState([]);

    const [error, setError] = useState(null);

    const fetchChapters = async () => {
        try {
            const response = await fetch('https://rickandmortyapi.com/api/character');
            const data = await response.json();
            setChapters(data.results);
        } catch (error) {
          console.log('Error al realizar la solicitud', error); // Debugg
          setError('Error al realizar la solicitud');
        }
    }

    useEffect(() => {
      fetchChapters();
    }, []);

    if (error) {
      return (
        <div className="alert alert-danger text-center" role="alert">
          {error}
        </div>
      );
    }
    
    return (
      <div className='container mt-5'>
        <h2 className='text-center text-white mb-4'>Galería de Rick and Morty</h2>
        {/* Agregamos un contenedor scroll y altura fija */}
        <div className='row overflow-auto vh-80' style={{ maxHeight: '80vh', overflowY: 'scroll'}}>
          
            {chapters.map((chapter, index) => (
              <div className='col-md-4 mb-4' key={index} >
                <div className='card h-100 d-flex flex-column'>
                  <img src={chapter.image} className='card-img-top img-fluid object-fit-cover' alt="Cat" />
                  <div className='card-body'>
                    <div className='alert alert-primary'>
                      <h5 className='card-title'>{chapter.name}</h5>
                      <p className='h6'>
                        <small className="text-muted">Especie:</small> {chapter.species}
                      </p>
                      <p className='h6'>
                        <small className="text-muted">Origen:</small> {chapter.origin.name}
                      </p>
                      <p className='h6'>
                        <small className="text-muted">Estado:</small> {chapter.status}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
  
            ))}
  
        </div>
      </div>
    )
}