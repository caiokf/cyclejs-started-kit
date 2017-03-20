import xs from 'xstream';
import {html} from 'snabbdom-jsx';
import Header from './components/header';

export function App (sources) {
  const header$ = Header(sources).DOM;

  return {
    DOM: header$.map((header) =>
      <div>
        {header}
        <div>
          My Awesome Cycle.js app
        </div>
      </div>
    ),
  };
}
