<template>
  <div>
    <grid class="grid" :entries="archive" />
    <list class="list" />
  </div>
</template>

<script>
import Landing from "@/components/Landing.vue";
import Grid from "@/components/Grid.vue";
import List from "@/components/list/List.vue";

export default {
  name: "Index",
  components: {
    Landing,
    Grid,
    List,
  },
  methods: {},
  computed: {
    windowSize() {
      return this.$store.state.windowWidth;
    },
    archive() {
      return this.$store.state.archive
    }
  },
};
</script>

<style lang="scss" scoped>
@import "~assets/_variables.scss";

.page-enter-active,
.page-leave-active {
  transition: opacity 0.25s;
}
.page-enter,
.page-leave-to {
  opacity: 0;
}

.showProjects {
  display: none;
}
</style>
