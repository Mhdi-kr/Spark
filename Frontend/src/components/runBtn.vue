<template>
  <button class="button is-primary is-small is-rounded" @click="click">Run</button>
</template>
<script>
  export default {
    name: 'runBtn',
    data: () => ({

    }),
    methods: {
      click(){
        this.$emit('click')
      }
    }
  }
</script>