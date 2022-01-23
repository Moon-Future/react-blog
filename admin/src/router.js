import Home from './page/home'
import Login from './page/login'
import ArticleList from './page/articleList'
import AddArticle from './page/addArticle'
import Category from './page/category'
import Tag from './page/tag'
import Welcome from './page/welcome'

const routes = [
  { path: '/login', component: Login },
  {
    path: '/',
    component: Home,
    children: [
      { path: '/articleList', component: ArticleList },
      { path: '/addArticle', component: AddArticle },
      { path: '/category', component: Category },
      { path: '/tag', component: Tag },
      { path: '/', component: Welcome },
    ],
  },
]

export default routes
