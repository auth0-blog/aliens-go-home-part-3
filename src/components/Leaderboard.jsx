import React from 'react';
import PropTypes from 'prop-types';
import Login from './Login';
import Rank from "./Rank";

const Leaderboard = (props) => {
  const style = {
    fill: 'transparent',
    stroke: 'black',
    strokeDasharray: '15',
  };

  const leaderboardTitle = {
    fontFamily: '"Joti One", cursive',
    fontSize: 50,
    fill: '#88da85',
    cursor: 'default',
  };

  const leaderboard = props.leaderboard.sort((prev, next) => {
    if (prev.maxScore === next.maxScore) {
      return prev.name <= next.name ? 1 : -1;
    }
    return prev.maxScore < next.maxScore ? 1 : -1;
  }).map((member, index) => ({
    ...member,
    rank: index + 1,
    currentUser: member.id === props.currentUserId,
  })).filter((member, index) => {
    if (index < 3 || member.id === props.currentUserId) return member;
    return null;
  });

  return (
    <g>
      <text filter="url(#shadow)" style={leaderboardTitle} x="-150" y="-630">Leaderboard</text>
      <rect style={style} x="-350" y="-600" width="700" height="330" />
      {
        props.currentUserId && leaderboard.map((user, idx) => {
          const position = {
            x: -100,
            y: -530 + (70 * idx)
          };
          return <Rank key={user.id} user={user} rank={user.rank} position={position}/>
        })
      }
      {
        ! props.currentUserId && <Login authenticate={props.authenticate} />
      }
    </g>
  );
};

Leaderboard.propTypes = {
  currentUserId: PropTypes.string,
  authenticate: PropTypes.func.isRequired,
  leaderboard: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    maxScore: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
    ranking: PropTypes.number,
  })).isRequired,
};

Leaderboard.defaultProps = {
  currentUserId: null
};

export default Leaderboard;
