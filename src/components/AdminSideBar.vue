<template>
  <nav>
    <router-link to="/admin">Home</router-link>
    <router-link to="/admin/posts">Posts List</router-link>
    <router-link to="/admin/add-post">Add Post</router-link>
    <router-link to="/">View Site</router-link>
  </nav>
</template>

<style lang="scss" scoped>
nav {
  display: flex;
  flex-direction: column;

  a {
    text-align: center;
    display: block;
    margin: 10px 0;
    color: #000316;
    font-weight: 500;
    font-size: 18px;
    text-decoration: none;
    transition: 250ms all ease;

    &:hover {
      color: #ff374a;
    }
  }
}
</style>