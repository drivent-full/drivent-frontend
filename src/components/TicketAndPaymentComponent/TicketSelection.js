import styled from 'styled-components';
import useTicketTypes from '../../hooks/api/useTicketTypes';
import { useState } from 'react';

export default function TicketSelection() {
  const { ticketTypes } = useTicketTypes();

  const [selectedInPerson, setSelectedInPerson] = useState(false);
  const [selectedRemote, setSelectedRemote] = useState(false);
  const [selectWithHotel, setSelectedWithHotel] = useState(false);
  const [selectWithoutHotel, setSelectedWithoutHotel] = useState(false);

  const remoteTicket = ticketTypes?.find((t) => t.isRemote);
  const inPersonTicket = ticketTypes?.find((t) => !t.isRemote && !t.includesHotel);
  const inPersonWithHotelTicket = ticketTypes?.find((t) => !t.isRemote && t.includesHotel);

  if (!ticketTypes || ticketTypes.length < 1) {
    return 'Os preços dos ingressos ainda não foram cadastrados ';
  }

  return (
    <>
      <>
        <RowTitle>Primeiro, escolha sua modalidade de ingresso</RowTitle>
        <TicketsRow>
          <TicketPriceContainer
            selected={selectedInPerson}
            onClick={() => {
              setSelectedInPerson(true);
              setSelectedRemote(false);
            }}
          >
            <span className="ticket-type-name">Presencial</span>
            <span className="ticket-price"> {`R$ ${inPersonTicket.price}`}</span>
          </TicketPriceContainer>
          <TicketPriceContainer
            selected={selectedRemote}
            onClick={() => {
              setSelectedRemote(true);
              setSelectedInPerson(false);
            }}
          >
            <span className="ticket-type-name">Online</span>
            <span className="ticket-price"> {`R$ ${remoteTicket.price}`}</span>
          </TicketPriceContainer>
        </TicketsRow>
      </>
      {selectedInPerson && (
        <>
          <RowTitle>Ótimo! Agora escolha sua modalidade de hospedagem</RowTitle>
          <TicketsRow>
            <TicketPriceContainer
              selected={selectWithoutHotel}
              onClick={() => {
                setSelectedWithHotel(false);
                setSelectedWithoutHotel(true);
              }}
            >
              <span className="ticket-type-name">Sem Hotel</span>
              <span className="ticket-price"> + R$ 0</span>
            </TicketPriceContainer>
            {inPersonWithHotelTicket && (
              <TicketPriceContainer
                selected={selectWithHotel}
                onClick={() => {
                  setSelectedWithHotel(true);
                  setSelectedWithoutHotel(false);
                }}
              >
                <span className="ticket-type-name">Online</span>
                <span className="ticket-price"> {`+ R$ ${inPersonWithHotelTicket.price - inPersonTicket.price}`}</span>
              </TicketPriceContainer>
            )}
          </TicketsRow>
        </>
      )}
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
