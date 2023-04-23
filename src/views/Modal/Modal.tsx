import { PropsWithChildren, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './styles.css'

const Modal: React.FC<PropsWithChildren> = ({children}) => {
  const [modalElement] = useState(document.createElement('div')) 

  useEffect(() => {
    document.getElementById('root')!.appendChild(modalElement);
    modalElement.className = 'ModalContainer'
    return () => {
      document.getElementById('root')!.removeChild(modalElement)
    }
  }, [])
  
  return ReactDOM.createPortal(<div className="ModalContainer__container">{children}</div>, modalElement)
}
export default Modal