<script setup lang="ts">
import { ref } from 'vue'

const newTask = ref('')
const tasks = ref<string[]>([])
const done = ref<string[]>([])

function addTask() {
  const text = newTask.value.trim()
  if (!text) return
  tasks.value.push(text)
  newTask.value = ''
}

function completeTask(index: number) {
  const [task] = tasks.value.splice(index, 1)
  done.value.push(task)
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
        <span>{{ task }}</span>
        <button class="complete-btn" @click="completeTask(index)">✓ Done</button>
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.4rem 0;
  font-size: 1rem;
}

.complete-btn {
  font-size: 0.85rem;
  color: green;
  background: none;
  border: 1px solid green;
  border-radius: 4px;
  padding: 0.2rem 0.5rem;
  cursor: pointer;
}
</style>
