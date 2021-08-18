import { useDispatch, useSelector } from 'react-redux';
import { FiGift as IconWellDone, FiArrowRightCircle as IconNextLevel, FiCornerUpLeft as IconReturn } from 'react-icons/fi';

import { constants } from 'application/constants';
import { rdxSelectorPuzzle, rdxReturnToWelcomeAsync, rdxGoToNextLevelOfPuzzleAsync } from 'application/redux';

function GameNextLevel(): JSX.Element {
  const dispatch = useDispatch();
  const { puzzleWebSocket, puzzleLevelPassword, puzzleLevel } = useSelector(rdxSelectorPuzzle);

  const buttonReturnHandler = () => {
    if (puzzleWebSocket) {
      dispatch(rdxReturnToWelcomeAsync(puzzleWebSocket));
    }
  };

  const buttonNextLevelHandler = () => {
    if (puzzleWebSocket) {
      dispatch(rdxGoToNextLevelOfPuzzleAsync(puzzleWebSocket, puzzleLevel));
    }
  };

  return (
    <div className="game__actions">
      <div className="game__actions__achievement">
        <IconWellDone className="game__actions__achievement__icon" />
        <p className="game__actions__achievement__message">
          <span>{constants.text.nextLevel}</span>
          <span className="game__actions__achievement__message__highlight">{puzzleLevelPassword}</span>
        </p>
      </div>
      <div className="game__actions__buttons">
        <button type="button" className="game__actions__button" onClick={buttonReturnHandler}>
          <IconReturn className="game__actions__button__icon" />
          <span>{constants.text.buttonReturn}</span>
        </button>
        {puzzleLevel < constants.api.maximumGameLevel &&
          <button type="button" className="game__actions__button game__actions__button--next" onClick={buttonNextLevelHandler}>
            <IconNextLevel className="game__actions__button__icon" />
            <span>{constants.text.buttonNext}</span>
          </button>
        }
        {puzzleLevel >= constants.api.maximumGameLevel &&
          <p className="game__actions__finish">{constants.text.gameIsFinished}</p>
        }
      </div>
    </div>
  );
}

export default GameNextLevel;
