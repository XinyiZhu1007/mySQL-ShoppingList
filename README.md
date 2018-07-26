# mySQL-ShoppingList

### This is an clint side application simulating online shopping experience and store stock management using commandline interface.
### the database used for record storing is mySQL.


### -------------------
#### For `Customer` usage, enter `node bamazonCustomer.js`.
##### The customer-side interface will:
######     1. display all available products;
######    2. prompt user to enter items and quantity of interest;
######    3. check stock and modify stock record when item and quantity are sufficient;
######     4. check stock and notify when requested item/quantity does not match stock record.



![customer demo pic1](https://github.com/XinyiZhu1007/mySQL-ShoppingList/blob/master/images/customer1.png?raw=true)
a. original product database record of store stock. 

![customer demo pic2](https://github.com/XinyiZhu1007/mySQL-ShoppingList/blob/master/images/customer2.png?raw=true)
b. 
when starting, displaying all items with ID, name and price.
user prompted for input of ID and quantity that would like to purchase;
when quantity sufficient, displaying name, quantity and price of purchase;
when quantity insufficient, displaying message.
after each round of purchase, user is asked whether would like to make more purchase: if yes, user is re-prompted; if not, exit app.

![customer demo pic4](https://github.com/XinyiZhu1007/mySQL-ShoppingList/blob/master/images/customer3.png?raw=true)
c. updated product database after successful purchase.



### -------------------
#### For `Manager` usage, enter `node bamazonManager.js`.
##### The manager-side interface will prompt the user to select from one of the four options:
###### `View Products for Sale`, , `Add to Inventory` and `Add New Product`.
1. `View Products for Sale`: retrieve from database and list all products in stock with ID, name, price and available quantity;
2. `View Low Inventory`: retrieve from database and list products with quantity less than 5 with their ID, name and price;
3. `Add to Inventory`: update quantity of an existing item to database by prompting user to enter ID of the product  and quantity to be added to current quantity;
4. `Add New Product`: adding a new product to the database by prompting user to enter product name, price and quantity.

![manager demo pic1](https://github.com/XinyiZhu1007/mySQL-ShoppingList/blob/master/images/customer3.png?raw=true)
a. original product record in database;

![manager demo pic2](https://github.com/XinyiZhu1007/mySQL-ShoppingList/blob/master/images/manager1.png?raw=true)
b. selection 1: View Products for Sale - product information displayed;

![manager demo pic3](https://github.com/XinyiZhu1007/mySQL-ShoppingList/blob/master/images/manager2.png?raw=true)
c. selection 2: View Low Inventory - products with quantity < 5 listed;

![manager demo pic4](https://github.com/XinyiZhu1007/mySQL-ShoppingList/blob/master/images/manager3.png?raw=true)
d. selection 3: Add to Inventory - quantity updated for existing product;

![manager demo pic5](https://github.com/XinyiZhu1007/mySQL-ShoppingList/blob/master/images/manager4.png?raw=true)
e. selection 4: Add New Product - new product with necessary information added to database;

![manager demo pic6](https://github.com/XinyiZhu1007/mySQL-ShoppingList/blob/master/images/manager5.png?raw=true)
f. selection 5: exit - user exiting program;

![manager demo pic7](https://github.com/XinyiZhu1007/mySQL-ShoppingList/blob/master/images/manager6.png?raw=true)
g. item 4 quantity updated from `Add to Inventory` command and item 11 from `Add New Product` command.