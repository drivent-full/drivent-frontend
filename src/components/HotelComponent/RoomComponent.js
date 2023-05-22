import React from 'react';
import styled from 'styled-components';
import { IoPerson } from 'react-icons/io5';

function RoomComponent({ room, isSelected, onClick, disabled }) {
  console.log(room);
  const renderIcons = () => {
    const icons = [];

    for (let i = 0; i < room.capacity; i++) {
      icons.push(<Icon key={i} color={'#000000'}/>);
    }
    return icons;
  };

  return (
    <RoomWrapper isSelected={isSelected} onClick={onClick} disabled={disabled}>
      <h1>{room.name}</h1>
      <div>{renderIcons()}</div>
    </RoomWrapper>
  );
};

export default RoomComponent;

const Icon = styled(IoPerson)`
  color: ${(props) => props.color};
  width: 20px;
`;

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
