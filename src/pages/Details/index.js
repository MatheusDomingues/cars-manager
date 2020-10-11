import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import ReactDOM from 'react-dom';

import PageHeader from '../../components/PageHeader';
import Modal from '../../components/Modal';
import Input from '../../components/Input';

import NoImage from '../../assets/images/produto-sem-imagem.png';

import api from '../../services/api';

import './styles.css';

function Details() {
  const [ modalVisible, setModalVisible ] = useState(false); // Variável para salvar estado onde mostra o Modal
  const [ carDetail, setCarDetails ] = useState({}); // Salvar detalhes do carro obtidos pela API
  const [ title, setTitle ] = useState(''); // Salvar alteração Nome do carro
  const [ brand, setBrand ] = useState(''); // Salvar alteração da Marca
  const [ price, setPrice ] = useState(''); // Salvar alteração de Preço
  const [ age, setAge ] = useState(); // Salvar alteração do Ano
  const { carId } = useParams(); // Parâmetro para acessar página de detalhes do carro específico
  const history = useHistory(); // Variável para salvar navegação

  // Função asyncrona para carregar a página com detalhes do carro específico
  useEffect(() => {
    async function loadCarDetails() {
      const res = await api.get(`/cars/${carId}`)
      setCarDetails(res.data);
    }

    loadCarDetails();
  }, []);

  // Função asyncrona para confirmar a exclusão do carro na API
  async function handleDeleteCar(e) {
    let res = window.confirm('Deseja excluir anuncio?');

    if (res === true) {
      e.preventDefault();
      try {
        await api.delete(`/cars/${carId}`);

        history.push('/');
      } catch (err) {
        alert('Erro ao deletar carro. Tente novamente!');
      };
    };
  };

  // Função asyncrona para alterar detalhes do carro
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

      window.location.reload();
    } catch (err) {
      alert('Erro ao anunciar carro. Tente novamente!');
    };
  };

  return (
    <div id="page-detail">
      <PageHeader />

      <div id="detail-content" className="container">
        <img src={NoImage} alt="Produto sem imagem!"/>
        <section className="details">
          <div className="car-name">
            <h1>{carDetail.title}</h1>
            <h2>{carDetail.brand}</h2>
          </div>
          <div className="car-price">
            <h2>R$ {carDetail.price}</h2>
            <h3>{carDetail.age}/{carDetail.age}</h3>
          </div>
        </section>

        <div className="buttons">
          <button type="button" onClick={() => {setModalVisible(true)}}>Alterar detalhes</button>
          <button type="button" onClick={handleDeleteCar}>Deletar anúncio</button>
        </div>
      </div>

      {/* Mostrar modal ou retornar Null */}
      {modalVisible ?
        <Modal onClose={() => {setModalVisible(false)}}>
          <div className="modal-page">
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
          </div>
        </Modal>
      : null}
    </div>
  );
};

export default Details;