<template>
  <div class="flex flex-col h-full">
    <HeaderControl />
    <main class="flex flex-col p-6 h-full">
      <div class="content-wrapper flex gap-8 h-[800px] justify-between">
        <HorseList />
        <RaceContainer />
        <RaceProgram />
        <RaceResults />
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HorseList from '@/components/horseList/HorseList.vue';
import RaceProgram from '@/components/raceProgram/RaceProgram.vue';
import HeaderControl from '@/components/headerControl/HeaderControl.vue';
import RaceResults from '@/components/raceResults/RaceResults.vue';
import RaceContainer from '@/components/raceContainer/RaceContainer.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    HeaderControl,
    HorseList,
    RaceProgram,
    RaceResults,
    RaceContainer,
  },
});
</script>

<style lang="scss"></style>
