<template>
  <div class="flex justify-between items-center p-4 bg-gray-800 shadow-lg">
    <h1 class="text-3xl font-bold text-white">Horse Racing</h1>
    <div class="flex space-x-4">
      <button
        @click="generateProgram"
        test-id="generate-program"
        :class="[
          'bg-green-600 text-white font-bold py-2 px-6 rounded-full',
          isRaceStarted ? ' opacity-50' : ' hover:bg-green-800',
        ]"
        :disabled="isRaceStarted"
      >
        Generate Program
      </button>
      <button
        @click="toggleRace"
        test-id="toggle-race"
        :class="[
          'bg-yellow-600 text-white font-bold py-2 px-6 rounded-full',
          !programListGenerated ? 'opacity-50' : 'hover:bg-yellow-800',
        ]"
        :disabled="!programListGenerated"
      >
        {{ isRaceStarted ? 'Stop' : 'Start' }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'HeaderControl',
  setup() {
    const store = useStore();
    const programListGenerated = computed(
      () => store.getters['getProgramList'].length > 0
    );

    const isRaceStarted = computed(() => store.getters['getIsRaceStarted']);

    const generateProgram = async () => {
      await store.dispatch('generateProgramList');
      store.dispatch('setCurrentRace', 0);
    };

    const toggleRace = () => {
      store.dispatch('setIsRaceStarted', !isRaceStarted.value);
      store.dispatch('setCurrentRace', 0);
      if (!isRaceStarted.value) {
        reset();
      }
    };

    const reset = () => {
      store.dispatch('resetHorses');
      store.dispatch('resetPrograms');
      store.dispatch('resetRaces');
      store.dispatch('resetResults');
    };

    return {
      generateProgram,
      toggleRace,
      isRaceStarted,
      programListGenerated,
      reset,
    };
  },
});
</script>
