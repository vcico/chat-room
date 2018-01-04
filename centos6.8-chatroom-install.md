centos 搭建 php环境 运行基于Workerman的GatewayWorker框架


wget http://hk2.php.net/distributions/php-7.0.26.tar.gz
tar -zxvf php-7.0.26.tar.gz
cd php-7.0.26

yum -y install gcc  gcc-c++ gcc-g77 pcre-devel openssl openssl-devel autoconf libxml2 libxml2-devel libmcrypt  libc-client-devel libcurl-devel libjpeg-devel libpng-devel  curl gd2 gd  libevent libevent-devel



PHP编译安装出错configure: error: mcrypt.h not found. Please reinstall libmcrypt的解决办法
wget http://jaist.dl.sourceforge.net/project/mcrypt/Libmcrypt/2.5.8/libmcrypt-2.5.8.tar.gz
tar -zxvf libmcrypt-2.5.8.tar.gz 
1 cd libmcrypt-2.5.8
2 ./configure
make && make install

PHP编译安装出错Don't know how to define struct flock on this system, set --enable-opcache=no 
http://blog.csdn.net/hehailiang_dream/article/details/70337963


./configure \
--prefix=/usr/local/php7 \
--enable-fpm \
--with-fpm-user=www  \
--with-fpm-group=www \
--enable-pcntl \
--disable-debug \
--disable-rpath \
--enable-inline-optimization \
--enable-mbstring \
-enable-short-tags \
-enable-static \
--enable-pdo \
--with-mysqli=mysqlnd \
--with-pdo-mysql=mysqlnd \
--with-pear \
--with-curl \
--with-xmlrpc \
--with-openssl \
--with-mcrypt \
--with-mhash \
--with-gd \
--with-openssl-dir \
--with-jpeg-dir \
--with-png-dir \
--enable-sockets 
 
make && make install

cp php.ini-production /usr/local/php7/lib/php.ini


Installing shared extensions:     /usr/local/php7/lib/php/extensions/no-debug-non-zts-20151012/
Installing PHP CLI binary:        /usr/local/php7/bin/
Installing PHP CLI man page:      /usr/local/php7/php/man/man1/
Installing PHP FPM binary:        /usr/local/php7/sbin/
Installing PHP FPM defconfig:     /usr/local/php7/etc/
Installing PHP FPM man page:      /usr/local/php7/php/man/man8/
Installing PHP FPM status page:   /usr/local/php7/php/php/fpm/
Installing phpdbg binary:         /usr/local/php7/bin/
Installing phpdbg man page:       /usr/local/php7/php/man/man1/
Installing PHP CGI binary:        /usr/local/php7/bin/
Installing PHP CGI man page:      /usr/local/php7/php/man/man1/
Installing build environment:     /usr/local/php7/lib/php/build/
Installing header files:          /usr/local/php7/include/php/
Installing helper programs:       /usr/local/php7/bin/
  program: phpize
  program: php-config
Installing man pages:             /usr/local/php7/php/man/man1/
  page: phpize.1
  page: php-config.1
Installing PEAR environment:      /usr/local/php7/lib/php/
[PEAR] Archive_Tar    - installed: 1.4.3
[PEAR] Console_Getopt - installed: 1.4.1
[PEAR] Structures_Graph- installed: 1.1.1
[PEAR] XML_Util       - installed: 1.4.2
[PEAR] PEAR           - installed: 1.10.5
Wrote PEAR system config file at: /usr/local/php7/etc/pear.conf
You may want to add: /usr/local/php7/lib/php to your php.ini include_path
/root/lnmp/php-7.0.26/build/shtool install -c ext/phar/phar.phar /usr/local/php7/bin
ln -s -f phar.phar /usr/local/php7/bin/phar
Installing PDO headers:           /usr/local/php7/include/php/ext/pdo/

# 安装 系统 libevent模块
wget https://github.com/libevent/libevent/releases/download/release-2.1.8-stable/libevent-2.1.8-stable.tar.gz
tar -zxvf libevent-2.1.8-stable.tar.gz
cd libevent-2.1.8-stable
./configure 
make
make install

# 安装php event模块
wget https://pecl.php.net/get/event-2.3.0.tgz
tar -zxvf event-2.3.0.tgz
cd event-2.3.0
./configure --with-event-core --with-event-extra --enable-event-debug --with-php-config=/usr/local/php7/bin/php-config

echo extension=event.so > /usr/local/php7/lib/php.ini

yum  -y  install git 
git clone https://github.com/walkor/workerman-chat

php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
13  /usr/local/php7/bin/php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
15  /usr/local/php7/bin/php -r "if (hash_file('SHA384', 'composer-setup.php') === '544e09ee996cdf60ece3804abc52599c22b1f40f4323403c44d44fdfdd586475ca9813a858088ffbc1f233e9b180f061') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
16  /usr/local/php7/bin/php composer-setup.php
17  composer

20  vim /etc/profile
21  source /etc/profile
22  $PATH
27  mv composer.phar  /usr/local/bin/composer
28  composer
29  cd /srv/workerman-chat/
30  composer install

service mysqld start

86  iptables -I INPUT -p tcp --dport 55151 -j ACCEPT
87  iptables -I INPUT -p tcp --dport 7272 -j ACCEPT
88  iptables save
93  service iptables save
94  service iptables restart


wget http://download.redis.io/releases/redis-4.0.6.tar.gz
  102  tar xzf redis-4.0.6.tar.gz 
  104  cd redis-4.0.6
  106  make 
  109  mv /root/lnmp/redis-4.0.6/src/ /usr/local/redis/
  123  cp redis.conf /usr/local/redis/
  125  vim /usr/local/redis/redis.conf ##  daemon =>  yes
  128  /usr/local/redis/redis-server  /usr/local/redis/redis.conf  &
  129  ls
  130  ps -ef | grep redis

