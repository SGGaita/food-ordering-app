const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const restaurantController = require('../controllers/restaurantController');
//const ordersController = require('../controllers/ordersController');
//const paymentController = require('../controllers/paymentController');
const authenticationController = require('../controllers/authController');
//const customerController = require('../controllers/customerController')

/************************************************/
/*                  Table of Contents           */
/************************************************/
/* 

   1. Authentication Endpoints
    a. Register new system User
    b. Login User
    c. Register new customer
    d. Login Customer 
   2. Product Endpoints *Imported from productsController
    a. Get all Products
    b. Get single product by product id
    c. Get products by category
    d. Get all categories
    e. Get food subcategories
    f. Get drink subcategories
   3. Supplier Endpoints *Imported from supplierController 
    a. Get all Suppliers
    b. Get supplier by Id
   4. Order Endpoints 
   5. Payment Endpoints
*/    

/*####################################################################*/

//1. Authentication Endpoints
// Register new Customer account
//router.post('/register', authenticationController.addNewUser);
// Login Customer
//router.post('/login', authenticationController.loginUser );
// Register new Customer account
router.post('/register_customer', authenticationController.addNewCustomer);
// Login Customer
router.post('/login_customer', authenticationController.loginCustomer );
//c. Customer account verification
router.get('/activation/:custID', authenticationController.accountActivationCustomer)


/*####################################################################*/

//2. Customer Endpoints
//a. Get all customers
//router.get('/customers_add', customerController.getAllCustomers);
//b. Get customer infomation
//router.get('/customers/:custId',customerController.getCustomerById)


/*####################################################################*/

//3. Product Endpoints
//a. Get all products
router.get ('/products', productsController.getAllProducts)
//b. Get one product by Product ID
//router.get ('/products/:prodId', productsController.getProductById)
//b. Get one product by SUpplier ID
router.get ('/products/supplier/:supId', productsController.getProductBySupplierId)
//c. Get products by category
//router.get('/category/:catName', productsController.getProductsByCat)
//d. Get categories
router.get('/categories', productsController.getCategories)
//e. Get subcategories in food category
//router.get('/category_food', productsController.getFoodCategories)
//f. Get subcategories in drink category
//router.get('/category_drinks', productsController.getDrinkCategories);

/*####################################################################*/

//4. Supplier Endpoints 
//a. Get all suppliers
router.get('/suppliers', restaurantController.getAllRestaurants );
//b. Get supplier by id
router.get('/suppliers/:supId', restaurantController.getRestaurantById);

/*####################################################################*/

//5. Order Endpoints
//a. Get all orders
//router.get('/orders', ordersController.getAllOrders);
//b. Get order by Id
//router.get('/orders/:id', ordersController.getOrderById );
//c: Get latest orders by customer id
//router.get('/order_latest/:id',ordersController.getLatestOrders)
//d. Add new order
//router.post('/orders/new', ordersController.addNewOrder);


/*####################################################################*/

//6. Payment Endpoints
//router.get('/payment-modes', paymentController.getAllPaymentModes)
//payment checkot
//router.post('/payment', paymentController.paymentGetway)

module.exports = router;