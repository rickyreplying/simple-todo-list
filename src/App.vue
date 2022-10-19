<template>
  <div class="container-lg">
    <h1 class="text-center w-75 mx-auto mt-3">To-Do List App</h1>
    <div v-if="loading">
      Lagi loading masukkin data bang.
    </div>
    <form @submit.prevent="add">
      <input type="hidden" v-model="form.id">
      <div class="input-group my-5 w-50 mx-auto">
        <input type="text" class="form-control" placeholder="Task name" aria-label="Task name"
          aria-describedby="button-addon2" v-model="form.title" required>
        <button class="btn btn-outline-secondary" type="submit" id="button-addon2" @click="checkInput()">Add
          task</button>
      </div>
    </form>

    <div class="container w-75 mx-auto">
      <div class="row">
        <div class="col-lg-4 col-md-4 my-2" v-for="todo in todos" :key="todo.id">
          <div class="card"
            :class="{'bg-warning': todo.status === 'On Progress', 'bg-success text-white': todo.status === 'Completed'}"
            style="max-width: 18rem;">
            <div class="card-header">Status : {{ todo.status }}</div>
            <div class="card-body">
              <p class="card-text"> {{ todo.title }}</p>
              <button type="button" class="btn btn-secondary m-1" data-bs-toggle="modal"
                data-bs-target="#staticBackdrop" @click="edit(todo)">
                Edit
              </button>
              <button type="buttom" class="btn btn-danger m-1" @click="deleteTask(todo)">Delete this task.</button>
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
              <textarea type="text" class="form-control" placeholder="Task name" aria-label="Task name"
                aria-describedby="button-addon2" v-model="todoSelected.title" required></textarea>

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
  'use strict';
  export default {
    data() {
      return {
        todos: [],
        todoSelected: {},
        form: {
          id: '',
          title: '',
          status: 'On Progress',
        },
        loading: false,
      }
    },
    mounted() {
      this.load()
    },
    methods: {
      load() {
        axios.get('http://localhost:4000/todos').then(res => {
          this.todos = res.data
        }).catch((err) => {
          console.log(err);
        })
      },
      add() {
        this.loading = true,
          setTimeout(() => {
            axios.post('http://localhost:4000/todos', this.form).then(res => {
              console.log(this.form)
              this.load()
              this.form.title = ''
            }).finally(() => {
              this.loading = false
            });
          }, 3000)
      },

      edit(todo) {
        this.todoSelected = todo;
      },

      async updateTask() {
        try {
          const res = await axios.put('http://localhost:4000/todos/' + this.todoSelected.id, {
            title: this.todoSelected.title,
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

      deleteTask(todo) {
        axios.delete('http://localhost:4000/todos/' + todo.id).then(res => {
          console.log(this)
          this.load()
        })
      }
    }
  }
</script>