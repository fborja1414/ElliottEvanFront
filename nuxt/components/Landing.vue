<template>
  <div id="landing" draggable="false">
    <div id="tile-container" ref="tiles" class="tiles" draggable="false">
      <template v-for="(image, index) in landing">
        <Tile
          :key="index"
          :index="index"
          :landing="landing"
          :current-tile-touched="currentTileTouched"
          class="tile-cell"
          @touchmove.native="onTouchTile"
        />
      </template>
    </div>
  </div>
</template>

<script>
import Tile from "@/components/Tile.vue";

export default {
  name: "Landing",
  components: {
    Tile,
  },
  props: {
    landing: {
      type: [Array, Function],
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currentTileTouched: Number,
    };
  },
  watch: {
    loaded() {
      if (this.loaded) {
        this.initIntro();
      }
    },
  },
  methods: {
    onTouchTile() {
      event.preventDefault();
      const x = event.touches[0].clientX;
      const y = event.touches[0].clientY;
      this.currentTileTouched = Number(document.elementFromPoint(x, y).id);
    },
    setState(state) {
      this.state = state;
    },
    getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~assets/_variables.scss";

#landing {
  position: absolute;
  background-color: black;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  padding: 1rem;
  top: 0;
  left: 0;
  margin: 0;
  display: fixed;
  z-index: 100;

  #tile-container {
    display: grid;
    grid-template-columns: 33.3% 33.3% 33.3%;
    grid-template-rows: 33.3% 33.3% 33.3%;
    height: 100%;
    width: 100%;
  }

  .tiles {
    opacity: 1;
    mix-blend-mode: difference;
    cursor: pointer;
  }
}

#image-container {
  position: relative;
  top: 4rem;
  left: 1rem;
  height: calc(100vh - 5rem);
  width: calc(100vw - 2rem);
  margin: 0;

  z-index: -1;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (min-width: $tablet-landscape) {
    top: 1rem;
    left: 1rem;
    height: calc(100vh - 2rem);
    width: calc(100vw - 2rem);
  }

  img {
    position: relative;
    top: 0;
    left: 0;
    filter: blur(20px);
    height: auto;
    width: 100vw;
  }
}
</style>

