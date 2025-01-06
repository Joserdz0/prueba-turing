<template>
  <div class="row">
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <RouterLink class="navbar-brand" to="/">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3460/3460335.png"
            alt="Logo"
            width="30"
            height="24"
            class="d-inline-block align-text-top"
          />
          PetShare
        </RouterLink>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li :class="`nav-item ${useSessionStore().isLoggedIn ? '' : 'd-none'}`">
              <RouterLink class="nav-link" to="/my-pets">My pets</RouterLink>
            </li>


          </ul >
          <ul class="navbar-nav mb-2 mb-lg-0">
            <li :class="`nav-item ${useSessionStore().isLoggedIn ? 'd-none' : ''}`">
              <RouterLink class="nav-link" to="/register">Register</RouterLink>
            </li>
            <li :class="`nav-item ${useSessionStore().isLoggedIn ? 'd-none' : ''}`">
              <RouterLink class="nav-link d-none d-lg-block btn bg-1EBE91 text-white" to="/login">login</RouterLink>

              <RouterLink class="nav-link d-block d-lg-none" to="/login">Login</RouterLink>
            </li>

            <li :class="`nav-item ${useSessionStore().isLoggedIn ? '' : 'd-none'}`">
              <RouterLink class="nav-link d-none d-lg-block"                
              @click.prevent="SessionStore.logout()"
              to="">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-left" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z"/>
                  <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z"/>
                </svg>
              </RouterLink>

              <RouterLink class="nav-link d-block d-lg-none"            
               @click.prevent="SessionStore.logout()"
              to="">Cerrar Sesion</RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { useSessionStore } from "../stores/session";
const SessionStore = useSessionStore();

</script>

<style scoped>
.nav-link:hover{
  cursor: pointer;
}
</style>