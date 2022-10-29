<template>
  <h2>hi {{ name }}, add your 3 primary tasks for today</h2>
  <h3>Just press "Enter" or "Go" or click "Add Task" after typing your task</h3>
  <input
    type="text"
    id="tasksInput"
    ref="tasksInput"
    @keypress.enter="addTask"
    v-if="this.taskSelectionLengthTwo"
  /> <button @click="addTaskButton">Add Task</button>
  <ol>
    <li v-for="task in taskSelection" :key="task">
      {{ task }} <button @click="removeTask(task)"><FontAwesomeIcon :icon="icon" /> remove</button>
    </li>
  </ol>
  <p><button @click="saveTasks">Save Tasks</button></p>
  <p><button @click="clearTasks">Clear Tasks</button></p>
  <p><button @click="recallTasks">Recall Tasks</button></p>
  <p><button @click="eraseTasks">Erase Tasks from Browser Memory</button></p>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export default {
  components: {
    FontAwesomeIcon
  },
  data() {
    return {
      name: localStorage.getItem('name'),
      taskSelection: [],
      icon: faTimes,
    };
  },
  computed: {
    taskSelectionLengthTwo() {
      return this.taskSelection.length < 3;
    },
  },
  methods: {
    addTask(event) {
      this.taskSelection.push(event.target.value);
      this.$refs.tasksInput.value = "";
    },
    addTaskButton() {
      this.taskSelection.push(this.$refs.tasksInput.value);
      this.$refs.tasksInput.value = "";
      this.$refs.tasksInput.focus();
    },
    removeTask(task) {
      const index = this.taskSelection.indexOf(task);
      if (index > -1) {
        this.taskSelection.splice(index, 1);
      }
      this.$refs.tasksInput.focus();
    },
    saveTasks() {
      let jsonString = JSON.stringify(this.taskSelection);
      localStorage.setItem('taskSelection', jsonString);
    },
    clearTasks() {
      this.taskSelection = [];
    },
    recallTasks() {
      let jsonString = localStorage.getItem('taskSelection');
      if (jsonString) {
        this.taskSelection = JSON.parse(jsonString);
      }
    },
    eraseTasks() {
      localStorage.removeItem('taskSelection');
    }
  },
};
</script>
