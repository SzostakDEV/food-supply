const {FoodController} = require('../app/api/v1/food/FoodController');
const {UserController} = require('../app/api/v1/user/UserController');

const RouteTable = {
  "get": [
      {
          "path": "/food",
          acl:'logged',
          child: [
              {
                  path: "/",
                  "actions": [
                      FoodController.get
                  ],
                  args: [
                      "id"
                  ],
                  validArgs: true, // true by default
              },
              {
                  path: "/all",
                  "actions": [
                      FoodController.getAll
                  ],
                  args: [
                      "since"
                  ],
              }
          ]
      },
      {
          "path": "/user",
          acl:'logged',
          "actions": [
              UserController.get
          ],
          args: [
              "id"
          ],
      },
      {
          path: "/user/all",
          acl: 'logged',
          actions: [
              UserController.getAll
          ],
          args: [
              "since"
          ]
      },
      {
          path: "/user/auth",
          acl: 'guest',
          actions: [
              UserController.auth
          ],
          args: [
              "login", "password"
          ]
      }
  ],
  "post": [

  ],
  "put": [

  ]
};

module.exports = { RouteTable };