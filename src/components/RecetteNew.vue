<template>
<div id="main">
	<v-form v-model="isValid" dark>
		<v-text-field label='Clef Secrete' v-model='body.secretKey' required :rules="requiredRules" />
		<v-text-field label='Titre' v-model='body.title' required :rules="requiredRules" />
		<v-select label='Type' v-model='body.type' outlined :items="items" required :rules="requiredRules" />
		<v-text-field label='Prix' type='number' v-model='body.prix' required :rules="requiredRules" />
		<v-text-field label='Temps de préparation (en minutes)' type='number' v-model='body.prepDuration' required :rules="requiredRules" />
    <v-text-field label='Nombre de personnes' type='number' v-model='body.nbPersonnes' required :rules="requiredRules" />

		<v-text-field label='Ingredients' v-model='ingredient' append-icon="mdi-flask-empty-plus-outline" @click:append="setIngredient(ingredient)" />
		<span v-for="(ing,index) in body.ingredients" :key="index"> 
			{{ ing }} <v-icon @click="setIngredient(ing)">mdi-flask-empty-remove-outline</v-icon> 
		</span>
    <br />

		<v-file-input label='Illustration' v-model='body.file' /><br>

		<strong> Recette: </strong>
		<VueQuillEditor v-model="body.text" :container="container" /><br>

		<v-btn @click="enregistrer()" :disabled='!isValid'> Ajouter la recette </v-btn>
	</v-form>
	<br />
	<v-alert v-if="rep && !rep.error" text color="green"> La recette a bien été créée </v-alert>
	<v-alert v-if="rep && rep.error" text color="red"> {{ rep.error }} </v-alert>
</div>
</template>

<script>
  import axios from 'axios';
  import VueQuillEditor from 'vue-quill-textarea';
 
  export default {
	components: {
		VueQuillEditor,
	},

  data() {
    return {
      isValid: false,
      items: ['entree','plat','patisserie'],
      ingredient: undefined,
      body: { ingredients: [] },
      rep: undefined,
      requiredRules: [v => !!v || 'Le champ est requis'],
      container: [ 
        ['bold', 'italic', 'underline'], 
        [{'list': 'ordered'}], [{'color': 
        ['red','blue','green','dark','grey','orange','yellow','pink']}] 
      ],
    }
  },

	methods: {
		async enregistrer(){
			await (this.body.imgName = this.body.file ? this.body.file.name : "")
			this.rep = (await axios.post(`${process.env.VUE_APP_API}/Recettes/Create`, this.body)).data; 
			await this.uploadImg();
		},

		uploadImg(){
			let formData = new FormData();
			formData.append('file', this.body.file);
			axios.post(`${process.env.VUE_APP_API}/Recettes/UploadImg`, formData, { headers: { 'Content-Type': 'multipart/form-data'} });
		},

		setIngredient(ingredient){
			let indexIngredient = this.body.ingredients.indexOf(ingredient);
			if(indexIngredient === -1){ this.body.ingredients.push(ingredient); }
			if(indexIngredient !== -1){ this.body.ingredients.splice(indexIngredient, 1); }
		}
	},
  }
</script>

<style scoped>
	#main{
		background-color: white;
		border: aquamarine 4px solid;
		margin-top: 1%;
		padding: 5%;
		border-radius: 10%;
		text-align: center;
	}

	span{ 
		border: 1px solid black;
		padding: 1%;
		margin-left: 1%;
	}

	@media screen and (max-width: 960px) {
    #main{
      padding: 8%;
    }
  }
</style>
