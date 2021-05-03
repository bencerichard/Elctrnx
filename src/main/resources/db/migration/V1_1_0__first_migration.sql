drop table if exists address_;
drop table if exists category;
drop table if exists location;
drop table if exists order_;
drop table if exists order_detail;
drop table if exists product;
drop table if exists roles;
drop table if exists stock;
drop table if exists user;
drop table if exists favorites;
drop table if exists cart;
drop table if exists agm_marker;
drop table if exists image;
drop table if exists donation;
create table address_ (id integer not null, city varchar(255), country varchar(255), street varchar(255), street_number integer, primary key (id)) engine=InnoDB;
create table category (product_category_id integer not null, description varchar(4028), name varchar(255), primary key (product_category_id)) engine=InnoDB;
create table location (id integer not null, name varchar(255), address_id integer, primary key (id)) engine=InnoDB;
create table order_ (id integer not null, created_at datetime, delivery_location_id integer, shipped_from_id integer, user_user_id integer, primary key (id)) engine=InnoDB;
create table order_detail (id integer not null, product_id integer, quantity integer, order_id integer, primary key (id)) engine=InnoDB;
create table product (product_id integer not null, description varchar(500), image varchar(255), name varchar(255), price decimal(19,2),producer varchar(255), product_category_product_category_id integer, primary key (product_id)) engine=InnoDB;
create table roles (role_id integer not null, role_name varchar(255), primary key (role_id)) engine=InnoDB;
create table stock (id integer not null auto_increment, quantity integer, location_id integer, product_product_id integer, primary key (id)) engine=InnoDB;
create table favorites (id integer not null auto_increment, product_id integer, user_user_id integer, primary key (id)) engine=InnoDB;
create table cart (id integer not null auto_increment, product_id integer, quantity integer, user_user_id integer, primary key (id)) engine=InnoDB;
create table user (user_id integer not null, email_address varchar(255), fist_name varchar(255), last_name varchar(255), password varchar(255), username varchar(255), role_role_id integer, image_id integer, address_id integer, primary key (user_id)) engine=InnoDB;
create table agm_marker(agm_info_id integer not null auto_increment, lat varchar(255), lng varchar(255), name varchar(255), number_of_donations integer, primary key (agm_info_id)) engine=InnoDB;
create table image(id integer not null auto_increment, name varchar(255), pic_type blob, type varchar(255), primary key (id)) engine=InnoDB;
create table donation (donation_id integer not null auto_increment, amount integer, family_name varchar(255), was_redeemed tinyint, user_user_id integer, primary key (donation_id))engine=InnoDB;
alter table cart add constraint FK45kh318jlvfel6pk3lwky6rqm foreign key (user_user_id) references user (user_id);
alter table favorites add constraint FK6x88aunal5m5g96yursemblmh foreign key (user_user_id) references user (user_id);
alter table location add constraint FK30md1a17fhkula64nmv91vja7 foreign key (address_id) references address_ (id);
alter table order_ add constraint FK91i0qaidj9m0g53ww6iab9df4 foreign key (delivery_location_id) references location (id);
alter table order_ add constraint FKf5oqqh9fkxnxoaccb3xixnxf3 foreign key (shipped_from_id) references location (id);
alter table order_ add constraint FKinclph479keyownc8nesxlpe1 foreign key (user_user_id) references user (user_id);
alter table order_detail add constraint FK4u34rkhbehcj1jbb1mc5m8ccs foreign key (order_id) references order_ (id);
alter table product add constraint FKdeb2o4e1j6k1ehuky2ht9te9l foreign key (product_category_product_category_id) references category (product_category_id);
alter table stock add constraint FK6t3m0kaf6fubuus331gf7xmn8 foreign key (location_id) references location (id);
alter table stock add constraint FKrwdkwjf037066qtbpq0pg0h6n foreign key (product_product_id) references product (product_id);
alter table user add constraint FK4keqlw3ucfmfsbeu8r1ijdppf foreign key (role_role_id) references roles (role_id);
alter table user add constraint FKg25pdvuc1lpq8gu6gfx8yjq4n foreign key (address_id) references address_ (id);
alter table user add constraint FK9hpx11qlu8cqhrkjn0yor93h foreign key (image_id) references image (id);
alter table donation add constraint FKsgeq7rljilxbty75rdsqo97e1 foreign key (user_user_id) references user (user_id);
