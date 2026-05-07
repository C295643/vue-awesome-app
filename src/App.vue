<script setup lang="ts">
import { ref } from 'vue'

const newTask = ref('')
const tasks = ref<string[]>([])

function addTask() {
  const text = newTask.value.trim()
  if (!text) return
  tasks.value.push(text)
  newTask.value = ''
}
</script>

<template>
  <main>
    <h1>To-Do</h1>

    <form @submit.prevent="addTask">
      <input
        v-model="newTask"
        type="text"
        placeholder="Add a task…"
        autofocus
      />
      <button type="submit">Add</button>
    </form>

    <ol v-if="tasks.length">
      <li v-for="(task, index) in tasks" :key="index">
        {{ task }}
      </li>
    </ol>

    <p v-else>No tasks yet. Add one above.</p>
  </main>
</template>

<style scoped>
main {
  max-width: 600px;
  margin: 2rem auto;
  font-family: sans-serif;
  padding: 0 1rem;
}

form {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

input {
  flex: 1;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
}

ol {
  padding-left: 1.5rem;
}

li {
  padding: 0.4rem 0;
  font-size: 1rem;
}
</style>
