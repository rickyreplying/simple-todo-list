<template>
    <div>
      <h1>To-Do List App</h1>
      <form @submit.prevent="add">
        <input type="hidden" v-model="form.id"> 
        <input type="text" v-model="form.title" required>
        <div v-show="updateSubmit">
        <p>Status: </p>
        <input type="radio" name="on-progress" id="on-progress" value="On Progress" v-model="form.status">
        <label for="on-progress">On Progress</label><br>
        <input type="radio" name="status" id="completed" value="Completed" v-model="form.status">
        <label for="completed">Completed</label>
        </div>
         
        <button type="submit" v-show="!updateSubmit">add</button>
        <button type="button" v-show="updateSubmit" @click="updateTask(form)">Update</button>  
      </form>
      <ul v-for="todo in todos" :key="todo.id">
        <li>
        <span>{{todo.title}} | Status : {{todo.status}}</span> &#160;
      
        <button @click="edit(todo)">Edit Task</button> 
        <button @click="deleteTask(todo)">Delete this task.</button>
        </li>
      </ul>
    </div>
</template>


<script>
import axios from 'axios'
'use strict';
export default {
  data(){
    return{
        todos: [],
        form: {
          id: '',
          title: '',
          status: 'On Progress'
        },
        updateSubmit: false
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    load(){
        axios.get('http://localhost:4000/todos').then(res => {
        this.todos = res.data //respon dari rest api dimasukan ke users
        console.log(this.todos);
      }).catch ((err) => {
        console.log(err);
      })
    },

    
    add(){
          axios.post('http://localhost:4000/todos', this.form).then(res => {
              console.log(this.form)
              this.load()
              this.form.title = ''
          })
    },

    edit(todo) {
      this.updateSubmit = true
      this.form.id = todo.id 
      this.form.title = todo.title
      this.form.status = todo.status
    },

    
    updateTask(form){
      return axios.put('http://localhost:4000/todos/' + form.id ,{title: this.form.title, status: this.form.status}, ).then(res => {
        console.log(this.form.status);
        this.load()
        this.form.id = ''
        this.form.title = ''
        this.updateSubmit = false
      }).catch((err) => {
        console.log(err);
        
      })
    },

    deleteTask(todo) {
      axios.delete('http://localhost:4000/todos/' + todo.id).then(res =>{
          this.load()
      })
    }
   }
  }


</script>
