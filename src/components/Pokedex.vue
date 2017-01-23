<template>
  <div
  class="test"
  >
    <h3>Pokedex</h3>

    <div v-if="pokedexEntries">
      <input type="text" v-model="message" ></input>
      <div v-for="pokemon in pokedexEntries" >
        <pokemon :pokemon="pokemon"></pokemon>
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
        return this.$store.state.pokeData.pokedex.pokemon_entries.filter(pokemon => {
          // return true;
          return pokemon.pokemon_species.name.includes(this.$data.message);
        });
      } else {
        return []
      }
    }
  },
  data() {
    return { message: '' };
  }
}

</script>
<style>
</style>