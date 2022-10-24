<template>
  <button @click="logout">Logout</button>
  <p>name: {{ name }}</p>
  <p>email: {{ email }}</p>
  <p>password: {{ password }}</p>
  <p>userId: {{ userId }}</p>
  <p>token: {{ token }}</p>
</template>

<script>
export default {
  data() {
    return {
      name: localStorage.getItem('name'),
      email: localStorage.getItem('email'),
      password: localStorage.getItem('password'),
      token: localStorage.getItem('token'),
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
      this.$router.replace('/register');
    }
  }
};
</script>