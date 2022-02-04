//
import { HomePage } from '../pages/home-page'
import { DynamicPage } from '../pages/dynamic-page'
import { RequestAndLoad } from '../pages/request-and-load-page'

// use tag name as component
import '../pages/form-page.js'
import '../pages/about-page.js'
import '../pages/auto-init-page.js'

const routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/about/',
    component: 'about-page',
  },
  {
    path: '/form/',
    component: 'form-page',
  },
  {
    path: '/auto-init/',
    component: 'auto-init-page',
  },
  {
    path: '/dynamic-route/blog/:blogId/post/:postId/',
    async: function(routeTo, routeFrom, resolve, reject) {
      resolve(
        { component: DynamicPage },
        {
          hooks: {
            created() {
              console.log('async created')
            },
            beforeMount() {
              console.log('async beforeMount')
            },
            mounted() {
              console.log('async mounted')
            },
            beforeDestroy() {
              console.log('async beforeDestroy')
            },
            destroyed() {
              console.log('async destroyed')
            },
          },
        },
      )
    },
  },
  {
    path: '/request-and-load/user/:userId/',
    async: function(routeTo, routeFrom, resolve, reject) {
      // Router instance
      var router = this

      // App instance
      var app = router.app

      // Show Preloader
      app.preloader.show()

      // User ID from request
      var userId = routeTo.params.userId

      // Simulate Ajax Request
      setTimeout(function() {
        // We got user data from request
        var user = {
          firstName: 'Vladimir',
          lastName: 'Kharlampidi',
          about: 'Hello, i am creator of Framework7! Hope you like it!',
          links: [
            {
              title: 'Framework7 Website',
              url: 'http://framework7.io',
            },
            {
              title: 'Framework7 Forum',
              url: 'http://forum.framework7.io',
            },
          ],
        }
        // Hide Preloader
        app.preloader.hide()

        // Resolve route to load page
        resolve(
          {
            component: RequestAndLoad,
          },
          {
            context: {
              user: user,
            },
          },
        )
      }, 1000)
    },
  },
  {
    path: '(.*)',
    content: `<div class="page">
    <div class="navbar">
      <div class="navbar-inner sliding">
        <div class="left">
          <a href="#" class="link back">
            <i class="icon icon-back"></i>
            <span class="if-not-md">Back</span>
          </a>
        </div>
        <div class="title">Not found</div>
      </div>
    </div>
    <div class="page-content">
      <div class="block block-strong">
        <p>Sorry</p>
        <p>Requested content not found.</p>
      </div>
    </div>
  </div>`,
  },
]

export default routes
