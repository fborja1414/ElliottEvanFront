<template>
  <div>
    <grid class="grid" :entries="projects" />
    <list class="list" />
  </div>
</template>


<script>
import Grid from "@/components/Grid.vue";
import List from "@/components/list/List.vue";

export default {
  name: "Projects",
  components: {
    Grid, 
    List
  },

  computed: {
    projects() {
      return this.$store.state.projects;
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