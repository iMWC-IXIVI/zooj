-- +goose Up
-- +goose StatementBegin
insert into dishes(id, kind, title, weight, kcal, proteins, fats, carbos, image, provider, link, link_image, price) 
values
(22, 1, 'Злаковая каша с гранолой и свежими ягодами', 315, 261.45, 10.3, 10.3, 35, 'dishes/22.png', 'vkusvill', 'https://vkusvill.ru/goods/zlakovaya-kasha-s-granoloy-i-svezhimi-yagodami-61033.html', '/images/вкусвилл.png', 310),
(23, 1, 'Блинчики на кокосовом напитке с вишней', 172, 403, 5.27, 15.47, 59.5, 'dishes/23.png', 'vkusvill', 'https://vkusvill.ru/goods/blinchiki-na-kokosovom-napitke-s-vishney-70772.html', '/images/вкусвилл.png', 185),
(24, 1, 'Лимонный рикотник с голубикой и брусничным джемом', 165, 330, 14, 19.8, 24, 'dishes/24.png', 'vkusvill', 'https://vkusvill.ru/goods/limonnyy-rikotnik-s-golubikoy-i-brusnichnym-dzhemom-93891.html', '/images/вкусвилл.png', 330),
(25, 1, 'Запеканка с манго', 200, 316, 25.6, 8, 35.4, 'dishes/25.png', 'vkusvill', 'https://vkusvill.ru/goods/zapekanka-s-mango-76458.html', '/images/вкусвилл.png', 198),
(26, 1, 'Запеканка творожная с черникой', 250, 374.75, 26, 8.75, 48, 'dishes/26.png', 'vkusvill', 'https://vkusvill.ru/goods/zapekanka-tvorozhnaya-s-chernikoy-39480.html', '/images/вкусвилл.png', 217);

-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
SELECT 'down SQL query';
-- +goose StatementEnd
