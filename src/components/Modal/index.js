import React from 'react';

import './styles.css';

function Modal({ onClose, children, id = 'modal'}) {
  const handleOutsideClick = (e) => {
    if(e.target.id === id) onClose();
  }

  return(
    <div id={id} className="modal-overlay" onClick={handleOutsideClick}>
      <div className="modal">
        <p className="close-modal" onClick={onClose}>X</p>

        <div className="modal-content">
          { children }
        </div>
      </div>
    </div>
  );
};

export default Modal;