import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { rdxSelectorPuzzle, rdxRotateExistingPuzzleAsync } from 'application/redux';

interface IButtonRotateHandler {
  positionX: number;
  positionY: number;
}

function GamePuzzle(): JSX.Element {
  const dispatch = useDispatch();
  const { puzzleData, puzzleWebSocket, puzzleRemainingValidationAttempt } = useSelector(rdxSelectorPuzzle);

  const [stateValidateAttempt, setStateValidateAttempt] = useState<number>(puzzleRemainingValidationAttempt);
  const [stateBounceClassName, setStateBounceClassName] = useState<string>('');
  useEffect(() => {
    if (stateValidateAttempt !== puzzleRemainingValidationAttempt && puzzleRemainingValidationAttempt > 0) {
      setStateValidateAttempt(puzzleRemainingValidationAttempt);
      setStateBounceClassName('game__puzzle--bounce');
      const toggleClassDelay = setTimeout(() => {
        setStateBounceClassName('');
        clearTimeout(toggleClassDelay);
      }, 600);
    }
  }, [stateValidateAttempt, puzzleRemainingValidationAttempt]);

  const buttonRotateHandler = ({ positionX, positionY }: IButtonRotateHandler): void => {
    if (puzzleWebSocket) {
      dispatch(rdxRotateExistingPuzzleAsync({ webSocket: puzzleWebSocket, positionX, positionY }));
    }
  };

  return (
    <div className={`game__puzzle ${stateBounceClassName}`}>
      {puzzleData?.map((row: string[], rowIndex: number) => {
        return (
          <div key={rowIndex} className="game__row">
            {row?.map((item: string, itemIndex: number) => {
              return (
                <button key={itemIndex} className={`game__item game__item--attempt--${stateValidateAttempt}`} onClick={() => buttonRotateHandler({ positionX: itemIndex, positionY: rowIndex })}>{item}</button>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default GamePuzzle;
