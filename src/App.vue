<script setup lang="ts">
import { ref, watchEffect, useTemplateRef } from 'vue'

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

const tasksFileInput = useTemplateRef<HTMLInputElement>('tasksFileInput')
const doneFileInput = useTemplateRef<HTMLInputElement>('doneFileInput')

function exportFile(lines: string[], filename: string) {
  const blob = new Blob([lines.join('\n')], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

function importFile(target: typeof tasks, event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = (e) => {
    const text = e.target?.result as string
    target.value = text.split('\n').map(l => l.trim()).filter(Boolean)
    input.value = ''
  }
  reader.readAsText(file)
}


function importTasks(e: Event) { importFile(tasks, e) }
function importDone(e: Event) { importFile(done, e) }</script>

<template>
  <main>
    <h1>To-Do</h1>

    <form @submit.prevent="addTask">
      <input v-model="newTask" type="text" placeholder="Add a task…" autofocus />
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

    <section class="io">
      <h2>Export / Import</h2>
      <div class="io-row">
        <span>Active tasks (todo.txt)</span>
        <button @click="exportFile(tasks, 'todo.txt')">Export</button>
        <button @click="tasksFileInput?.click()">Import</button>
        <input ref="tasksFileInput" type="file" accept=".txt" class="hidden-input" @change="importTasks($event)" />
      </div>
      <div class="io-row">
        <span>Completed tasks (done.txt)</span>
        <button @click="exportFile(done, 'done.txt')">Export</button>
        <button @click="doneFileInput?.click()">Import</button>
        <input ref="doneFileInput" type="file" accept=".txt" class="hidden-input" @change="importDone($event)" />
      </div>
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

.io {
  margin-top: 2rem;
  border-top: 1px solid #eee;
  padding-top: 1rem;
}

.io h2 {
  font-size: 1rem;
  margin-bottom: 0.75rem;
}

.io-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.io-row span {
  flex: 1;
}

.hidden-input {
  display: none;
}
</style>
