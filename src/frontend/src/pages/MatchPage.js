import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getJson } from '../api';
import { MatchSmallCard } from '../components/MatchSmallCard';

export const MatchPage = () => {
  const { teamName, year } = useParams();
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState('');
  const numericYear = Number(year);

  useEffect(() => {
    getJson(`/teams/${encodeURIComponent(teamName)}/matches?year=${numericYear}`)
      .then(setMatches)
      .catch(() => setError('Season results could not be loaded.'));
  }, [teamName, numericYear]);

  return (
    <main>
      <Link className="back-link" to={`/teams/${encodeURIComponent(teamName)}`}>Back to team</Link>
      <header className="page-heading">
        <p className="eyebrow">Season results</p>
        <h1>{teamName} in {year}</h1>
        <p>{matches.length} matches found</p>
      </header>

      {error && <p className="status error">{error}</p>}
      {!error && matches.length === 0 && <p className="status">No matches found for this season.</p>}
      <section className="match-list">
        {matches.map((match) => (
          <MatchSmallCard teamName={teamName} match={match} key={match.id} />
        ))}
      </section>
    </main>
  );
};
