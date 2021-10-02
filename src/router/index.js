import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home'
import RecettesList from '../components/RecettesList'
import Recette from '../components/Recette'
import RecetteNew from '../components/RecetteNew'
import RecetteChange from '../components/RecetteChange'
import RecetteDelete from '../components/RecetteDelete'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/recettes-list/:type',
    name: 'RecettesList',
    component: RecettesList
  },
  {
    path: '/recette/:id',
    name: 'Recette',
    component: Recette
  },
  {
    path: '/recette-create',
    name: 'RecetteNew',
    component: RecetteNew
  },
  {
    path: '/recette-change/:id',
    name: 'RecetteChange',
    component: RecetteChange
  },
  {
    path: '/recette-delete/:id',
    name: 'RecetteDelete',
    component: RecetteDelete
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
