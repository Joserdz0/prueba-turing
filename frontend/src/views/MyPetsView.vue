<template>
  <div class="container-fluid">
    <Navbar />
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-12 table-responsive" v-if="funcionActual == 0">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">name</th>
                <th scope="col">age</th>
                <th scope="col">type</th>
                <th scope="col">breed</th>
                <th scope="col">description</th>
                <th scope="col">vaccinated</th>
                <th scope="col">neutered</th>
                <th scope="col">img</th>
                <th scope="col">actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(animal, index) in dataFiltred.slice(
                  actualPage * numberElements,
                  (actualPage + 1) * numberElements
                )"
                :key="index"
              >
                <td>{{ animal.name }}</td>
                <td>{{ animal.age }}</td>
                <td>{{ animal.type }}</td>
                <td>{{ animal.breed }}</td>
                <td>{{ animal.description }}</td>
                <td>{{ animal.vaccinated }}</td>
                <td>{{ animal.neutered }}</td>
                <td>{{ animal.img }}</td>
                <td>
                  <div class="d-flex">
                    <button class="btn mx-2 p-1 btn-primary"
                      @click="sectionEdit(animal.id)">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-pencil"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"
                        />
                      </svg>
                    </button>
                    <button
                      class="btn mx-2 p-1 btn-danger"
                      @click="deleteAnimal(animal.id)"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-trash"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"
                        />
                        <path
                          d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td colspan="9" class="text-center">
                  <button
                    class="btn btn-warning p-1 text-white"
                    @click="funcionActual = 1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-file-plus"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M8.5 6a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V10a.5.5 0 0 0 1 0V8.5H10a.5.5 0 0 0 0-1H8.5z"
                      />
                      <path
                        d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col-12 col-md-12" v-if="funcionActual == 0">
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
        <div class="col-12 mb-5">
          <div v-if="funcionActual == 1">
            <form>
              <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input
                  v-model="nameCreate"
                  type="text"
                  class="form-control"
                  id="name"
                />
              </div>
              <div class="mb-3">
                <label for="age" class="form-label">Age</label>
                <input
                  v-model="ageCreate"
                  type="number"
                  class="form-control"
                  id="age"
                />
              </div>
              <div class="mb-3">
                <label for="type" class="form-label">Type</label>
                <input
                  v-model="typeCreate"
                  type="text"
                  class="form-control"
                  id="type"
                />
              </div>
              <div class="mb-3">
                <label for="breed" class="form-label">Breed</label>
                <input
                  v-model="breedCreate"
                  type="text"
                  class="form-control"
                  id="breed"
                />
              </div>
              <div class="mb-3">
                <label for="description" class="form-label">Description</label>
                <input
                  v-model="descriptionCreate"
                  type="text"
                  class="form-control"
                  id="description"
                />
              </div>
              <div class="mb-3">
                <label for="vaccinated" class="form-label">Vaccinated</label>

                <input
                  v-model="vaccinatedCreate"
                  type="checkbox"
                  class="form-check-input ms-2"
                  id="vaccinated"
                />
              </div>
              <div class="mb-3">
                <label for="neutered" class="form-label">Neutered</label>
                <input
                  v-model="neuteredCreate"
                  type="checkbox"
                  class="form-check-input ms-2"
                  id="neutered"
                />
              </div>
              <div class="mb-3">
                <label for="img" class="form-label">Img</label>
                <input
                  v-model="imgCreate"
                  type="text"
                  class="form-control"
                  id="img"
                />
              </div>
              <button
                type="button"
                class="btn btn-danger me-1"
                @click="funcionActual = 0"
              >
                Cancel
              </button>

              <button
                type="button"
                class="btn btn-primary"
                @click="createAnimal"
              >
                Create
              </button>
            </form>
          </div>
        </div>
        <div class="col-12 mb-5">
          <div v-if="funcionActual == 2">
            <form>
              <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input
                  v-model="nameUpdate"
                  type="text"
                  class="form-control"
                  id="name"
                />
              </div>
              <div class="mb-3">
                <label for="age" class="form-label">Age</label>
                <input
                  v-model="ageUpdate"
                  type="number"
                  class="form-control"
                  id="age"
                />
              </div>
              <div class="mb-3">
                <label for="type" class="form-label">Type</label>
                <input
                  v-model="typeUpdate"
                  type="text"
                  class="form-control"
                  id="type"
                />
              </div>
              <div class="mb-3">
                <label for="breed" class="form-label">Breed</label>
                <input
                  v-model="breedUpdate"
                  type="text"
                  class="form-control"
                  id="breed"
                />
              </div>
              <div class="mb-3">
                <label for="description" class="form-label">Description</label>
                <input
                  v-model="descriptionUpdate"
                  type="text"
                  class="form-control"
                  id="description"
                />
              </div>
              <div class="mb-3">
                <label for="vaccinated" class="form-label">Vaccinated</label>

                <input
                  v-model="vaccinatedUpdate"
                  type="checkbox"
                  class="form-check-input ms-2"
                  id="vaccinated"
                />
              </div>
              <div class="mb-3">
                <label for="neutered" class="form-label">Neutered</label>
                <input
                  v-model="neuteredUpdate"
                  type="checkbox"
                  class="form-check-input ms-2"
                  id="neutered"
                />
              </div>
              <div class="mb-3">
                <label for="img" class="form-label">Img</label>
                <input
                  v-model="imgUpdate"
                  type="text"
                  class="form-control"
                  id="img"
                />
              </div>
              <button
                type="button"
                class="btn btn-danger me-1"
                @click="funcionActual = 0"
              >
                Cancel
              </button>

              <button
                type="button"
                class="btn btn-primary"
                @click="updateAnimal"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script setup>
import Navbar from "../components/Navbar.vue";
import { useSessionStore } from "../stores/session";
import { ref, onMounted, reactive, computed, watch } from "vue";
const SessionStore = useSessionStore();
const animals = ref([]);
const numberElements = ref(9);
const actualPage = ref(0);
const funcionActual = ref(0);
// variables de create
const nameCreate = ref("");
const ageCreate = ref("");
const typeCreate = ref("");
const breedCreate = ref("");
const descriptionCreate = ref("");
const vaccinatedCreate = ref(false);
const neuteredCreate = ref(false);
const imgCreate = ref("");
// variables de update
const nameUpdate = ref("");
const ageUpdate = ref("");
const typeUpdate = ref("");
const breedUpdate = ref("");
const descriptionUpdate = ref("");
const vaccinatedUpdate = ref(false);
const neuteredUpdate = ref(false);
const imgUpdate = ref("");
const idUpdate = ref(0);
const getAnimals = async () => {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(
    `http://localhost:3000/pets/?user_id=${SessionStore.id_user}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => (animals.value = result.data))
    .catch((error) => console.error(error));
};
const sectionEdit = (id) => {
  funcionActual.value = 2;
    const datoPet = animals.value.filter((data) => data["id"] == id);
    idUpdate.value = datoPet[0].id;
    nameUpdate.value = datoPet[0].name;
    ageUpdate.value = datoPet[0].age;
    typeUpdate.value = datoPet[0].type;
    breedUpdate.value = datoPet[0].breed;
    descriptionUpdate.value = datoPet[0].description;
    vaccinatedUpdate.value = datoPet[0].vaccinated;
    neuteredUpdate.value = datoPet[0].neutered;
    imgUpdate.value = datoPet[0].img;
};
const deleteAnimal = async (id) => {
  const requestOptions = {
    method: "DELETE",
    redirect: "follow",
  };

  fetch(`http://localhost:3000/pets/${id}`, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      getAnimals();
    })
    .catch((error) => console.error(error));
};
const createAnimal = async () => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    name: nameCreate.value,
    age: ageCreate.value,
    type: typeCreate.value,
    breed: breedCreate.value,
    user_id: SessionStore.id_user,
    description: descriptionCreate.value,
    vaccinated: vaccinatedCreate.value ? 1 : 0,
    neutered: neuteredCreate.value ? 1 : 0,
    img: imgCreate.value,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("http://localhost:3000/pets/create/", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      getAnimals();
      funcionActual.value = 0;
      nameCreate.value = "";
      ageCreate.value = "";
      typeCreate.value = "";
      breedCreate.value = "";
      descriptionCreate.value = "";
      vaccinatedCreate.value = false;
      neuteredCreate.value = false;
      imgCreate.value = "";
    })
    .catch((error) => console.error(error));
};
const updateAnimal = async () => {
    const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
    name: nameUpdate.value,
    age: ageUpdate.value,
    type: typeUpdate.value,
    breed: breedUpdate.value,
    user_id: SessionStore.id_user,
    description: descriptionUpdate.value,
    vaccinated: vaccinatedUpdate.value ? 1 : 0,
    neutered: neuteredUpdate.value ? 1 : 0,
    img: imgUpdate.value,
});

const requestOptions = {
  method: "PUT",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch(`http://localhost:3000/pets/${idUpdate.value}`, requestOptions)
  .then((response) => response.text())
  .then((result) => {
    getAnimals();
    funcionActual.value = 0;
    nameUpdate.value = "";
    ageUpdate.value = "";
    typeUpdate.value = "";
    breedUpdate.value = "";
    descriptionUpdate.value = "";
    vaccinatedUpdate.value = false;
    neuteredUpdate.value = false;
    imgUpdate.value = "";
  })
  .catch((error) => console.error(error));
};
const dataFiltred = computed(() => {
  return animals.value; 
});
onMounted(() => {
  getAnimals();
});
</script>
  
  <style>
</style>