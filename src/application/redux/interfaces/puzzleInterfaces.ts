import { Dispatch } from 'redux';

import { TSocketPuzzleData } from 'application/api';

type TReduxPuzzleData = TSocketPuzzleData;

interface IReduxPuzzleActionTypes {
  PUZZLE_STARTED: string;
  PUZZLE_RETURNED: string;
  PUZZLE_LOADING: string;
  PUZZLE_FAILED: string;
  PUZZLE_CREATED: string;
  PUZZLE_UPDATED: string;
  PUZZLE_GAMEOVER: string;
  PUZZLE_VALIDATIONATTEMPTDECREASED: string;
  PUZZLE_NEXTLEVELAVAILABLE: string;
  PUZZLE_NEXTLEVELCREATED: string;
}

interface IReduxPuzzleActions {
  type: string;
  actionGameLevel?: number;
  actionGamePassword?: string;
  actionData?: TReduxPuzzleData;
  actionWebSocket?: WebSocket;
}

interface IReduxPuzzleState {
  puzzleIsWelcome: boolean;
  puzzleLevel: number;
  puzzleLevelPassword: string;
  puzzleIsStarted: boolean;
  puzzleIsOver: boolean;
  puzzleIsLoading: boolean;
  puzzleIsError: boolean;
  puzzleData?: TReduxPuzzleData;
  puzzleWebSocket?: WebSocket;
  puzzleRemainingValidationAttempt: number;
  puzzleIsNextLevelAvailable: boolean;
  puzzleReducer?: any;
}

interface IPuzzleDispatch {
  (dispatch: Dispatch<IReduxPuzzleActions>): Promise<void>;
}

export type {
  TReduxPuzzleData,
  IReduxPuzzleActionTypes,
  IReduxPuzzleActions,
  IReduxPuzzleState,
  IPuzzleDispatch,
  Dispatch,
};
