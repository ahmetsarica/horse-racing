import { mount, VueWrapper } from '@vue/test-utils';
import { createStore, Store } from 'vuex';
import HorseList from '@/components/horseList/HorseList.vue';
import { Horse } from '@/store/modules/horses';

interface State {
  horses: Horse[];
}

describe('HorseList.vue', () => {
  let store: Store<State>;
  let wrapper: VueWrapper<unknown>;

  beforeEach(() => {
    store = createStore<State>({
      state: {
        horses: [
          { id: 1, name: 'Thunder', condition: 90, color: '#000000' },
          { id: 2, name: 'Lightning', condition: 85, color: '#808080' },
        ],
      },
      getters: {
        getAllHorses: (state) => state.horses,
      },
    });

    wrapper = mount(HorseList, {
      global: {
        plugins: [store],
      },
    });
  });

  it('renders a list of horses', () => {
    const horseRows = wrapper.findAll('tbody tr');
    expect(horseRows.length).toBe(2);
    expect(horseRows[0].text()).toContain('Thunder');
    expect(horseRows[1].text()).toContain('Lightning');
  });

  it('displays the correct condition for each horse', () => {
    const horseRows = wrapper.findAll('tbody tr');
    expect(horseRows[0].text()).toContain('90');
    expect(horseRows[1].text()).toContain('85');
  });

  it('displays the correct color for each horse', () => {
    const horseRows = wrapper.findAll('tbody tr');
    expect(horseRows[0].text()).toContain('#000000');
    expect(horseRows[1].text()).toContain('#808080');
  });
});
