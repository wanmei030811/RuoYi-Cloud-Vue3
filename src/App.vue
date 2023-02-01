<template>
  <router-view />
</template>

<script setup>
import useSettingsStore from '@/project1/store/modules/settings'
import { handleThemeStyle } from '@/project1/utils/theme'

onMounted(() => {
  nextTick(() => {
    // ��ʼ��������ʽ
    handleThemeStyle(useSettingsStore().theme)
  })
})
</script>
