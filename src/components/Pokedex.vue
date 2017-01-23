<template>
  <div
  class="test"
  >
    <h3>Pokedex</h3>

    <div v-if="pokedexEntries.length > 0">
      {{ pokedexEntries.length }}
      <div v-for="pokemon in pokedexEntries" >
        <pokemon :pokemon="pokemon"></pokemon>
      </div>
      </div>
  </div>
</template>

<script>

import Pokemon from './Pokemon.vue'
export default {
  name: 'pokedex',
  components: { Pokemon },
  computed: {
    pokedexEntries() {
      if(this.$store.state.pokeData.pokedex) {
        return this.$store.state.pokeData.pokedex.pokemon_entries;
      } else {
        return []
      }
    }
  }
}

</script>
<style>
  .test {
    color: red;
  }
</style>