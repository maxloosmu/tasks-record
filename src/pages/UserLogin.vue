<template>
  <form @submit.prevent="submitForm">
    <div>
      <label for="name">Name</label>
      <input
        type="text"
        id="name"
        v-model.trim="name.val"
        @blur="clearValidity('name')"
      />
      <p v-if="!name.isValid">Name must not be empty.</p>
    </div>
    <div>
      <label for="email">E-mail</label>
      <input
        type="email"
        id="email"
        v-model.trim="email.val"
        @blur="clearValidity('email')"
      />
      <p v-if="!email.isValid">E-mail must not be empty.</p>
    </div>
    <div>
      <label for="password">Password</label>
      <input
        type="password"
        id="password"
        v-model.trim="password.val"
        @blur="clearValidity('password')"
      />
      <p v-if="!password.isValid">Password must not be empty.</p>
    </div>
    <p v-if="!formIsValid">Please fix the above errors and submit again.</p>
    <button>Submit</button>
  </form>
</template>

<script>
export default {
  emits: ['register-data'],
  data() {
    return {
      name: {
        val: '',
        isValid: true,
      },
      email: {
        val: '',
        isValid: true,
      },
      password: {
        val: '',
        isValid: true,
      },
      formIsValid: true,
    };
  },

  methods: {
    clearValidity(input) {
      this[input].isValid = true;
    },
    validateForm() {
      this.formIsValid = true;
      if (this.name.val === '') {
        this.name.isValid = false;
        this.formIsValid = false;
      }
      if (this.email.val === '') {
        this.email.isValid = false;
        this.formIsValid = false;
      }
      if (this.password.val === '') {
        this.password.isValid = false;
        this.formIsValid = false;
      }
    },
    submitForm() {
      this.validateForm();

      if (!this.formIsValid) {
        return;
      }

      const formData = {
        name: "Max",
        email: "maxloo@smu.edu.sg",
        password: "admin",
      };

      // store.state.name = this.name.val;
      // store.state.email = this.email.val;
      // store.state.password = this.password.val;
      this.$store.state.name = formData.name;
      this.$store.state.email = formData.email;
      this.$store.state.password = formData.password;

      this.$emit('register-data', formData);
      this.$router.replace('/work');
    },
  },
}
</script>