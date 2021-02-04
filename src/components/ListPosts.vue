<template>
  <div id="posts">
    <!-- .post start -->
    <div v-for="post in posts" :key="post.id" class="post">
      <div class="post-vote-count">{{ post.vote }}</div>
      <router-link
        :to="{ name: 'Post', params: { slug: post.slug, title: post.title } }"
        class="post-image"
      >
        <img :src="post.thumbnail" />
      </router-link>
      <router-link
        :to="{ name: 'Post', params: { slug: post.slug, title: post.title } }"
        class="post-title"
        >{{ post.title }}</router-link
      >
      <p class="post-description">
        {{ substrDescription(post.description) }}
      </p>
    </div>
    <!-- .post end -->
  </div>
</template>

<style lang="scss" scoped>
#posts {
  width: 100%;
  margin-bottom: 100px;
  display: flex;
  flex-wrap: wrap;

  .post {
    width: calc(50% - 10px);
    display: flex;
    flex-direction: column;
    min-height: 100px;
    margin-bottom: 40px;
    position: relative;

    &:nth-child(2n + 1) {
      margin-right: 10px;
    }

    &:nth-child(2n + 2) {
      margin-left: 10px;
    }

    .post-vote-count {
      padding: 8px 15px;
      position: absolute;
      top: 10px;
      left: 10px;
      background-color: #ff374a;
      color: #fff;
      font-weight: bold;
    }

    .post-image {
      margin-bottom: 15px;

      img {
        width: 100%;
      }
    }

    .post-title {
      font-size: 20px;
      color: #000316;
      font-weight: 600;
      margin-bottom: 10px;
      text-decoration: none;
      transition: 250ms all ease;
      line-height: 1.4;

      &:hover {
        color: #ff374a;
      }
    }

    .post-description {
      color: #777;
      line-height: 1.35;
      font-size: 12px;
    }
  }
}
</style>

<script>
export default {
  props: {
    posts: { type: Object, required: true }
  },
  methods: {
    substrDescription(text) {
      return text.length > 300
        ? `${text
          .replace(/(<([^>]+)>)/gi, "")
          .substr(0, 280)}...`
        : text.replace(/(<([^>]+)>)/gi, "")
    }
  }
}
</script>