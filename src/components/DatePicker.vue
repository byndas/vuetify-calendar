<template>
  <v-card :loading="loading">
    <v-date-picker
      v-model="date"
      multiple
      no-title
      :disabled="loading"
    ></v-date-picker>
  </v-card>
</template>

<script>
  export default {
    name: 'DatePicker',
    created () {
      this.$store.dispatch('demoModule/GET_DATES')
    },
    computed: {
      date: {
        get () {
          return this.$store.state.demoModule.date
        },
        set (value) {
          this.$store.dispatch('demoModule/SET_SELECTION', value)
        }
      },
      loading() {
        return this.$store.state.demoModule.loading
      }
    }
  }
</script>
