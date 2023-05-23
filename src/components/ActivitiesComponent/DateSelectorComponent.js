import styled from 'styled-components';
import { formatDateButton } from './util';

export default function DateSelectorComponent({ dates, setDate }) {
  if (!dates) return <div>Carregando</div>;
  if (dates.length === 0) return <div>Parece que não tem nenhuma atividade cadastrada ainda...</div>;
  return (
    <DatesContainer>
      {dates.map((date) => (
        <DateWrapper key={date.date} isSelected={date.isSelected} onClick={() => setDate(date)}>
          {formatDateButton(new Date(date.date))}
        </DateWrapper>
      ))}
    </DatesContainer>
  );
}

const DatesContainer = styled.div`
  display: flex;
`;
const DateWrapper = styled.div`
  width: 131px;
  height: 37px;
  border-radius: 4px;
  margin-right: 17px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
  background-color: ${(props) => (props.isSelected ? '#FFD37D' : '#E0E0E0')};
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  cursor: pointer;
`;
