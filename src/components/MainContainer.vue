<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="110"
        />
      </v-col>
    </v-row>

    <v-row justify="center" class="mb-7">
      <date-picker />
    </v-row>

    <v-row justify="center">
      <picker-buttons />
    </v-row>

    <alert-modal /> <!-- with vue 3 can be teleported outside -->
  </v-container>
</template>

<script>
  import DatePicker from './DatePicker.vue'
  import PickerButtons from './PickerButtons.vue'
  import AlertModal from './AlertModal.vue'

  export default {
    name: 'MainContainer',

    components: {
      DatePicker,
      PickerButtons,
      AlertModal
    },
  }
</script>
