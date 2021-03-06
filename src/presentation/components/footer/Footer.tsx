import { constants } from 'application/constants';

import 'presentation/components/footer/Footer.scss';

function Footer(): JSX.Element {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__copyright">
          <p className="footer__copyright__text">&copy; {new Date().getFullYear()} {constants.app.name}. {constants.text.copyright}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
