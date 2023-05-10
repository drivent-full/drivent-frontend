import styled from 'styled-components';
import { useState, useEffect } from 'react';
import useTicketTypes from '../../../hooks/api/useTicketTypes';
import useTicket from '../../../hooks/api/useTicket';

export default function Hotel() {
  const { ticketTypes } = useTicketTypes();
  const { ticket } = useTicket();
  console.log(JSON.stringify(ticketTypes));
  const ticketStatus = 'RESERVED';
  const includesHotel = true;
  //const ticketStatus = ticket.ticketStatus;
  //const includesHotel = ticketTypes.includesHotel;
  const [nome, setNome] = useState('');

  useEffect(() => {
    if (includesHotel=== true) {
      if(ticketStatus === 'PAID') {
        
      }else{
        setNome('Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem');
      }
    }else{
      setNome('Sua modalidade de ingresso não inclui hospedagem. Prossiga para a escolha de atividades.');
    }
  }, [ticketStatus, includesHotel]);

  if (includesHotel === true && ticketStatus === 'PAID') {
    return (
      <Container>
        <Titulo>
          Escolha de hotel e quarto
        </Titulo>
        <Subtitulo>
          Opções de Hotel
        </Subtitulo>
      </Container>
    );
  }else{
    return (
      <Container>
        <Titulo>
          Escolha de hotel e quarto
        </Titulo>
        <Subtitulo>
          {nome}
        </Subtitulo>
      </Container>
    );
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Titulo = styled.div`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 34px;
  line-height: 40px;
  color: #000000;
`;

const Subtitulo = styled.div`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  text-align: center;
  color: #8E8E8E;
  width: 464px;
  height: 46px;
  position: absolute;
  top: 317px;
  left: 20%;
`;
