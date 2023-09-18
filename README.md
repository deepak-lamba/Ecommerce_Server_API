# Ecommerce server

## Overview
This is the ecommerse server made as per the following assignment:
![268768867-90a02476-068e-479b-a9db-be63dcb20762](https://github.com/deepak-lamba/Ecommerce_Server_API/assets/135522135/f0410fd3-6be9-455d-9c30-62ddc2991b9e)



## Commands
- To run the server, run: `npm install && npm start`
- To view the API documentation on SwaggerUI interface, open: `http://localhost:8080/docs`
- Request examples of some of supported POST endpoints (can use the SwaggerUI for quickly generating requests for all endpoints):
    1. Creating a user:
    ```
    curl -X 'POST'   'http://localhost:8080/user'   -H 'accept: */*'   -H 'Content-Type: application/json'   -d '{
      "username": "dl",
      "firstName": "deepak",
      "lastName": "lamba",
      "email": "dl11@iitbbs.ac.in",
      "password": "abc",
      "phone": "987654321"
    }'
    ```
    2. Login the user to get back UserId and AccessToken:
    ```
    curl -X 'GET'   'http://localhost:8080/user/login'   -H 'accept: application/json' -u "dl:abc"
    ```
    3. For ease, export the UserId and AccessToken as environment variables in terminal, and access all the authorization protected endpoints, say get user info:
    ```
    export USER_ID=<copy the user id returned in last step>
    export TOKEN=<copy the access token from last step>
    curl -H 'Accept: application/json' -H "Authorization: Bearer ${TOKEN}" http://localhost:8080/user/${USER_ID}
    ```
    4. See the list of (categories,)products and add one to your cart:
    ```
    curl -X GET "http://localhost:8080/products"
    curl -X POST "http://localhost:8080/cart/product/650897e21646d1dc9d5ef647" -H "Authorization: Bearer ${TOKEN}"
    ```
    5. Add same/new product again to see cart update/addition behavior:
    ```
    curl -X POST "http://localhost:8080/cart/product/650897e21646d1dc9d5ef647" -H "Authorization: Bearer ${TOKEN}"
    curl -X POST "http://localhost:8080/cart/product/650897e21646d1dc9d5ef649" -H "Authorization: Bearer ${TOKEN}"
    ```
    6. Delete a product from user cart:
    ```
    curl -X DELETE "http://localhost:8080/cart/product/650897e21646d1dc9d5ef649" -H "Authorization: Bearer ${TOKEN}"
    ```
    7. Review your cart, place an order, review the cart back to find it empty (if order success). Also check placed order and order history:
    ```
    curl -X GET "http://localhost:8080/cart" -H "Authorization: Bearer ${TOKEN}"
    curl -X POST "http://localhost:8080/order" -H "Authorization: Bearer ${TOKEN}"
    curl -X GET "http://localhost:8080/cart" -H "Authorization: Bearer ${TOKEN}"
    curl -X GET "http://localhost:8080/order/<order id returned from sub-step 2 above>" -H "Authorization: Bearer ${TOKEN}"
    curl -X GET "http://localhost:8080/orders" -H "Authorization: Bearer ${TOKEN}"
    ```
    6. Create multiple users and confirm that you are not able to access user information of other users with access info+resources (info, cart, orders) of any other user:
    ```
    curl -X 'POST'   'http://localhost:8080/user'   -H 'accept: */*'   -H 'Content-Type: application/json'   -d '{
      "username": "another_user",
      "firstName": "blah",
      "lastName": "blah",
      "email": "blah",
      "password": "blah",
      "phone": "987654321"
    }'
    curl -H 'Accept: application/json' -H "Authorization: Bearer ${TOKEN}" http://localhost:8080/user/<copy user id of the new user>
    ```

## Functionality included in the codebase:
1. Populating database with categories and products in [services/mock_database/mongo_db_population.js](services/mock_database/mongo_db_population.js)


## Implementation steps
1. Writing the API on Swagger editor, and autogenerating the corresponding Nodejs server codebase. Insight: While it may matter less for smaller projects like this, it is better to autogenerate codebase to ensure consistency among the API functionality, server/client implementations and documentation. However, it is better to use the standard [codegen utility from OpenApi](https://github.com/OpenAPITools/openapi-generator/tree/master/samples/server/petstore/nodejs-express-server) than the one in Swagger editor since the latter has [longstanding unresolved issues regarding middleware addition](https://github.com/bug-hunters/oas3-tools/issues/41), because of which the authentication step had to be individually prepending for protected endpoints in resp. controllers, instead of easily adding it once as a middleware.
2. Added business logic for each endpoint in [service](service) and tested using [mock local database](service/mock_database/mock_db.js). Having latter could also help with writing isolated e2e tests just for business logic.
3. Added mongodb to the project, the database state looks as follows:
![268768826-31daa732-2bb5-4cb7-9e6c-cafe79ce6883](https://github.com/deepak-lamba/Ecommerce_Server_API/assets/135522135/4e007b8a-22b7-4022-8401-9566d42838ff)


