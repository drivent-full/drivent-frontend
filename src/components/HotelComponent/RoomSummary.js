import styled from 'styled-components';
import { roomType, roomOccupancyString } from './utils';

export default function RoomSummary({ booking }) {
  const hotel = booking?.Room?.Hotel;
  const room = booking?.Room;
  return (
    hotel && (
      <>
        Você já escolheu seu quarto:
        <SelectedHotelComponent key={hotel.id}>
          <img src={hotel.image} alt={hotel.name} />
          <div className="content">
            <div className="hotel-name">{hotel.name} </div>
            <div className="title">Quarto reservado</div>
            <div className="text">
              {room.name} ({roomType(room.capacity)})
            </div>
            <div className="title">Pessoas no seu quarto</div>
            <div className="text">{roomOccupancyString(room?.occupants)}</div>
          </div>
        </SelectedHotelComponent>
      </>
    )
  );
}

const ComponentMap = styled.div`
  width: 196px;
  height: 264px;
  background: #ebebeb;
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
`;

const SelectedHotelComponent = styled(ComponentMap)`
  background-color: #ffeed2;
  font-family: 'Roboto', sans-serif;
  .content {
    height: 140px;
    color: 3c3c3c;
    padding-left: 10px;
    .hotel-name {
      font-size: 20px;
    }
    .title {
      font-size: 12px;
      font-weight: bold;
    }
    .text {
      font-size: 12px;
    }
  }
`;
