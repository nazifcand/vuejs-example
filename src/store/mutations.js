export default {
  setTopPosts(state, posts) {
    state.topPosts = posts;
  },

  logIn(state, user) {
    state.isLoggedIn = true;
    state.user = user;
  },

  logOut(state) {
    state.isLoggedIn = false;
    state.user = {};
  },

  setSinglePost(state, post) {
    state.singlePost = post;
  },

  setNewComment(state, comment) {
    state.singlePost.comments.push(comment);
  }
}