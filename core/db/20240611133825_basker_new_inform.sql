-- +goose Up
-- +goose StatementBegin
alter table dishes add column provider  varchar(100);
alter table dishes add column price numeric;

update dishes set 
provider = 'vkusvill',
link = 'https://vkusvill.ru/goods/oladi-so-sgushchennym-molokom-91889.html',
link_image = '/images/вкусвилл.png',
price = 185
where id = 21;

update dishes set 
provider = 'vkusvill',
link = 'https://vkusvill.ru/goods/borshch-vegetarianskiy-20171.html',
link_image = '/images/вкусвилл.png',
price = 174
where id = 11;

update dishes set 
provider = 'vkusvill',
link = 'https://vkusvill.ru/goods/sup-rassolnik-s-kuritsey-390-gramm-61047.html',
link_image = '/images/вкусвилл.png',
price = 194
where id = 12;


update dishes set 
provider = 'vkusvill',
link = 'https://vkusvill.ru/goods/sup-rassolnik-vegetarianskiy-s-gribami-i-seldereem-74326.html',
link_image = '/images/вкусвилл.png',
price = 176
where id = 13;

update dishes set 
provider = 'vkusvill',
link = 'https://vkusvill.ru/goods/sup-tom-yam-vegetarianskiy-73608.html',
link_image = '/images/вкусвилл.png',
price = 219
where id = 14;

update dishes set 
provider = 'vkusvill',
link = 'https://vkusvill.ru/goods/sup-tom-yam-vegetarianskiy-73608.html',
link_image = '/images/вкусвилл.png',
price = 219
where id = 14;

update dishes set 
provider = '4fresh',
link = 'https://4fresh.ru/products/beup0012',
link_image = '/images/4fresh.jpeg',
price = 158
where id = 19;

update dishes set 
provider = '4fresh',
link = 'https://4fresh.ru/products/beup0003',
link_image = '/images/4fresh.jpeg',
price = 158
where id = 20;

update dishes set 
provider = 'zozhnik',
link = 'https://zozhnik.ru',
link_image = '/images/зожник.png',
price = 450
where id = 1;

update dishes set 
provider = 'zozhnik',
link = 'https://zozhnik.ru',
link_image = '/images/зожник.png',
price = 450
where id = 2;

update dishes set 
provider = 'zozhnik',
link = 'https://zozhnik.ru',
link_image = '/images/зожник.png',
price = 450
where id = 3;

update dishes set 
provider = 'zozhnik',
link = 'https://zozhnik.ru',
link_image = '/images/зожник.png',
price = 450
where id = 4;

update dishes set 
provider = 'zozhnik',
link = 'https://zozhnik.ru',
link_image = '/images/зожник.png',
price = 450
where id = 5;

update dishes set 
provider = 'zozhnik',
link = 'https://zozhnik.ru',
link_image = '/images/зожник.png',
price = 450
where id = 6;

update dishes set 
provider = 'zozhnik',
link = 'https://zozhnik.ru',
link_image = '/images/зожник.png',
price = 450
where id = 7;

update dishes set 
provider = 'zozhnik',
link = 'https://zozhnik.ru',
link_image = '/images/зожник.png',
price = 450
where id = 10;

update dishes set 
provider = 'vkusvill',
link = 'https://vkusvill.ru/goods/salat-vinegret-s-marinovannoy-kapustoy-20665.html',
link_image = '/images/вкусвилл.png',
price = 148
where id = 15;

update dishes set 
provider = 'vkusvill',
link = 'https://vkusvill.ru/goods/salat-koul-slou-iz-ovoshchey-38701.html',
link_image = '/images/вкусвилл.png',
price = 166
where id = 16;

update dishes set 
provider = '4fresh',
link = 'https://4fresh.ru/products/beup0001',
link_image = '/images/4fresh.jpeg',
price = 158
where id = 17;

update dishes set 
provider = '4fresh',
link = 'https://4fresh.ru/products/beup0002',
link_image = '/images/4fresh.jpeg',
price = 161
where id = 18;

delete from dishes where id in (8,9);

-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
SELECT 'down SQL query';
-- +goose StatementEnd
