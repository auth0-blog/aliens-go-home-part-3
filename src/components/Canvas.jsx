import React from 'react';
import PropTypes from 'prop-types';
import Sky from './Sky';
import Ground from './Ground';
import CannonBase from './CannonBase';
import CannonPipe from './CannonPipe';
import CurrentScore from './CurrentScore'
import FlyingObject from './FlyingObject';
import StartGame from './StartGame';
import Title from './Title';
import Login from './Login';
import { signIn } from 'auth0-web';

const Canvas = (props) => {
  const gameHeight = 1200;
  const viewBox = [window.innerWidth / -2, 100 - gameHeight, window.innerWidth, gameHeight];
  return (
    <svg
      id="aliens-go-home-canvas"
      preserveAspectRatio="xMaxYMax none"
      onMouseMove={props.trackMouse}
      viewBox={viewBox}
    >
      <defs>
        <filter id="shadow">
          <feDropShadow dx="1" dy="1" stdDeviation="2" />
        </filter>
      </defs>
      <Sky />
      <Ground />
      <CannonPipe rotation={props.angle} />
      <CannonBase />
      <CurrentScore score={15} />

      { ! props.gameState.started &&
      <g>
        <StartGame onClick={() => props.startGame()} />
        <Title />
        <Login authenticate={signIn} />
      </g>
      }

      {props.gameState.flyingObjects.map(flyingObject => (
        <FlyingObject
          key={flyingObject.id}
          position={flyingObject.position}
        />
      ))}
    </svg>
  );
};

Canvas.propTypes = {
  angle: PropTypes.number.isRequired,
  gameState: PropTypes.shape({
    started: PropTypes.bool.isRequired,
    kills: PropTypes.number.isRequired,
    lives: PropTypes.number.isRequired,
  }).isRequired,
  trackMouse: PropTypes.func.isRequired,
  startGame: PropTypes.func.isRequired,
};

export default Canvas;
