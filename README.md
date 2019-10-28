# 5709Project

## Setup
**Note** Make sure you have NPM, node, mysql server installed in your local machine
### MySQL Server setup
1. Login into your sql server through sql client, you can use `mysql -u root -p -h localhost` to login the database. The default password should be 'admin'
2. Then change the password of `root` role for your Mysql server. This can be done by running `ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';` in the command line / terminal.
3. Create a database name called `5709Project`
4. It would be more straightforward if your have mysql workbench application in your machine, then you can import the database by following the procedures described in this [link](https://dev.mysql.com/doc/workbench/en/wb-admin-export-import-management.html). The path to sql file is `src/api/connection/database.sql`

You can copy following script to insert records into the tables. 
```
User Table:
INSERT INTO 5709Project.User VALUES (1,"piggy", "piggywolf@dal.ca", "5848917979e356dd303b0d35ca49869f3122d859", "1993-12-26", "", "", "", "Halifax", "NS", "", "1552745309700", 1);
INSERT INTO 5709Project.User VALUES (2,"wolf", "lz739367@dal.ca", "5848917979e356dd303b0d35ca49869f3122d859", "1993-12-26", "", "", "", "Halifax", "NS", "", "1552745309700", 0);
INSERT INTO 5709Project.User VALUES (3,"sean", "piggywolfsean@dal.ca", "5848917979e356dd303b0d35ca49869f3122d859", "1993-12-26", "", "", "", "Halifax", "NS", "", "1552745591728", 1);

Product table: 
INSERT INTO 5709Project.product VALUES(1, "Nian gao", "Nian gao includes many varieties, all made from glutinous rice that is pounded or ground into a paste and, depending on the variety, may simply be molded into shape or cooked again to settle the ingredient.", "Chinese", "niangao.jpg", 1, 12.30);
INSERT INTO 5709Project.product VALUES(2, "Sweet and Sour Pork Chops", "A Chinese stir-fry dish made with juicy pieces of pork tenderloin, bell peppers, onion, and pineapple. Battered pork gets fried until crispy then tossed in a sweet and tangy sauce.", "Chinese", "sweetpork.jpg", 3, 20.99);
INSERT INTO 5709Project.product VALUES(3, "Mushroom Pork", "Bone-in or boneless pork chops in a rich mushroom sauce served with mashed potatoes is the ultimate dinner for a busy evening!", "American", "mushroompork.jpg", 5, 17.30);
INSERT INTO 5709Project.product VALUES(4, "Bacon & Cheddar Angus", "Enjoy our third-pound 100% Angus beef patty on a delicious sesame and poppy seed bun. Topped with savoury bacon, natural cheddar cheese, crisp red onions and pickles. Relish today!", "American", "baconcheddarburger.jpg", 4, 7.50);
INSERT INTO 5709Project.product VALUES(5, "Flower Sushi", "Celebrate Hina Matsuri on 3rd March with these cute flower shaped sushi rolls. Made using all natural ingredients, with some plum vinegar, nori seaweed, and seasoned sushi rice, these sushi rolls are a feast for the eyes as well as the tastebuds. Enjoy these as part of a main meal, or add to a bento lunchbox.", "japanese", "flowersushi.jpg", 2, 22.30);

Coupon table:
INSERT INTO coupon VALUES (1, "KTDABC", 0.95, 2);
INSERT INTO coupon VALUES (2, "ABCDTD", 0.98, 1);
INSERT INTO coupon VALUES (3, "KCKSVG", 0.80, 5);

evaluation table:
INSERT INTO `5709Project`.`evaluation` (`PID`, `comments`, `ratings`, `UID`) VALUES ('1', 'Excellent. Menu choices easily and tastely accommodated both vegetarians and meat eaters alike. Portions are generous which is not common in many dining establishments. Everyone raved about the food they were served. Great service.', '4', '1');

INSERT INTO `5709Project`.`evaluation` (`PID`, `comments`, `ratings`, `UID`) VALUES ('1', 'Very good food (I got the German breakfast), fantastic coffee and the service was friendly. 

The prices however are on the steeper side but since everything is supposed to be fresh and it’s on the waterfront I guess that it was is expected, but for me that is enough to not visit again. 

If someone else was paying however, I would certainly return.', '5', '2');

INSERT INTO `5709Project`.`evaluation` (`PID`, `comments`, `ratings`, `UID`) VALUES ('1', 'I dont like it QAQ', '2', '3');

INSERT INTO `5709Project`.`evaluation` (`PID`, `comments`, `ratings`, `UID`) VALUES ('2', 'I got the chicken club sandwich, fries & a glass of their lemonade. The sandwich and lemonade were pretty good but what really stood out to me were the fries, they had a great seasoning on them! Friendly staff as well :)', '4', '2');

Add fulltext index for searching:
ALTER TABLE 5709Project.product ADD FULLTEXT(name, description,category);

```

### Node Server setup
1. Once you have node and npm installed, run `npm install` to install required dependencies in the command line / terminal
2. Same in the command line / terminal, run `npm run start` to start the application

## login credential

piggywolf@dal.ca
Sean770880


### Login credential
piggywolf@dal.ca
Sean770880%%







