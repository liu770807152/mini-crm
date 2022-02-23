# mini-crm

## Description

This project contains three major pages:
1. overview of users' basic information
2. detail page that displays all the information
3. add/edit page to add or modify the information of a new user into database

The overview page uses Angular Material Table for data display. It also enables searching with "name", "job" and "email".
Visitors can click on the button of "add", "search", "edit" and "delete" for data manipulation.

## Getting Started

### Dependencies

* Angular 13
* Bootstrap 5
* PHP 7.4.26
* Nginx 1.20.1
* MySQL 8.0.27
* Axios
* Day.js

### Installing

* for Angular project, run `npm install` should be able to install all the required packages
* for PHP script, after installation of PHP, move it to directory **/usr/share/nginx/html**
* for configuration of Nginx, install normally first, then move the files in folder *config* to specified directory if launch fails:
  * *nginx.conf*, *fastcgi.conf* and *fastcgi_params* to **/etc/nginx** or the *"root"* path in *nginx.conf* if changed 
  * *sites-enabled/site.conf* to **/etc/nginx/sites-enabled**
  * *www.sock* to **/run/php-fpm**
* for MySQL, use default settings and create a new user called "client". The passwords of "root" and "client" are stored in files at **./backend/config/***. For the consideration of safety, you need to have root's authority to read them (use `sudo` command). The preset data is stored in **../config/users.sql**.


### Executing program

* simply run `npm start` or `ng serve --proxy-config proxy.conf.json` in terminal


## Author

Contributors names and contact info

ex. [@Chris Liu](https://www.linkedin.com/in/chris-liu-08339a178/)


## License

This project is licensed under the MIT License - see the LICENSE file for details