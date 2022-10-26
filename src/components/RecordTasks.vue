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
      {{ task }} <button @click="removeTask(task)">remove</button>
    </li>
  </ol>
  <p><button @click="saveTasks">Save Tasks</button></p>
  <p><button @click="clearTasks">Clear Tasks</button></p>
  <p><button @click="recallTasks">Recall Tasks</button></p>
  <p><button @click="eraseTasks">Erase Tasks from Browser Memory</button></p>
</template>

<script>
export default {
  data() {
    return {
      tasksList: [],
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
      if (this.tasksList.length > 0) {
        localStorage.setItem('tasksList', this.tasksList);
      }
    },
    clearTasks() {
      this.tasksList = [];
    },
    recallTasks() {
      let allItems = localStorage.getItem('tasksList');
      // console.log(allItems);
      if (allItems != null) {
        let mergedString = "";
        for (let i in allItems) {
          mergedString += allItems[i];
        }
        this.tasksList = mergedString.split(",");
      }
      else this.tasksList = [];
    },
    eraseTasks() {
      localStorage.removeItem('tasksList');
    }
  },
};
</script>
