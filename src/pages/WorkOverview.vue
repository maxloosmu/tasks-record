<template>
  <button @click="logout">Logout</button>
  <section v-if="!this.token">
    <p>name: {{ name }}</p>
    <p>email: {{ email }}</p>
    <p>password: {{ password }}</p>
    <p>userId: {{ userId }}</p>
    <p>token: {{ token }}</p>
    <p>error: {{ error }}</p>
    <p>response: {{ response }}</p>
  </section>
  <record-tasks v-if="!!this.token"></record-tasks>
</template>

<script>
import RecordTasks from '../components/RecordTasks.vue'

export default {
  components: {
    RecordTasks,
  },
  data() {
    return {
      name: localStorage.getItem('name'),
      email: localStorage.getItem('email'),
      password: localStorage.getItem('password'),
      token: localStorage.getItem('token'),
      error: this.$store.state.error,
      response: localStorage.getItem('response'),
    }
  },
  computed: {
    userId() {
      return localStorage.getItem('userId');
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('name');
      localStorage.removeItem('email');
      localStorage.removeItem('password');
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('response');
      this.$router.replace('/login');
    }
  }
};
</script>