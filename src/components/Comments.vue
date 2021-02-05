<template>
  <div v-for="comment in comments" :key="comment.id" class="comment">
    <p>{{ comment.text }}</p>
    <div class="comment-info">
      <span>
        <strong>Author:</strong>
        {{ comment.author.username }}
      </span>

      <time>{{ formatDate(comment.date) }}</time>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.comment {
  margin-bottom: 25px;

  p {
    color: #333;
    line-height: 1.35;
  }

  .comment-info {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #777;
  }
}
</style>

<script>
import moment from 'moment';

export default {
  props: {
    comments: { type: Object, required: true }
  },
  methods: {
    formatDate(date) {
      return moment(date).format('LLL');
    }
  }
}
</script>