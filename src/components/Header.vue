<template>
  <header>
    <div class="container">
      <router-link to="/">Home</router-link>
      <router-link to="/top">Top Ratings</router-link>

      <section v-if="!isLoggedIn">
        <router-link to="/login">Login</router-link>
        <router-link to="/register">Register</router-link>
      </section>

      <section v-if="isLoggedIn">
        <router-link to="/admin">Admin</router-link>
        <a class="logout" @click="logOut">Logout</a>
      </section>
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #eee;
  margin-bottom: 50px;

  .container {
    display: flex;
    align-items: center;
  }

  section {
    margin-left: auto;
  }

  a {
    color: #000316;
    text-decoration: none;
    transition: 250ms all ease;
    text-transform: uppercase;
    cursor: pointer;

    &:not(:last-child) {
      margin-right: 25px;
    }

    &.router-link-exact-active,
    &:hover {
      color: #ff374a;
    }
  }
}
</style>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['isLoggedIn'])
  },
  methods: {
    logOut() {
      localStorage.removeItem('token');
      this.$store.commit('logOut');
      this.$router.go();
    }
  }
}
</script>