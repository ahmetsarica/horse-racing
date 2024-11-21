import { createStore } from 'vuex';
import race from './modules/race';
import horses from './modules/horses';
import program from './modules/program';
import results from './modules/results';

export default createStore({
  modules: {
    race,
    horses,
    program,
    results,
  },
});
