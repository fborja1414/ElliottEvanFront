<template>
	<div class="section-info product-info">
		<div class="grey">Price</div>
		<div>${{ product.price }}</div>

		<!-- Size Select -->
		<div class="grey">Size</div>
		<ul 
			v-if="product.category == 'jackets' || product.category == 'shirts'"
			:class="{
				size_disabled: globals.restrictShop && !globals.shopPasswordAccepted
			}"
		>
			<li>
				<input :id="`${sectionIndex}-radio1`" v-model="selectedSize" type="radio" value="s" name="radio" />
				<label :for="`${sectionIndex}-radio1`">S</label>
			</li>
			<li>
				<input :id="`${sectionIndex}-radio2`" v-model="selectedSize" type="radio" value="m" name="radio" />
				<label :for="`${sectionIndex}-radio2`">M</label>
			</li>
			<li>
				<input :id="`${sectionIndex}-radio3`" v-model="selectedSize" type="radio" value="l" name="radio" />
				<label :for="`${sectionIndex}-radio3`">L</label>
			</li>
			<li>
				<input :id="`${sectionIndex}-radio4`" v-model="selectedSize" type="radio" value="xl" name="radio" />
				<label :for="`${sectionIndex}-radio4`">XL</label>
			</li>
		</ul>
		<ul 
			v-else-if="product.category == 'pants'"
			:class="{
				size_disabled: globals.restrictShop && !globals.shopPasswordAccepted
			}"
		>
			<li>
				<input :id="`${sectionIndex}-radio1`" v-model="selectedSize" type="radio" value="28" name="radio" />
				<label :for="`${sectionIndex}-radio1`">28</label>
			</li>
			<li>
				<input :id="`${sectionIndex}-radio2`" v-model="selectedSize" type="radio" value="30" name="radio" />
				<label :for="`${sectionIndex}-radio2`">30</label>
			</li>
			<li>
				<input :id="`${sectionIndex}-radio3`" v-model="selectedSize" type="radio" value="32" name="radio" />
				<label :for="`${sectionIndex}-radio3`">32</label>
			</li>
			<li>
				<input :id="`${sectionIndex}-radio4`" v-model="selectedSize" type="radio" value="34" name="radio" />
				<label :for="`${sectionIndex}-radio4`">34</label>
			</li>
		</ul>
		<ul 
			v-else-if="product.category == 'accessories'"
			class="os-button"
			:class="{
				size_disabled: globals.restrictShop && !globals.shopPasswordAccepted
			}"
		>
			<li>
				<input :id="`${sectionIndex}-radio1`" v-model="selectedSize" type="radio" value="ONE SIZE" name="radio" />
				<label :for="`${sectionIndex}-radio1`">ONE SIZE</label>
			</li>
		</ul>

		<!-- Variant Select -->
		<template v-if="parsedVariants && parsedVariants.length">
			<div class="grey">Variant</div>
			<ul
				:class="{
					size_disabled: globals.restrictShop && !globals.shopPasswordAccepted
				}"
			>
				<template v-for="(variant, index) in parsedVariants">
					<li :key="index">
						<input 
							:id="`${sectionIndex}-${index}-variant`"
							v-model="selectedVariant" type="radio"
							:value="variant.variantdesc"
							name="variant-radio"
						/>
						<label
							:for="`${sectionIndex}-${index}-variant`"
							v-html="variant.variantdesc"
						></label>
					</li>
				</template>
			</ul>
		</template>

		<!-- Add to Cart button -->
		<div class="grey"></div>
		<div v-if="globals.restrictShop && !globals.shopPasswordAccepted">
			<button v-if="!showPasswordInput" class="atc-button" @click="showPasswordInput = true">Unlock Shop</button>
			<div v-else>
		    <input ref="pField" class="password_entry shop_password_entry" type="text" name="password" />
				<button class="atc-button" @click="validatePassword">Unlock</button>
			</div>
		</div>
		<div v-else>
			<button class="atc-button" @click="validateATC">Add to Cart</button>
			<span v-if="warning" id="warning" class="blink" v-html="warning"></span>
		</div>

		<!-- Snipcart Button w/ Variant -->
		<button 
			v-if="parsedVariants && parsedVariants.length"
			ref="snipcartATC"
			class="snipcart-add-item"
			:data-item-url="'https://elliottevan.com' + currentPath"
			:data-item-id="product.title.toUpperCase()"
			:data-item-price="product.price"
			:data-item-name="product.title"
			data-item-custom1-name="SIZE"
			:data-item-custom1-value="selectedSize ? selectedSize.toUpperCase() : null"
			:data-item-custom1-options="sizeOptions"
			:data-item-custom1-required="true"
			data-item-custom2-name="VARIANT"
			:data-item-custom2-value="selectedVariant ? selectedVariant.toUpperCase() : null"
			:data-item-custom2-options="variantOptions"
			:data-item-custom2-required="true"
		></button>

		<!-- Snipcart Button, size-only -->
		<button 
			v-else
			ref="snipcartATC"
			class="snipcart-add-item"
			:data-item-url="'https://elliottevan.com' + currentPath"
			:data-item-id="product.title.toUpperCase()"
			:data-item-price="product.price"
			:data-item-name="product.title"
			data-item-custom1-name="SIZE"
			:data-item-custom1-value="selectedSize ? selectedSize.toUpperCase() : null"
			:data-item-custom1-options="sizeOptions"
			:data-item-custom1-required="true"
		></button>
	</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
	name: "AddToCart",
	props: {
		product: Object,
		sectionIndex: Number
	},
	data() {
		return {
			showPasswordInput: false,
			selectedSize: null,
			selectedVariant: null,
			parsedVariants: null,
			warning: null,
			variantOptions: ''
		}
	},
	computed: {
    ...mapState([ 'globals' ]),
		variants() {
			return this.product.variants
		},
		sizeOptions() {
			if (this.product.category  == 'jackets' || this.product.category == 'shirts') {
				return 'S|M|L|XL'
			} else if (this.product.category == 'pants') {
				return '28|30|32|34'
			} else {
				return 'ONE SIZE'	
			}
		},
		currentPath() {
			return this.$route.fullPath
		}
		// snipcartOptions() {
		// 	let string = ''
		//   let i = this.product.measurements.length
		//   for (const size of this.product.measurements) {
		//     string += size.size
		//     if (i !== 1) string += '|'
		//     i--
		//   }
		//   return string.toUpperCase()
		// }
	},
	created() {
		if (this.product.category === 'accessories') this.selectedSize = 'ONE SIZE'

		if (this.product.variants && this.product.variants.length) {
			this.parsedVariants = JSON.parse(this.product.variants)

			if (!Array.isArray(this.parsedVariants)) {
				return
			}
			
			// create dynamic options string for snipcart
			this.parsedVariants.forEach((variant, index) => {
				if (index !== this.parsedVariants.length - 1) {
					this.variantOptions += `${variant.variantdesc}|`
				} else {
					this.variantOptions += variant.variantdesc
				}
			})
		}
	},
	watch: {
		selectedSize(newVal, oldVal) {
			if (newVal !== null) {
				this.warning = null	
			}
		},
		selectedVariant(newVal, oldVal) {
			if (newVal !== null) {
				this.warning = null	
			}
		}
	},
	methods: {
		openShopPassword() {
			this.showPasswordModal = true
		},
		validatePassword() {
      console.log('e', this.$refs.pField.value)
      if (this.$refs.pField.value === this.globals.shopPassword) {
        this.$store.commit('updatePasswordAccepted', true)
				this.showPasswordInput = false
      }
		},
		validateATC() {
			const { selectedSize, selectedVariant, parsedVariants } = this

			if (parsedVariants && parsedVariants.length) {
				if (!selectedSize && parsedVariants && !selectedVariant) {
					this.warning = 'Select a size and variant.'
				}
				else if (selectedSize === null) {
					this.warning = 'Select a size.'
				}
				else if (parsedVariants && !selectedVariant) {
					this.warning = 'Select a variant.'
				} else {
					// success
					this.$refs.snipcartATC.click()
				}
			} else {
				if (selectedSize === null) {
					this.warning = 'Select a size.'
				} else {
					// success
					this.$refs.snipcartATC.click()
				}
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.size_disabled {
  filter: brightness(0.50);

	li, input, label {
		cursor: not-allowed;
	}

	input, label {
		pointer-events: none;
	}
}

.shop_password_entry {
	padding: 0 3px;
	margin: 0;
}

.product-info {
	// width: 100%;
	// display: grid;
	// grid-template-columns: 4.5rem auto;
}

ul {
	list-style: none;
	margin: 0;
	padding: 0;
	display: flex;
	flex-direction: row;
}

li {
	display: inline-block;

	&:first-child {
		label {
			padding-left: 0;
		}
	}
}

input:not(.password_entry) {
	height: 0px;
	width: 0px;
	margin: 0;
	visibility: hidden;
	position: absolute;
}

input.password_entry {
	height: 1.7rem;
}

label {
	cursor: pointer;
	padding: 2px 8px;
	font-variant-numeric: tabular-nums;
}

input:checked + label {
	// border-bottom: 1px solid white;
	text-decoration: underline;
	text-underline-offset: 0.14rem;
}

.atc-enter-active,
.atc-leave-active {
  transition: opacity 0.25s;
}
.atc-enter,
.atc-leave-to {
  opacity: 0;
}

#warning {
	margin-left: 0.5rem;
}
</style>
