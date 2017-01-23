<template>
    <transition name="fade">
      <div>
        {{JSON.parse(JSON.stringify(selectedPokemon))}}
      </div>
    </transition>
</template>

<script>
export default {
  name: 'selected',
  props: ['selectedPokemon']
}

</script>
<style>
.fade-enter, .fade-leave-active {
  transition: opacity .5s
}
.fade-leave, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0
}

</style>