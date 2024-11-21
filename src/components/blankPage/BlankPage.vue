<template>
  <div class="blank-page">
    <h1>{{ title }}</h1>
    <p>{{ description }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BlankPage',
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.blank-page {
  text-align: center;
  padding: 20px;
  h1 {
    margin-bottom: 10px;
  }
}
</style>
