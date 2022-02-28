<template>
  <div>
    <!-- <FauxWall v-if="!cookieEnabled" />
    <template v-else> -->
    <navigation
      :class="{ hideNavigation: showLanding }"
      @logobuttonclicked="landingTrue"
    />

    <sticky-nav-bar />

    <transition name="landing" v-if="showLanding">
      <Landing :landing="landing" @click.native="landingFalse" />
    </transition>

    <nuxt :class="{ showProjects: showLanding }" />

    <Footer :class="{ hideNavigation: showLanding }" />

    <SnipcartOverrides />
    <!-- </template> -->
  </div>
</template>

<script>
import smoothscroll from "smoothscroll-polyfill";

import Maintenance from "@/components/Maintenance.vue";
import FauxWall from "@/components/FauxWall.vue";
import Navigation from "@/components/Navigation.vue";
import Landing from "@/components/Landing.vue";
import StickyNavBar from "@/components/StickyNavBar.vue";
import Footer from "@/components/Footer.vue";
import SnipcartOverrides from "@/components/SnipcartOverrides.vue";

export default {
  name: "DefaultLayout",
  components: {
    Maintenance,
    FauxWall,
    Navigation,
    Landing,
    StickyNavBar,
    Footer,
    SnipcartOverrides,
  },

  methods: {
    landingTrue() {
      this.$store.commit("updateLanding", true);
    },

    landingFalse() {
      this.$store.commit("updateLanding", false);
    },
    windowResize(event) {
      var widthNumber = window.innerWidth;
      this.$store.commit("updateWidth", widthNumber);
    },
  },

  computed: {
    maintenance() {
      if (this.$config.maintenance) {
        return true;
      } else {
        return false;
      }
    },
    showLanding() {
      return this.$store.state.showLanding;
    },

    landing() {
      return this.$store.state.landing;
    },

    cookieEnabled() {
      if (process.env.DEV_STATE === "production") {
        return true;
      }
      const cookie = this.$cookies.get("ee-fauxwall");
      if (cookie === "passed") {
        return true;
      } else {
        return false;
      }
    },
  },

  mounted() {
    smoothscroll.polyfill();
    window.addEventListener("resize", this.windowResize);
  },
  watch: {
    showLanding() {
      const Landingboolean = this.$store.state.showLanding;
      if (Landingboolean) {
        document.body.classList.add("switchoverflow");
        // document.body.overflow == "hidden";
      } else {
        document.body.classList.remove("switchoverflow");
        // document.body.overflow == "none";
      }
    },
  },
};
</script>

<style lang="scss">
@import "~assets/_variables.scss";
@import "~assets/_animation.scss";

* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

html,
body,
.page,
#__nuxt,
#__layout,
#app {
  height: 100%;
}

body {
  font-family: neue-haas-grotesk-text, Helvetica, Arial, sans-serif;
  margin: 0;
}

.switchoverflow {
  overflow: hidden;
}

html {
  background-color: black;
  color: white;
  font-family: neue-haas-grotesk-text, Helvetica, Arial, sans-serif;
}

a {
  text-decoration: none;
}

.hideNavigation {
  display: none;
}

.page {
  opacity: 1;
  transition: filter 0.3s, opacity 0.1s;
}

.blur {
  opacity: 0.5;
  // filter: blur(10px);
  transition: filter 0.3s, opacity 0.3s;

  @media screen and (min-width: $tablet-landscape) {
    // opacity: 1;
    // filter: unset;
  }
}

#loader {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100vw;
  padding: 0;
  z-index: 100;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (min-width: $tablet-landscape) {
    height: 100vh;
  }
}

#loader__background {
  width: calc(100vw - 2rem);
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (min-width: $tablet-landscape) {
    width: 35vw;
  }
}

#percent {
  width: 40px;
  text-align: right;
}
#spinner {
  height: 16px;
  width: 16px;
  background-color: white;
  animation: spin 2s infinite;
  border-radius: 0px;

  &.circle {
    border-radius: 8px;
    background-color: $light-grey;
    transition: border-radius 0.7s, background-color 0.7s;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}

@-webkit-keyframes blink {
  50% {
    opacity: 0;
  }
}

.blink {
  animation: blink 0.3s step-start 0s infinite;
  -webkit-animation: blink 0.3s step-start 0s infinite;
}

.landing-enter-active,
.landing-leave-active {
  transition: opacity 0.25s ease-in;
}

.landing-enter,
.landing-leave-to {
  opacity: 0;

  #tile-container {
    opacity: 0;
  }
}
</style>
