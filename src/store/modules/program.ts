import { Horse } from '@/store/modules/horses';
import { ActionContext } from 'vuex';

export interface ProgramStateProps {
  programList: Program[];
}

export interface Program {
  index: number;
  horses: Horse[];
  lapIndex: number;
  lapLength: string;
}

const state: ProgramStateProps = {
  programList: [],
};

const mutations = {
  SET_PROGRAM_LIST(state: ProgramStateProps, programList: Program[]) {
    state.programList = programList;
  },
  RESET_PROGRAM_LIST(state: ProgramStateProps) {
    state.programList = [];
  },
};

const actions = {
  async generateProgramList({
    commit,
    dispatch,
    rootGetters,
  }: ActionContext<ProgramStateProps, unknown>) {
    commit('RESET_PROGRAM_LIST');
    await dispatch('generateHorses');
    const horses: Horse[] = rootGetters['getAllHorses'];
    const programList: Program[] = [];

    // This block ensures each horse is selected only once for the program
    const selectedHorses = new Set();
    for (let i = 0; i < 6; i++) {
      let horse;
      do {
        const randomIndex = Math.floor(Math.random() * horses.length);
        horse = horses[randomIndex];
      } while (selectedHorses.has(horse.id));
      selectedHorses.add(horse.id);
      programList.push({
        index: i,
        horses: Array.from(
          { length: 10 },
          () => horses[Math.floor(Math.random() * horses.length)]
        ),
        lapIndex: i + 1,
        lapLength: `${1200 + i * 200}m`,
      });
    }
    commit('SET_PROGRAM_LIST', programList);
  },

  resetPrograms({ commit }: ActionContext<ProgramStateProps, unknown>) {
    commit('RESET_PROGRAM_LIST');
  },
};

const getters = {
  getProgramList: (state: ProgramStateProps) => state.programList,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
