import Vue from 'vue'
import Vuex from 'vuex'
import product_data from '../product.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //product list info
    productList:[],
    //cart list, object in array
    cartList:[]
  },
  getters: {
    username: state => state.username,
    productList: state => state.productList,
    cartList: state => state.cartList,
    // set productList as object, so it's easier to look for data
    productDict: state => {
      const dict ={};
      state.productList.forEach(product => {
        dict[product.id] = product;
      });
      return dict;
    },
    //getting the products with the same brand as selected 
    // brands: state => brand => state.productList
    //           .filter(product.brand === brand)
    brands: state => {
      const brands = state.productList.map(product => product.brand);
      return new Set(brands);
    },
    colors: state => {
      const colors = state.productList.map(product => product.color);
      return new Set(colors);
    }
    
  },
  actions: {
    fetchProducts({ commit }) {
      //get data from product js and send it to mutation
      commit('setProducts', product_data)
    },
    checkOut({ commit }) {
      // axios if in real project
      commit('emptyCart');
      alert('Thanks for shopping with us!')
    }

  },
  mutations: {
    // get produdct data from action, mutated the state data
    setProducts: (state, productList) => state.productList = productList,
    //handle add product to cart list
    addCart(state, id){
      const isAdded = state.cartList.find(item => item.id === id)
      //if product is in in cart, count++ , else add new one
      if(isAdded) {
        isAdded.count++;
      } else {
        state.cartList.push({
          id: id,
          count: 1
        })
      }
    },
    deleteCart(state, id) {
      const index = state.cartList.findIndex(item => item.id === id)
      //this is splice not slice!!!, this changes the state
      state.cartList.splice(index, 1)
    },
    //increase or decrease cart Qnt by using payload
    editCart(state, payload){
      const product = state.cartList.find(item => item.id === payload.id);
      product.count += payload.count
      if(product.count <= 0) {
        product.count = 1
      }
    },
    emptyCart(state){
      state.cartList = [];
    }
  }
})
