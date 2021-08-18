import { useSelector } from 'react-redux';

import { rdxSelectorPuzzle } from 'application/redux';

import Layout from 'presentation/components/layout/Layout';
import Welcome from 'presentation/components/welcome/Welcome';
import Game from 'presentation/components/game/Game';

function App(): JSX.Element {
  const { puzzleIsWelcome } = useSelector(rdxSelectorPuzzle);

  return (
    <Layout>
      {puzzleIsWelcome && <Welcome />}
      {!puzzleIsWelcome && <Game />}
    </Layout>
  );
}

export default App;
