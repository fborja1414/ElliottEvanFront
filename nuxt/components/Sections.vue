<template>
  <div id="thumbnail-container" v-if="entry.images.length">
    <!-- <template v-for="(image, index) in entry.images">
      <images
        :key="index"
        :image="image"
        :index="index"
        :imageInfo="{
          index: index,
          title: entry.title,
          type: entry.type,
          slug: entry.slug,
        }"
      />
    </template> -->
  </div>
</template>

<script>
// import Images from "@/components/Images.vue";

export default {
  name: "Sections",
  // components: { Images },
  props: {
    entry: Object,
    index: Number,
  },
};
</script>

<style  lang="scss" scoped>
@import "~assets/_variables.scss";
@import "~assets/_typography.scss";

#thumbnail-container {
  display: grid;
  grid-template-columns: repeat(7, 10vw);
  grid-auto-rows: 10vw;
  grid-row-gap: 70px;
  margin: 70px 0;
}

.section-title {
  position: absolute;
  mix-blend-mode: exclusion;
}
</style>