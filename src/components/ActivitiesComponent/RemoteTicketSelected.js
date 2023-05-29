import styled from 'styled-components';

export default function RemoteTicketSelected() {
  return (
    <Container>
      <StyledMessage>Sua modalidade de ingresso não necessita escolher atividade. Você terá acesso a todas as atividades.</StyledMessage>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  margin-top: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StyledMessage = styled.span`
  width: 388px;
  font-size: 20px;
  font-family: 'Roboto', sans-serif;
  text-align: center;
  color: #8e8e8e;
`;
