import styled from 'styled-components';
import { IoLogInOutline } from 'react-icons/io5';
import { useActivitiesByDate } from '../../hooks/api/useActivity';
import useAuditorium from '../../hooks/api/useAuditorium';
import dayjs from 'dayjs';
import { durationInHors } from './util';

export default function ActivitySelectorComponent({ date }) {
  const startTime = dayjs(date).set('hours', 9);
  const { activities } = useActivitiesByDate(date);
  const { auditoriums } = useAuditorium();

  if (!auditoriums) return <>Carregando...</>;
  if (!auditoriums.length) return <>Parece que não tem nenhum auditório cadastrado ainda</>;

  if (activities)
    for (const act of activities) {
      const diff = durationInHors(act.startsAt, act.endsAt);
      act.diff = diff;
    }
  return (
    <AuditoriumsContainer>
      {auditoriums.map((auditorium) => (
        <AuditoriumContainer key={auditorium.id}>
          {auditorium.name}
          <AuditoriumBox>
            {activities
              ?.filter((a) => a.auditoriumId === auditorium.id)
              .map((act) => (
                <ActivityWrapper key={act.id} duration={act.diff} offset={durationInHors(startTime, act.startsAt)}>
                  <ActivityLeft>
                    {<div className="title">{act.title}</div>}
                    {
                      <div>
                        {dayjs(act.startsAt).format('HH:mm')} - {dayjs(act.endsAt).format('HH:mm')}{' '}
                      </div>
                    }
                  </ActivityLeft>
                  <ActivityRight>
                    <IoLogInOutline />
                  </ActivityRight>
                </ActivityWrapper>
              ))}
          </AuditoriumBox>
        </AuditoriumContainer>
      ))}
    </AuditoriumsContainer>
  );
}

const ActivityWrapper = styled.div`
  font-size: 12px;
  display: flex;
  background-color: #f1f1f1;
  .title {
    margin-bottom: 5px;
    font-weight: bold;
    color: #343434;
  }
  height: ${(props) => `${props.duration * 80}px`};
  width: 100%;
  top: ${(props) => `${props.offset * 80}px`};
  position: absolute;
`;

const ActivityLeft = styled.div`
  padding: 10px;
  height: 100%;
  width: 75%;
`;

const ActivityRight = styled.div`
  padding: 10px;
  height: 100%;
  width: 25%;
  font-size: 25px;
  color: #078632;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AuditoriumContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AuditoriumBox = styled.div`
  margin-top: 10px;
  min-height: 392px;
  width: 288px;
  border: 1px solid #d7d7d7;
  position: relative;
  border-left: none;
`;
const AuditoriumsContainer = styled.div`
  margin-top: 25px;
  font-family: 'Roboto', sans-serif;
  font-size: 17px;
  color: #7b7b7b;
  display: flex;
  & ${AuditoriumContainer}:nth-child(1) ${AuditoriumBox} {
    border-left: 1px solid #d7d7d7;
  }
`;
