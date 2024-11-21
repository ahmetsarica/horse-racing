import { mount, VueWrapper } from '@vue/test-utils';
import BlankPage from '@/components/blankPage/BlankPage.vue';

describe('BlankPage.vue', () => {
  let wrapper: VueWrapper<unknown>;

  beforeEach(() => {
    wrapper = mount(BlankPage, {
      props: {
        title: 'Test Title',
        description: 'Test Description',
      },
    });
  });

  it('renders the correct title and description', () => {
    expect(wrapper.text()).toContain('Test Title');
    expect(wrapper.text()).toContain('Test Description');
  });

  it('has the correct structure', () => {
    const titleElement = wrapper.find('h1');
    const descriptionElement = wrapper.find('p');

    expect(titleElement.exists()).toBe(true);
    expect(descriptionElement.exists()).toBe(true);

    expect(titleElement.text()).toBe('Test Title');
    expect(descriptionElement.text()).toBe('Test Description');
  });
});
