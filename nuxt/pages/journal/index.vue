<template>
  <div>
    <grid class="grid" :entries="journal" />
    <list class="list" />
  </div>
</template>

<script>
import Grid from "@/components/Grid.vue";
import List from "@/components/list/List.vue";

export default {
  name: "Journal",
  components: {
    Grid,
    List
  },

  computed: {
    journal() {
      return this.$store.state.journal;
    },
  },
};
</script>

<style lang="scss" scoped>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s;
}
.page-enter,
.page-leave-to {
  opacity: 0;
}
</style>