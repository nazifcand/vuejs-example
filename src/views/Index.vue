<template>
  <div id="main-page">
    <div class="container">
      <div id="page-title">
        <h1>Last Posts</h1>
      </div>

      <ListPosts :posts="posts"></ListPosts>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#main-page {
  width: 100%;
  min-height: 150px;
}
</style>

<script>
import axios from 'axios';
import ListPosts from '@/components/ListPosts.vue';

export default {
  data() {
    return {
      posts: []
    }
  },
  components: { ListPosts },
  created() {
    axios
      .get('/posts?_sort=id&_order=desc')
      .then(result => this.posts = result.data)
      .catch(err => console.log(err))
  }
}
</script>