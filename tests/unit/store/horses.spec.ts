import { createStore, Store } from 'vuex';
import { HorsesStateProps, Horse } from '@/store/modules/horses';
import { ActionContext } from 'vuex';

describe('horses store module', () => {
  let store: Store<HorsesStateProps>;

  beforeEach(() => {
    store = createStore<HorsesStateProps>({
      state: {
        horses: [],
        colorPalette: [],
        namePalette: [],
      },
      mutations: {
        SET_HORSES(state: HorsesStateProps, horses: Horse[]) {
          state.horses = horses;
        },
        RESET_HORSES(state: HorsesStateProps) {
          state.horses = [];
        },
      },
      actions: {
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
      },
      getters: {
        getAllHorses: (state: HorsesStateProps) => state.horses,
      },
    });
  });

  it('sets horses', () => {
    const horses: Horse[] = [
      { id: 1, name: 'Horse 1', condition: 5, color: 'brown' },
      { id: 2, name: 'Horse 2', condition: 4, color: 'black' },
    ];
    store.commit('SET_HORSES', horses);
    expect(store.state.horses).toEqual(horses);
  });
  it('resets horses', () => {
    const horses: Horse[] = [
      { id: 1, name: 'Horse 1', condition: 5, color: 'brown' },
      { id: 2, name: 'Horse 2', condition: 4, color: 'black' },
    ];
    store.commit('SET_HORSES', horses);
    expect(store.state.horses).toEqual(horses);

    store.dispatch('resetHorses');
    expect(store.state.horses).toEqual([]);
  });

  it('gets all horses', () => {
    const horses: Horse[] = [
      { id: 1, name: 'Horse 1', condition: 5, color: 'brown' },
      { id: 2, name: 'Horse 2', condition: 4, color: 'black' },
    ];
    store.commit('SET_HORSES', horses);
    expect(store.getters.getAllHorses).toEqual(horses);
  });
});
