import { Socket, ISocketRotatePuzzle } from 'application/api';

import { TReduxPuzzleData, IReduxPuzzleActionTypes, IReduxPuzzleActions, IReduxPuzzleState, IPuzzleDispatch, Dispatch } from 'application/redux';


const rdxActionTypes: IReduxPuzzleActionTypes = {
  PUZZLE_STARTED: 'PUZZLE_STARTED',
  PUZZLE_RETURNED: 'PUZZLE_RETURNED',
  PUZZLE_LOADING: 'PUZZLE_LOADING',
  PUZZLE_FAILED: 'PUZZLE_FAILED',
  PUZZLE_CREATED: 'PUZZLE_CREATED',
  PUZZLE_UPDATED: 'PUZZLE_UPDATED',
  PUZZLE_GAMEOVER: 'PUZZLE_GAMEOVER',
  PUZZLE_VALIDATIONATTEMPTDECREASED: 'PUZZLE_VALIDATIONATTEMPTDECREASED',
  PUZZLE_NEXTLEVELAVAILABLE: 'PUZZLE_NEXTLEVELAVAILABLE',
  PUZZLE_NEXTLEVELCREATED: 'PUZZLE_NEXTLEVELCREATED',
};


const puzzleStarted = (gameLevel: number): IReduxPuzzleActions => ({
  type: rdxActionTypes.PUZZLE_STARTED,
  actionGameLevel: gameLevel,
});

const puzzleReturned = (): IReduxPuzzleActions => ({
  type: rdxActionTypes.PUZZLE_RETURNED,
});

const puzzleLoading = (): IReduxPuzzleActions => ({
  type: rdxActionTypes.PUZZLE_LOADING,
});

const puzzleFailed = (): IReduxPuzzleActions => ({
  type: rdxActionTypes.PUZZLE_FAILED,
});

const puzzleCreated = (data: TReduxPuzzleData, webSocket: WebSocket): IReduxPuzzleActions => ({
  type: rdxActionTypes.PUZZLE_CREATED,
  actionData: data,
  actionWebSocket: webSocket,
});

const puzzleUpdated = (data: TReduxPuzzleData): IReduxPuzzleActions => ({
  type: rdxActionTypes.PUZZLE_UPDATED,
  actionData: data,
});

const puzzleGameOver = (): IReduxPuzzleActions => ({
  type: rdxActionTypes.PUZZLE_GAMEOVER,
});

const puzzleDecreaseValidationAttempt = (): IReduxPuzzleActions => ({
  type: rdxActionTypes.PUZZLE_VALIDATIONATTEMPTDECREASED,
});

const puzzleNextLevelAvailability = (data: string): IReduxPuzzleActions => ({
  type: rdxActionTypes.PUZZLE_NEXTLEVELAVAILABLE,
  actionGamePassword: data,
});

const puzzleNextLevelCreated = (data: TReduxPuzzleData): IReduxPuzzleActions => ({
  type: rdxActionTypes.PUZZLE_NEXTLEVELCREATED,
  actionData: data,
});


const rdxStartPuzzleAsync = (gameLevel: number): IPuzzleDispatch => async (dispatch: Dispatch<IReduxPuzzleActions>) => {
  dispatch(puzzleStarted(gameLevel));
};

const rdxReturnToWelcomeAsync = (webSocket: WebSocket): IPuzzleDispatch => async (dispatch: Dispatch<IReduxPuzzleActions>) => {
  try {
    const response = await new Socket().closeWebSocketAsync(webSocket);
    if (response !== null) {
      dispatch(puzzleReturned());
    } else {
      throw new Error();
    }
  } catch (exception) {
    dispatch(puzzleFailed());
  }
};

const rdxCreateWebSocketAndPuzzleAsync = (gameLevel: number): IPuzzleDispatch => async (dispatch: Dispatch<IReduxPuzzleActions>) => {
  dispatch(puzzleLoading());
  try {
    const response = await new Socket().createNewSocketAndPuzzleAsync(gameLevel);
    if (response instanceof Object) {
      dispatch(puzzleCreated(response.puzzleData, response.webSocket));
    } else {
      throw new Error();
    }
  } catch (exception) {
    dispatch(puzzleFailed());
  }
};

const rdxRotateExistingPuzzleAsync = ({ webSocket, positionX, positionY }: ISocketRotatePuzzle): IPuzzleDispatch => async (dispatch: Dispatch<IReduxPuzzleActions>) => {
  try {
    const puzzleData = await new Socket().rotateExistingPuzzleAsync({ webSocket, positionX, positionY });
    if (puzzleData) {
      dispatch(puzzleUpdated(puzzleData));
    } else {
      throw new Error();
    }
  } catch (exception) {
    dispatch(puzzleFailed());
  }
};

const rdxValidateExistingPuzzleAsync = (webSocket: WebSocket, gameLevel: number): IPuzzleDispatch => async (dispatch: Dispatch<IReduxPuzzleActions>) => {
  try {
    const validation = await new Socket().verifyExistingPuzzleAsync(webSocket, gameLevel);

    // has an error
    if (!validation) {
      throw new Error();
    }

    // is not correct
    if (!validation.isCorrect) {
      dispatch(puzzleDecreaseValidationAttempt());
    }

    // is game over
    if (validation.isGameOver) {
      dispatch(puzzleGameOver());
    }

    // is correct
    if (validation.isCorrect) {
      dispatch(puzzleNextLevelAvailability(validation.levelPassword));
    }

  } catch (exception) {
    dispatch(puzzleFailed());
  }
};

const rdxGoToNextLevelOfPuzzleAsync = (webSocket: WebSocket, gameLevel: number): IPuzzleDispatch => async (dispatch: Dispatch<IReduxPuzzleActions>) => {
  dispatch(puzzleLoading());
  try {
    const response = await new Socket().goToNextLevelOfPuzzleAsync(webSocket, (gameLevel + 1));
    if (response) {
      dispatch(puzzleNextLevelCreated(response));
    } else {
      throw new Error();
    }
  } catch (exception) {
    dispatch(puzzleFailed());
  }
};

const rdxSelectorPuzzle = (state: IReduxPuzzleState): IReduxPuzzleState => state.puzzleReducer;

export {
  rdxActionTypes,
  rdxSelectorPuzzle,
  rdxStartPuzzleAsync,
  rdxReturnToWelcomeAsync,
  rdxCreateWebSocketAndPuzzleAsync,
  rdxRotateExistingPuzzleAsync,
  rdxValidateExistingPuzzleAsync,
  rdxGoToNextLevelOfPuzzleAsync,
};
