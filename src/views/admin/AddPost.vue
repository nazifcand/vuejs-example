<template>
  <div id="page-title">
    <h1>Add New Post</h1>
  </div>

  <Notification v-if="error && error.type && error.text" :type="error.type">{{
    error.text
  }}</Notification>

  <form @submit.prevent="addPost">
    <div class="group">
      <span>Title</span>
      <input
        type="text"
        placeholder="entry title"
        autocomplete="off"
        spellcheck="false"
        required
        v-model="title"
      />
    </div>

    <div class="group">
      <span>thubmnail Link</span>
      <input
        type="text"
        placeholder="entry image link"
        autocomplete="off"
        spellcheck="false"
        required
        v-model="thumbnail"
      />
    </div>

    <div class="group">
      <span>source link</span>
      <input
        type="text"
        placeholder="entry source link"
        autocomplete="off"
        spellcheck="false"
        required
        v-model="source"
      />
    </div>

    <div class="group">
      <span>content</span>
      <Editor
        api-key="no-api-key"
        :init="{
          height: 500,
          menubar: false,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount',
          ],
          toolbar:
            'undo redo | formatselect | bold italic backcolor | \
           alignleft aligncenter alignright alignjustify | \
           bullist numlist outdent indent | removeformat | help',
        }"
        v-model="description"
      />
    </div>
    <div class="group">
      <button type="submit">Add Post</button>
    </div>
  </form>
</template>

<style lang="scss" scoped>
form {
  margin-bottom: 200px;
}
</style>

<script>
import Notification from '@/components/Notification.vue';
import slugify from '@/helpers/slugify.js';
import Editor from '@tinymce/tinymce-vue';
import { mapState } from 'vuex';
import axios from 'axios';

export default {
  components: { Editor, Notification },
  data() {
    return {
      error: {
        text: null,
        type: null
      },

      title: '',
      thumbnail: '',
      source: '',
      description: ''
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    addPost() {
      const { title, thumbnail, source, description, user } = this;
      const author = user.id;
      const date = Date.now();
      const vote = 0;
      const slug = slugify(title);

      axios
        .post('/posts', { title, thumbnail, source, description, author, date, vote, slug })
        .then(res => {
          res = res.data;
          if (!res) {
            this.error.type = 'danger';
            this.error.text = 'Blog oluşturulamadı!';
          } else {
            this.$router.push('/admin/posts');
          }
        })
        .catch(err => console.log(err));

      this.title = '';
      this.thumbnail = '';
      this.source = '';
      this.description = '';
    }
  }
}
</script>