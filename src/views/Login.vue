<template>
  <div id="login-page">
    <div class="container">
      <h1>Login</h1>

      <Notification v-if="error.type && error.text" :type="error.type">
        {{ error.text }}
      </Notification>

      <form @submit.prevent="login">
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
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#login-page {
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
import Notification from '@/components/Notification.vue';
import { mapMutations } from 'vuex';

export default {
  data() {
    return {
      error: {
        text: null,
        type: null
      },
      mail: null,
      pass: null,
    }
  },
  components: {
    Notification
  },
  methods: {
    ...mapMutations(['logIn']),
    login() {
      axios
        .get(`/users?mail=${this.mail}&pass=${this.pass}`)
        .then(result => {
          const user = result.data[0];

          if (!user) {
            this.error.type = 'danger';
            this.error.text = 'Kullanıcı bulunamadı!';
          } else {

            this.error.type = 'success';
            this.error.text = 'Giriş başarılı';

            localStorage.setItem('token', user.fakeToken);
            delete user.fakeToken;
            this.logIn(user);
            this.$router.go(-1);

          }
        })
        .catch(err => console.log(err));
      this.mail = '';
      this.pass = '';
    }
  }
}
</script>