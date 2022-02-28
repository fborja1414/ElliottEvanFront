<template>
  <div id="grid-container">
    <template v-for="entry in entries">
      <grid-image
        v-for="(image, index) in entry.images"
        :key="entry.slug + '-' + index"
        :image="image"
        :index="index"
        :imageInfo="{
          index: index,
          title: entry.title,
          type: entry.type,
          slug: entry.slug,
        }"
      />
      <!-- <sections :key="index" :index="index" :entry="entry" /> -->
    </template>
  </div>
</template>


<script>
import Sections from "@/components/Sections.vue";
import GridImage from "@/components/GridImage.vue";

export default {
  name: "Grid",
  components: {
    Sections,
    GridImage
  },
  props: {
    entries: Array
  }
};
</script>

<style lang="scss" scoped>
@import "~assets/variables.scss";
@import "~assets/_typography.scss";

.type {
  @include garamond;
}

#grid-container {
  width: 70vw;
  box-sizing: border-box;
  // display: grid; // set in main.scss
  grid-template-columns: repeat(7, 10vw);
  grid-auto-rows: 10vw;
  grid-row-gap: 70px;
  margin: 10rem auto;
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.25s;
}
.page-enter,
.page-leave-to {
  opacity: 0;
}
</style>