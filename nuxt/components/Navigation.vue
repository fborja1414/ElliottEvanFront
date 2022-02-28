<template>
  <nav id="navigation-container">
    <h1 class="logo garamond" @click="logoClick">ELLIOTT EVAN</h1>

    <transition name="page" mode="out-in">
      <ul class="nav-bar neue" v-if="!onListPage">
        <li class="nav"><nuxt-link to="/">ALL</nuxt-link></li>
        <li class="nav"><nuxt-link to="/projects">PROJECTS</nuxt-link></li>
        <li class="nav"><nuxt-link to="/journal">JOURNAL</nuxt-link></li>
        <li class="nav"><nuxt-link to="/shop">SHOP</nuxt-link></li>
        <li class="nav"><nuxt-link to="/about">ABOUT</nuxt-link></li>
      </ul>
      <nuxt-link v-else to="/">
        <div class="index">Back to Index</div>
      </nuxt-link>
    </transition>
  </nav>
</template>

<script>
export default {
  name: "Navigation",

  methods: {
    logoClick(event) {
      this.$emit("logobuttonclicked", this.page, event);
    }
  },

  computed: {
    onListPage() {
      return (
        this.$route.params.project ||
        this.$route.params.product ||
        this.$route.params.entry
      );
    },
    isMobile() {
      return this.$store.state.windowWidth < 768
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~assets/_typography.scss";
@import "~assets/_variables.scss";

h1 {
  margin: 0;
}

#navigation-container {
  box-sizing: border-box;
  margin: 10rem auto 0;
  min-width: 30rem;

  @include mobile {
    min-width: unset;
  }
}

.garamond {
  @include garamond;
}

.neue {
  @include neue;
}

.nav-bar {
  max-width: 30rem;
  min-width: 10rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  list-style: none;
  text-align: center;
  padding: 0px;
  margin: auto;
  color: white;
}

.logo {
  text-align: center;
  font-size: 18px;
  cursor: pointer;
  letter-spacing: 3px;
  margin-bottom: 5rem;
}

.logo-container {
  height: 5rem;
  margin: 1rem;
}
button {
  color: none;
}

a,
.nav {
  color: white;
}

.index {
  display: flex;
  justify-content: center;
  cursor: pointer;
  color: white;
}

@media screen and (max-width: $tablet-portrait) {
  .nav-bar,
  .index {
    display: none;
  }
}
</style>
