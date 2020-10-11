import React from 'react';

import './styles.css';

function Modal({ onClose, children, id = 'modal'}) {
  // função para fechar modal quando click fora da página
  const handleOutsideClick = (e) => {
    if(e.target.id === id) onClose();
  }

  // Retorno do modal
  return(
    <div id={id} className="modal-overlay" onClick={handleOutsideClick}>
      <div className="modal">
        <p className="close-modal" onClick={onClose}>X</p>

        <div className="modal-content">

          {/* Contéudo que haverá dentro do Modal */}
          { children }

        </div>
      </div>
    </div>
  );
};

export default Modal;