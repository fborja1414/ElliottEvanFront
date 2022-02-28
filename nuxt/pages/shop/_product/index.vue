<template>
  <div>
    <list :class="{ showProjects: showLanding }" />
  </div>
</template>
   
<script>
import List from "@/components/list/List.vue";

export default {
  name: "Project",
  components: { List },
  computed: {
    productName() {
      return this.$route.params.product;
    },
    showLanding() {
      return this.$store.state.showLanding;
    },
  },

  mounted() {
    const result = this.$store.state.shop.filter(
      (object) => object.slug == "shop/" + this.$route.params.product
    );

    if (result.length == 0) {
      throw new Error({ status: 404, message: "Product not found." });
    }

    this.$store.commit("updateLanding", false);
  },
};
</script>

<style scoped>
.showProjects {
  display: none;
}
</style>