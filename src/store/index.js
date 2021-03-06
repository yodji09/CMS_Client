import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
const baseUrl = 'https://shielded-bastion-44955.herokuapp.com/'

export default new Vuex.Store({
  state: {
    isLogin: false,
    token: '',
    message: '',
    categories: [],
    products: []
  },
  mutations: {
    SET_LOGIN (state, payload) {
      state.isLogin = payload
    },
    SET_TOKEN (state, payload) {
      state.token = payload
    },
    SET_CATEGORIES (state, payload) {
      state.categories = payload
    },
    SET_PRODUCTS (state, payload) {
      state.products = payload
    },
    ADD_CATEGORIES (state, payload) {
      state.categories.push(payload)
    },
    ADD_PRODUCT (state, payload) {
      state.products.push(payload)
    },
    SET_MESSAGE (state, payload) {
      state.message = payload
    }
  },
  actions: {
    fetchProducts (context, payload) {
      axios({
        method: 'get',
        url: baseUrl + 'product',
        headers: {
          token: payload
        }
      })
        .then(({ data }) => {
          context.commit('SET_PRODUCTS', data.Product)
        })
        .catch(err => {
          context.commit('SET_MESSAGE', err.response.data.msg)
        })
    },
    fetchCategories (context, payload) {
      axios({
        method: 'get',
        url: baseUrl + 'category',
        headers: {
          token: payload
        }
      })
        .then(({ data }) => {
          context.commit('SET_CATEGORIES', data.Category)
        })
        .catch(err => {
          context.commit('SET_MESSAGE', err.response.data.msg)
        })
    },
    login (context, payload) {
      return axios({
        method: 'post',
        url: baseUrl + 'user/login',
        data: payload
      })
    },
    editCategory (context, payload) {
      return axios({
        method: 'PUT',
        url: baseUrl + `category/${payload.id}`,
        headers: {
          token: payload.token
        },
        data: {
          name: payload.name
        }
      })
    },
    deleteCategory (context, payload) {
      return axios({
        method: 'delete',
        url: baseUrl + `category/${payload.id}`,
        headers: {
          token: payload.token
        }
      })
    },
    editProduct (context, payload) {
      return axios({
        method: 'put',
        url: baseUrl + `product/${payload.id}`,
        headers: {
          token: payload.token
        },
        data: {
          name: payload.name,
          price: payload.price,
          image_url: payload.image_url,
          stock: payload.stock,
          CategoryId: payload.CategoryId
        }
      })
    },
    deleteProduct (context, payload) {
      return axios({
        method: 'delete',
        url: baseUrl + `product/${payload.id}`,
        headers: {
          token: payload.token
        }
      })
    },
    addCategory (context, payload) {
      axios({
        method: 'POST',
        url: baseUrl + 'category',
        headers: {
          token: payload.token
        },
        data: { name: payload.name }
      })
        .then(({ data }) => {
          context.commit('ADD_CATEGORIES', data.Category)
        })
        .catch(err => {
          context.commit('SET_MESSAGE', err.response.data.msg)
        })
    },
    addProduct (context, payload) {
      return axios({
        method: 'POST',
        url: baseUrl + 'product',
        headers: {
          token: payload.token
        },
        data: {
          name: payload.name,
          image_url: payload.image_url,
          price: payload.price,
          stock: payload.stock,
          CategoryId: payload.CategoryId
        }
      })
    }
  },
  modules: {
  }
})
