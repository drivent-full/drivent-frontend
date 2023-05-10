import styled from 'styled-components';

export default function NoEnrollmentFound() {
  return (
    <Container>
      <StyledMessage>Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso</StyledMessage>
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
