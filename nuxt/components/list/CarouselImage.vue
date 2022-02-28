<template>
  <div @mouseenter="hovered = true" @mouseleave="hovered = false">
    <img :src="src" />
    <!-- <button v-if="hovered">
      <span class="lightbox-btn"></span>
    </button> -->
  </div>
</template>

<script>
export default {
  name: "CarouselImage",
  data() {
    return {
      hovered: false
    }
  },

  props: {
    src: String
  }
}
</script>

<style lang="scss" scoped>
img {
  height: 100%;
  width: auto;
}

button {
  // height: 1.5rem;
  // width: 1.5rem;
  height: 1rem;
  width: 1rem;
  position: absolute;
  // right: 1.6rem;
  // bottom: 1.5rem;
  right: 1.4rem;
  bottom: 1.4rem;
  overflow: visible;
}

.lightbox-btn,
.lightbox-btn:before {
  height: 0.1rem;
  width: 1.5rem;
  width: 1rem;
  content: "";
  background-color: white;
  display: inline-block;
}

.lightbox-btn {
  transform: translateY(0.75rem);
}

.lightbox-btn::before {
  // transform: rotate(90deg) translateX(-0.80rem);
  transform: rotate(90deg) translateX(-0.9rem);
}
</style>