import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './styles.css'
import { useStores } from '../../hooks/useStores';
import { TicketStatusName } from '../../types/Ticket';
import { observer } from 'mobx-react';

const TicketModalContainer: React.FC = () => {
  const {ticketId} = useParams();
  const {ticketStore} = useStores()

  useEffect(() => {
    if(ticketId){
      ticketStore.fetch(+ticketId)
    }
  }, [])

  return (
    <div className="TicketModal">
      <div className="TicketModal__title">
        {ticketStore.title}
      </div>
      <div className="TicketModal__status">
        {ticketStore.status && TicketStatusName[ticketStore.status]}
      </div>
    </div>
  );
}

export default observer(TicketModalContainer)
