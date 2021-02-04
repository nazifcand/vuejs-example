import axios from 'axios';
import store from '../store';
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Main',
    component: () => import('../views/Main.vue'),
    children: [
      {
        path: '/',
        name: 'Index',
        component: () => import('../views/Index.vue')
      },
      {
        path: '/top',
        name: 'Top Ratings',
        component: () => import('../views/TopRatings.vue')
      },
      {
        path: '/posts/:slug',
        name: 'Post',
        component: () => import('../views/Post.vue')
      },
    ]
  },

  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },

  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },

  {
    path: '/admin',
    name: 'Admin Main',
    component: () => import('../views/admin/Main.vue'),
    children: [
      {
        path: '/admin',
        name: 'Admin Index',
        component: () => import('../views/admin/Index.vue')
      },
      {
        path: '/admin/posts',
        name: 'Posts List',
        component: () => import('../views/admin/PostsList.vue')
      },
      {
        path: '/admin/add-post',
        name: 'Add Post',
        component: () => import('../views/admin/AddPost.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.params.title ? to.params.title : to.name;
  const { token } = localStorage;

  if (!token) {
    store.commit('logOut');
  } else {
    axios.get(`/users?fakeToken=${token}`)
      .then(result => {
        const user = result.data[0];

        if (user) {
          store.commit('logIn', user);
        } else {
          store.commit('logOut');
        }

      })
      .catch(err => console.log(err));
  }

  next();
});

router.afterEach((to, from) => {
  window.scrollTo(0, 0);
});

export default router
