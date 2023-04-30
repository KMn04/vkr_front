import TicketModalContainer from './TicketModalContainer';
import Modal from '../Modal/Modal';

const TicketModal: React.FC = () => {
  return (
    <Modal onClickOutside={() => {
      history.back()
    }}>
      <TicketModalContainer />
    </Modal>
  )
}
export default TicketModal