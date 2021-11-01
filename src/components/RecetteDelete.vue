<template>
<div id="main">
	<h1 class="h3 mb-3 font-weight-normal">Supprimer la recette : <strong>{{ recette.title }}</strong></h1>
	<strong>
		Vous pouvez ajouter supprimer la recette selectionnée via cette page. La recette ne sera supprimée que si vous possedez la bonne clef secrète.
	</strong> <br /><br />
	<v-form v-model="isValid" dark>
		<v-text-field label='Clef Secrete' v-model='secretKey' required :rules="requiredRules" />
		<v-btn @click="enregistrer()" :disabled="!isValid"> Supprimer la recette </v-btn>
	</v-form>
	<br />
	<v-alert v-if="rep && rep.error" text color="red"> {{ rep.error }} </v-alert>
</div>
</template>

<script>
  import axios from 'axios';
  export default {
	data() {
      return {
		isValid: false,
		rep: undefined,
		requiredRules: [v => !!v || 'Le champ est requis'],
		secretKey: "",
		recette: {}
      }
    },

	async created(){
		this.recette = (await axios.get(`${process.env.VUE_APP_API}/Recettes/SelectOne/${this.$route.params.id}`)).data;
	},

	methods: {
		async enregistrer(){
			this.rep = (await axios.delete(`${process.env.VUE_APP_API}/Recettes/DeleteOne/${this.$route.params.id}/${this.secretKey}`)).data;
			if(this.rep.error === undefined){
				await location.replace('/');
			}
		},
	},
  }
</script>

<style scoped>
	#main{
		background-color: white;
		border: aquamarine 4px solid;
		margin-top: 1%;
		padding: 5%;
		border-radius: 20%;
		text-align: center;
	}

	@media screen and (max-width: 960px) {
    #main{
      padding: 8%;
    }
  }
</style>
