import { useState, useEffect } from 'react';
import styled from 'styled-components';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { RowTitle } from './TicketSelection';
import Cards from 'react-credit-cards-2';
import useTicket from '../../hooks/api/useTicket';

export default function Payment() {
  const { ticket } = useTicket();
  const [state, setState] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: '',
  });

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;

    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };

  return (
    <>
      <RowTitle>Ingresso escolhido</RowTitle>
      {ticket && (
        <ConfirmTicketContainer>
          {ticket.TicketType?.isRemote ? 'Online' : 'Presencial'} + {ticket.TicketType?.name}
          <p>R$ {ticket.TicketType?.price}</p>
        </ConfirmTicketContainer>
      )}
      <RowTitle>Pagamento</RowTitle>
      <CreditCard>
        <div>
          <Cards
            number={state.number}
            expiry={state.expiry}
            cvc={state.cvc}
            name={state.name}
            focused={state.focus}
          />
        </div>

        <PaymentForm>
          <input
            type="number"
            name="number"
            placeholder="Card Number"
            value={state.number}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={state.name}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
          <div>
            <input
              className="expiry"
              type="text"
              name="expiry"
              placeholder="Valid Thru"
              value={state.expiry}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
            <input
              className="cvc"
              type="tel"
              name="cvc"
              placeholder="CVC"
              value={state.cvc}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
          </div>
        </PaymentForm>
      </CreditCard>
    </>
  );
}

const ConfirmTicketContainer = styled.div`
  border-radius: 20px;
  border-style: solid;
  border-color: #cecece;
  width: 290px;
  height: 108px;
  background-color: #FFEED2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Roboto', sans-serif;
  margin-bottom: 24px;
  margin-right: 24px;
  line-height: 19px;
 
  p {
    margin-top: 8px;
    font-size: 14px;
    color: #898989;
  }
`;

const CreditCard = styled.div`
  display: flex;
  margin-bottom: 20px;
  @media (max-width: 600px) {
    flex-direction: column;
    width: 100px;

    div {
      margin-bottom: 10px;
    }
  }
`;

const PaymentForm = styled.form`
display: flex;
flex-direction: column;
margin-left: 20px;
width: 100%;
@media(max-width: 600px) {
  width: 500px;
  margin-left: 0px;
}
  input {
  margin-bottom: 20px;
  width: 70%;
  padding-left: 11px;
  height: 45px;
  border-radius: 5px;
  border-width: 1px;
  border-color: #8e8e8e;
  font-size: 1.1rem;
  color: #8e8e8e;
}

  .expiry {
  width: 40%;
}
  .cvc {
  width: 26%;
  margin-left: 20px;
}
`;
