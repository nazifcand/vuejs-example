import axios from 'axios'

export default {
  fetchTopPosts({ commit }) {
    axios
      .get('/posts?_sort=vote&_order=desc')
      .then(result => commit('setTopPosts', result.data))
      .catch(err => console.log(err))
  },

  fetchPost({ commit, dispatch }, { slug }) {
    axios
      .get(`/posts?slug=${slug}`)
      .then(async result => {
        result = result.data[0];
        result.author = await dispatch('fetchAuthor', { id: result.author });
        result.comments = await dispatch('fetchComments', { id: result.id });
        commit('setSinglePost', result)
      })
      .catch(err => console.log(err))
  },

  fetchAuthor({ }, { id }) {
    return axios
      .get(`/users?id=${id}`)
      .then(result => result.data[0])
      .catch(err => console.log(err))
  },

  fetchComments({ dispatch }, { id }) {
    return axios
      .get(`/comments?postId=${id}`)
      .then(result => {
        result = result.data;
        return result.reduce(async (arr, comment) => {
          comment.author = await dispatch('fetchAuthor', { id: comment.author });
          (await arr).push(comment);
          return arr;
        }, []);
      })
      .catch(err => console.log(err))
  }


}