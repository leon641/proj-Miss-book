import HomePage from './pages/HomePage.js'
import AboutPage, {aboutBooks} from './pages/AboutPage.js'
import BookIndex from './pages/bookIndex.js'
import BookDetails from './pages/bookDetails.js'
import BookEdit from './pages/bookEdit.js'
import BookAdd from './cmps/bookAdd.js'




const { createRouter, createWebHashHistory } = VueRouter
const options = {
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: HomePage,
    },
    {
        path:'/book',
        component:BookIndex
    },
    {
        path:'/about',
        component:AboutPage,
        children: [
          {
            path:'books',
            component:aboutBooks
        },
        
        ]
    },
    {
        path:'/book/:bookId',
        component:BookDetails
    },
    {
        path:'/book/edit/:bookId?',
        component:BookEdit
    },
    {
        path:'/book/add/',
        component:BookAdd
    },
    {
      path: '/:catchAll(.*)',
      component: BookIndex
    }
  
  ],
}

export const router = createRouter(options)
