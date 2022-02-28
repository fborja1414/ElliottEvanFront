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
    journalName() {
      return this.$route.params.entry;
    },
    showLanding() {
      return this.$store.state.showLanding;
    },
  },

  mounted() {
    const result = this.$store.state.journal.filter(
      (object) => object.slug == "journal/" + this.$route.params.entry
    );

    if (result.length == 0) {
      throw new Error({ status: 404, message: "Journal entry not found." });
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
