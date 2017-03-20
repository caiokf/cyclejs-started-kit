import xs from 'xstream';
import {html} from 'snabbdom-jsx';

export default function IndexPage (sources) {
  return {
    DOM: xs.of(
      <div>
        This is Index
        My Awesome Cycle.js app
      </div>
    ),
  };
}
