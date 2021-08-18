import { FiRotateCw as IconLoading } from 'react-icons/fi';

import { constants } from 'application/constants';

function GameLoading(): JSX.Element {
  return (
    <div className="game game--loading">
      <IconLoading className="game--loading__icon" />
      <p className="game--loading__message">{constants.messages.loading}</p>
    </div>
  );
}

export default GameLoading;
