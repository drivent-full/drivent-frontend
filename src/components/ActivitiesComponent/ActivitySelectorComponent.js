import styled from 'styled-components';
import { BiLogIn, BiCheckCircle } from 'react-icons/bi';
import { ImCancelCircle } from 'react-icons/im';
import { useActivitiesByDate } from '../../hooks/api/useActivity';
import useAuditorium from '../../hooks/api/useAuditorium';
import dayjs from 'dayjs';
import { durationInHors } from './util';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function ActivitySelectorComponent({ date, onClickActivity }) {
  const startTime = dayjs(date).set('hours', 9);
  let maxEndTime = dayjs(startTime);
  const { activities: _activities, getActivities } = useActivitiesByDate(date);
  const { auditoriums } = useAuditorium();
  const [activities, setActivities] = useState([]);

  if (_activities) {
    for (const act of _activities) {
      const diff = durationInHors(act.startsAt, act.endsAt);
      act.diff = diff;
      let endsJs = dayjs(act.endsAt);
      if (endsJs.isAfter(maxEndTime)) maxEndTime = endsJs;
    }
  }

  useEffect(() => {
    setActivities(_activities);
  }, [_activities]);

  if (!auditoriums) return <>Carregando...</>;
  if (!auditoriums.length) return <>Parece que não tem nenhum auditório cadastrado ainda</>;

  return (
    <ScrollableElement>
      <AuditoriumsContainer slot={Math.max(durationInHors(startTime, maxEndTime), 5)}>
        {auditoriums.map((auditorium) => (
          <AuditoriumContainer key={auditorium.id}>
            {auditorium.name}
            <AuditoriumBox>
              {activities
                ?.filter((a) => a.auditoriumId === auditorium.id)
                .map((act) => (
                  <ActivityWrapper
                    key={act.id}
                    duration={act.diff}
                    offset={durationInHors(startTime, act.startsAt)}
                    subscribed={act.subscribed}
                  >
                    <ActivityLeft>
                      {<div className="title">{act.title}</div>}
                      {
                        <div>
                          {dayjs(act.startsAt).format('HH:mm')} - {dayjs(act.endsAt).format('HH:mm')}{' '}
                        </div>
                      }
                    </ActivityLeft>
                    {act.subscribed && (
                      <ActivityRight>
                        <BiCheckCircle />
                        <div className="vacancies-text">Inscrito</div>
                      </ActivityRight>
                    )}
                    {!act.subscribed && act.vacancies > 0 && (
                      <ActivityRight>
                        <LoginIcon
                          // eslint-disable-next-line space-before-function-paren
                          onClick={async () => {
                            await onClickActivity(act);
                            try {
                              const data = await getActivities();
                              setActivities(data);
                            } catch (error) {
                              toast('Problema ao carregar a lista de atividades. Tente recarregar a página');
                            }
                          }}
                        />
                        <div className="vacancies-text">{act.vacancies} vagas</div>
                      </ActivityRight>
                    )}
                    {!act.subscribed && act.vacancies <= 0 && (
                      <ActivityRight full={true}>
                        <ImCancelCircle />
                        <div className="vacancies-text">Esgotado</div>
                      </ActivityRight>
                    )}
                  </ActivityWrapper>
                ))}
            </AuditoriumBox>
          </AuditoriumContainer>
        ))}
      </AuditoriumsContainer>
    </ScrollableElement>
  );
}

const ActivityWrapper = styled.div`
  font-size: 12px;
  display: flex;
  background-color: ${(props) => (props.subscribed ? '#D0FFDB' : '#f1f1f1')};
  border: 5px solid white;
  border-radius: 10px;
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
  color: ${(props) => (props.full ? '#CC6666' : '#078632')};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .vacancies-text {
    margin-top: 5px;
    font-size: 9px;
  }
`;

const AuditoriumContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AuditoriumBox = styled.div`
  margin-top: 10px;
  width: 288px;
  height: 100%;
  border-right: 1px solid #d7d7d7;
  position: relative;
  border-top: 1px solid #d7d7d7;
  border-left: none;
`;
const AuditoriumsContainer = styled.div`
  margin-top: 25px;
  min-height: ${(props) => `${props.slot * 80 + 30}px`};
  font-family: 'Roboto', sans-serif;
  font-size: 17px;
  color: #7b7b7b;
  display: flex;
  & ${AuditoriumContainer}:nth-child(1) ${AuditoriumBox} {
    border-left: 1px solid #d7d7d7;
  }
  border-bottom: 1px solid #d7d7d7;
`;

const ScrollableElement = styled.div`
  height: 500px;
  overflow-y: auto;
`;

const LoginIcon = styled(BiLogIn)`
  cursor: pointer;
`;
