<template>
  <button @click="logout">Logout</button>
  <p>name: {{ name }}</p>
  <p>email: {{ email }}</p>
  <p>password: {{ password }}</p>
  <p>userId: {{ userId }}</p>
  <p>token: {{ token }}</p>
  <p>error: {{ error }}</p>
  <p>response: {{ response }}</p>
</template>

<script>
export default {
  data() {
    return {
      name: localStorage.getItem('name'),
      email: localStorage.getItem('email'),
      password: localStorage.getItem('password'),
      token: localStorage.getItem('token'),
      error: this.$store.state.error,
      response: this.$store.state.response,
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
      this.$router.replace('/login');
    }
  }
};
</script>