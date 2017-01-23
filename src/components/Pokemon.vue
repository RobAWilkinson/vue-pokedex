<template>
  <div
    class="test"
  >
    <div class="name" v-on:click="fetchDetails">
      {{ pokemon.pokemon_species.name }}
    </div>
  </div>
</template>

<script>
export default {
  props: [ 'pokemon'],
  methods: {
    fetchDetails() {
      this.$store.dispatch('fetchDetails', this.pokemon);
    }
  }
}
</script>

<style>
.test {
  /* color: green; */
  border: 3px dashed black;
  /* width: 200px; */
  /* height: 200px; */
  /* text-align: center; */
  padding: 40px;
  border-collapse: collapse;
}
.name {
  text-transform: capitalize;
}
</style>