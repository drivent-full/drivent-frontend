import useEnrollment from '../../hooks/api/useEnrollment';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import TicketSelection from './TicketSelection';
import PaymentForm from './PaymentSection';
import NoEnrollmentFound from './NoEnrollmentFound';
import useTicket from '../../hooks/api/useTicket';
import { useState } from 'react';

export default function TicketAndPaymentComponent() {
  const { enrollment } = useEnrollment();
  const { ticket } = useTicket();

  // activated when the user first selects a ticket
  const [selected, setSelected] = useState(false);
  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      {ticket || selected ? (
        <PaymentForm />
      ) : enrollment ? (
        <TicketSelection refresh={() => setSelected(true)} />
      ) : (
        <NoEnrollmentFound />
      )}
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;
