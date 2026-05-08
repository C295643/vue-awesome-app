<script setup lang="ts">
import { ref, watchEffect } from 'vue'

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

const newTask = ref('')
const tasks = ref<string[]>(load('tasks', []))
const done = ref<string[]>(load('done', []))

watchEffect(() => localStorage.setItem('tasks', JSON.stringify(tasks.value)))
watchEffect(() => localStorage.setItem('done', JSON.stringify(done.value)))

function addTask() {
  const text = newTask.value.trim()
  if (!text) return
  tasks.value.push(text)
  newTask.value = ''
}

function completeTask(index: number) {
  const [task] = tasks.value.splice(index, 1)
  if (task !== undefined) done.value.push(task)
}

function moveUp(index: number) {
  if (index === 0) return
  tasks.value.splice(index - 1, 0, ...tasks.value.splice(index, 1))
}

function moveDown(index: number) {
  if (index === tasks.value.length - 1) return
  tasks.value.splice(index + 1, 0, ...tasks.value.splice(index, 1))
}

const showDone = ref(false)
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
        <div class="actions">
          <button class="move-btn" :disabled="index === 0" @click="moveUp(index)">▲</button>
          <button class="move-btn" :disabled="index === tasks.length - 1" @click="moveDown(index)">▼</button>
          <button class="complete-btn" @click="completeTask(index)">✓ Done</button>
        </div>
      </li>
    </ol>

    <p v-else>No tasks yet. Add one above.</p>

    <section class="archive">
      <button class="toggle-btn" @click="showDone = !showDone">
        {{ showDone ? 'Hide' : 'Show' }} completed ({{ done.length }})
      </button>
      <ol v-if="showDone && done.length">
        <li v-for="(task, index) in done" :key="index" class="done-item">
          {{ task }}
        </li>
      </ol>
      <p v-else-if="showDone">No completed tasks yet.</p>
    </section>
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

.actions {
  display: flex;
  gap: 0.3rem;
}

.move-btn {
  font-size: 0.8rem;
  background: none;
  border: 1px solid #aaa;
  border-radius: 4px;
  padding: 0.2rem 0.4rem;
  cursor: pointer;
}

.move-btn:disabled {
  opacity: 0.3;
  cursor: default;
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

.archive {
  margin-top: 2rem;
  border-top: 1px solid #eee;
  padding-top: 1rem;
}

.toggle-btn {
  font-size: 0.9rem;
  background: none;
  border: none;
  color: #555;
  cursor: pointer;
  padding: 0;
  text-decoration: underline;
}

.done-item {
  color: #999;
  text-decoration: line-through;
}
</style>
