import styled from 'styled-components';
import { useState, useEffect } from 'react';
import useTicket from '../../hooks/api/useTicket';
import useHotel from '../../hooks/api/useHotel';
import useHotelWithRooms from '../../hooks/api/useHotelWithRooms';

export default function HotelComponent() {
  const [nome, setNome] = useState('');
  const [hotels, setHotels] = useState([]);
  const { getTicket } = useTicket();
  const { getHotel } = useHotel();
  const [includesHotel, setIncludesHotel] = useState(undefined);
  const [ticketStatus, setTicketStatus] = useState('');
  const [isLoading, setLoading] = useState(true);
  const { getHotelWithRooms } = useHotelWithRooms();
  const [hotelsWithRooms, setHotelsWithRooms] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const [id, setId] = useState(0);

  useEffect(async() => {
    try {
      const ticket = await getTicket();
      setIncludesHotel(ticket.TicketType.includesHotel);
      setTicketStatus(ticket.status);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, []);

  useEffect(async() => {
    try {
      const hotels = await getHotel();
      setHotels(hotels);
      console.log(hotels);
  
      const newQuantities = hotels.map(() => 0); // Array de quantidades inicializado com zeros
      const newHotelsWithRooms = [];
  
      for (let i = 0; i < hotels.length; i++) {
        const hotelId = hotels[i].id;
        const hotelWithRooms = await getHotelWithRooms(hotelId);
        console.log(hotelWithRooms.Rooms);
        let soma = 0;
        for (let j = 0; j < hotelWithRooms.Rooms.length; j++) {
          soma = soma + parseInt(hotelWithRooms.Rooms[j].capacity);
        }
        newQuantities[i] = soma;
        newHotelsWithRooms.push(hotelWithRooms);
      }
  
      setQuantities(newQuantities);
      setHotelsWithRooms(newHotelsWithRooms);
      console.log(newQuantities);
      console.log(newHotelsWithRooms);
    } catch (error) {
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

  useEffect(() => {
    if (hotels.length > 0) {
      setId(hotels[0].id); // Definir o ID do primeiro hotel como padrão
    }
  }, [hotels]);

  // Função auxiliar para mapear os valores de capacity para os nomes dos tipos de acomodação
  const mapCapacityToAccommodationType = (capacity) => {
    switch (capacity) {
    case 1:
      return 'Single';
    case 2:
      return 'Double';
    case 3:
      return 'Triple';
    case 4:
      return 'Quadruplo';
    default:
      return '';
    }
  };

  if (includesHotel === true && ticketStatus === 'PAID') {
    return (
      <Container>
        <Titulo>
          <h1>Escolha de hotel e quarto</h1>
          <h2>Primeiro, escolha seu hotel</h2>
        </Titulo>
        <ListaHoteis>
          {hotels.map((hotel, index) => (
            <ComponentMap key={hotel.id}>
              <img src={hotel.image} alt={hotel.name} />
              <h3>{hotel.name}</h3>
              <h4>Tipos de acomodação:</h4>
              <h5>
                {['Single', 'Double', 'Triple', 'Quadruplo'].map((accommodationType) => {
                  const count = hotelsWithRooms[index]?.Rooms.filter(
                    (room) => mapCapacityToAccommodationType(room.capacity) === accommodationType
                  ).length;
                  return count > 0 ? `${accommodationType}` : null;
                }).filter(Boolean).join(', ')}

              </h5>

              <h4>Vagas disponíveis:</h4>
              <h5>{quantities[index]}</h5>
            </ComponentMap>
          ))}
        </ListaHoteis>
      </Container>
    );
  } else {
    return (
      <Container>
        <Titulo>Escolha de hotel e quarto</Titulo>
        <Subtitulo>{nome}</Subtitulo>
      </Container>
    );
  }
}

const ComponentMap = styled.div`
  width: 196px;
  height: 264px;
  background: #EBEBEB;
  border-radius: 10px;
  margin: 9.5px;
  img {
    width: 168px;
    height: 109px;
    border-radius: 5px;
    margin: 16px 14px 0px 14px;
  }
  h3 {
    margin: 10px 15px 0px 15px;
  }
  h4 {
    margin: 10px 15px 0px 15px;
    font-family: 'Roboto';
font-style: normal;
font-weight: 700;
font-size: 12px;
line-height: 14px;
  }
  h5 {
    margin: 5px 15px 0px 15px;
    font-family: 'Roboto';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 14px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Titulo = styled.div`
  h1 {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 34px;
    line-height: 40px;
    color: #000000;
    margin: 0px 0px 0px 15px;
  }
  h2 {
    font-family: 'Roboto';
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    color: #8e8e8e;
    margin: 26px 15px 10px 15px;
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
  color: #8e8e8e;
  width: 464px;
  height: 46px;
  position: absolute;
  top: 317px;
  left: 20%;
`;
