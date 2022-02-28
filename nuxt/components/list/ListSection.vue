<template>
  <section
    v-if="entry.images && entry.images.length"
    :class="{ 'section-expanded': carouselExpanded }"
  >
    <!-- Title Row + Lines -->
    <div
      v-if="!carouselExpanded"
      class="section-container"
      :class="{ 'line-active': showHorizontalLine }"
      @mouseenter="LineTrue"
      @mouseleave="LineFalse"
      @click="openCarousel"
    >
      <div class="section-type">
        <div class="line left-line"></div>
        {{ entry.type }}
      </div>
      <div class="section-title">{{ entry.title }}</div>
      <div class="section-length">
        {{ entry.images.length }}
        <div class="line right-line"></div>
      </div>
    </div>

    <!-- Carousel -->
    <div
      v-show="carouselExpanded"
      class="section-carousel"
      :class="{ 'carousel-collapsed': !carouselExpanded }"
      ref="contentContainer"
    >
      <div class="carousel-container">
        <transition name="page">
          <flickity 
            v-if="imagesLoaded"
            :options="flickityOptions"
            class="flickity"
            ref="flickity"
          >
            <template v-for="(image, index) in entry.images">
              <carousel-image v-if="image" class="carousel-cell" :src="image.image" :key="index" />
            </template>
          </flickity>
          <!-- <list-loading-indicator v-else /> -->
        </transition>
      </div>

      <!-- General Text -->
      <div class="section-info">
        <!-- <div class="smaller">-</div>
        <div class="bigger">+</div> -->

        <div class="grey">Title</div>
        <div class="Date">{{ entry.title }}</div>

        <div class="grey">Type</div>
        <div class="Date" style="text-transform: capitalize;">{{ entry.type }}</div>

        <div class="grey">Date</div>
        <div class="Date">{{ entry.date }}</div>

        <div class="grey">Meta</div>
        <div class="Meta"
          v-html="`${entry.images.length} ${entry.images.length == 1 ? 'image' : 'images'}`"
        ></div>

      </div>

      <!-- Product Text -->
      <template v-if="entry.price">
        <add-to-cart :product="entry" :sectionIndex="index" />
      </template>

      <!-- 9.14, disable non-product text -->
      <div class="section-description" v-if="entry.price">
        <div class="description" v-html="entry.description"></div>
      </div>
    </div>

  </section>
</template>

<script>
/**
 * This component is in charge of a lot, here's the order of operations:
 * 
 * 1. Load images using JS when the section is expanded. (We're storing the expanded state of the section in Vuex
 *    to restore the correct 'open' state to ListSections between popstate / pushstate events.)
 * 2. Check Vuex for a target initial image index, initialize flickity with the index if it exists. 
 * 3. Scroll this ListSection into view if the current route matches the entry slug. 
 * 
 */
import AddToCart from "./AddToCart.vue"
import ListLoadingIndicator from "./ListLoadingIndicator.vue"
import CarouselImage from "./CarouselImage.vue"

export default {
  name: "ListSection",
  components: {
    AddToCart, ListLoadingIndicator, CarouselImage
  },
  props: {
    entry: Object,
    index: Number,
  },

  data() {
    return {
      showHorizontalLine: false,
      imagesLoaded: false
    };
  },

  computed: {
    flickityOptions() {
      return {
        imagesLoaded: true,
        initialIndex: this.titleMatchesListTarget ? this.$store.state.list.target?.imageIndex : 0,
        prevNextButtons: false,
        cellAlign: "center",
        pageDots: false,
        fade: false,
        wrapAround: false,
        contain: true,
        draggable: ">3",
        selectedAttraction: 0.8,
        friction: 0.9,
        freeScroll: true,
        freeScrollFriction: 0.1,
        cellSelector: ".carousel-cell",
        accessibility: true,
      };
    },

    carouselExpanded() {
      return this.$store.state.list.openSections.includes(this.entry.title);
    },

    titleMatchesListTarget() {
      return this.entry.title == this.$store.state.list.target?.section
    },

    routeParamMatchesSectionTitle() {
      const decodedRouteURI = decodeURIComponent(this.$route.path) // decodes '-' correctly
      return decodedRouteURI === '/' + this.entry.slug
    }
  },

  watch: {
    carouselExpanded(newVal, oldVal) {
      if (newVal != oldVal && !this.imagesLoaded) {
        this.loadImages()
      }
    },
    // imagesLoaded(newVal) {
    //   if (newVal === true && this.$refs.flickity) {
    //     this.$refs.flickity.resize() // recalculates image positions
    //     console.log('flickity resized watch', this.flickityOptions.initialIndex)
    //     this.$store.commit("list/clearTarget");
    //   }
    // }
  },

  /**
   * Determine if this ListSection's title matches a stored target's title, if so
   * expand the section, then center the section in the viewport. 
   */
  mounted() {
    if (this.routeParamMatchesSectionTitle) {
      this.$store.commit("list/updateOpenSections", this.entry.title);
    }

    if (this.carouselExpanded && !this.imagesLoaded) {
      console.log(this.entry.title + ' - Loading images...')
      this.loadImages()
    }

    // slightly delay autoscroll 
    this.$nextTick(() => {
      if (this.titleMatchesListTarget || this.routeParamMatchesSectionTitle) {
        setTimeout(() => {
          this.scrollSectionIntoView()
          console.log('scrolled list section into view')
        }, 150) // page transition lasts 500ms
      }
    });
  },

  methods: {
    async loadImages() {
      const t0 = performance.now()
      let cachedImages = []

      // load images
      for (const image of this.entry.images) {
        if (image) {
          const imagePromise = this.$LoadImage(image.image)
          cachedImages.push(imagePromise)
        }
      }

      await Promise.all(cachedImages).then(() => {
        this.imagesLoaded = true
        const t1 = performance.now()
        console.log(`${this.entry.title} - Loaded ${this.entry.images.length} images in ${Math.round(t1 - t0)}ms.`)

        if (this.$refs.flickity) {
          this.$refs.flickity.resize() // recalculates image positions
          console.log('flickity resized loadImages', this.flickityOptions.initialIndex)
          this.$store.commit("list/clearTarget");
        }
      })
    },
    openCarousel() {
      this.$store.commit("list/updateOpenSections", this.entry.title);
    },

    LineTrue() {
      this.showHorizontalLine = true;
    },

    LineFalse() {
      this.showHorizontalLine = false;
    },

    scrollSectionIntoView() {
      const rawTargetContainerYPos = this.$refs.contentContainer.getBoundingClientRect().top + document.documentElement.scrollTop
      const targetContainerHeight = this.$refs.contentContainer.offsetHeight
      const windowHeight = window.innerHeight
      const centeredContainerYPos = rawTargetContainerYPos - Math.abs((windowHeight / 2) - (targetContainerHeight / 2))

      // console.log(rawTargetContainerYPos, targetContainerHeight, centeredContainerYPos)
      window.scrollTo({ top: centeredContainerYPos, behavior: 'smooth' })
    }
  },
};
</script>

<style lang="scss">
@import "~assets/_variables.scss";
@import "~assets/_typography.scss";

.section-container {
  @include center-column;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;

  display: grid;
  grid-template-columns: repeat(3, calc(100% / 3));
  margin: auto;
  max-height: 50vh;
  cursor: pointer;

  @include tablet-portrait {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    width: 100vw;
    grid-template-columns: 15% 70% 15%;
  }

  @include mobile {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    width: 100vw;
    grid-template-columns: 15% 70% 15%;
  }
}

.section-type {
  display: flex;
  text-transform: capitalize;
  position: relative;
}

.section-title {
  display: flex;
  position: relative;
  text-align: center;
  justify-content: center;
}

.section-length {
  display: flex;
  position: relative;
  justify-content: flex-end;
}

.line {
  background-color: white;
  position: absolute;
  opacity: 0;
  transition: opacity 0.01s ease-out 0.03s;

  // @include tablet-landscape {
  //   display: none;
  // }

  @include tablet-portrait {
    display: none;
  }

  @include mobile {
    display: none;
  }
}

.line-active {
  .line {
    opacity: 1;
    transition: opacity 0s;
  }

//  &:hover {
//   .section-title{
//     animation: blink 0.3s step-start 0s infinite;
//     -webkit-animation: blink 0.3s step-start 0s infinite;
//   }
//  } 
}

.right-line {
  position: absolute;
  height: 1px;
  width: 10vw;
  right: -11vw;
  top: 50%;
}

.left-line {
  position: absolute;
  height: 1px;
  width: 10vw;
  left: -11vw;
  top: 50%;
}

/* Flickity */

.carousel-container,
.flickity,
.flickity-viewport {
  height: 50vh;
  width: 100vw;
}

.flickity-slider {
  will-change: transform; // better fps
}

.carousel-cell {
  height: 100%;
  width: auto;
  // max-width: 100%;
  padding: 0 0.5rem;

  &:first-of-type {
    padding-left: 1rem;

    @include mobile {
      padding-left: 1.5rem;

    }
  }

  &:last-of-type {
    padding-right: 1rem;

    @include mobile {
      padding-right: 1.5rem;
    }
  }
}

.section-carousel {
  height: auto;
  max-height: 100%;
  opacity: 1;
  transition: max-height 0.3s ease-in-out;
  transition: opacity 0.5 ease-in-out;
  margin: 10rem 0;

  @include mobile {
    margin: 5rem 0;
  }
}

.carousel-collapsed {
  max-height: 0;
  opacity: 0;
  transition: max-height 0.5s ease-out;

  * {
    display: none !important;
  }
}

/* Section Info */

.section-info {
  @include center-column;
  display: grid;
  grid-template-columns: 4.5rem auto;
  align-items: center;
  margin: 1.7rem auto;

  * {
    line-height: 1.7;
  }

  .smaller, 
  .bigger {
    // position: absolute;
    font-size: 1rem;
    // line-height: 1;
    margin-bottom: 1.7rem;
  }

  .smaller {
    left: 1rem;
  }

  .bigger {
    right: 1rem;
  }
}

.section-description {
  @include center-column;

  margin: 0 auto;
  margin-top: 1.7rem;
  margin-bottom: 1rem;
}

.description {
  line-height: 1.7rem;

  p {
    margin: 1.7rem 0;
  }

  ul {
    padding: 0;
  }

  li {
    list-style: none;

    &:before {
      content: "–––";
      letter-spacing: 0;
      margin-right: 1rem;
    }
  }
}

section {
  // margin: 1rem;
  // transition: all 0.25s ease-in-out;
}

section.section-expanded {
  // margin: 6rem 0;
  // transition: all 0.25s ease-in-out;
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.25s;
}

.page-enter,
.page-leave-to {
  opacity: 0;
}

.grey { 
  color: grey;
}

.atc-button {
  background: lightgray;
  color: black;
  padding: 0.25rem 0.5rem;
  margin-top: 1.7rem;
}
</style>
