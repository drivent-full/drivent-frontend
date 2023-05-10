import useEnrollment from '../../hooks/api/useEnrollment';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import TicketSelection from './TicketSelection';
import PaymentForm from './PaymentForm';
import NoEnrollmentFound from './NoEnrollmentFound';

export default function TicketAndPaymentComponent() {
  const { enrollment } = useEnrollment();
  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      {enrollment ? <TicketSelection /> : <NoEnrollmentFound />}
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;
