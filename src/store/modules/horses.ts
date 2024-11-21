import { ActionContext } from 'vuex';
export interface Horse {
  id: number;
  name: string;
  condition: number;
  color: string;
}

export interface HorsesStateProps {
  horses: Horse[];
  colorPalette: string[];
  namePalette: string[];
}

const state: HorsesStateProps = {
  horses: [],
  colorPalette: [
    '#FF5733',
    '#33FF57',
    '#3357FF',
    '#F0F033',
    '#FF33A1',
    '#33FFF0',
    '#FF8333',
    '#33FF83',
    '#8333FF',
    '#F0F0F0',
    '#FF3366',
    '#66FF33',
    '#33FF99',
    '#9966FF',
    '#FF9933',
    '#33CCFF',
    '#FFCC33',
    '#33FFCC',
    '#CC33FF',
    '#FF6633',
  ],
  namePalette: [
    'Thunderbolt',
    'Lightning',
    'Storm',
    'Blaze',
    'Shadow',
    'Spirit',
    'Majesty',
    'Comet',
    'Eclipse',
    'Mystic',
    'Apollo',
    'Zeus',
    'Hercules',
    'Pegasus',
    'Atlas',
    'Orion',
    'Phoenix',
    'Titan',
    'Neptune',
    'Mercury',
    'Valkyrie',
    'Athena',
    'Artemis',
    'Hera',
    'Demeter',
    'Persephone',
    'Aphrodite',
    'Hestia',
    'Dionysus',
    'Hermes',
    'Ares',
    'Hephaestus',
    'Poseidon',
    'Hades',
    'Eos',
    'Selene',
    'Helios',
    'Rhea',
    'Gaia',
    'Uranus',
    'Cronus',
    'Prometheus',
    'Epimetheus',
    'Nemesis',
    'Tyche',
    'Erebus',
    'Tartarus',
    'Hypnos',
    'Thanatos',
  ],
};

const mutations = {
  SET_HORSES(state: HorsesStateProps, horses: Horse[]) {
    state.horses = horses;
  },
  RESET_HORSES(state: HorsesStateProps) {
    state.horses = [];
  },
};

const actions = {
  generateHorses({
    commit,
    state,
  }: {
    commit: (mutation: string, payload: Horse[]) => void;
    state: HorsesStateProps;
  }) {
    // This block generates a list of horses with random condition and name from the palettes
    const horses = state.colorPalette.map((color, index) => ({
      id: index + 1,
      color,
      condition: Math.floor(Math.random() * 100) + 1,
      name: state.namePalette[
        Math.floor(Math.random() * state.namePalette.length)
      ],
    }));
    commit('SET_HORSES', horses);
  },

  resetHorses({ commit }: ActionContext<HorsesStateProps, unknown>) {
    commit('RESET_HORSES');
  },
};

const getters = {
  getAllHorses: (state: HorsesStateProps) => state.horses,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
