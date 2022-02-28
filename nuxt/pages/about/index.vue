<template>
  <div>
    <template v-for="(images, index) in landing">
      <img
        class="center-image"
        v-if="index == 4"
        :src="images.images['0']"
        :key="index"
      />
    </template>

    <div class="main" v-html="about.aboutText"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    landing() {
      return this.$store.state.landing;
    },

    ...mapState([
      'about'
    ])
  }
};
</script>

<style lang="scss" scoped>
@import "~assets/_typography.scss";
@import "~assets/_variables.scss";

.center-image {
  display: flex;
  width: 30vw;
  margin: 10rem auto;
  justify-content: center;
  @media screen and (max-width: $tablet-landscape) {
    width: 45vw;
  }
}

.main {
  @include garamond;
  font-style: italic;
  font-size: 18px;
}

.main {
  width: 70vw;
  margin: 10rem auto;
  text-align: center;
}
</style>
