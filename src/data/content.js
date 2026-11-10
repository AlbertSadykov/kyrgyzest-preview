// Media reference: only current Kyrgyzest.com WordPress media uploads.
// If an upstream image fails, ImageWithFallback presents a brand-colour surface (not an unrelated stock photo).
const media = '/wp-content/uploads/'
export const originalImage = (path) => `https://kyrgyzest.com${media}${path}`

export const photos = {
  hero: originalImage('2025/12/camping-4.png'),
  grand: originalImage('2025/12/img_0541.jpeg'),
  horseback: originalImage('2025/12/photo_2025-12-05_14-13-03.jpg'),
  expedition: originalImage('2025/12/screenshot_20251210055059.png'),
  autumn: originalImage('2025/12/02b1415c-11e6-41cf-9620-e8132f075294-e1787724454104.png'),
  private: originalImage('2025/12/photo_2025-12-19_15-44-42.jpg'),
  people: originalImage('2025/12/img_1876.jpg'),
  lake: originalImage('2025/12/screenshot_20251210054613.png'),
  mountains: originalImage('2025/12/img_7117-768x1024.jpg'),
  chonKemin: originalImage('2025/12/screenshot_20251210041418.png'),
  jetiOguz: originalImage('2026/06/dzhety-oguz-leg_01.jpg'),
  lake2: originalImage('2026/02/photo_2026-08-26_11-56-05.jpg'),
  nature: originalImage('2025/12/photo_2025-12-22_14-55-51-e1766393860564.jpg'),
  trek: originalImage('2025/12/img_1791-768x1024.jpg'),
  karakol: originalImage('2025/12/img_1800-768x1024.jpg'),
  group: originalImage('2025/12/img_7911-768x1024.jpg'),
  lake3: originalImage('2025/12/screenshot_20251210041215.png'),
  galleryWide: originalImage('2025/12/img_7007-scaled.jpg'),
  galleryRoad: originalImage('2025/12/img_1805-1024x768.jpg'),
  galleryLife: originalImage('2025/12/photo_2026-08-26_14-46-29.jpg'),
  galleryLake: originalImage('2025/12/screenshot_20251210042135.png'),
}
export const tours = [
  {
    id: 'autumn',
    title: 'Kyrgyzest Autumn Tour',
    sub: 'Seven days through Chon-Kemin, Issyk-Kul and the red cliffs of Jeti-Oguz.',
    days: '7 days',
    season: 'October',
    img: photos.autumn,
    href: 'https://kyrgyzest.com/tours/kyrgyzest-autumn-tour/',
    kicker: 'The autumn journey',
  },
  {
    id: 'grand',
    title: 'Kyrgyzest Grand Tour',
    sub: 'An eight-day introduction to high-mountain lakes, nomadic culture and local life.',
    days: '8 days',
    season: 'May – September',
    img: photos.galleryLife,
    href: 'https://kyrgyzest.com/tours/kyrgyzest-grand-tour/',
    kicker: 'The signature journey',
  },
  {
    id: 'horse',
    title: 'Horseback Adventure Tour',
    sub: 'Ride to Kilemche and Son-Kul, crossing high pastures on horseback.',
    days: '7 days',
    season: 'June – September',
    img: photos.galleryWide,
    href: 'https://kyrgyzest.com/tours/horseback-adventure-tour/',
    kicker: 'On horseback',
  },
  {
    id: 'expedition',
    title: 'Kyrgyzest Expedition',
    sub: 'Ten days of remote lakes, open valleys and overland adventure.',
    days: '10 days',
    season: 'June – September',
    img: photos.hero,
    href: 'https://kyrgyzest.com/tours/kyrgyzest-exdepition/',
    kicker: 'Further into the high country',
  },
  {
    id: 'private',
    title: 'Private Tours',
    sub: 'Choose your pace, places and style of stay; we will plan the journey together.',
    days: 'Tailor-made',
    season: 'On request',
    img: photos.private,
    href: 'https://kyrgyzest.com/tours/family-tours/',
    kicker: 'Made around you',
  },
]
export const destinations = [
  { name: 'Son-Kul Lake', region: 'Naryn region', img: photos.lake, href: tours[1].href },
  { name: 'Chon-Kemin', region: 'Chuy region', img: photos.chonKemin, href: tours[0].href },
  { name: 'Issyk-Kul', region: 'The Tien Shan', img: photos.nature, href: tours[0].href },
  { name: 'Jeti-Oguz', region: 'Karakol region', img: photos.jetiOguz, href: tours[0].href },
]
export const gallery = [
  { src: photos.galleryWide, label: 'The Kyrgyz mountains' },
  { src: photos.galleryRoad, label: 'The road less travelled' },
  { src: photos.lake3, label: 'An open horizon' },
  { src: photos.trek, label: 'The highlands' },
  { src: photos.galleryLife, label: 'Moments along the way' },
  { src: photos.galleryLake, label: 'Among the mountain lakes' },
  { src: photos.karakol, label: 'Beyond the valley' },
  { src: photos.lake2, label: 'Light on the landscape' },
]
// Guest reviews and the accompanying trip photographs are published on Kyrgyzest.com.
export const reviews = [
  {
    name: 'Zaynab',
    place: 'London, UK',
    photo: originalImage('2025/12/screenshot_20251210111502.png'),
    text: 'I travelled with Kyrgyzest in June 2025, and it was honestly one of the best trips I’ve ever been on. What I loved most was how perfectly it combined adventure, culture, and history. You really get a bit of everything, which is hard to find in 8 days, especially with the language barrier. Kyrgyzest’s local knowledge made the experience so much richer. From start to finish, everything was so well organised. When I first got in touch, Jamilia took the time to explain the entire eight-day itinerary over a call, answered all my questions, and immediately made me feel reassured and excited about joining. Throughout the trip, she went above and beyond to make sure we were comfortable and happy. The highlight for me was definitely the people. Kyrgyz hospitality is something special. And as a horse lover, seeing so many wild horses in their natural landscape was unforgettable. I was also really impressed by how comfortable everything was, even in remote areas. Our driver was great and the vehicle was excellent, which made the long journeys easy and enjoyable. I can’t recommend Kyrgyzest enough to anyone wanting to experience the true beauty of Kyrgyzstan, it’s a country that will stay with you long after you leave ❤️',
  },
  {
    name: 'Johanna',
    place: 'Liechtenstein',
    photo: originalImage('2025/12/screenshot_20251210112204.png'),
    text: "I honestly didn't fully know what I was signing up for when I booked this trip, but I'm so glad I followed my gut! From start to finish, everything was beautifully planned and taken care of. The trip completely exceeded my expectations. Kyrgyzstan was breathtaking and I feel so blessed to have gotten the chance to experience the country, people and culture with your help. I'm deeply impressed by your dedication to the tours and the care you put into every detail. To anyone headed to Central Asia: don't miss Kyrgyzstan - and especially don't miss out on Jamilia's tours. Highly, highly recommend! Thank you!!! Johanna",
  },
  {
    name: 'Gabby',
    place: 'London, UK',
    photo: originalImage('2025/12/screenshot_20251210112210.png'),
    text: "Kyrgyzest went above and beyond to make sure we had the best possible experience. We experienced culture, incredible scenery and tried local dishes. Jamilia greeted us with traditional Kyrgyz souvenirs to remember our trip and was so happy to share local experiences with us, including hosting family dinner in her home. Our guide Nazima was incredibly knowledgeable about the country and helped with translations throughout the trip. It's so important to go with a tour like Kyrgyzest for this country as most locals don't speak English and there are so many incredible experiences which you cannot book yourself online. Kyrgyzest offers an amazing itinerary and we got to see so much of the country during our time. I couldn't fault Kyrgyzest, from start to finish Jamilia has ensured it is a trip of a lifetime!",
  },
  {
    name: 'Michelle',
    place: 'London, UK',
    photo: originalImage('2025/12/screenshot_20251210114405.png'),
    text: "I’ve been recommending all my friends and family to go to Kyrgyzstan with Krygyzest Tours since I’ve been back! It was truly a unique experience. Everything was so well thought and beautifully planned out by Krygyzest Tours - from comfortable transport to beautiful locations. I’m so thankful for Jamila’s service and hospitality - she was there to answer questions before I’d even booked the trip and it was really helpful to have an English speaking guide during the trip too. This was a very different trip for me - I hadn’t done much hiking, camping or ever rode a horse before the trip - Krygyzest made all this such a fun and smooth experience. Thank you again Jamilia!!",
  },
  {
    name: 'Mahdia',
    place: 'USA',
    photo: originalImage('2025/12/screenshot_20251210114515.png'),
    text: 'I am So glad to have visited Kyrgyzstan with your tour. Everything was perfect - from the hotels, the yurts, the amount of sites and activities you had planned for us, I felt like you planned for every minute to count and for us to enjoy every bit of your breathtakingly beautiful country. 🏔️🏇 I felt so safe and learned so much from our very knowledgeable and patient guide, Nazima, and our driver(aka Dadushka dost) Thank you so much for creating lifelong wonderful memories of kyrgyzstan, I Will be back!! 🥹🫶',
  },
  {
    name: 'Balgisa',
    place: 'Finland',
    photo: originalImage('2025/12/screenshot_20251210132753.png'),
    text: 'Hi Jamilia, We just wanted to say a huge thank you for the amazing experience you gave us. Honestly, we can’t even put into words how much we enjoyed every moment of the trip. From the very beginning, when we saw the itinerary, we were so excited—and it turned out even better than we imagined. Everything was so thoughtfully planned, and from the moment we met you, we felt truly welcomed. The whole journey was incredible—the food, the breathtaking landscapes, the wonderful people, and the culture. Kyrgyzstan has been the best trip we’ve ever taken, and it’s all thanks to you. We’re already dreaming about coming back! We recommend kyrgyzest tours for everyone!!',
  },
  {
    name: 'Janice',
    place: 'Dubai',
    photo: originalImage('2025/12/screenshot_20251210152637.png'),
    text: 'Kyrgyzstan, a country that captures the hearts of travelers, was the perfect destination for our tour with Kyrgyzest. Our tour provider, Kyrgyzest, genuinely loves their country, and this passion is infectious. Jamilia, Daniel, and even our driver are passionate about sharing Kyrgyzstan’s beauty with us. They speak English exceptionally well, which made our interactions even more enjoyable. Kyrgyzest truly went above and beyond to pamper us, especially our little ones. They gifted us with precious Kyrgyz souvenirs that we will cherish forever. From the moment we arrived at the airport, we were treated like VIPs. The comfortable and pleasant transport ensured a smooth and enjoyable journey. Traveling with young children can be challenging, but Jamilia and Daniel graciously took turns holding the kids, providing us with much-needed relief. Every aspect of our tour was exceptional. The comfortable transport and accommodation made us feel at home. The breathtaking views, delectable food, and even the music playing in our car, which they took the time to translate for us, added to the overall experience. We had such a wonderful time in Kyrgyzstan that we were genuinely teary-eyed when we bid farewell to our incredibly helpful driver. We want to express our deepest gratitude to Jamilia and Daniel for making our tour truly unforgettable. As I mentioned earlier, we believe we left a piece of our hearts in Kyrgyzstan. We eagerly anticipate our return to this beautiful country and can’t wait to create more cherished memories with Kyrgyzest.',
  },
  {
    name: 'Amer',
    place: 'Dubai',
    photo: originalImage('2025/12/screenshot_20251210152645.png'),
    text: 'Hi Jamila! Im writing to thank you very much for this amazing tour and for assigning Kalyss to us! He was really extremely helpful and super kind! He booked for us the best yurts, hotels, and guesthouses, took us to the best restaurants, and showed us the beauty of Kyrgyzstan! Im in love with this country and its very kind, welcoming, and friendly people! Thank you very much for everything!! Im really grateful for meeting you, kalyss, bilal, and everyone on this trip who made it an unforgettable one! 🙏🏻🙏🏻',
  },
  {
    name: 'Jan-Peter',
    place: 'Germany',
    photo: originalImage('2025/12/screenshot_20251210155716.png'),
    text: "Thank you so much for this amazing & unforgettable week, Kyrgyzstan is a beautiful country and Kyrgyzest knows how to show it We had the best time and thanks to you Kyrgyzstan quickly became one of my favorite countries Ive traveled The tour not only showed us the history and natural beauty of Kyrgyzstan, but also gave unique insights into local life and cuisine I wouldn't have gotten any other way. Thank you so much for everything! I would come back any time",
  },
]
export const faqs = [
  {
    q: 'Who are the journeys designed for?',
    a: [
      {
        type: 'paragraph',
        text: 'Our small-group journeys welcome solo travellers, couples, friends and families. Private itineraries can be shaped around your group and preferred pace.',
      },
      {
        type: 'paragraph',
        text: 'Travelling together often creates the space for new connections along the way.',
      },
    ],
  },
  {
    q: 'What can I expect from the food?',
    a: [
      {
        type: 'paragraph',
        text: 'Meals introduce you to the flavours of Kyrgyzstan, with traditional dishes such as:',
      },
      {
        type: 'list',
        items: [
          'Beshbarmak, manty, lagman and kuurdak',
          'Boorsok and other local specialities',
        ],
      },
      {
        type: 'paragraph',
        text: 'Menus vary throughout the journey. Vegetarian and lighter options can be arranged on request. All meals provided during the tour are halal.',
      },
    ],
  },
  {
    q: 'Where will I stay?',
    a: [
      {
        type: 'paragraph',
        text: 'Depending on the route, stays may include four-star hotels, guesthouses and yurt camps. In remote areas, we select the best available option.',
      },
      {
        type: 'paragraph',
        text: 'We also choose transport with comfort and reliability in mind. Some journeys between destinations take several hours.',
      },
    ],
  },
  {
    q: 'What are the entry requirements for Kyrgyzstan?',
    a: [
      {
        type: 'paragraph',
        text: 'Visa requirements depend on your citizenship. Check the official e-Visa website before travelling for the latest guidance.',
      },
      {
        type: 'link',
        href: 'https://www.evisa.e-gov.kg/',
        label: 'Official Kyrgyzstan e-Visa website',
      },
      {
        type: 'paragraph',
        text: 'If you are unsure, contact our team and we will help you find the right information.',
      },
    ],
  },
  {
    q: 'How active are the tours?',
    a: [
      {
        type: 'paragraph',
        text: 'Standard tours do not require special physical training, though some travel days involve several hours on the road. Water is provided in the vehicle.',
      },
      {
        type: 'paragraph',
        text: 'Most itineraries include a horse-riding experience. The Horseback Adventure is more active, with riding planned on several days; contact us if you would like to discuss the route in more detail.',
      },
    ],
  },
  {
    q: 'Will I have internet and phone signal?',
    a: [
      {
        type: 'paragraph',
        text: 'Most of the route has mobile coverage, but signal may drop temporarily in remote valleys, canyons and mountain areas.',
      },
      {
        type: 'paragraph',
        text: 'Hotels provide Wi-Fi. Guests on group tours receive a local SIM card.',
      },
    ],
  },
  {
    q: 'Which meals are included?',
    a: [
      {
        type: 'paragraph',
        text: 'Most meals are included on group tours. Meals taken on the road during travel days are not included.',
      },
    ],
  },
  {
    q: 'How does Kyrgyzest support travellers during the trip?',
    a: [
      {
        type: 'paragraph',
        text: 'Our team plans routes carefully and works with experienced local guides and professional drivers. Along the way, we provide:',
      },
      {
        type: 'list',
        items: [
          'Small groups and trusted accommodation',
          'Local guidance and support throughout the journey',
          'Clear preparation for remote and high-altitude areas',
        ],
      },
      {
        type: 'paragraph',
        text: 'Many guests travel solo, including women, and appreciate having a local team alongside them.',
      },
    ],
  },
  {
    q: 'Can I speak with the team before booking?',
    a: [
      {
        type: 'paragraph',
        text: 'Of course. Contact us to arrange a call. We can walk you through the itinerary, answer your questions and discuss how a private journey might fit your preferences.',
      },
    ],
  },
]
// Approximate locations for genuine places named in published tour routes. No fabricated polylines.
export const mapPoints=[
  {name:'Bishkek',lat:42.8746,lng:74.5698,tours:['grand','horse','autumn','expedition']},
  {name:'Son-Kul Lake',lat:41.837,lng:75.151,tours:['grand','horse','expedition']},
  {name:'Issyk-Kul / Bokonbaevo',lat:42.115,lng:76.99,tours:['grand','autumn']},
  {name:'Chon-Kemin',lat:42.75,lng:75.77,tours:['autumn']},
  {name:'Karakol',lat:42.49,lng:78.39,tours:['autumn']},
  {name:'Jeti-Oguz',lat:42.33,lng:78.25,tours:['autumn']},
  {name:'Kyzart / Kilemche',lat:41.79,lng:74.99,tours:['horse']},
  {name:'Kel-Suu Lake',lat:40.645,lng:76.374,tours:['horse','expedition']},
]
