#/bin/sh

mkdir /tmp/sqlworks

cat << EOS >> /tmp/sqlworks/feedurl
https\:\/\/news\.yahoo\.co\.jp\/pickup\/6394692
https\:\/\/news\.yahoo\.co\.jp\/pickup\/6394447
https\:\/\/smbiz\.asahi\.com\/article\/14357035
https\:\/\/ledge\.ai\/google\-ai\-challenge\/
https\:\/\/gigazine\.net\/news\/20210301\-myheritage\-deep\-nostalgia\/
EOS

cat << EOS >> /tmp/sqlworks/sourcesurl
https\:\/\/news\.yahoo\.co\.jp\/rss\/topics\/it\.xml
https\:\/\/news\.yahoo\.co\.jp\/rss\/topics\/top\-picks\.xml
https\:\/\/b\.hatena\.ne\.jp\/hotentry\/it\.rss
https\:\/\/b\.hatena\.ne\.jp\/hotentry\/economics\.rss
https\:\/\/b\.hatena\.ne\.jp\/hotentry\.rss
EOS


cat << EOS >> /tmp/sqlworks/feedsql
INSERT feeds SET 
  source_id = CEIL(RAND() * 100),
  url = "FEEDURL",
  title = CONCAT('title', CEIL(RAND() * 100)),
  contents = CONCAT('contents', CEIL(RAND() * 100)),
  created_at = DATE_ADD('2021-04-01', INTERVAL 31 * RAND() DAY),
  updated_at = DATE_ADD('2021-05-01', INTERVAL 31 * RAND() DAY),
  image_url = "https://placehold.jp/9c9c9c/ffffff/250x250.png?text=dummy";
EOS

cat << EOS >> /tmp/sqlworks/sourcessql
INSERT sources SET
  user_id = CEIL(RAND() * 100),
  url = "SOURCESURL",
  title = CONCAT('title', CEIL(RAND() * 100)),
  created_at = DATE_ADD('2021-04-01', INTERVAL 31 * RAND() DAY),
  updated_at = DATE_ADD('2021-05-01', INTERVAL 31 * RAND() DAY);
EOS

cat << EOS >> /tmp/sqlworks/userssql
INSERT users SET
  email = CONCAT('mail',CEIL(RAND() * 100),'@example.com'),
  encrypted_password = SHA1(SUBSTRING(MD5(RAND()),1,10)),
  token = CONCAT('token', SUBSTRING(MD5(RAND()),1,10)),
  created_at = DATE_ADD('2021-04-01', INTERVAL 31 * RAND() DAY),
  updated_at = DATE_ADD('2021-05-01', INTERVAL 31 * RAND() DAY);
EOS

for feedurl in `cat /tmp/sqlworks/feedurl` ;do sed "s/FEEDURL/$feedurl/" /tmp/sqlworks/feedsql;done >> /tmp/sqlworks/sql
for sourcesurl in `cat /tmp/sqlworks/feedurl` ;do sed "s/SOURCESURL/$sourcesurl/" /tmp/sqlworks/sourcessql;done >> /tmp/sqlworks/sql

docker cp /tmp/sqlworks paddle_db_1:/tmp/

docker exec -it paddle_db_1 bash -c "mysql -ppassword -D paddle < /tmp/sqlworks/sql"

for i in `seq 1 5`; do docker exec -it paddle_db_1 bash -c "mysql -ppassword -D paddle < /tmp/sqlworks/userssql";done

docker exec -it paddle_db_1 bash -c "rm -rf /tmp/sqlworks"
rm -rf /tmp/sqlworks
