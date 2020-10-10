import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import api from '../../services/api';

import NoImage from '../../assets/images/produto-sem-imagem.png';

import './styles.css';

function Home() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    async function loadCars() {
      const res = await api.get('/cars');
      setCars(res.data);
    };

    loadCars();
  }, []);

  console.log(cars);

  return (
    <div id="page-home">

      <div id="home-content" className="container">
        <div className="title">
          <h1>Carros novos e usados</h1>
          <Link to="/announce">Anúncie já o seu!</Link>
        </div>
        <div className="cars">
        {cars.map(car => {
          return (
            <article className="car-item" key={car.id}>
              <Link>
                <img src={NoImage} alt="Produto sem imagem"/>
                <div className="details">
                  <h2 className="car-name">{car.title}</h2>
                  <p className="car-detail">{car.brand} {car.title}</p>
                  <p className="car-price">R$ {car.price}</p>
                  <p className="car-age">{car.age}/{car.age}</p>
                </div>
              </Link>
            </article>
          );
        })}
        </div>
      </div>
    </div>
  );
};

export default Home;