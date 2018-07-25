 CREATE TABLE IF NOT EXISTS products(
 	item_id integer primary key auto_increment,
 	product_name varchar(40),
 	department_name varchar(40),
 	price decimal(6,2),
 	stock_quantity integer
 );
 
 insert into products(product_name, department_name, price, stock_quantity) values("Naruto figma", "Toy", 150, 2);
 insert into products(product_name, department_name, price, stock_quantity) values("Haikyuu manga 1-10", "Book", 210, 5);
 insert into products(product_name, department_name, price, stock_quantity) values("One Piece manga 23", "Book", 19.8, 20);
 insert into products(product_name, department_name, price, stock_quantity) values("Sasuke nendoroid", "Toy", 50, 1);
 insert into products(product_name, department_name, price, stock_quantity) values("Megalo Box OST", "Video&Audio", 25.5, 10);
 insert into products(product_name, department_name, price, stock_quantity) values("Megalo Box BluRay Set", "Video&Audio", 360, 8);
 insert into products(product_name, department_name, price, stock_quantity) values("Yuri on Ice Keychain set", "Toy", 45.8, 6);
 insert into products(product_name, department_name, price, stock_quantity) values("Gintama Shopping Bag", "Toy", 13.9, 50);
 insert into products(product_name, department_name, price, stock_quantity) values("Dragon Ball Gokuu Cosplay costume", "Toy", 200, 4);
 insert into products(product_name, department_name, price, stock_quantity) values("Cardcaptor Sakura Kuro-Card set", "Toy", 61, 12);
 
 select * from products
 