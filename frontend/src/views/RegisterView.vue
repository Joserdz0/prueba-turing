<template>
  <div class="container-fluid">
    <Navbar />
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-6">
          <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
          <form class="mx-1 mx-md-4">
            <div class="d-flex flex-row align-items-center mb-4">
              <div data-mdb-input-init class="form-outline flex-fill mb-0">
                <input
                  v-model="name"
                  type="text"
                  id="form3Example1c"
                  class="form-control"
                />
                <label class="form-label" for="form3Example1c">Your Name</label>
              </div>
            </div>

            <div class="d-flex flex-row align-items-center mb-4">
              <div data-mdb-input-init class="form-outline flex-fill mb-0">
                <input
                  v-model="email"
                  type="email"
                  id="form3Example3c"
                  class="form-control"
                />
                <label class="form-label" for="form3Example3c"
                  >Your Email</label
                >
              </div>
            </div>

            <div class="d-flex flex-row align-items-center mb-4">
              <div data-mdb-input-init class="form-outline flex-fill mb-0">
                <input
                  type="password"
                  id="form3Example4c"
                  class="form-control"
                  v-model="password"
                />
                <label class="form-label" for="form3Example4c">Password</label>
              </div>
            </div>

            <div class="d-flex flex-row align-items-center mb-4">
              <div data-mdb-input-init class="form-outline flex-fill mb-0">
                <input
                  type="password"
                  id="form3Example4cd"
                  class="form-control"
                  v-model="repeatPassword"
                />
                <label class="form-label" for="form3Example4cd"
                  >Repeat your password</label
                >
              </div>
            </div>

            <div class="form-check d-flex justify-content-center mb-5 flex-column">
              <span>
                <input
                  class="form-check-input me-2"
                  type="checkbox"
                  id="form2Example3c"
                  v-model="terms"
                />
                <label class="form-check-label" for="form2Example3">
                  I agree all statements in <a href="#!">Terms of service</a>
                </label>
              </span>

              <p class="text-danger">
                {{ mensaje }}
              </p>
            </div>

            <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
              <button
                type="button"
                data-mdb-button-init
                data-mdb-ripple-init
                class="btn btn-primary btn-lg"
                :disabled="
                  !name ||
                  !email ||
                  !password ||
                  !repeatPassword ||
                  !terms ||
                  password !== repeatPassword
                "
                @click="register"
              >
                Register
              </button>
            </div>
          </form>
        </div>
        <div
          class="col-12 col-md-6 d-none d-md-flex justify-content-center align-items-center"
        >
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
            alt="Logo"
            class="img-fluid"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Navbar from "../components/Navbar.vue";
import { useSessionStore } from "../stores/session";
import { ref, onMounted, reactive, computed, watch } from "vue";
import router from "../router";

const name = ref(null);
const email = ref(null);
const password = ref(null);
const repeatPassword = ref(null);
const terms = ref(false);
const mensaje = ref('');
const SessionStore = useSessionStore();
const register = async () => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    name: name.value,
    email: email.value,
    password: password.value,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("http://localhost:3000/users/create", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if ((result.status == "error")) {
        mensaje.value = result.message;
      } else {
        localStorage.setItem("id", result.data.id);
        SessionStore.id = result.data.id;
        SessionStore.isLoggedIn = true;
        router.push("/");
        location.reload(true);
      }
    })
    .catch((error) => console.error(error));
};
</script>

<style>
</style>