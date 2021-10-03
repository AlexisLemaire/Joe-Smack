<template>
<div class="rc-item">
  <v-btn :to="'/recette-delete/'+recette._id" dark block class="my-1"> Supprimer </v-btn>
  <v-btn :to="'/recette-change/'+recette._id" dark block> Modifier </v-btn><br>

  <div class="d-flex justify-content-center">
    <div>
      <h2> {{ recette.title }} </h2>
      <img :src="API+'/img/'+recette.imgName"> <br><br><br>
      <strong> Type: </strong> {{ recette.type }}  <br>
      <strong> Prix: </strong> {{ recette.prix }}€ <br>
      <strong> Ingrédients: </strong>              
      <span v-for="(ingredient,index) in recette.ingredients" :key="index"> {{ ingredient }} ,</span> <br><br><br>

      <h2> Recette : </h2><br>
      <div v-html="recette.text"></div>
    </div>
  </div>
</div>
</template>

<script>
  import axios from 'axios';
  export default {
    data() {
      return {
        recette: {},
        API: process.env.VUE_APP_API
      }
    },

		async created(){
			this.recette = (await axios.get(`${process.env.VUE_APP_API}/Recettes/SelectOne/${this.$route.params.id}`)).data;
		},
  }
</script>

<style scoped>
  .rc-item{
    background-color: white;
    border-radius: 10%;
    padding: 5%;
    border: 1px solid;
    width: 94%;
    margin-left: 3%;
    margin-top: 1%;
  }

  img {
    height: 460px;
    width: 650px;
  }

  h2 { text-align: center; }

  @media screen and (max-width: 960px) {
    .rc-item {
      width: 94%;
      margin-left: 3%;
      padding: 10%;
    }

    img { 
      height: 180px; 
      width: 250px; 
    }
  }
</style>
