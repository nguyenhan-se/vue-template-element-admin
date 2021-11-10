<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ username }}</div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store'
import { computed } from 'vue'

let store = useStore()
const username = computed(() => {
  return store.state.user.username
})
</script>

<style lang="scss" scoped>
.dashboard {
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
