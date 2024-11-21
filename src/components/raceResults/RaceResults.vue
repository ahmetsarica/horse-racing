<template>
  <div class="flex flex-col h-full">
    <div class="flex flex-col overflow-y-auto h-screen">
      <template v-if="resultList.length > 0">
        <div class="text-center mb-2 font-bold text-lg">RESULTS</div>
        <div v-for="result in resultList" :key="result.lapIndex">
          <div class="text-center font-bold text-md bg-gray-400 text-white">
            Lap: {{ result.lapIndex }} - {{ result.lapLength }}
          </div>
          <table
            class="min-w-full border border-gray-200 bg-white mb-4 text-xs"
          >
            <thead
              class="bg-gray-200 text-gray-600 uppercase text-xs font-bold"
            >
              <tr>
                <th class="py-2 px-4 border-r border-gray-300 w-1/12">Pos</th>
                <th class="py-2 px-4 border-r border-gray-300 w-7/12">Name</th>
                <th class="py-2 px-4 border-r border-gray-300 w-4/12">
                  Duration
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="border-t border-gray-200 hover:bg-gray-100"
                v-for="(horse, index) in result.raceHorses"
                :key="horse.id"
              >
                <td class="py-2 px-4 border-r border-gray-300 w-1/12">
                  {{ index + 1 }}
                </td>
                <td class="py-2 px-4 border-r border-gray-300 w-7/12">
                  {{ horse.name }}
                </td>
                <td class="py-2 px-4 border-r border-gray-300 w-4/12">
                  {{ horse.duration }}sec
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>
      <template v-else>
        <BlankPage
          title="No Results Found"
          description="Don't worry, reports will appear after you click start!"
        />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import BlankPage from '@/components/blankPage/BlankPage.vue';

export default defineComponent({
  name: 'RaceResults',
  components: {
    BlankPage,
  },
  setup() {
    const store = useStore();

    // This computed property fetches all results from the Vuex store
    const resultList = computed(() => store.getters['getAllResults']);

    return {
      resultList,
    };
  },
});
</script>
