# NodeRestApi
RESTful Api using node.js and Mysql



How to create CRUD REST APIs using Node.js which retrieve data from MySQL database and give response in JSON format.

# Prerequisites
*	Install NodeJs
* MYSQL
* Postman to test our API: https://www.getpostman.com/apps

# MYSQL
 use book_db database
 
### Create database and tables
```sql
CREATE TABLE IF NOT EXISTS `book` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(35) NOT NULL,
  `author` varchar(35) NOT NULL,
  `price` double NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;
```
