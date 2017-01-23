<template>
  <div
    class="pokemon"
    v-on:click="fetchDetails"
  >
      {{ pokemon.pokemon_species.name }}
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

<style scoped>
.pokemon {
  /* color: green; */
  border: 3px dashed black;
  /* width: 200px; */
  /* height: 200px; */
  /* text-align: center; */
  padding: 40px;
  border-collapse: collapse;
  transition: all 0.2s;
  text-transform: capitalize;
}
.pokemon:hover {
  background: indianred;
  cursor: pointer;
  color: white;
}
</style>