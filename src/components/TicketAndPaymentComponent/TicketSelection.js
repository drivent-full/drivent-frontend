import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import useTicketTypes from '../../hooks/api/useTicketTypes';
import useSaveTicket from '../../hooks/api/useSaveTicket.js';
import Button from '../Form/Button';

export default function TicketSelection() {
  const { ticketTypes } = useTicketTypes();
  const { saveTicket } = useSaveTicket();

  const [selectedInPerson, setSelectedInPerson] = useState(false);
  const [selectedRemote, setSelectedRemote] = useState(false);
  const [selectWithHotel, setSelectedWithHotel] = useState(false);
  const [selectWithoutHotel, setSelectedWithoutHotel] = useState(false);
  const [selectedTicketType, setSelectedTicketType] = useState(null);

  const remoteTicket = ticketTypes?.find((t) => t.isRemote);
  const inPersonTicket = ticketTypes?.find((t) => !t.isRemote && !t.includesHotel);
  const inPersonWithHotelTicket = ticketTypes?.find((t) => !t.isRemote && t.includesHotel);

  async function save() {
    const data = { ticketTypeId: selectedTicketType?.id };
    try {
      await saveTicket(data);
      toast('Informações salvas com sucesso!');
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      toast('Não foi possível salvar suas informações!');
    }
  }

  useEffect(() => {
    if (selectedRemote) {
      setSelectedTicketType(remoteTicket);
      setSelectedWithoutHotel(false);
      setSelectedWithHotel(false);
    } else if (selectedInPerson) {
      if (selectWithHotel) {
        setSelectedTicketType(inPersonWithHotelTicket);
      } else if (selectWithoutHotel) {
        setSelectedTicketType(inPersonTicket);
      } else {
        setSelectedTicketType(null);
      }
    } else {
      setSelectedTicketType(null);
    }
  }, [selectedInPerson, selectedRemote, selectWithHotel, selectWithoutHotel]);

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
                <span className="ticket-type-name">Com hotel</span>
                <span className="ticket-price"> {`+ R$ ${inPersonWithHotelTicket.price - inPersonTicket.price}`}</span>
              </TicketPriceContainer>
            )}
          </TicketsRow>
        </>
      )}
      {selectedTicketType && (
        <>
          <RowTitle>{`Fechado! O total ficou em R$ ${selectedTicketType?.price} Agora é só confirmar:`}</RowTitle>
          <Button disabled={!selectedTicketType} onClick={save}>
            RESERVAR INGRESSO
          </Button>
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
