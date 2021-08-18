import { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { rdxSelectorPuzzle, rdxCreateWebSocketAndPuzzleAsync } from 'application/redux';

import GameLoading from 'presentation/components/game/partials/GameLoading';
import GameError from 'presentation/components/game/partials/GameError';
import GameOver from 'presentation/components/game/partials/GameOver';
import GameActions from 'presentation/components/game/partials/GameActions';
import GameNextLevel from 'presentation/components/game/partials/GameNextLevel';
import GamePuzzle from 'presentation/components/game/partials/GamePuzzle';

import 'presentation/components/game/Game.scss';

function Game(): JSX.Element {
  const dispatch = useDispatch();
  const { puzzleLevel, puzzleIsStarted, puzzleIsLoading, puzzleIsError, puzzleIsOver, puzzleIsNextLevelAvailable } = useSelector(rdxSelectorPuzzle);

  useLayoutEffect(() => {
    if (!puzzleIsStarted) {
      dispatch(rdxCreateWebSocketAndPuzzleAsync(puzzleLevel));
    }
  }, [dispatch, puzzleIsStarted, puzzleLevel]);


  if (puzzleIsLoading) {
    return <GameLoading />;
  }

  if (puzzleIsError) {
    return <GameError />;
  }

  return (
    <div className={`game ${puzzleIsNextLevelAvailable ? 'game--succeeded' : ''} ${puzzleIsOver ? 'game--failed' : ''}`}>
      {puzzleIsOver && <GameOver />}
      {(!puzzleIsOver && !puzzleIsNextLevelAvailable) && <GameActions />}
      {puzzleIsNextLevelAvailable && <GameNextLevel />}
      <GamePuzzle />
    </div>
  );
}

export default Game;
