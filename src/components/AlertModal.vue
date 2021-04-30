<template>
   <div class="text-center">
    <v-dialog v-model="show" width="300">
      <v-alert v-if="type === 'success'" type="success" class="mb-0">
        <h4>Success</h4>
        <p class="mb-0">Calendar was sucessfully updated</p>
      </v-alert>

      <v-alert v-if="type === 'failure'" type="error" class="mb-0">
        <h4>Something went wrong</h4>
        <p class="mb-0">For more information contact our support or check logs</p>
      </v-alert>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'AlertModal',
  computed: {
    dialog () {
      return this.$store.state.demoModule.dialog
    },
    type() {
      return this.dialog.type
    },
    show: {
      get () {
        return this.dialog.show
      },
      set (value) {
        this.$store.dispatch('demoModule/TOGGLE_MODAL', { show: value, type: this.type })
      }
    }
  }
}
</script>
