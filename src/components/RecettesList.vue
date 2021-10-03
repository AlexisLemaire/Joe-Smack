<template>
<div class="w-100">
  <div class="bg-white border border-dark p-3 w-100 d-flex justify-content-around">
    <v-autocomplete :items="this.recettes" item-text="title" v-model="recherche"></v-autocomplete>
    <v-btn @click="recherche = ''" class="m-2"><v-icon>mdi-close-circle</v-icon></v-btn>
  </div>
  <div v-for="(recette,index) in recettesSelected" :key="index" class="d-flex justify-content-center rc-item">
      <div class="w-100 text-center"> 
        <v-btn :to="'/recette/'+recette._id"> Recette : {{ recette.title }} </v-btn>
        <br /><br />
        <img :src="`${API}/img/${recette.imgName}`">
      </div>
  </div>
</div>
</template>

<script>
  import axios from 'axios';
  export default {
    data() {
      return {
        recettes: [],
        recettesSelected: [],
        recherche: "",
        API: process.env.VUE_APP_API,
      }
    },

		async created(){
      this.recettes = (await axios.get(`${process.env.VUE_APP_API}/Recettes/SelectByType/${this.$route.params.type}`)).data;
      await this.setRecetteSelected();
		},

    async updated() {
      this.recettes = (await axios.get(`${process.env.VUE_APP_API}/Recettes/SelectByType/${this.$route.params.type}`)).data;
      await this.setRecetteSelected();
		}, 

    methods: {
      setRecetteSelected() {     
        this.recettesSelected = this.recettes;
        for (let index = 0; index < this.recettes.length; index++) {
            if(!this.recettes[index].title.toLowerCase().includes(this.recherche.toLowerCase())){ 
              this.recettesSelected.splice(index, 1);
            } 
          }
        }
    },
  }
</script>

<style scoped>
  .rc-item{
    background-color: white;
    border-radius: 20%;
    margin: 1%;
    padding: 3%;
    border: 1px solid;
    width: 70%;
    margin-left: 15%;
    height: 400px;
  }

  img{
    height: 280px;
    width: 60%;
  }

  @media screen and (max-width: 960px) {
    .rc-item{
      height: 300px;
    }

    img{ 
      height: 190px; 
      width: 90%;
    }
  }
</style>
