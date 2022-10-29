<template>
  <h2>Enter your 3 primary tasks for today:</h2>
  <input
    type="text"
    id="tasksInput"
    ref="tasksInput"
    @keypress.enter="addTask"
    v-if="this.taskListLengthTwo"
  />
  <ol>
    <li v-for="task in tasksList" :key="task">
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
      tasksList: [],
      icon: faTimes,
    };
  },
  computed: {
    taskListLengthTwo() {
      return this.tasksList.length < 3;
    },
  },
  methods: {
    addTask(event) {
      this.tasksList.push(event.target.value);
      this.$refs.tasksInput.value = "";
    },
    removeTask(task) {
      const index = this.tasksList.indexOf(task);
      if (index > -1) {
        this.tasksList.splice(index, 1);
      }
    },
    saveTasks() {
      let jsonString = JSON.stringify(this.tasksList);
      localStorage.setItem('tasksList', jsonString);
    },
    clearTasks() {
      this.tasksList = [];
    },
    recallTasks() {
      let jsonString = localStorage.getItem('tasksList');
      this.tasksList = JSON.parse(jsonString);
    },
    eraseTasks() {
      localStorage.removeItem('tasksList');
    }
  },
};
</script>
