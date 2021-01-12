const express = require('express');
const router = express.Router();
const {database} = require('../config/db_mysqli');

//Get all products
const getAllProducts = (req, res)=> { // Sending Page Query Parameter is mandatory http://localhost:3636/api/products?page=1
    let page = (req.query.page !== undefined && req.query.page !== 0) ? req.query.page : 1;
    const limit = (req.query.limit !== undefined && req.query.limit !== 0) ? req.query.limit : 10; // set limit of items per page
    let startValue;
    let endValue;
    if (page > 0) {
        startValue = (page * limit) - limit; // 0, 10, 20, 30
        endValue = page * limit; // 10, 20, 30, 40
    } else {
        startValue = 0;
        endValue = 10;
    }

    console.log("All products")
    database.table('product as p')
        .join([{
                table: "product_category as c",
                on: `c.id_product_cat = p.id_product_cat_fk`
            },
            {
                table: "product_sub_category as s",
                on: `s.id_product_sub_cat = p.id_product_sub_cat_fk`
            },
            {
                table: "suppliers as r",
                on: `r.id_supplier = p.id_supplier_fk`
            }
        ])
        .withFields(['c.id_product_cat',
            'c.prod_category_name as category',
            's.id_product_sub_cat',
            's.sub_name as subcategory',
            'r.id_supplier',
            'r.supplier_name as store',
            'p.id_product',
            'p.product_name',
            'p.product_price',
            'p.quantity',
            'p.product_description',
            'p.image',

        ])
        .slice(startValue, endValue)
        .sort({
            id_product: .1
        })
        .getAll()
        .then(prods => {
            if (prods.length > 0) {
                res.status(200).json(prods);
            } else {
                res.json({
                    message: "No products found"
                });
            }
        })
        .catch(err => console.log(err));
}

//Get product by product id
const getProductById = (req, res) => {
    let productId = req.params.prodId;
    database.table('product as p')
    .join([{
            table: "product_category as c",
            on: `c.id_product_cat = p.id_product_cat_fk`
        },
        {
            table: "product_sub_category as s",
            on: `s.id_product_sub_cat = p.id_product_sub_cat_fk`
        },
        {
            table: "suppliers as r",
            on: `r.id_supplier = p.id_supplier_fk`
        }
    ])
    .withFields(['c.id_product_cat',
        'c.prod_category_name as category',
        's.id_product_sub_cat',
        's.sub_name as subcategory',
        'r.id_supplier',
        'r.supplier_name as store',
        'p.id_product',
        'p.product_name',
        'p.product_price',
        'p.quantity',
        'p.product_description',
        'p.image',
        'p.images'

    ])
        .filter({
            'p.id_product': productId
        })
        .get()
        .then(prod => {
            console.log(prod);
            if (prod) {
                res.status(200).json(prod);
            } else {
                res.json({
                    message: `No product found with id ${productId}`
                });
            }
        }).catch(err => res.json(err));
}

//Get products by category
const getProductsByCat = (req, res) => { // Sending Page Query Parameter is mandatory http://localhost:3636/api/products/category/categoryName?page=1

    // Get category title value from param
    const cat_title = req.params.catName;

    database.table('product as p')
        .join([{
            table: "product_category as c",
            on: `c.id_product_cat = p.id_product_cat_fk `},
             {
                table: "product_sub_category as s",
                on: `s.id_product_sub_cat = p.id_product_sub_cat_fk`},
            {
                table: "suppliers as r",
                on: `r.id_supplier = p.id_supplier_fk 
                WHERE c.prod_category_name LIKE '%${cat_title}%'`
            }
        ])
        .withFields(['c.id_product_cat',
            'c.prod_category_name',
            's.id_product_sub_cat',
            's.sub_name as subcategory',
            'r.id_supplier',
            'r.supplier_name as store',
            'p.id_product',
            'p.product_name',
            'p.product_price',
            'p.quantity',
            'p.product_description',
            'p.image',
    
        ])
        .sort({
            id_product: 1
        })
        .getAll()
        .then(prods => {
            if (prods.length > 0) {
                res.status(200).json({
                    count: prods.length,
                    products: prods
                });
            } else {
                res.json({
                    message: `No products found matching the category ${cat_title}`
                });
            }
        }).catch(err => res.json(err));

}

//Get products by subcategory

//Get categories
const getCategories = (req, res) => {
    //let product_sub_cat = req.params.catName;
    database.table('product_category as c')
    .join([{
        table: "product_sub_category as s",
        on: `s.id_product_cat_fk = c.id_product_cat `},
        
    ])
    .withFields(['c.id_product_cat',
        'c.prod_category_name as name',
        's.id_product_sub_cat',
        's.sub_name as subcategory',
        's.icon'
        
    ]).sort({
        id_product_cat_fk: .1
    })
    .getAll()
    .then(prod => {
            console.log(prod);
            if (prod) {
                res.status(200).json(prod);
            } else {
                res.json({
                    message: `No product categories were found`
                });
            }
        }).catch(err => res.json(err));
}

//Get sub categories food category
const getFoodCategories = (req, res) => { // Sending Page Query Parameter is mandatory http://localhost:3636/api/products/category/categoryName?page=1

    // Get category title value from param
    const catId = 1;

    database.table('product_category as c')
        .join([{
            table: "product_sub_category as s",
            on: `s.id_product_cat_fk = c.id_product_cat `},
            
        ])
        .withFields(['c.id_product_cat',
            'c.prod_category_name',
            's.id_product_sub_cat',
            's.sub_name as subcategory'
            
        ]).filter({
            's.id_product_cat_fk': catId
        })
        .getAll()
        .then(prods => {
            if (prods.length > 0) {
                res.status(200).json(
                    prods
                );
            } else {
                res.json({
                    message: `No Sub category found `
                });
            }
        }).catch(err => res.json(err));

}

//Get sub categories in drink category
const getDrinkCategories = (req, res) => { // Sending Page Query Parameter is mandatory http://localhost:3636/api/products/category/categoryName?page=1

    // Get category title value from param
    const catId = 2;

    database.table('product_category as c')
        .join([{
            table: "product_sub_category as s",
            on: `s.id_product_cat_fk = c.id_product_cat `},
            
        ])
        .withFields(['c.id_product_cat',
            'c.prod_category_name',
            's.id_product_sub_cat',
            's.sub_name as subcategory'
            
        ]).filter({
            's.id_product_cat_fk': catId
        })
        .getAll()
        .then(prods => {
            if (prods.length > 0) {
                res.status(200).json(
                   prods
                );
            } else {
                res.json({
                    message: `No Sub category found `
                });
            }
        }).catch(err => res.json(err));

}

//Get products by supplier id
//Get product by product id
const getProductBySupplierId = (req, res) => {
    let supplierId = req.params.supId;
    database.table('product as p')
    .join([{
            table: "product_category as c",
            on: `c.id_product_cat = p.id_product_cat_fk`
        },
        {
            table: "product_sub_category as s",
            on: `s.id_product_sub_cat = p.id_product_sub_cat_fk`
        },
        {
            table: "suppliers as r",
            on: `r.id_supplier = p.id_supplier_fk`
        }
    ])
    .withFields(['c.id_product_cat',
        'c.prod_category_name as category',
        's.id_product_sub_cat',
        's.sub_name as subcategory',
        'r.id_supplier',
        'r.supplier_name as store',
        'p.id_product',
        'p.product_name',
        'p.product_price',
        'p.quantity',
        'p.product_description',
        'p.image',
        'p.images'

    ])
        .filter({
            id_supplier : supplierId
        })
        .get()
        .then(prod => {
            console.log(prod);
            if (prod) {
                res.status(200).json(prod);
            } else {
                res.json({
                    message: `No product found with id ${supplierId}`
                });
            }
        }).catch(err => res.json(err));
}

module.exports = {getAllProducts, getProductById, getProductsByCat, getCategories, getFoodCategories, getDrinkCategories, getProductBySupplierId};