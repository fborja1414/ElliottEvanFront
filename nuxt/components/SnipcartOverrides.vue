<template>
  <div 
    id="snipcart"
    data-config-modal-style="none"
    data-api-key="NDhmMTU2NjAtNDBkNC00MWMxLWI4YTItYmI2NDM0NzQ3Nzk5NjM3MTYyOTMxOTE3NDMzMTc5"
    hidden
  >
    <!-- data-templates-url="/snipcart-templates.html" -->
  </div>
</template>

<script>
export default {
  name: "SnipcartOverrides"
}
</script>

<style lang="scss">
@import "~assets/_variables.scss";
@import "~assets/_typography.scss";

// .snipcart * {
//   background-color: black;
//   color: white;

//   --bgColor-buttonPrimary-hover: none;
//   --color-buttonPrimary-active: none;
// }

// .snipcart-enter-active,
// .snipcart-leave-active {
//   transition: opacity 0.25s;
// }

// .snipcart-enter,
// .snipcart-leave-to {
//   opacity: 0;
// }

// .snipcart-cart-header {
//   @include center-column;
//   @include mobile {
//     width: 100%;
//   }

//   margin: 3rem auto;
// }

// .snipcart-layout__content {
//   @include center-column;
//   @include mobile {
//     width: 100%;
//   }
// }

// .empty-cart {
//   height: 100%;
//   display: flex;
//   justify-content: center;
//   align-items: center;

//   h1 {
//     margin-top: 4rem;
//     text-align: center;
//   }
// }

// .snipcart__item__line {
//   border-top: 1px solid white;

//   &:last-child {
//     border-bottom: 1px solid white;
//   }

//   .snipcart__item__line__header {
//   }

//   .product-info {
//     margin: 1em 0;

//     > * {
//       display: inline-block;
//     }

//     span {
//       width: 4.5rem
//     }

//   }

//   .snipcart-item-quantity__label {
//     width: 4.5rem;
//     margin: 0;
//     // color: $grey;
//   }

//   .snipcart__item__line__quantity {
//     margin: 1em 0;
//     display: flex;

//     > * {
//       // display: inline-block;
//     }

//     .snipcart-item-quantity__label {
//       flex: 0 0 auto;

//     }

//     .snipcart-item-quantity__quantity-price-container {
//       flex: 1 0 auto;

//       .snipcart-button-icon.is-secondary,
//       .snipcart__icon {
//         height: 1em;
//         width: 1em;
//         background-color: transparent;
//       }
//     }

//     .snipcart-item-quantity__quantity {
//       height: 1em;
//     }
//   }

//   .snipcart-item-quantity__quantity {
//     border: none;
//     color: white !important;
//     background-color: black !important;
//     width: 10em;

//     &:hover {
//       color: unset;
//       background-color: unset;
//       border-color: unset;
//     }
//   }
// } // .snipcart__item__line

// .snipcart-featured-payment-methods {
//   border: none;
// }

// .snipcart-cart-summary__content {
//   padding: 0;

//   .snipcart-cart-summary-item {
//     margin: 0;
//   }
// }

// .snipcart-cart-summary__separator {
//   margin-left: 0;
//   margin-right: 0;
//   width: 100%;
// }

// .checkout {
//   position: static !important;

//   .cart-summary {
//     position: static !important;
//   }
// }

// .snipcart-checkout-step {
//   // padding: 0;
//   .snipcart__box {
//     padding: 0;
//   }
// }

</style>
