import {run} from '@cycle/run';
import {makeDOMDriver} from '@cycle/dom';
import {App} from './app';
import './styles/index.scss';

const drivers = {
  DOM: makeDOMDriver('#app'),
};

const app = run(App, drivers);
