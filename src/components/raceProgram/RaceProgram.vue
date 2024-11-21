<template>
  <!-- This is the main template for the RaceProgram component -->
  <div class="flex flex-col h-full">
    <div class="flex flex-col overflow-y-auto h-screen">
      <!-- If there are programs in the store, display them -->
      <template v-if="programList.length > 0">
        <div class="text-center font-bold text-xl mb-4">PROGRAM</div>
        <!-- For each program, display its details -->
        <div
          v-for="program in programList"
          :key="program.lapLength"
          data-test="race-item"
        >
          <div class="text-center font-bold text-lg bg-gray-400 text-white">
            Lap:{{ program.index + 1 }} - {{ program.lapLength }}
          </div>
          <!-- Display the horses in the program -->
          <table
            class="min-w-full border border-gray-200 bg-white mb-6 text-xs"
          >
            <thead class="bg-gray-200 text-gray-600 uppercase font-bold">
              <tr>
                <th class="py-2 px-4 border-r border-gray-300 w-1/12">Pos</th>
                <th class="py-2 px-4 border-r border-gray-300 w-7/12">Name</th>
                <th class="py-2 px-4 border-r border-gray-300 w-4/12">Cond</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="border-t border-gray-200 hover:bg-gray-100"
                v-for="(horse, index) in program.horses"
                :key="horse.id"
              >
                <td class="py-2 px-4 border-r border-gray-300 w-1/12">
                  {{ index + 1 }}
                </td>
                <td class="py-2 px-4 border-r border-gray-300 w-7/12">
                  {{ horse.name }}
                </td>
                <td class="py-2 px-4 border-r border-gray-300 w-4/12">
                  {{ horse.condition }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>
      <!-- If there are no programs in the store, display a message -->
      <template v-else>
        <BlankPage
          title="No Program Found"
          description="Please click the Generate Program button to create a program"
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
  name: 'RaceProgram',
  components: {
    BlankPage,
  },
  setup() {
    const store = useStore();
    const programList = computed(() => store.getters['getProgramList']);

    return {
      programList,
    };
  },
});
</script>
