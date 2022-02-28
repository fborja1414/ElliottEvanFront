<template>
  <div class="faux_wall">
    <input ref="pField" class="password_entry" type="text" name="password" />
    <button class="password_entry" @click="agree">Submit</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      passed: false,
    }
  },
  methods: {
    agree: function () {
      // trigger cookie save
      console.log('e', this.$refs.pField.value)
      let day = 60 * 60 * 24 * 7
      if (this.$refs.pField.value === 'elliottevanforever') {
        this.passed = true
        this.$cookies.set('ee-fauxwall', 'passed', {
          path: '/',
          maxAge: day,
        })
        window.location.reload(true)
      }
    },
  },
}
</script>

<style>
.faux_wall {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000000;
  width: 100vw;
  height: 100vh;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
}

.password_entry {
	background: black;
  border: 1px solid white;
  padding: 0.6rem 0.65rem 0.45rem;
  color: white;
  margin: 0.25rem;
  padding: 0.25rem;
  box-shadow: 0.2rem 0.2rem 0.5rem 0.1rem rgb(0 0 0 / 15%);
}
.password_entry:hover {
  background-color: black;
  color: white;
  transition: all 0.3s ease-in-out;
}
</style>