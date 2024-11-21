import { Horse } from '@/store/modules/horses';
import { ActionContext } from 'vuex';

export interface RaceStateProps {
  currentRace: Race | null;
  isRaceStarted: boolean;
  isRaceInProgress: boolean;
}

export interface RaceHorse extends Horse {
  duration: string;
}

export interface Race {
  lapIndex: number;
  lapLength: string;
  raceHorses: RaceHorse[];
}

const state: RaceStateProps = {
  currentRace: null,
  isRaceStarted: false,
  isRaceInProgress: false,
};

const mutations = {
  SET_CURRENT_RACE(state: RaceStateProps, currentRace: Race) {
    state.currentRace = currentRace;
  },
  SET_IS_RACE_STARTED(state: RaceStateProps, isStarted: boolean) {
    state.isRaceStarted = isStarted;
  },
  SET_IS_RACE_IN_PROGRESS(state: RaceStateProps, isInProgress: boolean) {
    state.isRaceInProgress = isInProgress;
  },
  RESET_RACES(state: RaceStateProps) {
    state.currentRace = null;
    state.isRaceStarted = false;
    state.isRaceInProgress = false;
  },
};

const actions = {
  setCurrentRace(
    { commit, rootGetters }: ActionContext<RaceStateProps, unknown>,
    index: number
  ) {
    const programList = rootGetters['getProgramList'];
    if (programList && index >= 0 && index < programList.length) {
      const race = programList[index];
      // Convert each horse's condition to a duration string for the race
      const raceHorses = race.horses.map((horse: Horse) => ({
        ...horse,
        duration: `${(100 - horse.condition) / 10 + 1}`,
      }));
      commit('SET_CURRENT_RACE', {
        lapIndex: race.lapIndex,
        lapLength: race.lapLength,
        raceHorses,
      });
    }
  },
  setIsRaceStarted(
    { commit }: ActionContext<RaceStateProps, unknown>,
    isStarted: boolean
  ) {
    commit('SET_IS_RACE_STARTED', isStarted);
  },

  setIsRaceInProgress(
    { commit }: ActionContext<RaceStateProps, unknown>,
    isInProgress: boolean
  ) {
    commit('SET_IS_RACE_IN_PROGRESS', isInProgress);
  },

  resetRaces({ commit }: ActionContext<RaceStateProps, unknown>) {
    commit('RESET_RACES');
  },
};

const getters = {
  getCurrentRace: (state: RaceStateProps) => state.currentRace,
  getIsRaceStarted: (state: RaceStateProps) => state.isRaceStarted,
  getIsRaceInProgress: (state: RaceStateProps) => state.isRaceInProgress,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
