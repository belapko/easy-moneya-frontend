<template>
  <div>
    <IconWallet
      color="black"
      size="48"
    />

    <h1>easy-money</h1>

    <h2>бабосики под контролем</h2>

    <AuthForm />
  </div>
</template>

<script setup lang="ts">

import { IconWallet } from '@tabler/icons-vue';
import AuthForm from '@/components/Auth/AuthForm.vue';
</script>

<style scoped>

</style>
