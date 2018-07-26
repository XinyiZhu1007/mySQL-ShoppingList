var http = require('http');
var fs = require('fs');
var mysql = require("mysql");
var db = require('./db');
var inquirer = require('inquirer');


var connection = db.login();

function managerStart() {
    console.log('~ Welcome Bamazon manager ~ ');
    inquirer.prompt([
        {
            type: 'list',
            name: 'managerList',
            message: 'Please select one of the following 4 actions: ',
            choices: [
                'View Products for Sale',
                'View Low Inventory',
                'Add to Inventory',
                'Add New Product',
                'Exit'
            ]
        } 
    ]).then((ans) => {
        switch(ans.managerList) {
            case 'View Products for Sale':
                viewAll();
                break;
            case 'View Low Inventory':
                viewLow();
                break;
            case 'Add to Inventory':
                update();
                break;
            case 'Add New Product':
                addNew();
                break;
            case 'Exit':
                connection.end();
                break;
            default:
                console.log('Error.');
        };
    })
}

function viewAll() {
    connection.query(`select * from products`, (err, data) => {
        if(err) {
            throw err;
        };
        console.log('~~~~~~~ Bamazon Manager Portal: View All Products ~~~~~~~~~~');
        for(var i = 0; i< data.length; i++) {
            console.log('ID: ' + data[i].item_id + '    Product Name: ' + data[i].product_name +'   Price: ' + data[i].price + '    Quantity: ' + data[i].stock_quantity);
        };
        console.log('~~~~~~~~~~~~~~~~ ****** ~~~~~~~~~~~~~~~~');
        managerStart();
    });
    
};

function viewLow() {
    connection.query(`select * from products where stock_quantity < 5`, (err, data) => {
        if(err) {
            throw err;
        };
        console.log('~~~~~~~ Bamazon Manager Portal: View Low Quantity Products ~~~~~~~~~~');
        for(var i = 0; i< data.length; i++) {
            console.log('ID: ' + data[i].item_id + '    Product Name: ' + data[i].product_name +'   Price: ' + data[i].price + '    Quantity: ' + data[i].stock_quantity);
        };
        console.log('~~~~~~~~~~~~~~~~ ****** ~~~~~~~~~~~~~~~~');
        managerStart();
    });
    
};

function update() {
    
    inquirer.prompt([
        {
            type: 'input',
            name: 'updateID',
            message: 'Please enter ID of the product to update: ',
            validate: function(value) {
                if(parseInt(value) > 0 && !isNaN(value)) {
                    return true;
                } else {
                    return false;
                };
            }
        },
        {
            type: 'input',
            name: 'updateQuantity',
            message: 'Please enter quantity of the product to be updated: ',
            validate: function(value) {
                if(parseInt(value) > 0 && !isNaN(value)) {
                    return true;
                } else {
                    return false;
                };
            }
        },
    ]).then((ans) => {
        var selectID, selectQTY, newQTY;
        connection.query(`select * from products`, (err, data) => {
            if(err) {
                throw err;
            };
            // console.log(data);
            selectID = parseInt(ans.updateID) - 1;
            selectQTY = parseInt(ans.updateQuantity);
            newQTY = parseInt(data[selectID].stock_quantity) + selectQTY;
            // console.log(selectID + ' ' + selectQTY + ' '+ newQTY);

            connection.query(`update products set stock_quantity = ? where item_id = ?`, 
            [newQTY, ans.updateID] , (err, data) => {
                if(err) {
                    throw err;
                };
                console.log('quantity updated.');   
                managerStart();        
            });
        });
    });
}

function addNew() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'addName',
            message: 'Please enter name of the new product: ',
            validate: function(value) {
                if(value !== '' && value !== null) {
                    return true;
                } else {
                    return false;
                };
            }
        },
        {
            type: 'input',
            name: 'addDepartment',
            message: 'Please enter department the new product belongs to: ',
            validate: function(value) {
                if(value !== '' && value !== null) {
                    return true;
                } else {
                    return false;
                };
            }
        },
        {
            type: 'input',
            name: 'addPrice',
            message: 'Please enter price of the new product: ',
            validate: function(value) {
                if(parseInt(value) > 0 && !isNaN(value)) {
                    return true;
                } else {
                    return false;
                };
            }
        },
        {
            type: 'input',
            name: 'addQuantity',
            message: 'Please enter quantity of the new product: ',
            validate: function(value) {
                if(parseInt(value) > 0 && !isNaN(value)) {
                    return true;
                } else {
                    return false;
                };
            }
        },
    ]).then( (ans) => {
        connection.query( `insert into products(product_name, department_name, price, stock_quantity) values (?,?,?,?)`, 
        [ans.addName, ans.addDepartment, ans.addPrice, ans.addQuantity], (err, data) => {
            if(err) {
                throw err;
            };
            console.log('new product added to database');
        }); 
        managerStart();
    });
    
};

managerStart();