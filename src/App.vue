<script setup lang="ts">
import { useAuth } from './auth/useAuth'

const { account, login, logout } = useAuth()
</script>

<template>
  <h1>You did it!</h1>

  <div v-if="account">
    <p>Signed in as {{ account.name ?? account.username }}</p>
    <button @click="logout">Sign out</button>
  </div>
  <div v-else>
    <button @click="login">Sign in with Azure</button>
  </div>

  <p>
    Visit <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a> to read the
    documentation
  </p>
</template>

<style scoped></style>
