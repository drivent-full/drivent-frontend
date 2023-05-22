import React from 'react';
import styled from 'styled-components';

function RoomComponent({ room, isSelected, onClick, disabled }) {
  return (
    <RoomWrapper isSelected={isSelected} onClick={onClick} disabled={disabled}>
      <h1>{room.name}</h1>
    </RoomWrapper>
  );
};

export default RoomComponent;

const RoomWrapper= styled.div`
border: 1px solid #CECECE;
border-radius: 10px;
width: 190px;
height: 45px;
margin: 4px 9px 0px 14px;
background-color: ${(props) => (props.isSelected ? '#FFEED2' : 'transparent')};
pointer-events: ${(props) => (props.disabled ? 'none': 'initial')};
h1{
  margin: 11px 130px 0px 0px;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;
  text-align: center;
}
`;
