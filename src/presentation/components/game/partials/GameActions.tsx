import { useDispatch, useSelector } from 'react-redux';
import { FiCheckCircle as IconValidate, FiFrown as IconGiveUp } from 'react-icons/fi';

import { constants } from 'application/constants';
import { getWebSocketReadyStateDesc } from 'application/enumerations';

import { rdxSelectorPuzzle, rdxReturnToWelcomeAsync, rdxValidateExistingPuzzleAsync } from 'application/redux';

function GameActions(): JSX.Element {
  const dispatch = useDispatch();
  const { puzzleRemainingValidationAttempt, puzzleWebSocket, puzzleLevel } = useSelector(rdxSelectorPuzzle);

  const buttonValidateHandler = () => {
    if (puzzleWebSocket) {
      dispatch(rdxValidateExistingPuzzleAsync(puzzleWebSocket, puzzleLevel));
    }
  };

  const buttonReturnHandler = () => {
    if (puzzleWebSocket) {
      dispatch(rdxReturnToWelcomeAsync(puzzleWebSocket));
    }
  };

  return (
    <div className="game__actions">
      <span className="game__actions__level">{constants.text.levelPrefix} {puzzleLevel}</span>
      <div className="game__actions__buttons">
        <button type="button" className="game__actions__button" onClick={buttonReturnHandler}>
          <IconGiveUp className="game__actions__button__icon" />
          <span>{constants.text.buttonGiveUp}</span>
        </button>
        <button type="button" className="game__actions__button game__actions__button--validate" onClick={buttonValidateHandler}>
          <IconValidate className="game__actions__button__icon" />
          <span>{constants.text.buttonValidate}</span>
        </button>
      </div>
      <div className="game__actions__info">
        <p className="game__actions__info__message">
          <span>{constants.text.validationRemainingAttempt}</span>
          <span className="game__actions__info__message__count">{puzzleRemainingValidationAttempt}</span>
        </p>
        <p className={`game__actions__info__message message--small state--${puzzleWebSocket?.readyState || ''}`}>{getWebSocketReadyStateDesc(puzzleWebSocket?.readyState)}</p>
      </div>
    </div>
  );
}

export default GameActions;
