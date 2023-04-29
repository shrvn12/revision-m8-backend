## This is doccumentation for food delivery API

### 1. Overview
- This is an API for Food delivery system
- It includes users data, restaurants data, orders, menus etc.
- Basic API Endpoint: `https://revision-m8-backend.vercel.app/`
- All url's must be secure i'e `https://`
- This API uses token based authentication.

### 2. Users
- Registration
    - URL: `https://revision-m8-backend.vercel.app/api/register`
    - Method: `POST`
    - Parameters:

    ```
        {
            name: String,
            email: String,
            password: String,
            address:{
                street: String,
                city:New  String,
                state: String,
                country: String,
                zip: String
            }
        }
    ```

    - All parameters feilds are required
    - Responses:
        - 402(Missing Parameters): `{msg: please provide ...}`
        - 201(Created):`{msg:'Registration successful'}`,
        - 404(Not found):`{msg: 'Account already exists'}`


- Login
    - URL: `https://revision-m8-backend.vercel.app/api/login`
    - Method: `POST`
    - Parameters:

    ```
        {
            email: String,
            password: String,
        }
    ```

    - All parameters feilds are required
    - Responses:
        - 402(Missing Parameters): `{msg: please provide ...}`
        - 201(Created):`{msg:'Login successful'}`,
        - 404(Not found):`{msg: 'Account does not exists'}`

- Password Reset
    - URL: `https://revision-m8-backend.vercel.app/api/:id/reset`
    - Method: `POST`
    - Parameters:
        - id as params

        ```
            {
                currentPassword: string,
                newPassword: String
            }
        ```

    - All parameters feilds are required
    - Responses:
        - 402(Missing Parameters): `{msg: please provide ...}`
        - 201(Created):`{msg:'Password changed'}`,
        - 404(Not found):`{msg: 'Account does not exists'}`


### 3. Restaurant routes

- Get all restaurants
    - URL: `https://revision-m8-backend.vercel.app/api/restaurants`
    - Method: `GET`
    - Parameters: None
    - Responses:
        - 200(Ok):`{data...}`,

- Get all restaurants by Id
    - URL: `https://revision-m8-backend.vercel.app/api/restaurants/id`
    - Method: `GET`
    - Parameters: Id as params
    - Responses:
        - 200(Ok):`{data...}`,

- Get all restaurant's menu by Id
    - URL: `https://revision-m8-backend.vercel.app/api/restaurants/id/menu`
    - Method: `GET`
    - Parameters: Id as params
    - Responses:
        - 200(Ok):`{data...}`,

- Add restaurant's menu by Id
    - URL: `https://revision-m8-backend.vercel.app/api/restaurants/id/menu`
    - Method: `Post`
    - Parameters:
    ```
    {
        name: string,
        description: String,
        price: string,
        image: string
    }
    ```
    - All parameters feilds are required
    - Responses:
        - 204(No response)

- Delete restaurant's menu by Id
    - URL: `https://revision-m8-backend.vercel.app/api/restaurants/id/menu/:id`
    - Method: `Post`
    - Parameters: id as params
    - All parameters feilds are required
    - Responses:
        - 204(No response)

### 4. Orders

- Place an order
    - URL: `https://revision-m8-backend.vercel.app/api/orders`
    - Method: `Post`
    - Parameters:
    ```
        {
            email: String,
            restaurant: String,
            items: String,
            totalPrice: String,
            deliveryAddress:{
                street: String,
                city:New  String,
                state: String,
                country: String,
                zip: String
            }
        }
    ```
    - All parameters feilds are required
    - Responses:
        - 204(No response)

- get order by id
    - URL: `https://revision-m8-backend.vercel.app/api/orders/id`
    - Method: `GET`
    - Parameters: Id as params
    - Responses:
        - 200(Ok):`{data...}`,

- Update order status
    - URL: `https://revision-m8-backend.vercel.app/api/orders/id`
    - Method: `Patch`
    - Parameters: Id as params
    ```
    {
        status: String
    }
    ```
    - Responses:
        - 204(No response)