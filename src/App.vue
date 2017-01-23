<template>
  <div id="app">
    <div class="pokedex">
      <pokedex></pokedex>
    </div>
    <div class="selected">
      <selected v-if="selectedPokemon" :selectedPokemon="selectedPokemon">
      </selected>
    </div>
    {{ fetching }}
 </div>
</template>

<script>
declare var require: any
var Pokedex = require('./components/Pokedex.vue').default;
var Selected = require('./components/Selected.vue').default
import {Vue, Component, Lifecycle} from 'av-ts'

@Component({
  components: {
    Pokedex,
    Selected,
  },
  name:'app'
})
export default class App extends Vue {
  @Lifecycle created(): void {
    this.$store.dispatch('getPokemon')
  }
  get fetching(){
    return this.$store.state.pokeData.fetching;
  }
  get selectedPokemon(){
    return this.$store.state.pokeData.selectedPokemon;
  }
  increment() {
    this.$store.commit({ type: 'increment' });
  }
};
</script>
<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
.pokedex {
  width: 60%;
  display: inline-block;
}
.selected {
  width: 40%;
  float: right;
}
</style>