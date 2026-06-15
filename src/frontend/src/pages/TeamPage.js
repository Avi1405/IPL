import {React,useEffect,useState} from'react';
import {useParams,Link} from 'react-router-dom';
import { MatchDetailsCard } from '../components/MatchDetailsCard';
import { MatchSmallCard } from '../components/MatchSmallCard';
import { PieChart } from 'react-minimal-pie-chart';
import { getJson } from '../api';

export const TeamPage = () => {

    const [team,setTeam] = useState({matches:[]});
    const [error,setError] = useState('');
    const {teamName} = useParams();
    const endYear = process.env.REACT_APP_DATA_END_YEAR || 2020;

    useEffect(
        ()=>{
           const fetchTeam = async ()=>{
                try {
                    setTeam(await getJson(`/teams/${encodeURIComponent(teamName)}`));
                } catch (requestError) {
                    setError('Team data could not be loaded.');
                }
            };

            fetchTeam(); 
        },[teamName]
    );

  if(error)
    return <p className="status error">{error}</p>;

  if(!team || !team.teamName)
    return <p className="status">Loading team...</p>;

  return (
    <main className="TeamPage">
        <Link className="back-link" to="/">All teams</Link>
        <div className="team-name-section">
          <h1 className="team-name">{team.teamName}</h1>
        </div>
        <div className="win-loss-section">
          Wins / Losses
          <PieChart
            data={[
              { title: 'Losses', value: team.totalMatches-team.totalWins, color: '#a34d5d' },
              { title: 'Wins', value: team.totalWins, color: '#4da375' }
            ]}
          />
        </div>
        <div  className="match-detail-section">
          <h3>Latest Matches</h3>
          <MatchDetailsCard teamName={team.teamName} match={team.matches[0]}/>
        </div>
            {team.matches.slice(1).map(match => <MatchSmallCard teamName={team.teamName} match={match} key={match.id}/>)}
        <div className="more-link">
          <Link to={`/teams/${teamName}/matches/${endYear}`}>More &gt;</Link>
        </div>
    </main>
  );
}
