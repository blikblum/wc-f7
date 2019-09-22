import $$ from 'dom7'
import Framework7 from 'wc-f7'

import Dialog from 'framework7/components/dialog/dialog'
import Login from 'framework7/components/login-screen/login-screen'
import Panel from 'framework7/components/panel/panel'
import Popup from 'framework7/components/popup/popup'
import Preloader from 'framework7/components/preloader/preloader'

// Import F7 Styles
import 'framework7/css/framework7.bundle.css'

// Import Icons and App Custom Styles
import '../css/icons.css'
import '../css/app.css'

// Import Routes
import routes from './routes.js'

Framework7.use([Dialog, Login, Panel, Popup, Preloader])

var app = new Framework7({
  root: '#app', // App root element

  name: 'Hello World', // App name
  theme: 'auto', // Automatic theme detection
  // App root data
  data: function() {
    return {
      user: {
        firstName: 'John',
        lastName: 'Doe',
      },
    }
  },
  // App root methods
  methods: {
    helloWorld: function() {
      app.dialog.alert('Hello World!')
    },
  },
  // App routes
  routes: routes,
})

// Login Screen Demo
$$('#my-login-screen .login-button').on('click', function() {
  var username = $$('#my-login-screen [name="username"]').val()
  var password = $$('#my-login-screen [name="password"]').val()

  // Close login screen
  app.loginScreen.close('#my-login-screen')

  // Alert username and password
  app.dialog.alert('Username: ' + username + '<br>Password: ' + password)
})
