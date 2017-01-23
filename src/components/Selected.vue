<template>
    <transition appear name="fade">
      <div class="padded">
        <h4>
          {{ selectedPokemon.name }}
        </h4>
        <p>
          {{ selectedPokemon.flavor_text_entries[1].flavor_text }}
        </p>
      </div>
    </transition>
</template>

<script>
export default {
  name: 'selected',
  props: ['selectedPokemon']
}

</script>
<style scoped>
.padded {
  padding: 0 30px;
}
.padded h4 {
  text-transform: capitalize;
}
.fade-enter-active, .fade-leave-active {
  transition: all 1s;
}
.fade-enter, .fade-leave-to /* .list-leave-active for <2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}

</style>