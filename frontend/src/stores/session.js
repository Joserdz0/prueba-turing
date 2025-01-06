// stores/products.js
import { defineStore } from 'pinia'
import router from '../router';

export const useSessionStore = defineStore('session', {
  state: () => ({
    id_user: null,
    isLoggedIn: false,
  }),
  actions: {
    async login({id_user}) {
      this.id_user = id_user;
      this.isLoggedIn = true;
      localStorage.setItem('id', id_user);
      router.push('/');
    },
    async logout() {
      this.id_user = null;
      this.isLoggedIn = false;
      localStorage.clear()
      router.push('/');

    }

  }
})