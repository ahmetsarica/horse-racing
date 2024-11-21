<template>
  <div class="h-full">
    <div v-if="currentRace">
      <div class="text-center mb-4 font-bold text-lg uppercase">
        Lap: {{ currentRace?.lapIndex }} - {{ currentRace?.lapLength }}
      </div>
      <div class="flex h-[768px]">
        <div class="flex flex-col gap-2">
          <div
            class="flex flex-col w-full justify-between h-[70px]"
            v-for="(raceHorse, index) in currentRace.raceHorses"
            :key="index"
          >
            <div class="flex h-full">
              <div
                class="bg-blue-500 text-white w-10 flex items-center justify-center"
              >
                <span class="transform -rotate-90 inline-block">{{
                  index + 1
                }}</span>
              </div>
              <div class="bg-gray-300 text-black flex w-[700px] items-center">
                <div
                  :class="[
                    'flex flex-col items-start',
                    { 'move-to-end': isRaceInProgress },
                  ]"
                  :style="{
                    transition: isRaceInProgress
                      ? `transform ${raceHorse.duration}s linear`
                      : '',
                    transform: isRaceInProgress
                      ? `translateX(700px)`
                      : `translateX(0)`,
                  }"
                >
                  <font-awesome-icon
                    icon="horse"
                    :style="{ color: raceHorse.color, fontSize: '32px' }"
                  />
                  <span class="font-bold" :style="{ color: raceHorse.color }">{{
                    raceHorse.name
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-red-400 h-full flex items-center justify-center">
          <span class="transform -rotate-90 inline-block text-white text-2xl"
            >Finish Line</span
          >
        </div>
      </div>
    </div>
    <BlankPage
      v-else
      title="No Race Found"
      description="To view the race, please click the Generate Program button."
    />
  </div>
</template>

<script lang="ts">
import { Program } from '@/store/modules/program';
import { Race, RaceHorse } from '@/store/modules/race';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import BlankPage from '@/components/blankPage/BlankPage.vue';

import { defineComponent, ref, watch, watchEffect } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'RaceContainer',
  components: {
    FontAwesomeIcon,
    BlankPage,
  },
  setup() {
    const store = useStore();
    const programList = ref<Program[]>([]);
    const currentRace = ref<Race>();
    const isRaceInProgress = ref(false);
    const isRaceStarted = ref(false);
    const raceCount = ref(0);

    watchEffect(() => {
      programList.value = store.getters['getProgramList'];
      currentRace.value = store.getters['getCurrentRace'];
      isRaceStarted.value = store.getters['getIsRaceStarted'];
      isRaceInProgress.value = store.getters['getIsRaceInProgress'];
    });

    const startRace = async () => {
      if (!currentRace.value) return;
      isRaceInProgress.value = true;

      // Calculate the longest duration to determine the race duration
      const longestDuration = Math.max(
        ...currentRace.value.raceHorses.map((horse: RaceHorse) =>
          parseFloat(horse.duration)
        )
      );

      await new Promise((resolve) =>
        setTimeout(resolve, longestDuration * 1000)
      );

      if (isRaceStarted.value) {
        addToResults();
        await store.dispatch('setCurrentRace', raceCount.value + 1);
        raceCount.value += 1;
      }
      isRaceInProgress.value = false;
    };

    const stopRace = () => {
      store.dispatch('setIsRaceStarted', false);
      store.dispatch('setIsRaceInProgress', false);

      raceCount.value = 0;
    };

    const addToResults = () => {
      const sortedRaceHorses = currentRace.value?.raceHorses.sort(
        (a, b) => parseFloat(a.duration) - parseFloat(b.duration)
      );
      const result = {
        lapIndex: currentRace.value?.lapIndex,
        lapLength: currentRace.value?.lapLength,
        raceHorses: sortedRaceHorses?.map((horse, index) => ({
          position: index + 1,
          name: horse.name,
          duration: horse.duration,
        })),
      };

      store.dispatch('addResult', result);
    };

    watch(
      () => store.state.race.isRaceStarted,
      (newValue) => {
        if (newValue) {
          store.dispatch('resetResults');
          startRace();
        }
      }
    );

    watch(
      () => [store.state.race.isRaceStarted, isRaceInProgress.value],
      ([newValue, isRaceInProgressValue]) => {
        if (newValue && !isRaceInProgressValue) {
          setTimeout(() => {
            if (raceCount.value < 6) {
              // start next lap
              startRace();
            } else {
              stopRace();
            }
          }, 100);
        }
      }
    );

    return {
      programList,
      currentRace,
      isRaceInProgress,
      raceCount,
      isRaceStarted,
    };
  },
});
</script>
