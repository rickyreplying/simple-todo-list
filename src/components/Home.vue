<template>
  <div class="container-lg">
    <h1 class="text-center w-75 mx-auto mt-3">To-Do List App</h1>
    <div v-if="loading" class="text-center">
      Lagi loading masukin data bang.
    </div>

    <form @submit.prevent="add">
      <input type="hidden" v-model="form.id">
      <div class="my-5 w-75 mx-auto bg-light p-5 rounded">
        <div class="input-group mb-3">
          <span class="input-group-text w-40" id="basic-addon3">Task Title</span>
          <input type="text" class="form-control" v-model="form.title" required>
        </div>
        <div class="input-group">
          <span class="input-group-text">Task Description</span>
          <textarea class="form-control" v-model="form.description"></textarea>
        </div>
        <button class="btn btn-outline-secondary mt-2 w-100" type="submit">Add
          task</button>
      </div>
    </form>





    <div class="container w-75 mx-auto">
      <div class="row">
        <div class="col-lg-4 col-md-6 my-2" v-for="todo in todos" :key="todo.id">

          <div class="card"
            :class="{'bg-warning': todo.status === 'On Progress', 'bg-success text-white': todo.status === 'Completed'}"
            style="max-width: 18rem;">
            <div class="card-header">
              Status : {{ todo.status }}
              <router-link :to="/detail/ + todo.id">
                Detail
              </router-link>

            </div>
            <div class="card-body">
              <h5 class="card-title"> {{ todo.title }}</h5>
              <!-- <p class="card-text"> {{ todo.description }}</p> -->

              <button type="button" class="btn btn-secondary btn-sm m-1" data-bs-toggle="modal"
                data-bs-target="#staticBackdrop" @click="edit(todo)">
                Edit Task
              </button>
              <button type="buttom" class="btn btn-danger btn-sm m-1" @click="deleteTask(todo)">Delete task</button>


            </div>
          </div>

        </div>
      </div>
    </div>


    <form>
      <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">Edit Task</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="input-group mb-3">
                <span class="input-group-text w-40" id="basic-addon3">Task Title</span>
                <input type="text" class="form-control" v-model="todoSelected.title" required>
              </div>
              <div class="input-group">
                <span class="input-group-text">Task Description</span>
                <textarea class="form-control" v-model="todoSelected.description"></textarea>
              </div>

              <h5 class="mt-2">Status: </h5>

              <div class="form-check">
                <input class="form-check-input" type="radio" name="on-progress" id="on-progress" value="On Progress"
                  v-model="todoSelected.status">
                <label class="form-check-label" for="on-progress">
                  On Progress
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="on-progress" id="on-progress" value="Completed"
                  v-model="todoSelected.status">
                <label class="form-check-label" for="completed">
                  Completed
                </label>
              </div>

            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" ref="Close" class="btn btn-primary" id="submitupdate" @click="updateTask()"
                data-bs-dismiss="modal" :disabled="!todoSelected.title || !todoSelected.status ">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>


<script>
  import axios from 'axios';
  export default {
    data() {
      return {
        todos: [],
        todoSelected: {},
        form: {
          id: '',
          title: '',
          status: 'On Progress',
          description: '',
        },
        loading: false,
      }
    },
    mounted() {
      this.load();
    },

    methods: {
      async load() {
        try {
          const res = await axios.get('http://localhost:4000/todos');
          this.todos = res.data
        } catch (err) {
          console.log(err);
        }
      },

      async add() {
        try {
          this.loading = true;
          this.form.title = this.form.title.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(' ');

          const res = await axios.post('http://localhost:4000/todos', this.form)
          console.log(this.form);
          this.load();
          this.form.title = '';
          this.form.description ='';

        } catch(err) {
          console.log(err);
        } finally {
          this.loading = false;
        }
      },


      // add() {
      //   this.loading = true,
      // 
      //    
      //       
      //   setTimeout(() => {
      //     axios.post('http://localhost:4000/todos', this.form).then(res => {
      //       console.log(this.form);
      //       this.load()
      //       this.form.title = '';
      //       this.form.description = '';
      //     }).finally(() => {
      //       this.loading = false
      //     });
      //   }, 3000)
      // },

      edit(todo) {
        console.log(todo.description);
        this.todoSelected = todo;

      },

      async updateTask() {
        try {
          const res = await axios.put('http://localhost:4000/todos/' + this.todoSelected.id, {
            title: this.todoSelected.title,
            description: this.todoSelected.description,
            status: this.todoSelected.status
          });
          console.log(this.todos);
          console.log(this.todoSelected);
          this.load();
          this.todoSelected = {}

        } catch (err) {
          console.log(err);
        }
      },

      async deleteTask(todo) {
        try {
          const res = await axios.delete('http://localhost:4000/todos/' + todo.id);

          this.load();
        } catch (err) {
          console.log(err);
        }
      }
    },


  }
</script>


<style>

</style>