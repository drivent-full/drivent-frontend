import styled from 'styled-components';
import useTicketTypes from '../../hooks/api/useTicketTypes';

export default function TicketSelection() {
  const { ticketTypes } = useTicketTypes();
  if (!ticketTypes || ticketTypes.length < 1) {
    return 'Os preços dos ingressos ainda não foram cadastrados ';
  }
  const remoteTicket = ticketTypes.find((t) => t.isRemote);
  const inPersonTicket = ticketTypes.find((t) => !t.isRemote && !t.includesHotel);
  const inPersonWithHotelTicket = ticketTypes.find((t) => !t.isRemote && t.includesHotel);

  return (
    <>
      <>
        <RowTitle>Primeiro, escolha sua modalidade de ingresso</RowTitle>
        <TicketsRow>
          <TicketPriceContainer selected={inPersonTicket.selected}>
            <span className="ticket-type-name">Presencial</span>
            <span className="ticket-price"> {inPersonTicket.price}</span>
          </TicketPriceContainer>
          <TicketPriceContainer>
            <span className="ticket-type-name" selected={remoteTicket.selected}>
              Online
            </span>
            <span className="ticket-price"> {remoteTicket.price}</span>
          </TicketPriceContainer>
        </TicketsRow>
        {JSON.stringify(ticketTypes)}
      </>
    </>
  );
}

const TicketPriceContainer = styled.div`
  border-radius: 20px;
  border: 1px solid #cecece;
  width: 145px;
  height: 145px;
  background-color: ${(props) => (props.selected ? '#FFEED2' : null)};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Roboto', sans-serif;
  margin-right: 24px;
  .ticket-type-pxname {
    font-size: 16px;
  }
  .ticket-price {
    font-size: 14px;
    color: #898989;
    :before {
      content: 'R$ ';
    }
  }
`;

const RowTitle = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
  color: #858585;
`;

const TicketsRow = styled.div`
  display: flex;
`;
