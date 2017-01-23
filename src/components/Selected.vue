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
