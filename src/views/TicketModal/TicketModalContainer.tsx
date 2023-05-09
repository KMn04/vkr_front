import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './styles.css'
import { useStores } from '../../hooks/useStores';
import { TicketStatusName } from '../../types/Ticket';
import { observer } from 'mobx-react';
import Comment from '../../components/Comments/Comment';

const TicketModalContainer: React.FC = () => {
  const {ticketId} = useParams();
  const {ticketStore} = useStores()

  useEffect(() => {
    if(ticketId){
      ticketStore.fetch(+ticketId)
    }
  }, [])

  if(ticketStore.state.isLoading){
    return <span>Загрузка задачи...</span>
  }

  return (
    <div className="TicketModal">
      <div className="TicketModal__title">
        {ticketStore.name}
      </div>
      <div className="TicketModal__status">
        {ticketStore.statusCode}
      </div>
      <div className="TicketModal__comments">
        <Comment/>
      </div>
    </div>
  );
}

export default observer(TicketModalContainer)
