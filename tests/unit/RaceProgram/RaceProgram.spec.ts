import { mount, VueWrapper } from '@vue/test-utils';
import { createStore, Store } from 'vuex';
import RaceProgram from '@/components/raceProgram/RaceProgram.vue';
import BlankPage from '@/components/blankPage/BlankPage.vue';
import { Program } from '@/store/modules/program';

interface State {
  programList: Program[];
}

describe('RaceProgram.vue', () => {
  let store: Store<State>;
  let wrapper: VueWrapper<unknown>;

  beforeEach(() => {
    store = createStore<State>({
      state: {
        programList: [],
      },
      getters: {
        getProgramList: (state) => state.programList,
      },
    });

    wrapper = mount(RaceProgram, {
      global: {
        plugins: [store],
      },
    });
  });

  it('renders BlankPage when there are no programs', () => {
    expect(wrapper.findComponent(BlankPage).exists()).toBe(true);
    expect(wrapper.findComponent(BlankPage).props('title')).toBe(
      'No Program Found'
    );
    expect(wrapper.findComponent(BlankPage).props('description')).toBe(
      'Please click the Generate Program button to create a program'
    );
  });

  it('renders program list when there are programs', async () => {
    const programList: Program[] = [
      {
        index: 0,
        horses: [
          { id: 1, name: 'Horse 1', condition: 5, color: 'brown' },
          { id: 2, name: 'Horse 2', condition: 4, color: 'black' },
        ],
        lapIndex: 1,
        lapLength: '1200m',
      },
    ];

    store.state.programList = programList;
    await wrapper.vm.$nextTick();

    expect(wrapper.find('.text-center.font-bold.text-xl.mb-4').text()).toBe(
      'PROGRAM'
    );
    expect(wrapper.findAll('[data-test="race-item"]').length).toBe(1);
    expect(
      wrapper
        .find('.text-center.font-bold.text-lg.bg-gray-400.text-white')
        .text()
    ).toBe('Lap:1 - 1200m');

    const rows = wrapper.findAll('tbody tr');
    expect(rows[0].findAll('td')[1].text()).toBe('Horse 1');
    expect(rows[1].findAll('td')[1].text()).toBe('Horse 2');
  });
});
