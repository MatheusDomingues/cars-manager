import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';

import api from '../../services/api';

import './styles.css'

function Announce() {
  const [ title, setTitle ] = useState('');
  const [ brand, setBrand ] = useState('');
  const [ price, setPrice ] = useState('');
  const [ age, setAge ] = useState();

  const history = useHistory();

  async function handleNewCar(e) {
    e.preventDefault();

    const data = {
      title,
      brand,
      price,
      age,
    };

    try {
      await api.post('/cars', data);

      history.push('/');
    } catch (err) {
      alert('Erro ao anunciar carro. Tente novamente!');
    };
  };

  return (
    <div id="page-announce">
      
      <PageHeader />

      <div id="announce-content" className="container">
        <section>
          <h1>Anunciar novo carro</h1>
          <p>Adicione as informações sobre o carro </p>
        </section>

        <form onSubmit={handleNewCar}>
          <Input 
            type="text"
            placeholder="Nome do carro"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <Input 
            type="text"
            placeholder="Marca"
            value={brand}
            onChange={e => setBrand(e.target.value)}
          />
          <Input 
            type="text"
            placeholder="Preço em Reais"
            value={price}
            onChange={e => setPrice(e.target.value)}
          />
          <Input 
            type="number"
            placeholder="Ano"
            value={age}
            onChange={e => setAge(e.target.value)}
          />

          <button type="submit">Anunciar</button>
        </form>
      </div>
    </div>
  );
};

export default Announce;