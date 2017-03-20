import xs from 'xstream';
import {html} from 'snabbdom-jsx';

export function App (sources) {
  const sinks = {
    DOM: xs.of(
      <div>
        My Awesome Cycle.js app
      </div>
    ),
  };

  return sinks;
}
