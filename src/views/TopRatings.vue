<template>
  <div id="top-posts-page">
    <div class="container">
      <div id="page-title">
        <h1>Top Ratings Post</h1>
      </div>

      <ListPosts :posts="topPosts"></ListPosts>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#top-posts-page {
  width: 100%;
  min-height: 150px;
}
</style>

<script>
import ListPosts from '@/components/ListPosts.vue';
import { mapState } from 'vuex';

export default {
  components: { ListPosts },
  created() {
    this.$store.dispatch('fetchTopPosts');
  },
  computed: {
    ...mapState(['topPosts'])
  }
}
</script>