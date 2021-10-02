<template>
<div>
  <v-autocomplete :items="this.recettes" class="bg-white border border-dark p-3"></v-autocomplete>
  <div v-for="(recette,index) in recettes" :key="index" class="d-flex justify-content-center rc-item">
      <div> 
        <h4> {{ recette.title }} </h4>
        <v-btn :to="'/recette/'+recette._id"> Voir la recette </v-btn><br>
        <img :src="`${API}/img/${recette.imgName}`" height="200px" width="250px">
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
        type: this.$route.params.type,
        recherche: '',
        API: process.env.VUE_APP_API,
      }
    },

		async created(){
      this.recettes = (await axios.get(`${process.env.VUE_APP_API}/Recettes/SelectByType/patisserie`)).data;
		},

    async updated(){
      //SI RECHERCHE, ON SUPPRIME LES RECETTES NON RECHERCHEES
      if(this.recherche !== ''){
        for(let recette of this.recettes){
          if(!recette.title.toLowerCase().includes(this.recherche.toLowerCase())){ 
            let index = this.recettes.indexOf(recette);
            this.recettes.splice(index, 1);
          }
        }
      }

      //SINON, ON AFFICHE LES RECETTES SELON LE TYPE
      else {
        this.recettes = (await axios.get(`${process.env.VUE_APP_API}/Recettes/SelectByType/${this.type}`)).data;
      }
		},
    
  }
</script>

<style scoped>
  .rc-item{
    background-color: white;
    border-radius: 40%;
    padding: 1%;
    margin: 2%;
    border: 1px solid;
    width: 50%;
    margin-left: 20%;
  }

  @media screen and (max-width: 960px) {
    .rc-item{
      width: 96%;
      margin-left: 2%;
      padding: 9%;
    }

    img{ height: 180px; }
  }
</style>
