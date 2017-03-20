import xs from 'xstream';
import {html} from 'snabbdom-jsx';

import Header from './components/header';
import IndexPage from './pages/index.page';

export function App (sources) {
  const header$ = Header(sources).DOM;
  const indexPage$ = IndexPage(sources).DOM;

  return {
    DOM: xs
      .combine(indexPage$, header$)
      .map(([index, header]) =>
        <div>
          {header}
          <div>
            {index}
          </div>
        </div>
      ),
  };
}
