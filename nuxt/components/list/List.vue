<template>
  <div class="list-container">
    <template v-for="(entry, index) in archive">
      <list-section :key="index" :entry="entry" :index="index" />
    </template>
  </div>
</template>

<script>
import ListSection from "@/components/list/ListSection.vue";

export default {
  name: "List",
  components: {
    ListSection,
  },

  computed: {
    archive() {
      return this.$store.state.archive;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~assets/_typography.scss";

.list-container {
  width: 100vw;
  box-sizing: border-box;
  margin: 7rem auto;
}
</style>
