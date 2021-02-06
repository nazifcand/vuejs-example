<template>
  <div id="post-page">
    <div class="container">
      <!-- #post-main start -->
      <div id="post-main">
        <h1 class="post-title">{{ singlePost.title }}</h1>
        <img class="post-image" :src="singlePost.thumbnail" />
        <div class="post-info">
          <span v-if="singlePost.author">
            <strong>Author:</strong>
            {{ singlePost.author.username }}
          </span>
          <time>{{ formatDate(singlePost.date) }}</time>
          <span>
            <strong>Votes:</strong>
            {{ singlePost.vote }}
          </span>
        </div>
        <div class="post-content" v-html="singlePost.description"></div>

        <!-- #comments start -->
        <div
          id="comments"
          v-if="singlePost.comments && singlePost.comments.length > 0"
        >
          <h2 id="comments-title">
            Comments ({{ singlePost.comments.length }})
          </h2>

          <Comments :comments="singlePost.comments" />
        </div>
        <NewComment v-if="isLoggedIn" />
        <!-- #comments end -->
      </div>
      <!-- #post-main end -->

      <!-- #sidebar start -->
      <div id="sidebar">
        <!-- .widget start -->
        <div class="widget top-ratings">
          <div class="widget-title">Top Ratings Posts</div>
          <div class="widget-content">
            <router-link
              v-for="post in topPosts"
              :key="post.id"
              :to="{
                name: 'Post',
                params: { slug: post.slug, title: post.title },
              }"
            >
              <strong>{{ post.vote }}</strong>
              <img :src="post.thumbnail" />
              <span>{{ post.title }}</span>
            </router-link>
          </div>
        </div>
        <!-- .widget end -->
      </div>
      <!-- #sidebar end -->
    </div>
  </div>
</template>

<style lang="scss" >
#post-page {
  margin-bottom: 200px;

  .container {
    display: flex;
  }

  #post-main {
    flex: 1;

    .post-title {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 15px;
    }

    .post-info {
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
    }

    .post-image {
      width: 100%;
      margin-bottom: 10px;
    }

    .post-content {
      p {
        font-size: 13px;
        color: #777;
        line-height: 1.35;

        &:not(:last-child) {
          margin-bottom: 15px;
        }
      }
      h1,
      h2,
      h3,
      h3,
      h5,
      h6 {
        font-weight: bold;
        margin: 20px 0;
      }
      h1 {
        font-size: 36px;
      }
      h2 {
        font-size: 32px;
      }
      h3 {
        font-size: 28px;
      }
      h4 {
        font-size: 24px;
      }
      h5 {
        font-size: 20px;
      }
      h6 {
        font-size: 16px;
      }
    }

    #comments {
      margin-top: 50px;

      #comments-title {
        font-size: 24px;
        font-weight: bold;
        border-bottom: 1px solid #eee;
        padding-bottom: 15px;
        margin-bottom: 20px;
      }
    }
  }

  #sidebar {
    width: 300px;
    min-height: 200px;
    margin-left: 25px;
    display: flex;
    flex-direction: column;

    .widget {
      width: 100%;
      display: flex;
      flex-direction: column;

      &:not(:last-child) {
        margin-bottom: 20px;
      }

      .widget-title {
        height: 30px;
        display: flex;
        text-transform: uppercase;
        font-weight: 500;
        align-items: center;
        border-bottom: 1px solid #eee;
      }

      &.top-ratings {
        .widget-content {
          a {
            display: block;
            font-weight: 500;
            color: #000316;
            position: relative;
            text-decoration: none;
            line-height: 1.35;

            &:not(:last-child) {
              margin-bottom: 25px;
            }

            strong {
              padding: 5px 10px;
              background-color: #ff374a;
              color: #fff;
              position: absolute;
              top: 10px;
              left: 10px;
            }

            img {
              width: 100%;
              margin-bottom: 5px;
            }
          }
        }
      }
    }
  }
}
</style>

<script>
import moment from 'moment';
import { mapState } from 'vuex';
import Comments from '@/components/Comments.vue';
import NewComment from '@/components/NewComment.vue';

export default {
  created() {
    this.fetchDatas();
  },
  components: { Comments, NewComment },
  computed: {
    ...mapState(['singlePost', 'topPosts', 'isLoggedIn'])
  },
  methods: {
    fetchDatas() {
      const { slug } = this.$route.params;
      this.$store.dispatch('fetchPost', { slug });
      this.$store.dispatch('fetchTopPosts');
    },
    formatDate(date) {
      return moment(date).format('LLL');
    }
  },
  watch: {
    $route(to, from) {
      if (to.name == 'Post' && to.params.slug !== from.params.slug) {
        this.fetchDatas();
      }
    }
  }
}
</script>