import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import api from '../../services/api';

import NoImage from '../../assets/images/produto-sem-imagem.png';

import './styles.css';

function Home() {
  const [cars, setCars] = useState([]); // Variável para salvar carros da API

  // Função asyncrona para pegar todos os itens da API e salvar na variável
  useEffect(() => {
    async function loadCars() {
      const res = await api.get('/cars');
      setCars(res.data);
    };

    loadCars();
  }, []);

  return (
    <div id="page-home">

      <PageHeader />

      <div id="home-content" className="container">
        <div className="title">
          <h1>Carros novos e usados</h1>
        </div>
        <div className="cars">

        {/* map() para mostrar todos itens salvos da API */}
        {cars.map(car => {
          return (
            <article className="car-item" key={car._id}>
              {/* Rota para navegar para detalhes do carro escolhido */}
              <Link to={`/details/${car._id}`}>
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
        <div className="button">
          {/* Rota da nevageção para anúncio */}
          <Link to="/announce">Anuncie já o seu!</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;