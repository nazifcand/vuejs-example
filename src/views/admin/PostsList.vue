<template>
  <div id="page-title">
    <h1>Posts</h1>
  </div>
  <div id="list-page">
    <div v-for="post in posts" :key="post.id" class="list">
      <img class="post-image" :src="post.thumbnail" />
      <router-link
        :to="{ name: 'Post', params: { slug: post.slug, title: post.title } }"
        class="post-link"
        target="_blank"
        >{{ post.title }}</router-link
      >
      <span class="post-author">{{ post.author.username }}</span>
      <span class="post-vote">{{ post.vote }}</span>
      <span class="post-date">{{ formatDate(post.date) }}</span>
      <button class="post-remove" @click="removePost(post.id)">Remove</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.list {
  display: flex;
  align-items: center;

  &:not(:last-child) {
    padding-bottom: 5px;
    margin-bottom: 10px;
    margin-bottom: 1px solid #eee;
  }

  .post-image {
    width: 50px;

    img {
      width: 100%;
    }
  }

  .post-link {
    flex: 1;
    margin: 0 15px;
    text-decoration: none;
    color: #000316;
    transition: 250ms all ease;

    &:hover {
      color: #ff374a;
    }
  }

  .post-author {
    margin-right: 15px;
  }
  .post-vote {
    margin-right: 15px;
    font-weight: bold;
  }
  .post-date {
    color: #777;
    font-size: 12px;
    margin-right: 15px;
  }
  .post-remove {
    border: none;
    cursor: pointer;
    color: #fff;
    font-weight: 500;
    background-color: #ff374a;
    padding: 5px;
    border-radius: 3px;
  }
}
</style>


<script>
import moment from 'moment';
import axios from 'axios';

export default {
  data() {
    return {
      posts: []
    }
  },
  created() {
    this.fetchPosts();
  },
  methods: {
    fetchPosts() {
      axios
        .get('/posts?_sort=id&_order=desc')
        .then(async result => {
          result = result.data;
          result = await result.reduce(async (arr, item) => {
            item.author = await this.$store.dispatch('fetchAuthor', { id: item.author });
            (await arr).push(item);
            return arr;
          }, []);

          this.posts = result;

        })
        .catch(err => console.log(err));
    },

    formatDate(date) {
      return moment(date).format('LLL');
    },

    removePost(id) {
      axios
        .delete(`/posts/${id}`)
        .then(res => {
          if (res.status === 200) {
            this.fetchPosts();
          }
        })
        .catch(err => console.log(err));
    }
  }
}
</script>