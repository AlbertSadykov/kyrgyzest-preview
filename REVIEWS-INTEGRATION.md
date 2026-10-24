# Kyrgyzest — официальный импорт отзывов (без парсинга)

## Google

**Для компании, которую владелец подтвердил в Google Business Profile:**
1. Владелец выдаёт доступ к Business Profile и разрешает OAuth-подключение.
2. На backend, а не в браузере React, используется Google Business Profile Reviews API `accounts.locations.reviews.list`.
3. Backend запрашивает отзывы с Google OAuth, кеширует ответ и выдаёт сайту только необходимые поля в собственном endpoint `/api/reviews/google`.
4. На фронтенде отобразить имя автора, дату, текст, оценку, исходную ссылку и атрибуцию Google; учитывать условия Google по хранению и отображению.
5. Для запасного варианта Google Places API Place Details возвращает **не более 5** отзывов; нужен Place ID и Google Maps Platform API key/billing, а также соблюдение правил атрибуции.

Документы Google:
- https://developers.google.com/my-business/reference/rest/v4/accounts.locations.reviews/list
- https://developers.google.com/maps/documentation/places/web-service/place-details

## Tripadvisor

**Самый простой официальный способ — widget для бизнеса:**
1. Откройте ваш профиль https://www.tripadvisor.co.uk/Attraction_Review-g293948-d34449965-Reviews-Kyrgyzest_Tours-Bishkek.html
2. Получите подходящий виджет `Display Reviews` через Tripadvisor Widget Center (https://www.tripadvisor.com/Widgets).
3. Вставьте выданный Tripadvisor HTML/JS **без изменения** в отдельный `TripadvisorWidget` React-компонент, загрузив внешний скрипт в useEffect при монтировании компонента и удаляя слушатели при демонтировании. Лучше подключать виджет на отдельном контейнере, чем вручную встраивать в Swiper — элементы виджета контролирует Tripadvisor.
4. Не создавать самостоятельно скопированные фейковые цитаты или пузыри рейтинга; учитывайте требования логотипа и атрибуции.

Другой способ — официальная Tripadvisor Content API (при соответствующем доступе и соглашении), интегрируется сервером как Google.

Документы Tripadvisor:
- https://www.tripadvisor.com/business/insights/hotels/resources/display-rating-and-latest-tripadvisor-review-on-website/
- https://www.tripadvisor.com/business/solutions/hotels/content-api
- https://tripadvisor-content-api.readme.io/reference/display-requirements

## В этой сборке

- Вкладка Guest stories использует данные собственного сайта, свайпер удерживается внутри контейнера и не перекрывает заголовки.
- Вкладка Google открывает официальный профиль; рейтинг не подставлен искусственно.
- Вкладка Tripadvisor открывает официальный профиль и показывает место будущего виджета, без придуманного копирования отзывов.
- Логотипы Google и Tripadvisor лежат локально: `public/brands/*.svg`.
- API ключи, OAuth токены и другие секреты в React не добавляются.
