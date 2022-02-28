<template>
  <div>
    <div
      :id="index"
      :class="{ tile: true, 'tile--active': tileHovered }"
      draggable="false"
      @mouseenter="onMouseHover"
      @mouseleave="onMouseOut"
    >
      <template v-if="index != 4">
        <img src="/periods-3.svg" class="dots" draggable="false"
        :style="tileStyle1" alt= />
        <template v-if="screenwidth > 996">
          <img src="/periods-3.svg" class="dots" draggable="false"
          :style="tileStyle2" alt= />
        </template>
      </template>
    </div>

    <div
      class="image-container"
      :class="{ 'image-container--active': showImage || index == 4 }"
    >
      <img
        v-for="(image, i) in images"
        :key="image"
        :src="image"
        :srcset="srcset[i]"
        :class="[align, 'col-' + width, 'image-' + (i + 1), effect]"
        draggable="false"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "Tile",
  props: {
    index: {
      type: Number,
      default: 0,
    },

    landing: {
      type: [Array, Function],
      default() {
        return [];
      },
    },

    currentTileTouched: {
      type: [Number, Function],
      default() {
        return 0;
      },
    },
    showTile: Boolean,
    loaded: Boolean,
  },
  data() {
    return {
      tileHovered: false,
      showImage: false,
      width: Number,
      effect: String,
      tileStyle1: Object,
      tileStyle2: Object,
      align: String,
    };
  },

  computed: {
    screenwidth() {
      return 1000;
    },

    images: function () {
      return this.landing[this.index].images;
    },
    srcset: function () {
      return this.landing[this.index].srcset;
    },
  },

  created() {
    this.align = this.landing[this.index].align;
    this.width = Number(this.landing[this.index].width);
    this.effect = this.landing[this.index].effect;
  },
  mounted() {
    this.tileStyle1 = this.getTileRotationObj();
    this.tileStyle2 = this.getTileRotationObj();
  },

  methods: {
    onMouseHover() {
      this.tileHovered = true;
      this.showImage = true;
    },

    onMouseOut() {
      this.tileHovered = false;
      setTimeout(() => (this.showImage = false), 1000);
    },

    getTileRotationObj() {
      const reflectX = Math.round(Math.random());
      const reflectY = Math.round(Math.random());

      if (reflectX && reflectY) return { transform: "scaleX(-1) scaleY(-1)" };
      if (reflectX) return { transform: "scaleX(-1)" };
      if (reflectY) return { transform: "scaleY(-1)" };
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~assets/_variables.scss";
@import "~assets/_grid.scss";

img {
  user-select: none;
  pointer-events: none;
  -webkit-user-drag: false;

  -moz-user-select: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -o-user-select: none;
}

.tile {
  white-space: nowrap;
  height: 100%;
  width: 100%;
  z-index: 100;

  .dots {
    height: 100%;
    width: calc(100% / 2);
    // mix-blend-mode: exclusion;
    fill: $grey;
    z-index: -100;
    opacity: 0;
    user-select: none;
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;

    // @media screen and (min-width: $tablet-landscape) {
    //   width: calc(100% / 2);
    // }
  }
}

.tile--active {
  .dots {
    opacity: 1;
    transition: opacity 0.3s;
    // mix-blend-mode: exclusion;
  }
}

.image-container {
  position: fixed;
  top: 4rem;
  left: 1rem;
  height: calc(100% - 5rem);
  width: calc(100vw - 2rem);
  margin: 0;
  z-index: -1;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-column-gap: 1rem;
  grid-auto-columns: 1fr;
  align-items: center;
  opacity: 0;
  transition: opacity 1s;
  mix-blend-mode: exclusion;

  @media screen and (min-width: $tablet-landscape) {
    top: 1rem;
    left: 1rem;
    height: calc(100vh - 2rem);
    width: calc(100vw - 2rem);
  }
}

.image-container--active {
  opacity: 1;
  transition: opacity 0.1s;
}

.image--blur {
  filter: blur(10px);
}
</style>
