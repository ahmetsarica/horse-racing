import { RaceHorse } from './race';
import { ActionContext } from 'vuex';

interface ResultsStateProps {
  resultList: Result[];
}

export interface Result {
  lapIndex: number;
  lapLength: string;
  raceHorses: RaceHorse[];
}

const state: ResultsStateProps = {
  resultList: [],
};

const mutations = {
  SET_RESULT_LIST(state: ResultsStateProps, results: Result[]) {
    state.resultList = results;
  },
  RESET_RESULTS(state: ResultsStateProps) {
    state.resultList = [];
  },
};

const actions = {
  addResult(
    {
      commit,
      state,
    }: {
      commit: (mutation: string, payload: Result[]) => void;
      state: ResultsStateProps;
    },
    result: Result
  ) {
    const resultList = [...state.resultList, result];
    commit('SET_RESULT_LIST', resultList);
  },

  resetResults({ commit }: ActionContext<ResultsStateProps, unknown>) {
    commit('RESET_RESULTS');
  },
};

const getters = {
  getAllResults: (state: ResultsStateProps) => state.resultList,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
