# Titan-Atelier
A simple express app that simulates a user shopping experience on an ecommerce website. Displays product overview information, related products, and ratings & reviews of the selected product.


## Description
A user can
* Query another product by searching `ex. 66645` in search bar;
<!---Overview------------>
* Choose styles, switch style images, get an expanded view of the image, select size and quantity, and add to cart;
<!---Related Products---->
* View and compare characteristics against the current product.
* Save the current product as one of your outfits.
<!---Ratings & Reviews---->
* Read all reviews for a given product, see the aggregated review metrics for a product, sort the reviews based on "helpfulness", "relevance", or "newest", filter the reviews based on the number of stars, and add a review for the given product.


## Installation
1) You must have [nodeJs](https://nodejs.org/en/docs/) and [npm](https://docs.npmjs.com/) installed.

2) Clone repo locally
    ```
    git clone https://github.com/HR-FEC-Titan/FEC-Atelier.git
    ```

3) Go to the project's root directory
    ```
    cd /my/path/to/FEC-Atelier
    ```

4) Install packages
    ```
    npm install
    ```

5) Build webpack
    ```
    npm run build
    ```

6) Create a .env file and add github access token to a variable "API_KEY"
    `
    API_KEY = "YOUR GITHUB API KEY"
    `


7) Start the server
    ```
    node server/server.js
    ```

8) Verify the app is running by visiting http://localhost:3000.


## Tech Stack
  ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
  ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
  ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
  ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
  ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
  ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
  ![Bootstrap](https://img.shields.io/badge/bootstrap-%23563D7C.svg?style=for-the-badge&logo=bootstrap&logoColor=white)


## Contributors
  |        Widget        |    Contributor                                     |
  |:---------------------|:--------------------------------------------------:|
  | Product Information  |    [Xiaqing Xu](https://github.com/xuxiaqing2011)  |
  |   Related Products   |    [Viren Patel](https://github.com/vpatel89)      |
  |  Ratings & Reviews   |    [Fahad Syed](https://github.com/syed216)        |

