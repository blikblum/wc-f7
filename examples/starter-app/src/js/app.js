import $$ from 'dom7'
import Framework7 from '../../../../bundle.js'

// Import Routes
import routes from './routes.js'

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
