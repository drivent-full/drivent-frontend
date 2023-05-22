import styled from 'styled-components';
import { useState, useEffect } from 'react';
import useTicket from '../../hooks/api/useTicket';
import useHotel from '../../hooks/api/useHotel';
import useHotelWithRooms from '../../hooks/api/useHotelWithRooms';
import useBooking from '../../hooks/api/useBooking';
import RoomComponent from './RoomComponent';
import useSaveBooking from '../../hooks/api/useSaveBooking';
import useBookingByUserId from '../../hooks/api/useBookingByUserId';
import useUpsertBooking from '../../hooks/api/useUpsertBooking';

export default function HotelComponent() {
  const [nome, setNome] = useState('');
  const [hotels, setHotels] = useState([]);
  const { saveBooking, saveBookingLoading, saveBookingError } = useSaveBooking();
  const { getTicket } = useTicket();
  const { getHotel } = useHotel();
  const { upsertBooking } = useUpsertBooking();
  const [includesHotel, setIncludesHotel] = useState(undefined);
  const [ticketStatus, setTicketStatus] = useState('');
  const [isLoading, setLoading] = useState(true);
  const { getHotelWithRooms } = useHotelWithRooms();
  const { getBooking } = useBooking();
  const { getBookingByUserId } = useBookingByUserId();
  const [booking, setBooking] = useState([]);
  const [bookingByUserId, setBookingByUserId] = useState([]);
  const [hotelsWithRooms, setHotelsWithRooms] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const [id, setId] = useState(0);
  const [selectedHotelRooms, setSelectedHotelRooms] = useState();
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [toggleChange, setToggleChange] = useState(false);

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

      const newQuantities = hotels.map(() => 0); // Array de quantidades inicializado com zeros
      const newHotelsWithRooms = [];

      for (let i = 0; i < hotels.length; i++) {
        const hotelId = hotels[i].id;
        const hotelWithRooms = await getHotelWithRooms(hotelId);

        // Obter a quantidade de quartos reservados para o hotel
        const bookingData = await getBooking();

        let reservedRoomsCount = 0;

        for (let j = 0; j < bookingData.length; j++) {
          const roomId = bookingData[j].roomId;

          for (let k = 0; k < hotelWithRooms.Rooms.length; k++) {
            if (hotelWithRooms.Rooms[k].id === roomId) {
              reservedRoomsCount++;
            }
          }
        }

        let soma = 0;
        for (let j = 0; j < hotelWithRooms.Rooms.length; j++) {
          soma = soma + parseInt(hotelWithRooms.Rooms[j].capacity);
        }

        // Subtrair a quantidade de quartos reservados da quantidade total de quartos
        const availableRoomsCount = soma - reservedRoomsCount;

        newQuantities[i] = availableRoomsCount;
        newHotelsWithRooms.push(hotelWithRooms);
      }

      setQuantities(newQuantities);
      setHotelsWithRooms(newHotelsWithRooms);
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

  useEffect(async() => {
    try {
      const bookingData = await getBooking();
      setBooking(bookingData);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(async() => {
    try {
      const bookingByUser = await getBookingByUserId();
      setBookingByUserId(bookingByUser);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleHotelClick = (hotelId) => {
    const selectedHotel = hotelsWithRooms.find((hotel) => hotel.id === hotelId);
    setId(hotelId);
    if (selectedHotel) {
      setSelectedHotelRooms(selectedHotel.Rooms);
    }
  };

  const handleRoomClick = (room) => {
    setSelectedRoom(room === selectedRoom ? null : room);
  };
  
  const handleChangeBooking = () => {
    setToggleChange(true);
  };

  const handleBookingRoom = async() => {
    if (bookingByUserId.id) {
      if (selectedRoom) {
        try {
          const bookingData = {
            roomId: selectedRoom.id,
          };
          await upsertBooking(bookingData, bookingByUserId.id);
          console.log('Reserva modificada com sucesso!');
          setToggleChange(false);
          window.location.reload();
        } catch (error) {
          console.log('Erro ao modificar a reserva:', error);
        }        
      }
    }else{
      if (selectedRoom) {
        try {
          const bookingData = {
            roomId: selectedRoom.id,
          };
          await saveBooking(bookingData);
          console.log('Reserva feita com sucesso!');
          setToggleChange(false);
          window.location.reload();
        } catch (error) {
          console.log('Erro ao fazer a reserva:', error);
        }
      }
    } 
  };
  const isRoomDisabled = (room) => {
    const capacity = parseInt(room.capacity);
    const bookingCount = booking.filter((booking) => booking.roomId === room.id).length;
    return capacity === bookingCount;
  };

  function roomOccupancyString(occupants) {
    if (occupants < 2) return 'Você';
    else return `Você e mais ${occupants - 1} pessoa${occupants > 2 ? 's' : ''}`;
  }  

  if (includesHotel === true && ticketStatus === 'PAID') {
    if (bookingByUserId.id && toggleChange === false) {
      return (
        <Container>
          <Titulo>
            <h1>Escolha de hotel e quarto</h1>
            <h2>Você já escolheu seu quarto:</h2>
          </Titulo>
          <ListaHoteis>
            <ComponentMap isSelected={true}>
              <img src={bookingByUserId.Room.Hotel.image} alt={bookingByUserId.Room.Hotel.image} />
              <h3>{bookingByUserId.Room.Hotel.name}</h3>
              <h4>Quarto reservado:</h4>
              <h5>{bookingByUserId.Room.name}, {mapCapacityToAccommodationType(bookingByUserId.Room.capacity)}</h5>
              <h4>Pessoas no seu quarto:</h4>
              <h5>{roomOccupancyString(bookingByUserId.Room.occupants)}</h5>
            </ComponentMap>
          </ListaHoteis>
          <BookingButton onClick={handleChangeBooking}>TROCAR DE QUARTO</BookingButton>

        </Container>
      );
    } else {
      return (
        <Container>
          <Titulo>
            <h1>Escolha de hotel e quarto</h1>
            <h2>Primeiro, escolha seu hotel</h2>
          </Titulo>
          <ListaHoteis>
            {hotels.map((hotel, index) => (
              <ComponentMap key={hotel.id} onClick={() => handleHotelClick(hotel.id)} isSelected={hotel.id === id}>
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
          {selectedHotelRooms !== undefined && (
            <div>
              <h2>Ótima pedida! Agora escolha seu quarto</h2>
              <Rooms>
                {selectedHotelRooms.map((room) => (
                  <RoomComponent
                    key={room.id}
                    room={room}
                    isSelected={room === selectedRoom}
                    onClick={() => handleRoomClick(room)}
                    disabled={isRoomDisabled(room)}
                  />
                ))}
              </Rooms>
              {selectedRoom && <BookingButton onClick={handleBookingRoom}>RESERVAR QUARTO</BookingButton>}
            </div>
          )}
        </Container>
      );
    }
  } else {
    return (
      <Container>
        <Titulo>Escolha de hotel e quarto</Titulo>
        <Subtitulo>{nome}</Subtitulo>
      </Container>
    );
  }
}

const BookingButton = styled.div`
display: flex;
align-items: center;
justify-content: center;
width: 182px;
height: 37px;
font-weight: 400;
font-size: 14px;
line-height: 16px;
text-align: center;
background: #E0E0E0;
box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
border-radius: 4px;
margin: 30px 15px 10px 15px;
cursor: default;
`;

const Rooms = styled.div`
display: flex;
flex-wrap: wrap;
`;

const ComponentMap = styled.div`
  width: 196px;
  height: 264px;
  background-color: ${props => (props.isSelected ? '#FFEED2' : '#EBEBEB')};
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
  h2 {
    margin: 10px 15px 10px 15px;
  }
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
