import { useDispatch, useSelector } from 'react-redux';
import { FiAlertCircle as IconFailure, FiCornerUpLeft as IconReturn } from 'react-icons/fi';

import { constants } from 'application/constants';
import { rdxSelectorPuzzle, rdxReturnToWelcomeAsync } from 'application/redux';

function GameError(): JSX.Element {
  const dispatch = useDispatch();
  const { puzzleWebSocket } = useSelector(rdxSelectorPuzzle);

  const buttonReturnHandler = () => {
    if (puzzleWebSocket) {
      dispatch(rdxReturnToWelcomeAsync(puzzleWebSocket));
    }
  };

  return (
    <div className="game game--failure">
      <IconFailure className="game--failure__icon" />
      <p className="game--failure__message">{constants.messages.failure}</p>
      <button type="button" className="game--failure__button" onClick={buttonReturnHandler}>
        <IconReturn className="game--failure__button__icon" />
        <span>{constants.text.buttonReturn}</span>
      </button>
    </div>
  );
}

export default GameError;
