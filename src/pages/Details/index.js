import React, { useEffect, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import Modal from '../../components/Modal';
import Input from '../../components/Input';

import api from '../../services/api';

import './styles.css';

function Details() {
  const [ modalVisible, setModalVisible ] = useState(false);
  const [ carDetail, setCarDetails ] = useState({});
  const [ title, setTitle ] = useState('');
  const [ brand, setBrand ] = useState('');
  const [ price, setPrice ] = useState('');
  const [ age, setAge ] = useState();
  const { carId } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function loadCarDetails() {
      const res = await api.get(`/cars/${carId}`)
      setCarDetails(res.data);
    }

    loadCarDetails();
  }, []);

  async function handleDeleteCar(e) {
    let res = window.confirm('Deseja excluir anuncio?');

    if (res == true) {
      e.preventDefault();
      try {
        await api.delete(`/cars/${carId}`);

        history.push('/');
      } catch (err) {
        alert('Erro ao deletar carro. Tente novamente!');
      };
    };
  };

  async function handleChangeDetails(e) {
    e.preventDefault();

    const data = {
      title,
      brand,
      price,
      age,
    };

    try {
      await api.put(`/cars/${carId}`, data);

      history.push(`/details/${carId}`);
    } catch (err) {
      alert('Erro ao anunciar carro. Tente novamente!');
    };
  };

  console.log(carDetail);

  return (
    <div id="page-detail">
      <PageHeader />
      <div id="detail-content" className="container">

      </div>

      {modalVisible ?
        <Modal onClose={() => {setModalVisible(false)}} className="modal-page">
          <section>
            <h1>Modificar anúncio</h1>
            <p>Altere as informações desejadas do anúncio</p>
          </section>
          <form onSubmit={handleChangeDetails}>
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

            <button type="submit">Alterar</button>
          </form>
        </Modal>
      : null}
    </div>
  );
};

export default Details;