import styled from 'styled-components';
import { RowTitle } from './TicketSelection';
import useTicket from '../../hooks/api/useTicket';

export default function Payment() {
  const { ticket } = useTicket();

  return (
    <>
      <RowTitle>Ingresso escolhido</RowTitle>
      <ConfirmTicketContainer>
        {ticket.TicketType?.isRemote ? 'Online' : 'Presencial'} + {ticket.TicketType?.name} 
        <p>R$ {ticket.TicketType?.price}</p>
   
      </ConfirmTicketContainer>
     
      <RowTitle>Pagamento</RowTitle>
      
    </>
  );
}

const ConfirmTicketContainer = styled.div`
  border-radius: 20px;
  border-style: solid;
  border-color: #cecece;
  width: 290px;
  height: 108px;
  background-color: #FFEED2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Roboto', sans-serif;
  margin-bottom: 24px;
  margin-right: 24px;
 
  .ticket-type-name {
    font-size: 16px;
  }
  .ticket-price {
    font-size: 14px;
    color: #898989;
  }
`;
