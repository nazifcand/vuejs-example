<template>
  <div id="register-page">
    <div class="container">
      <h1>Register</h1>

      <form @submit.prevent="register">
        <div class="group">
          <span>Username</span>
          <input
            type="text"
            placeholder="username"
            autocomplete="off"
            spellcheck="false"
            required
            v-model="username"
          />
        </div>

        <div class="group">
          <span>E-mail</span>
          <input
            type="text"
            placeholder="E-mail"
            autocomplete="off"
            spellcheck="false"
            required
            v-model="mail"
          />
        </div>

        <div class="group">
          <span>Password</span>
          <input
            type="password"
            placeholder="Password"
            autocomplete="off"
            spellcheck="false"
            required
            v-model="pass"
          />
        </div>

        <div class="group">
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#register-page {
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .container {
    max-width: 350px;
    flex-direction: column;
  }

  h1 {
    font-size: 28px;
    font-weight: 500;
    text-transform: uppercase;
    margin-bottom: 25px;
    border-bottom: 1px solid#eee;
    padding-bottom: 10px;
  }
}
</style>

<script>
import axios from 'axios';
import { mapMutations } from 'vuex';

export default {
  data() {
    return {
      username: '',
      mail: '',
      pass: '',
    }
  },
  methods: {
    ...mapMutations(['logIn']),
    register() {
      const { username, mail, pass } = this;
      const fakeToken = `${Date.now()}.x.${Date.now()}`;

      axios
        .post('/users', { username, mail, pass, fakeToken })
        .then(result => {
          localStorage.setItem('token', result.data.fakeToken);
          delete result.data.fakeToken;
          this.logIn(result.data);
          this.$router.go(-1)
        })
        .catch(err => console.log(err));
    }
  }
}
</script>