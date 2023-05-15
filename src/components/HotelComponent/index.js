import styled from 'styled-components';
import { useState, useEffect } from 'react';
import useTicket from '../../hooks/api/useTicket';
import useHotel from '../../hooks/api/useHotel';

export default function HotelComponent() {
  const [nome, setNome] = useState('');
  const [hotels, setHotels] = useState([]);
  const { getTicket } = useTicket();
  const { getHotel } = useHotel();
  const [includesHotel, setIncludesHotel] = useState(undefined);
  const [ticketStatus, setTicketStatus] = useState('');
  const [isLoading, setLoading] = useState(true);

  useEffect(async() => {
    try {
      const ticket = await getTicket();
      setIncludesHotel(ticket.TicketType.includesHotel);
      setTicketStatus(ticket.status);
    }
    catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
    setLoading(false);
  }, []);

  useEffect(async() => {
    try {
      const hotels = await getHotel();
      setHotels(hotels); // Define o array de hotéis no estado local
    }
    catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (ticketStatus === 'RESERVED') {
      setNome('Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem');
    }
    if (ticketStatus === 'PAID' && includesHotel === false) {
      setNome('Sua modalidade de ingresso não inclui hospedagem. Prossiga para a escolha de atividades.');
    }
    if (ticketStatus === 'PAID' && includesHotel === true) {
      setNome('');
    }
  }, [includesHotel, ticketStatus]);

  if (includesHotel === true && ticketStatus === 'PAID') {
    return (
      <Container>
        <Titulo>
          <h1>Escolha de hotel e quarto</h1>
          <h2>Primeiro, escolha seu hotel</h2>
        </Titulo>
        <ListaHoteis>
          {hotels.map((hotel) => (
            <ComponentMap key={hotel.id}>
              <img src={hotel.image} alt={hotel.name} />
              <h3>{hotel.name}</h3>
            </ComponentMap>
          ))}
        </ListaHoteis>
      </Container>
    );
  } else {
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

const ComponentMap = styled.div`
width: 196px;
height: 264px;
background: #EBEBEB;
border-radius: 10px;
margin:9.5px;
img{
  width: 168px;
  height: 109px;
  border-radius: 5px;
  margin:16px 14px 0px 14px;
}
h3{
  margin:10px 15px 0px 15px;
}
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Titulo = styled.div`
  h1{
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 34px;
    line-height: 40px;
    color: #000000;
    margin:0px 0px 0px 15px;
  }
  h2{
    font-family: 'Roboto';
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    color: #8E8E8E;
    margin:26px 15px 10px 15px;
  }
`;

const ListaHoteis = styled.div`
display: flex;

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
