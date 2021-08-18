import { useDispatch } from 'react-redux';
import { FiPlay as IconPlay, FiHelpCircle as IconAchievement } from 'react-icons/fi';
import { HiLockClosed as IconLock } from 'react-icons/hi';

import { constants } from 'application/constants';
import { localStorageGetItem } from 'application/helpers';
import { rdxStartPuzzleAsync } from 'application/redux';

import 'presentation/components/welcome/Welcome.scss';

function Welcome(): JSX.Element {
  const dispatch = useDispatch();

  const buttonStartHandler = (gameLevel: number): void => {
    dispatch(rdxStartPuzzleAsync(gameLevel));
  };

  return (
    <div className="welcome">

      <div className="welcome__head">
        <h1 className="welcome__head__title">{constants.text.welcomeTitle}</h1>
        <p className="welcome__head__description">{constants.text.welcomeDescription}</p>
      </div>

      <div className="welcome__levels">
        <div className="welcome__level welcome__level--head">
          <div className="welcome__level__key key--level">{constants.text.welcomeLevel}</div>
          <div className="welcome__level__key key--achievement">{constants.text.welcomeAchievement}</div>
          <div className="welcome__level__key key--play">{constants.text.welcomePlay}</div>
        </div>

        {Object.entries(constants.localStorageKeys).map(([, localKeyValue], localKeyIndex) => {
          const levelAchievement = localStorageGetItem(localKeyValue);
          const prevLevelHasAchieved = localStorageGetItem(`${constants.localStorageKeyPrefix}${localKeyIndex}`);
          const levelCanPlay = localKeyIndex === 0 || prevLevelHasAchieved;
          const gameLevel = localKeyIndex + 1;
          return (
            <div key={localKeyIndex} className="welcome__level">
              <div className={`welcome__level__key key--level ${!levelCanPlay ? 'welcome__level__key--locked' : ''}`}>
                <span>{constants.text.levelPrefix} {gameLevel}</span>
                {!levelCanPlay && <IconLock className="welcome__level__key__icon--lock" />}
              </div>
              <div className="welcome__level__key key--achievement">{levelAchievement || <IconAchievement className="welcome__level__key__icon--achievement" />}</div>
              <div className="welcome__level__key key--play">
                <button type="button" className={`welcome__level__button ${levelCanPlay ? '' : 'welcome__level__button--passive'}`} onClick={levelCanPlay ? () => buttonStartHandler(gameLevel) : undefined}>
                  <IconPlay />
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}

export default Welcome;
