import { mount, VueWrapper } from '@vue/test-utils';
import { createStore, Store } from 'vuex';
import HeaderControl from '@/components/headerControl/HeaderControl.vue';

interface State {
  programList: any[];
  isRaceStarted: boolean;
}

describe('HeaderControl.vue', () => {
  let store: Store<State>;
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    store = createStore<State>({
      state: {
        programList: [],
        isRaceStarted: false,
      },
      getters: {
        getProgramList: (state) => state.programList,
        getIsRaceStarted: (state) => state.isRaceStarted,
      },
      actions: {
        generateProgramList: jest.fn(),
        setCurrentRace: jest.fn(),
        setIsRaceStarted: jest.fn(),
        resetHorses: jest.fn(),
        resetPrograms: jest.fn(),
        resetRaces: jest.fn(),
        resetResults: jest.fn(),
      },
    });

    jest.spyOn(store, 'dispatch');

    wrapper = mount(HeaderControl, {
      global: {
        plugins: [store],
      },
    });
  });

  it('renders the correct title', () => {
    expect(wrapper.find('h1').text()).toBe('Horse Racing');
  });

  it('disables the "Generate Program" button when race is started', async () => {
    store.state.isRaceStarted = true;
    await wrapper.vm.$nextTick();
    const button = wrapper.find('button:disabled');
    expect(button.exists()).toBe(true);
    expect(button.text()).toBe('Generate Program');
  });

  it('emits "generateProgram" when "Generate Program" button is clicked', async () => {
    const button = wrapper.find('[test-id="generate-program"]');
    await button.trigger('click');
    expect(store.dispatch).toHaveBeenCalledWith('generateProgramList');
  });
});
