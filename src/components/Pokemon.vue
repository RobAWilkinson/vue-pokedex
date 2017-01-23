<template>
  <div
  class="test"
  >
    {{ pokemon.pokemon_species.name }}
  </div>
</template>

<script>
export default {
  props: [ 'pokemon'],
}
</script>

<style>
.test {
  color: green;
}
</style>