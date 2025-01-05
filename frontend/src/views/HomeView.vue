<template>
  <div class="container-fluid bg-C8D2D7">
    <div class="row bg-0F2D3C">
      <div
        class="col-12 d-flex flex-column justify-content-center align-items-center"
        style="height: 100vh; text-align: center"
      >
        <h1 class="color-1EBE91">"Tu mascota, su historia"</h1>
        <p class="color-C8D2D7">
          Conoce y comparte los momentos más especiales con tu mejor amigo.
        </p>
        <button class="btn bg-1EBE91 mt-3">¡Entra ya!</button>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-4 p-3 position-relative imagen-mid">
          <img
            src="https://paradispets.com/wp-content/uploads/2024/02/cachorro-razas-de-perros-pequenos-y-carinosos-paradispets.jpg"
            class="img-fluid h-100 w-100 card-image-pets"
            alt="..."
          />
        </div>
        <div class="col-12 col-md-4 p-3 position-relative imagen-mid">
          <img
            src="https://www.miau.com.mx/wp-content/uploads/2014/09/gatito.jpg"
            class="img-fluid h-100 w-100 card-image-pets"
            alt="..."
          />
        </div>
        <div class="col-12 col-md-4 p-3 position-relative imagen-mid">
          <img
            src="https://cdn0.expertoanimal.com/es/razas/1/0/5/hamster-dorado_501_0_orig.jpg"
            class="img-fluid h-100 w-100 card-image-pets"
            alt="..."
          />
        </div>

        <div class="col-12 col-md-12">
          <div class="row">
            <div
              class="col-12 col-md-4 p-3"
              v-for="(pet, index) in dataFiltred.slice(
                numberElements * actualPage,
                numberElements * (actualPage + 1)
              )"
              :key="index"
            >
              <div class="card card-pets">
                <img
                  :src="`${pet['img']}`"
                  class="card-img-top card-image-pets"
                  alt="..."
                />
                <div class="card-body">
                  <h5 class="card-title color-005546">{{ pet["name"] }}</h5>
                  <p class="card-text color-C8D2D7">
                    {{ pet["description"] }}
                  </p>
                </div>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">
                    <div class="d-flex justify-content-between">
                      <p class="m-0 color-005546">Tipo:</p>
                      <p class="m-0 color-C8D2D7">{{ pet["type"] }}</p>
                    </div>
                  </li>
                  <li class="list-group-item">
                    <div class="d-flex justify-content-between">
                      <p class="m-0 color-005546">Raza:</p>
                      <p class="m-0 color-C8D2D7">{{ pet["breed"] }}</p>
                    </div>
                  </li>
                  <li class="list-group-item">
                    <div class="d-flex justify-content-between">
                      <p class="m-0 color-005546">Edad:</p>
                      <p class="m-0 color-C8D2D7">{{ pet["age"] }}</p>
                    </div>
                  </li>
                </ul>
                <div class="card-body">
                  <a href="#" class="card-link color-005546">Saber mas ...</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-12 col-md-12">
          <div style="display: grid; grid-template-columns: 1fr auto 1fr">
            <span style="grid-column: 1; justify-self: end">
              <p
                class="mx-3 px-1 link-pagination d-inline"
                @click="actualPage--"
                v-if="actualPage > 0"
              >
                <i class="bi bi-chevron-left"></i>
              </p>

              <p
                class="mx-3 px-1 link-pagination d-inline"
                v-for="(page, index) in Array.from(
                  { length: 2 },
                  (_, i) => actualPage - 2 + i
                ).filter((data) => data >= 0)"
                :key="index"
                @click="actualPage = page"
              >
                {{ page + 1 }}
              </p>
            </span>
            <p class="mx-3 px-1 color-69D7B9" style="grid-column: 2">
              {{ actualPage + 1 }}
            </p>
            <span style="grid-column: 3; justify-self: start">
              <p
                class="mx-3 px-1 link-pagination d-inline"
                v-for="(page, index) in Array.from(
                  { length: 2 },
                  (_, i) => actualPage + 1 + i
                ).filter(
                  (data) =>
                    data + 1 <= Math.ceil(dataFiltred.length / numberElements)
                )"
                :key="index"
                @click="actualPage = page"
              >
                {{ page + 1 }}
              </p>
              <p
                class="mx-3 px-1 link-pagination d-inline"
                @click="actualPage++"
                v-if="
                  Math.ceil(dataFiltred.length / numberElements) >
                  actualPage + 1
                "
              >
                <i class="bi bi-chevron-right"></i>
              </p>
            </span>
          </div>
        </div>
        <div class="col-12 py-5">
          <div class="row">
            <div
              class="col-12 col-md-3 d-flex justify-content-center align-items-center"
            >
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuq-zOiHHbVUdeR7tmSU_X6FWVbYVJl0wZ_g&s"
                alt="..."
                class="img-logo"
              />
            </div>
            <div
              class="col-12 col-md-3 d-flex justify-content-center align-items-center"
            >
              <img
                src="https://1000marcas.net/wp-content/uploads/2021/06/Whiskas-logo.png"
                alt="..."
                class="img-logo"
              />
            </div>
            <div
              class="col-12 col-md-3 d-flex justify-content-center align-items-center"
            >
              <img
                src="https://seeklogo.com/images/P/purina-logo-10CD51CD8D-seeklogo.com.png"
                alt="..."
                class="img-logo"
              />
            </div>
            <div
              class="col-12 col-md-3 d-flex justify-content-center align-items-center"
            >
              <img
                src="https://static.vecteezy.com/system/resources/previews/010/477/114/non_2x/animal-care-adopt-and-rescue-pet-shop-care-logo-design-template-for-brand-or-company-and-other-vector.jpg"
                alt="..."
                class="img-logo"
              />
            </div>
          </div>
        </div>
        <div class="col-12 mt-5">
          <div class="row">
            <div class="col-12 text-center mb-5">
              <h3 class="color-69D7B9">Nuestro Equipo</h3>
            </div>
            <div class="col-12 col-md-4 text-center pt-5">
              <img src="https://secrecyjewels.es/blog/wp-content/uploads/2022/10/esencia-de-una-persona.jpg" class="rounded-circle img-foto" alt="...">
              <h5 class="color-0F2D3C">Carla Blacio</h5>
              <p >"Me encanta compartir momentos con mi mascota"</p>
              <p class="color-69D7B9">PROJECT MANAGER</p>
            </div>
            <div class="col-12 col-md-4 text-center">
              <img src="https://laboratoriosniam.com/wp-content/uploads/2018/07/michael-dam-258165-unsplash_WEB2.jpg" class="rounded-circle img-foto" alt="...">
              <h5 class="color-0F2D3C">Brenda Velazquez</h5>
              <p >"Las mascotas siempre han sido lo mas importante para nosotros"</p>
              <p class="color-69D7B9">DIRECTOR</p>
            </div>
            <div class="col-12 col-md-4 text-center pt-5">
              <img src="https://images.ecestaticos.com/vU8sC8tLdkx-2YYh1fkOGL8vfeY=/0x0:990x557/1200x900/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2F62c%2Fe5d%2F314%2F62ce5d3141c0b670144a692b7f6a21fa.jpg" class="rounded-circle img-foto" alt="...">
              <h5 class="color-0F2D3C">Jose Rodriguez</h5>
              <p >"Siempre me gusta convivir con mis mascotas"</p>
              <p class="color-69D7B9">PROGRAMADOR FULLSTACK</p>
              
            </div>

          </div>
        </div>
        <footer
          class="row row-cols-1 row-cols-sm-2 row-cols-md-5 py-5 my-5 border-top"
        >
          <div class="col mb-3">
            <h5>Redes Sociales</h5>
            <ul class="nav justify-content-start">
              <li class="nav-item mb-2 mx-2">
                <a href="#" class="nav-link p-0 text-body-secondary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-facebook"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"
                    />
                  </svg>
                </a>
              </li>
              <li class="nav-item mb-2 mx-2">
                <a href="#" class="nav-link p-0 text-body-secondary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-twitter"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334q.002-.211-.006-.422A6.7 6.7 0 0 0 16 3.542a6.7 6.7 0 0 1-1.889.518 3.3 3.3 0 0 0 1.447-1.817 6.5 6.5 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.32 9.32 0 0 1-6.767-3.429 3.29 3.29 0 0 0 1.018 4.382A3.3 3.3 0 0 1 .64 6.575v.045a3.29 3.29 0 0 0 2.632 3.218 3.2 3.2 0 0 1-.865.115 3 3 0 0 1-.614-.057 3.28 3.28 0 0 0 3.067 2.277A6.6 6.6 0 0 1 .78 13.58a6 6 0 0 1-.78-.045A9.34 9.34 0 0 0 5.026 15"
                    />
                  </svg>
                </a>
              </li>
              <li class="nav-item mb-2 mx-2">
                <a href="#" class="nav-link p-0 text-body-secondary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-instagram"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"
                    />
                  </svg>
                </a>
              </li>
              <li class="nav-item mb-2 mx-2">
                <a href="#" class="nav-link p-0 text-body-secondary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-linkedin"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </div>

          <div class="col mb-3"></div>

          <div class="col mb-3">
            <h5>Acerca de nosotros</h5>
            <ul class="nav flex-column">
              <li class="nav-item mb-2">
                <a href="#" class="nav-link p-0 text-body-secondary">Inicio</a>
              </li>
              <li class="nav-item mb-2">
                <a href="#" class="nav-link p-0 text-body-secondary"
                  >Nosotros</a
                >
              </li>
              <li class="nav-item mb-2">
                <a href="#" class="nav-link p-0 text-body-secondary">Visión</a>
              </li>
              <li class="nav-item mb-2">
                <a href="#" class="nav-link p-0 text-body-secondary"
                  >Historia</a
                >
              </li>
            </ul>
          </div>

          <div class="col mb-3">
            <h5>Legal</h5>
            <ul class="nav flex-column">
              <li class="nav-item mb-2">
                <a href="#" class="nav-link p-0 text-body-secondary"
                  >Términos y Condiciones</a
                >
              </li>
              <li class="nav-item mb-2">
                <a href="#" class="nav-link p-0 text-body-secondary"
                  >Política de Privacidad</a
                >
              </li>
              <li class="nav-item mb-2">
                <a href="#" class="nav-link p-0 text-body-secondary"
                  >Licencias</a
                >
              </li>
            </ul>
          </div>

          <div class="col mb-3">
            <h5>Ayuda</h5>
            <ul class="nav flex-column">
              <li class="nav-item mb-2">
                <a href="#" class="nav-link p-0 text-body-secondary">Soporte</a>
              </li>
              <li class="nav-item mb-2">
                <a href="#" class="nav-link p-0 text-body-secondary">FAQs</a>
              </li>
              <li class="nav-item mb-2">
                <a href="#" class="nav-link p-0 text-body-secondary"
                  >Contáctanos</a
                >
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, reactive, computed, watch } from "vue";
const animals = ref([]);
const numberElements = ref(9);
const actualPage = ref(0);
const getAnimals = async () => {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch("http://localhost:3000/pets/", requestOptions)
    .then((response) => response.json())
    .then((result) => (animals.value = result.data))
    .catch((error) => console.error(error));
};
const dataFiltred = computed(() => {
  return animals.value; //.filter((data) => data["group"].includes(search.value));
  //.filter((empresa) => empresa.id_organization <= 140);
});
onMounted(() => {
  getAnimals();
});
</script>
<style scoped>
.imagen-mid {
  bottom: 125px;
  height: 250px;
}
.card-pets {

  border-radius: 10px;
}
.card-image-pets {
  border-radius: 10px;
}
.img-logo, .img-foto {
  width: 100px;
  height: 100px;
}

</style>
