import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './styles.css'

export const TicketModalContainer: React.FC = () => {
  const {ticketId} = useParams();

  useEffect(() => {
    console.log(ticketId)
  }, [])

  return (
    <div className="TicketModal">
      lol
    </div>
  );
}
