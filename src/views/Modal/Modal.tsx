import { PropsWithChildren, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './styles.css'

interface ModalProps {
  onClickOutside?: () => void;
}

const Modal: React.FC<PropsWithChildren & ModalProps> = ({children, onClickOutside}) => {
  const [modalElement] = useState(document.createElement('div')) 

  useEffect(() => {
    document.getElementById('root')!.appendChild(modalElement);
    modalElement.className = 'ModalContainer'
    modalElement.onclick = (e) => {
      if(onClickOutside && e.target === modalElement){
        onClickOutside()
      }
    }
    return () => {
      document.getElementById('root')!.removeChild(modalElement)
    }
  }, [])
  
  return ReactDOM.createPortal(
    <div className="ModalContainer__container">
      {children}
    </div>, modalElement)
}
export default Modal