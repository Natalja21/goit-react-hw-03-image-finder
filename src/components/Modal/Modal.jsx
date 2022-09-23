import { Component } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';
const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
modalClosed = (e) => {
        if (e.currentTarget === e.target) {
            this.props.toggleModal()
        }
    }
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown)
    };
    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown)
    };

    handleKeyDown = (e) => {
        if (e.code === 'Escape') {
            this.props.toggleModal()
        };
    }


  render() {
    
    return createPortal(
      <div className={styles.overlay}  onClick={(e) => { this.modalClosed(e) }}>
        <div className={styles.modal}>
         { this.props.children}
        </div>
      </div>,
      modalRoot
    );
  }
}
export default Modal;
