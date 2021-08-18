enum EWebSocketReadyState {
  CONNECTING = 0,
  OPEN = 1,
  CLOSING = 2,
  CLOSED = 3,
}

const mapWebSocketReadyState = new Map<number, string>([
  [EWebSocketReadyState.CONNECTING, `(Socket has been created. The connection is not yet open.)`],
  [EWebSocketReadyState.OPEN, `(The connection is open and ready to communicate.)`],
  [EWebSocketReadyState.CLOSING, `(The connection is in the process of closing.)`],
  [EWebSocketReadyState.CLOSED, `(The connection is closed or couldn't be opened.)`],
]);

const getWebSocketReadyStateDesc = (enumeration?: number): string => {
  return mapWebSocketReadyState.get(enumeration || EWebSocketReadyState.CLOSED) || '';
};

export type {
  EWebSocketReadyState,
};

export {
  getWebSocketReadyStateDesc,
};
