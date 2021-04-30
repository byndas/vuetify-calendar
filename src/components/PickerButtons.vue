<template>
  <v-form @:submit.prevent>
    <v-btn
      @click="handleReset"
      elevation="5"
      large
      :disabled="loading"
    >Reset</v-btn>
    <v-btn
      @click="handleSave"
      class="ml-5"
      depressed
      color="primary"
      large
      :disabled="loading"
    >Save</v-btn>
  </v-form>
</template>

<script>
  export default {
    name: 'PickerButtons',
    methods: {
      handleSave () {
        this.$store.dispatch('demoModule/POST_DATES')
      },
      handleReset () {
        this.$store.dispatch('demoModule/RESET_DATES')
      }
    },
    computed: {
      loading() {
        return this.$store.state.demoModule.loading
      }
    }
  }
</script>

<style scoped>
  form {
    width: 290px;
    display: flex;
    justify-content: flex-end;
  }
</style>
