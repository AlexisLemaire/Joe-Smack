<template>
  <v-app>
    <v-app-bar app light class="navBar">
      <router-link to="/"><img src="https://i.ibb.co/fN1Tdsg/Joe-Smack2.jpg" id="logo"></router-link>
      <v-btn to="/recettes-list/entree">Entree</v-btn>
      <v-btn to="/recettes-list/plat">Plat</v-btn>
      <v-btn to="/recettes-list/patisserie" class="hidden-sm-and-down">Patisserie</v-btn>
      <v-btn to="/recettes-list/patisserie" class="hidden-md-and-up">Pat</v-btn>
      <v-btn to="/recettes-list/all">A-Z</v-btn>
      <v-btn to="/recette-create" width="1%"><v-icon>mdi-comment-plus-outline</v-icon></v-btn>
    </v-app-bar>

    <v-main id='v-main' :style="bgImage">
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      bgImage: {}
    }
  },

  created(){
    this.setBackground();
  },

  beforeUpdate(){
    this.setBackground();
  },

  methods: {
    setBackground(){
      if(window.screen.width < 600){
        switch (this.$route.params.type) {
          case "entree": this.bgImage = { backgroundImage: "url(https://i.ibb.co/tDpG2tk/entree-Phone.jpg)" }; break;
          case "plat": this.bgImage = { backgroundImage: "url(https://i.ibb.co/LrG9BzT/plat-Phone.jpg)" }; break;
          case "patisserie": this.bgImage = { backgroundImage: "url(https://i.ibb.co/5FZ1RdF/patisserie-Phone.jpg)" }; break;
          default: this.bgImage = { backgroundImage: "url(https://i.ibb.co/SRD5xsS/food-Phone.jpg)" }; break;
        }
      } else {
        switch (this.$route.params.type) {
          case "entree": this.bgImage = { backgroundImage: "url(https://i.ibb.co/SmX65RN/entree.jpg)" }; break;
          case "plat": this.bgImage = { backgroundImage: "url(https://i.ibb.co/nfRxZL9/plat.jpg)" }; break;
          case "patisserie": this.bgImage = { backgroundImage: "url(https://i.ibb.co/qW7StB9/patisserie.jpg)" }; break;
          default: this.bgImage = { backgroundImage: "url(https://i.ibb.co/LnDRNsm/aliments.jpg)" }; break;
        }
      }
    },
  },
};
</script>

<style scoped>
  .v-main{ background-size: 100% 100%; background-repeat: repeat-y; }
  .v-main div { margin-top: 1%; margin-bottom: 1%; }
  .v-btn{
    margin-left: 0.8%;
    width: 20%;
  }
  #logo{ 
    width: 100%; 
    height: 65px; 
    box-shadow: 3px 3px 3px black;;
  }

  .navBar{
    padding: 0.5%;
    height: 12% !important;
    background-color: aquamarine !important;
  }

  @media screen and (max-width: 660px) {
    .v-btn{
      margin-left: 1.5%;
      min-width: 1% !important;
      width: 17%;
    }

    #logo {
      height: 50px;
    }

    .navBar {
      height: 11% !important;
    }
  }
</style>
