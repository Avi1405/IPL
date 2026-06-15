import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getJson } from '../api';

export const HomePage = () => {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getJson('/teams')
      .then((data) => setTeams([...data].sort((a, b) => a.teamName.localeCompare(b.teamName))))
      .catch(() => setError('The IPL data service is unavailable. Start the Spring Boot API and try again.'));
  }, []);

  return (
    <main>
      <header className="hero">
        <p className="eyebrow">2008-2020 match data</p>
        <h1>IPL Dashboard</h1>
        <p>Explore team records, recent results, and season-by-season match history.</p>
      </header>

      {error && <p className="status error">{error}</p>}
      {!error && teams.length === 0 && <p className="status">Loading teams...</p>}

      <section className="team-grid" aria-label="IPL teams">
        {teams.map((team) => {
          const winRate = team.totalMatches
            ? Math.round((team.totalWins / team.totalMatches) * 100)
            : 0;
          return (
            <Link className="team-card" to={`/teams/${encodeURIComponent(team.teamName)}`} key={team.id}>
              <h2>{team.teamName}</h2>
              <p>{team.totalWins} wins from {team.totalMatches} matches</p>
              <strong>{winRate}% win rate</strong>
            </Link>
          );
        })}
      </section>
    </main>
  );
};
