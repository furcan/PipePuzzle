import { constants } from 'application/constants';
import { addSomeDelayAsync, createPuzzleMapFromSocketMessage, localStorageSetItem } from 'application/helpers';

type TSocketPuzzleData = string[][];

interface ISocketCreateNewAndPuzzle {
  puzzleData: TSocketPuzzleData;
  webSocket: WebSocket;
}

interface ISocketRotatePuzzle {
  webSocket: WebSocket;
  positionX: number;
  positionY: number;
}

interface ISocketVerifyPuzzle {
  isCorrect: boolean;
  isGameOver: boolean;
  levelPassword: string;
}

class Socket {
  constructor(webSocketUrl?: string) {
    this._webSocketUrl = webSocketUrl || this._webSocketUrl;
  }
  private _webSocketUrl: string = constants.api.urlWebSocket;

  private webSocketOnOpenAsync = async (webSocket: WebSocket): Promise<boolean> => new Promise((resolve) => {
    webSocket.onopen = () => {
      resolve(true);
    };
    webSocket.onerror = () => {
      resolve(false);
    };
  });

  private webSocketOnMessageAsync = async (webSocket: WebSocket): Promise<string | null> => new Promise((resolve) => {
    webSocket.onmessage = (event: MessageEvent) => {
      const message = event.data || '';
      resolve(message);
    };
    webSocket.onerror = () => {
      resolve(null);
    };
  });

  private webSocketOnCloseAsync = async (webSocket: WebSocket): Promise<number | null> => new Promise((resolve) => {
    webSocket.onclose = () => {
      resolve(webSocket.readyState);
    };
    webSocket.onerror = () => {
      resolve(null);
    };
  });

  createNewSocketAndPuzzleAsync = async (gameLevel: number): Promise<ISocketCreateNewAndPuzzle | null> => {
    try {
      await addSomeDelayAsync(360);

      const webSocket = new WebSocket(this._webSocketUrl);
      const isOpen = await this.webSocketOnOpenAsync(webSocket);
      if (!isOpen) {
        throw new Error();
      }

      webSocket.send(`${constants.api.commandNew} ${gameLevel}`);
      const newIsOk = await this.webSocketOnMessageAsync(webSocket);
      if (!newIsOk?.includes(constants.api.responseNewIsOk)) {
        throw new Error();
      }

      webSocket.send(constants.api.commandMap);
      const newIsMap = await this.webSocketOnMessageAsync(webSocket);
      if (!newIsMap?.startsWith(constants.api.responseMapIsOk)) {
        throw new Error();
      }

      const puzzleData = createPuzzleMapFromSocketMessage(newIsMap);
      return {
        puzzleData,
        webSocket,
      };
    } catch (error) {
      return null;
    }
  };

  rotateExistingPuzzleAsync = async ({ webSocket, positionX, positionY }: ISocketRotatePuzzle): Promise<TSocketPuzzleData | null> => {
    try {
      webSocket.send(`${constants.api.commandRotate} ${positionX} ${positionY}`);
      const rotateIsOk = await this.webSocketOnMessageAsync(webSocket);
      if (!rotateIsOk?.includes(constants.api.responseRotateIsOk)) {
        throw new Error();
      }

      webSocket.send(constants.api.commandMap);
      const rotateIsMap = await this.webSocketOnMessageAsync(webSocket);
      if (!rotateIsMap?.startsWith(constants.api.responseMapIsOk)) {
        throw new Error();
      }

      const puzzleData = createPuzzleMapFromSocketMessage(rotateIsMap);
      return puzzleData;

    } catch (error) {
      return null;
    }
  };

  verifyExistingPuzzleAsync = async (webSocket: WebSocket, gameLevel: number): Promise<ISocketVerifyPuzzle | null> => {
    try {
      webSocket.send(constants.api.commandVerify);
      const isVerified = await this.webSocketOnMessageAsync(webSocket);

      // is has an error, etc...
      if (!isVerified) {
        throw new Error();
      }

      // base response, also this is for "is not ok"
      let response: ISocketVerifyPuzzle = {
        isCorrect: false,
        isGameOver: false,
        levelPassword: '',
      };

      // is over attempt
      if (isVerified?.includes(constants.api.responseVerifyIsOverAttempt)) {
        response = {
          isCorrect: false,
          isGameOver: true,
          levelPassword: '',
        };
      }

      // is puzzle verified
      if (isVerified?.includes(constants.api.responseVerifyIsOk)) {
        const password = isVerified.split(constants.api.responseVerifyIsOkPassword).pop()?.trim() || '';
        localStorageSetItem(`${constants.localStorageKeyPrefix}${gameLevel}`, password);

        response = {
          isCorrect: true,
          isGameOver: false,
          levelPassword: password,
        };
      }

      return response;

    } catch (error) {
      return null;
    }
  };

  goToNextLevelOfPuzzleAsync = async (webSocket: WebSocket, nextLevel: number): Promise<TSocketPuzzleData | null> => {
    try {
      await addSomeDelayAsync(360);

      const maxNextLevel = nextLevel > constants.api.maximumGameLevel ? constants.api.maximumGameLevel : nextLevel;
      webSocket.send(`${constants.api.commandNew} ${maxNextLevel}`);

      const newIsOk = await this.webSocketOnMessageAsync(webSocket);
      if (!newIsOk?.includes(constants.api.responseNewIsOk)) {
        throw new Error();
      }

      webSocket.send(constants.api.commandMap);
      const newIsMap = await this.webSocketOnMessageAsync(webSocket);
      if (!newIsMap?.startsWith(constants.api.responseMapIsOk)) {
        throw new Error();
      }

      const puzzleData = createPuzzleMapFromSocketMessage(newIsMap);
      return puzzleData;
    } catch (error) {
      return null;
    }
  };

  closeWebSocketAsync = async (webSocket: WebSocket): Promise<number | null> => {
    try {
      webSocket.close();
      const response = await this.webSocketOnCloseAsync(webSocket);
      if (response !== null) {
        return response;
      } else {
        throw new Error();
      }
    } catch (error) {
      return null;
    }
  };
}

export type {
  TSocketPuzzleData,
  ISocketCreateNewAndPuzzle,
  ISocketRotatePuzzle,
};

export { Socket };
