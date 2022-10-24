<template>
  <button @click="logout">Logout</button>
  <p>{{ name }}</p>
  <p>{{ email }}</p>
  <p>{{ password }}</p>
  <p>{{ userId }}</p>
  <p>{{ token }}</p>
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