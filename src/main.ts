// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
declare var require: any
declare var fetch: any

import Vue = require('vue');
import Vuex = require('vuex');
var App = require('./App.vue').default;
import createLogger = require('vuex/dist/logger');


Vue.use(Vuex);
const API_URL = 'http://pokeapi.co/api/v2/';
const types = {
  REQUEST_POKEDEX_BEGIN: 'requestPokedexBegin',
  REQUEST_POKEDEX_SUCCESS: 'requestPokedexSuccess',
};
const store = new (<any>Vuex.Store)({
  plugins: [(<any>createLogger)()],
  state: {
    count: 0,
    pokeData: {
      pokemon: {},
      fetching: false,
    },
  },
  mutations: {
    increment(state) {
      state.count += 1;
    },
    requestPokedexBegin(state) {
      state.pokeData = (<any>Object).assign({}, state.pokeData, {
        fetching: true,
      });
    },
    requestPokedexSuccess(state, data) {
      state.pokeData = (<any>Object).assign({}, state.pokeData, {
        fetching: false,
        pokedex: data.pokedex,
      });
    },
    fetchPokemonandSelectCurrent(state, { pokemon, entry_number }) {
      const pokemonObj = (<any>Object).assign({}, state.pokeData,pokemon);
      pokemonObj[entry_number] = pokemon;
      state.pokeData = (<any>Object).assign({}, state.pokeData, {
        pokemon: pokemonObj,
        selectedPokemon: pokemon,
      });
    },
  },
  actions: {
    fetchDetails({ commit, state }, pokemon: any) {
      const url = pokemon.pokemon_species.url;
      const number = pokemon.entry_number;
      if (!state.pokeData.pokemon[number]) {
        fetch(url)
        .then(resp => resp.json())
        .then((pokemon) => {
          const mutation = {
            type: 'fetchPokemonandSelectCurrent',
            pokemon,
            entry_number: number,
          };
          return commit(mutation);
        });
      } else {
        pokemon = state.pokeData.pokemon[number];
        const mutation = {
          type: 'fetchPokemonandSelectCurrent',
          pokemon,
          entry_number: number,
        };
        return commit(mutation);
      }

      // fetch(data)
    },
    getPokemon({ commit  }) {
      commit({ type: types.REQUEST_POKEDEX_BEGIN });
      fetch(`${API_URL}pokedex/2`)
      .then(resp => resp.json())
      .then((pokedex) => {
        const mutation = { type: types.REQUEST_POKEDEX_SUCCESS, pokedex };
        return commit(mutation);
      });
    },
  },
});

// can also use vuex.mapState here, acts as mapStateToProps in redux

// actions are passed in by calling store.commit({type: STRING, ...data })
// this fires the mutation of the same name
// user store.dispatch for async

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // state
  store,
  components: {
    App,
  },
  // view
  template: `
    <div>
      <app></app>
    </div>
  `,
  // actions
});
