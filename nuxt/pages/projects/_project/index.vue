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
    projectName() {
      return this.$route.params.project;
    },
    showLanding() {
      return this.$store.state.showLanding;
    },
  },

  /**
   * Verify that the route's project parameter is valid
   */
  mounted() {
    const result = this.$store.state.projects.filter(
      (object) => object.slug == "projects/" + this.$route.params.project
    );

    if (result.length == 0) {
      throw new Error({ status: 404, message: "Project not found." });
    }
    this.$store.commit("updateLanding", false);
    this.$store.commit("list/updateOpenSections", result[0].title);
  },
};
</script>

<style scoped>
.showProjects {
  display: none;
}
</style>
