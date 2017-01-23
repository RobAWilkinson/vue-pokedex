<template>
  <div
  class="test"
  >
    <h3>Pokedex</h3>
    <div class="input-container">
      <input type="text" v-model="message" />
    </div>
    <transition-group name="list" appear>
    <pokemon v-for="pokemon in pokedexEntries" :key="pokemon.pokemon_species.name" :pokemon="pokemon"></pokemon>
    </transition-group>
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
          return pokemon.pokemon_species.name.toLowerCase().includes(this.$data.message.toLowerCase());
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
<style scoped>
.input-container {
  width: 500px;
  margin: 20px auto;
}
h3 {
  text-align: center;
}
input {
  padding: 10px;
  line-height: 20px;
  font-size: 20px;
  text-align: center;
  width: 100%;
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active for <2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>