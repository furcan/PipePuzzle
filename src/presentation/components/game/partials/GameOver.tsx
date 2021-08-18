import { useDispatch, useSelector } from 'react-redux';
import { FiFrown as IconGameOver, FiCornerUpLeft as IconReturn } from 'react-icons/fi';

import { constants } from 'application/constants';
import { rdxSelectorPuzzle, rdxReturnToWelcomeAsync } from 'application/redux';

function GameOver(): JSX.Element {
  const dispatch = useDispatch();
  const { puzzleWebSocket } = useSelector(rdxSelectorPuzzle);

  const buttonReturnHandler = () => {
    if (puzzleWebSocket) {
      dispatch(rdxReturnToWelcomeAsync(puzzleWebSocket));
    }
  };

  return (
    <div className="game__over">
      <IconGameOver className="game__over__icon" />
      <p className="game__over__message">{constants.text.gameIsOver}</p>
      <button type="button" className="game__over__button" onClick={buttonReturnHandler}>
        <IconReturn className="game__over__button__icon" />
        <span>{constants.text.buttonReturn}</span>
      </button>
    </div>
  );
}

export default GameOver;
