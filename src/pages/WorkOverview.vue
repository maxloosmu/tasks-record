<template>
  <button @click="logout">Logout</button>
  <p>{{ name }}</p>
  <p>{{ email }}</p>
  <p>{{ password }}</p>
</template>

<script>
export default {
  data() {
    return {
      name: localStorage.getItem('name'),
      email: localStorage.getItem('email'),
      password: localStorage.getItem('password'),
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('name');
      localStorage.removeItem('email');
      localStorage.removeItem('password');
      this.$router.replace('/register');
    }
  }
};
</script>