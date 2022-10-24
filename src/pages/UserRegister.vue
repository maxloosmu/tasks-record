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
    <button>{{ showMode }}</button>
  </form>
  <button @click="changeMode">{{ switchMode }}</button>
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
      mode: "login",
    };
  },
  computed: {
    switchMode() {
      if (this.mode=="signup") {
        return "Switch to Login";
      }
      else {
        return "Switch to Signup";
      }
    },
    showMode() {
      if (this.mode=="signup") {
        return "Signup";
      }
      else {
        return "Login";
      }
    }
  },
  methods: {
    changeMode() {
      if (this.mode=="login") this.mode="signup";
      else this.mode="login";
    },
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

      // store.state.name = this.name.val;
      // store.state.email = this.email.val;
      // store.state.password = this.password.val;
      localStorage.setItem('name', this.name.val);
      localStorage.setItem('email', this.email.val);
      localStorage.setItem('password', this.password.val);
      this.$store.state.name = localStorage.getItem('name');
      this.$store.state.email = localStorage.getItem('email');
      this.$store.state.password = localStorage.getItem('password');
      this.auth();

      this.$router.replace('/work');
    },
    // https://firebase.google.com/docs/reference/rest/auth
    // curl 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAk1ueCLjDDWCNrt_23o5A4RCfeaYIlN6k' -H 'Content-Type: application/json' --data-binary '{"email":"maxlooo@yahoo.com","password":"PASSWORD","returnSecureToken":true}'

    async auth() {
      let url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key= AIzaSyAk1ueCLjDDWCNrt_23o5A4RCfeaYIlN6k';
      if (this.mode=="signup") {
        url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key= AIzaSyAk1ueCLjDDWCNrt_23o5A4RCfeaYIlN6k';
      }
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          email: localStorage.getItem('email'),
          password: localStorage.getItem('password'),
          returnSecureToken: true
        })
      });
      const responseData = await response.json();
      if (!response.ok) {
        const error = new Error(
          responseData.message || 'Failed to authenticate. Check your login data.'
        );
        console.log(error);
        throw error;
      }
      localStorage.setItem('token', responseData.idToken);
      localStorage.setItem('userId', responseData.localId);
      this.$store.state.token = localStorage.getItem('token');
      this.$store.state.userId = localStorage.getItem('userId');
    }
  },
}
</script>