<template>
  <!-- This is the main template for the HorseList component -->
  <div class="flex flex-col h-full overflow-y-auto overflow-x-hidden min-w-80">
    <!-- If there are horses in the store, display them -->
    <template v-if="horses && horses.length > 0">
      <div class="text-center font-bold mb-2 text-lg">HORSE LIST (1-20)</div>
      <table class="min-w-full border border-gray-200 bg-white">
        <thead class="bg-gray-200 text-gray-600 uppercase text-xs font-bold">
          <tr>
            <th class="py-2 px-4 border-r border-gray-300 w-3/6">Name</th>
            <th class="py-2 px-4 border-r border-gray-300 w-2/6">Condition</th>
            <th class="py-2 px-4 w-1/6">Color</th>
          </tr>
        </thead>
        <tbody>
          <!-- For each horse, display its details -->
          <tr
            v-for="horse in horses"
            :key="horse.id"
            class="border-t border-gray-200 hover:bg-gray-100"
          >
            <td class="py-2 px-4 border-r border-gray-300 w-3/6">
              {{ horse.name }}
            </td>
            <td class="py-2 px-4 border-r border-gray-300 w-2/6">
              {{ horse.condition }}
            </td>
            <td
              class="py-2 px-4 w-1/6 font-bold"
              :style="{ color: horse.color }"
            >
              {{ horse.color }}
            </td>
          </tr>
        </tbody>
      </table>
    </template>
    <!-- If there are no horses in the store, display a message -->
    <template v-else>
      <BlankPage
        title="No Horses Found"
        description="Please click the Generate Program button to create horses"
      />
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import BlankPage from '@/components/blankPage/BlankPage.vue';

export default defineComponent({
  name: 'HorseList',
  components: {
    BlankPage,
  },
  setup() {
    const store = useStore();
    const horses = computed(() => store.getters['getAllHorses']);

    return {
      horses,
    };
  },
});
</script>
