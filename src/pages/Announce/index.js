import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';

import api from '../../services/api';

import './styles.css'

function Announce() {
  const [ title, setTitle ] = useState(''); // Variável para salvar o Nome do carro
  const [ brand, setBrand ] = useState(''); // Variável para salvar a Marca
  const [ price, setPrice ] = useState(''); // Variável para salvar o Preço
  const [ age, setAge ] = useState(); // Variável para salvar o Ano
  const history = useHistory(); // Variável para salvar rotas de navegação

  // Função asyncrona para salvar formulário na API.
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

        {/* Formulário para cadastro de um novo produto */}
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