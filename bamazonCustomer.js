var http = require('http');
var fs = require('fs');
var mysql = require("mysql");
var db = require('./db');
var inquirer = require('inquirer');


var connection = db.login();



function CustomerStart() {
    // connection.connect();
    connection.query(`select * from products`, (err, data) => {
        if(err) {
            throw err;
        };
        console.log('~~~~~~~ Welcome to Bamazon Shopping Site Customer Portal ~~~~~~~~~~');
        for(var i = 0; i< data.length; i++) {
            console.log('ID: ' + data[i].item_id + '    Product Name: ' + data[i].product_name +'   Price: ' + data[i].price);
        };
        console.log('~~~~~~~~~~~~~~~~ ****** ~~~~~~~~~~~~~~~~');

        inquirer.prompt([
            {
                type: 'input',
                name: 'id',
                message: 'Please enter ID of the product you would like to purchase: ',
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
                name: 'quantity',
                message: 'Please enter number of selected product you would like to purchase: ',
                validate: function(value) {
                    if(parseInt(value) > 0 && !isNaN(value)) {
                        return true;
                    } else {
                        return false;
                    };
                }
            }
        ]).then( (ans) => {
            var selectedItem = parseInt(ans.id) - 1;
            var selectedQuantity = parseInt(ans.quantity);
            var selectedTotal = parseFloat(data[selectedItem].price * selectedQuantity);

            // check quantity if is sufficient
            if(data[selectedItem].stock_quantity >= selectedQuantity) {
                connection.query('update products set ? where ?', [
                    {stock_quantity: data[selectedItem].stock_quantity - selectedQuantity},
                    {item_id: parseInt(ans.id)}
                ], (err, result) => {
                    if(err) {
                        throw err;
                    };
                    console.log(` \n ~~ You have successfully purchased ${selectedQuantity} ${data[selectedItem].product_name}(s) ~~`);
                    console.log(` ~~ Your total is $${selectedTotal} dollars ~~ `);
                });
            } else {
                console.log('Sorry, currently we do not have enough product in stock.');
            };

               
        }).then( (x) => {
            buyMore();
        }); 
    }); 
}

function buyMore() {
    inquirer.prompt([
        {
            type: 'confirm',
            name: 'confirm',
            message: 'Would you like to make another purchase?',
            default: true
        }
    ]).then( (ans) => {
        if(ans.confirm) {
            CustomerStart();
        } else {
            console.log("Thank you for shopping with Bamazon!!");
            connection.end();
        };
    });
}

CustomerStart();