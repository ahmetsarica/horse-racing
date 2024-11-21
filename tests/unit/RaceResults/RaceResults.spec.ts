import { mount, VueWrapper } from '@vue/test-utils';
import { createStore, Store } from 'vuex';
import RaceResults from '@/components/raceResults/RaceResults.vue';
import BlankPage from '@/components/blankPage/BlankPage.vue';

interface State {
  resultList: any[];
}

describe('RaceResults.vue', () => {
  let store: Store<State>;
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    store = createStore<State>({
      state: {
        resultList: [],
      },
      getters: {
        getAllResults: (state) => state.resultList,
      },
    });

    wrapper = mount(RaceResults, {
      global: {
        plugins: [store],
      },
    });
  });

  it('renders BlankPage when there are no results', () => {
    expect(wrapper.findComponent(BlankPage).exists()).toBe(true);
    expect(wrapper.findComponent(BlankPage).props('title')).toBe(
      'No Results Found'
    );
    expect(wrapper.findComponent(BlankPage).props('description')).toBe(
      "Don't worry, reports will appear after you click start!"
    );
  });

  it('renders result list when there are results', async () => {
    const resultList = [
      {
        lapIndex: 1,
        lapLength: '1200m',
        raceHorses: [
          { id: 1, name: 'Horse 1', duration: 1 },
          { id: 2, name: 'Horse 2', duration: 1 },
        ],
      },
    ];

    // Simulate the delay in generating results
    setTimeout(async () => {
      store.state.resultList = resultList;
      await wrapper.vm.$nextTick();

      expect(wrapper.find('.text-center.mb-4.font-bold.text-xl').text()).toBe(
        'RESULTS'
      );
      expect(wrapper.findAll('[data-test="race-item"]').length).toBe(1);
      expect(
        wrapper
          .find('.text-center.font-bold.text-lg.bg-gray-400.text-white')
          .text()
      ).toBe('Lap: 1 - 1200m');

      const rows = wrapper.findAll('tbody tr');
      expect(rows[0].findAll('td')[1].text()).toBe('Horse 1');
      expect(rows[1].findAll('td')[1].text()).toBe('Horse 2');
    }, 2000);
  });
});
