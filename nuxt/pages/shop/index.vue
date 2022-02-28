<template>
  <div>
    <grid class="grid" :entries="products" />
    <list class="list" />
  </div>
</template>


<script>
import Grid from "@/components/Grid.vue";
import List from "@/components/list/List.vue";

export default {
  name: "Shop",
  components: {
    Grid,
    List
  },

  computed: {
    products() {
      return this.$store.state.shop;
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