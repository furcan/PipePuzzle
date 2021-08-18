import { constants } from 'application/constants';

import { IReduxPuzzleActions, IReduxPuzzleState, rdxActionTypes } from 'application/redux';


const puzzleInitialState: IReduxPuzzleState = {
  puzzleIsWelcome: true,
  puzzleLevel: 1,
  puzzleLevelPassword: '',
  puzzleIsStarted: false,
  puzzleIsOver: false,
  puzzleIsLoading: false,
  puzzleIsError: false,
  puzzleData: [],
  puzzleWebSocket: undefined,
  puzzleRemainingValidationAttempt: constants.api.remainingValidationAttempt,
  puzzleIsNextLevelAvailable: false,
};

/* eslint-disable indent */
const puzzleReducer = (state = puzzleInitialState, action: IReduxPuzzleActions): IReduxPuzzleState => {
  switch (action.type) {
    case rdxActionTypes.PUZZLE_STARTED:
      return {
        ...puzzleInitialState,
        puzzleIsWelcome: false,
        puzzleLevel: (action.actionGameLevel || puzzleInitialState.puzzleLevel),
      };

    case rdxActionTypes.PUZZLE_RETURNED:
      return puzzleInitialState;

    case rdxActionTypes.PUZZLE_LOADING:
      return {
        ...state,
        puzzleIsLoading: true,
        puzzleIsError: false,
      };

    case rdxActionTypes.PUZZLE_FAILED:
      return {
        ...state,
        puzzleIsLoading: false,
        puzzleIsError: true,
      };

    case rdxActionTypes.PUZZLE_CREATED:
      return {
        ...state,
        puzzleIsStarted: true,
        puzzleIsLoading: false,
        puzzleIsError: false,
        puzzleData: action.actionData,
        puzzleWebSocket: action.actionWebSocket,
      };

    case rdxActionTypes.PUZZLE_UPDATED:
      return {
        ...state,
        puzzleData: action.actionData,
      };

    case rdxActionTypes.PUZZLE_VALIDATIONATTEMPTDECREASED:
      return {
        ...state,
        puzzleRemainingValidationAttempt: (state.puzzleRemainingValidationAttempt - 1),
      };

    case rdxActionTypes.PUZZLE_GAMEOVER:
      return {
        ...state,
        puzzleIsOver: true,
      };

    case rdxActionTypes.PUZZLE_NEXTLEVELAVAILABLE:
      return {
        ...state,
        puzzleIsNextLevelAvailable: true,
        puzzleLevelPassword: (action.actionGamePassword || ''),
      };

    case rdxActionTypes.PUZZLE_NEXTLEVELCREATED:
      return {
        ...puzzleInitialState,
        puzzleIsWelcome: false,
        puzzleIsStarted: true,
        puzzleLevel: (state.puzzleLevel + 1),
        puzzleData: action.actionData,
        puzzleWebSocket: state.puzzleWebSocket,
      };

    default:
      return state;
  }
};
/* eslint-enable indent */

export {
  puzzleInitialState,
  puzzleReducer,
};
