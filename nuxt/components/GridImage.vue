<template>
  <div
    v-if="image"
    class="img-container"
    draggable="false"
    @mouseenter="onMouseHover"
    @mouseleave="onMouseOut"
    :class="{
      hovered: imgHovered,
      'top-line-active': imgHovered,
      'bottom-line-active': imgHovered,
    }"
  >
    <nuxt-link :to="'/' + imageInfo.slug" @click.native="emitListTarget(index)">
      <div class="line top-line"></div>
      <div class="line bottom-line"></div>
      <div class="line left-line"></div>
      <div class="line right-line"></div>
      <div class="image-info">{{ imageInfo.title }}</div>
      <div class="image-type">{{ imageInfo.type }}</div>

      <img :key="index" :src="image.thumbs" />
    </nuxt-link>
  </div>
</template>
    
<script>
export default {
  name: "GridImage",
  props: {
    image: Object,
    index: Number,
    imageInfo: Object,
  },
  data() {
    return {
      imgHovered: false,
    };
  },
  computed: {
    imageUrl() {
      return;
    },
  },
  methods: {
    onMouseHover() {
      this.imgHovered = true;
      // console.log("in");
    },
    onMouseOut() {
      this.imgHovered = false;
    },
    emitListTarget(index) {
      this.$store.commit("list/setTarget", {
        imageIndex: index,
        section: this.imageInfo.title,
      });
      this.$store.commit("list/clearOpenSections");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~assets/_typography.scss";

.img-container {
  position: relative;
  cursor: pointer;
  padding: 1vw;
}

a {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

img {
  max-width: 100%;
  max-height: 100%;
  height: auto;
}

.top-line {
  position: absolute;
  left: 50%;
  height: 26px;
  width: 1px;
  margin: 0;
  top: -26px;
  padding: 0;
  opacity: 0;
  transition: opacity 0.1s ease-in-out 0.1s;
}

.top-line-active {
  .top-line {
    opacity: 1;
    transition: opacity 0s;
  }
}

.bottom-line {
  position: absolute;
  left: 50%;
  height: 26px;
  width: 1px;
  bottom: -26px;
  margin: 0;
  padding: 0;
  opacity: 0;
  transition: opacity 0.1s ease-in-out 0.1s;
}

.bottom-line-active {
  .bottom-line {
    opacity: 1;
    transition: opacity 0s;
  }
}

.line {
  background-color: white;
  position: absolute;
  opacity: 0;
  transition: opacity 0.1s ease-in-out 0.1s;
}

.hovered .line {
  opacity: 1;
}

.right-line,
.left-line {
  position: absolute;
  height: 1px;
  width: 10vw;
}

.image-info {
  position: absolute;
  color: white;
  width: 10vw;
  opacity: 0;
  padding-bottom: 31px;
  display: inline-block;
  transition: opacity 0.1s ease-in-out 0.1s;
}
.hovered .image-type {
  opacity: 1;
  // transition: opacity 0s;
}

.image-type {
  position: absolute;
  color: white;
  width: 10vw;
  opacity: 0;
  padding-top: 32px;
  display: inline-block;
  transition: opacity 0.1s ease-in-out 0.1s;
  text-transform: capitalize;
}
.hovered .image-info {
  opacity: 1;
  // transition: opacity 0s;
}

@for $i from 1 through 7 {
  $left-offset: 10 * $i;
  $right-offset: 10 * (8- $i);
  .img-container {
    &:nth-of-type(7n + #{$i}) {
      .image-info {
        left: calc(-#{$left-offset}vw);
      }
      .image-type {
        left: calc(-#{$left-offset}vw);
      }
      .left-line {
        left: calc(-#{$left-offset}vw);
      }

      .right-line {
        right: calc(-#{$right-offset}vw);
      }
    }
  }
}
</style>
