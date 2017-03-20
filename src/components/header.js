import xs from 'xstream';
import {html} from 'snabbdom-jsx';

export default function Header (sources) {
  return {
    DOM: xs.of(
      <div>
        Header
      </div>
    ),
  };
}
