import Header from 'presentation/components/header/Header';
import Footer from 'presentation/components/footer/Footer';

import 'presentation/components/layout/Layout.scss';

type TChildren = React.ReactNode
  | JSX.Element
  | JSX.Element[]
  | string
  | string[]
  | React.ReactChild
  | React.ReactChild[];

interface ILayout {
  children?: TChildren;
}

function Layout({ children }: ILayout): JSX.Element {

  return (
    <>
      <Header />
      <main className="layout">
        <div className="layout__container">
          <div className="layout__content">
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Layout;
