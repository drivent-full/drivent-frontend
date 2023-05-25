import React from 'react';
import styled from 'styled-components';
import { IonIcon } from '@ionic/react';
import { person, personOutline } from 'ionicons/icons';

function RoomComponent({ room, isSelected, onClick, disabled, bookings }) {
  const renderIcons = () => {
    const icons = [];
    
    const reservationsCount = bookings.filter(booking => booking.roomId === room.id).length;
    
    for (let i = 0; i < room.capacity; i++) {
      if (i < reservationsCount) {
        icons.push(<IonIcon key={i} icon={person} />);
      } else {
        icons.push(<IonIcon key={i} icon={personOutline} />);
      }
    }
    return icons;  
  };

  return (
    <RoomWrapper isSelected={isSelected} onClick={onClick} disabled={disabled}>
      <h1>{room.name}</h1>
      <Icon>{renderIcons()}</Icon>
    </RoomWrapper>
  );
};

export default RoomComponent;

const RoomWrapper= styled.div`
border: 1px solid #CECECE;
border-radius: 10px;
display: flex;
justify-content: space-between;
align-items: center;
padding: 11px;
width: 190px;
height: 45px;
margin: 4px 9px 0px 14px;
color: ${(props) => (props.disabled? '#9D9D9D': '')};
background-color: ${(props) => (props.isSelected ? '#FFEED2' : props.disabled? '#E9E9E9': 'transparent')};
pointer-events: ${(props) => (props.disabled ? 'none': 'initial')};
h1{
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;
  text-align: center;
}
`;
const Icon = styled.div`
  ion-icon {
    color: #000000;
  }
`;

