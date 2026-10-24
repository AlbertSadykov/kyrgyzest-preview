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
  {id:'autumn', title:'Kyrgyzest Autumn Tour',sub:'A journey through nomadic culture, alpine valleys & high-mountains',days:'7 days',season:'October 2026',img:photos.autumn,href:'https://kyrgyzest.com/tours/kyrgyzest-autumn-tour/',kicker:'Golden season'},
  {id:'grand',title:'Kyrgyzest Grand Tour',sub:'A journey through nomadic culture, alpine valleys & high-mountain lakes',days:'8 days',season:'May – September 2027',img:photos.grand,href:'https://kyrgyzest.com/tours/kyrgyzest-grand-tour/',kicker:'The signature journey'},
  {id:'horse',title:'Horseback Adventure Tour',sub:'Explore Kyrgyzstan’s mountains & nomadic traditions on horseback',days:'7 days',season:'June – September 2027',img:photos.horseback,href:'https://kyrgyzest.com/tours/horseback-adventure-tour/',kicker:'Into the wild'},
  {id:'expedition',title:'Kyrgyzest Expedition',sub:'From yurt camps to alpine valleys and turquoise high-mountain lakes',days:'10 days',season:'June – September 2027',img:photos.expedition,href:'https://kyrgyzest.com/tours/kyrgyzest-exdepition/',kicker:'Go further'},
  {id:'private',title:'Private Tours',sub:'Custom adventures designed for families, friends, and couples — with comfort, safety, and fun at every step',days:'Tailor-made',season:'On request',img:photos.private,href:'https://kyrgyzest.com/tours/family-tours/',kicker:'Made for you'}
]
export const destinations=[
  {name:'Son-Kul Lake',region:'Naryn region',img:photos.lake,href:tours[1].href},
  {name:'Chon-Kemin',region:'Chuy region',img:photos.chonKemin,href:tours[0].href},
  {name:'Issyk-Kul',region:'Lakes & mountains',img:photos.nature,href:tours[0].href},
  {name:'Jeti-Oguz',region:'Karakol region',img:photos.jetiOguz,href:tours[0].href}
]
export const gallery=[
 {src:photos.galleryWide,label:'The Kyrgyz mountains'},
 {src:photos.galleryRoad,label:'The road less travelled'},
 {src:photos.lake3,label:'An open horizon'},
 {src:photos.trek,label:'The highlands'},
 {src:photos.galleryLife,label:'Moments along the way'},
 {src:photos.galleryLake,label:'Among the mountain lakes'},
 {src:photos.karakol,label:'Beyond the valley'},
 {src:photos.lake2,label:'Light on the landscape'},
]
// Published authors and locations are preserved. Full testimonials are linked to original publication;
// this prototype avoids inventing or paraphrasing source reviews.
export const reviews=[
  {name:'Zaynab',place:'London, UK'}, {name:'Johanna',place:'Liechtenstein'},
  {name:'Gabby',place:'London, UK'}, {name:'Michelle',place:'London, UK'},
  {name:'Mahdia',place:'USA'}, {name:'Balgisa',place:'Finland'},
  {name:'Janice',place:'Dubai'}, {name:'Amer',place:'Dubai'},
  {name:'Jan-Peter',place:'Germany'},
]
export const faqs=[
  {
    q:'Who are these tours for?',
    a:[
      {type:'paragraph',text:'Our tours are for solo travellers, friends, couples, and anyone who wants to explore Kyrgyzstan with like-minded people.'},
      {type:'paragraph',text:'By the end of the journey, travellers often become friends.'}
    ]
  },
  {
    q:'What kind of food can I expect during the trip?',
    a:[
      {type:'paragraph',text:'Throughout the tour, you’ll enjoy a variety of traditional Kyrgyz dishes, including:'},
      {type:'list',items:['Beshbarmak, manty, lagman, and kuurdak','Boorsok and other local specialities']},
      {type:'paragraph',text:'The menu offers new flavours each day, with no repeated meals. Vegetarian and lighter options are available upon request.'},
      {type:'paragraph',text:'Kyrgyzstan is a Muslim-majority country, and all meals provided during the tour are halal.'}
    ]
  },
  {
    q:'What level of comfort can I expect?',
    a:[
      {type:'paragraph',text:'We choose the best available accommodation in each location, including remote areas. Depending on the destination, you may stay in a yurt camp or a hotel.'},
      {type:'paragraph',text:'Comfort and reliability are also priorities when we select transportation. We do our best to make your journey smooth and enjoyable from start to finish.'}
    ]
  },
  {
    q:'What are the entry requirements for Kyrgyzstan?',
    a:[
      {type:'paragraph',text:'Many nationalities can enter Kyrgyzstan without a visa. Requirements depend on your citizenship, so check the official government e-Visa website before travelling.'},
      {type:'link',href:'https://www.evisa.e-gov.kg/',label:'Official Kyrgyzstan e-Visa website'},
      {type:'paragraph',text:'If you’re unsure, contact us and we’ll be happy to help you find the latest information.'}
    ]
  },
  {
    q:'Do I need any physical preparation?',
    a:[
      {type:'paragraph',text:'You don’t need special physical training for our standard tours. Please be prepared for some long drives between destinations, sometimes lasting several hours. We provide water in the car, and the routes offer beautiful mountain views.'},
      {type:'paragraph',text:'The programme also includes a horse-riding activity. The horses are accustomed to working with travellers; follow your guide’s instructions for a safe and enjoyable experience.'},
      {type:'paragraph',text:'For the Horse Trekking Tour, we recommend some previous riding experience because horse riding is planned each day.'}
    ]
  },
  {
    q:'Will there be internet and phone signal during the trip?',
    a:[
      {type:'paragraph',text:'Most parts of the route have mobile signal and internet access. In some mountain areas, canyons, and remote valleys, the connection may temporarily drop.'},
      {type:'paragraph',text:'Hotels along the route provide Wi-Fi. On group tours, we provide a local SIM card.'}
    ]
  },
  {
    q:'What meals are included in the tour price?',
    a:[
      {type:'paragraph',text:'On our group tours, most meals are included in the tour price.'},
      {type:'paragraph',text:'Meals taken on the road during travel days are not included.'}
    ]
  },
  {
    q:'Is it safe to travel to Kyrgyzstan?',
    a:[
      {type:'paragraph',text:'Kyrgyzstan is generally a safe country to visit, and safety is our top priority. We support our travellers with:'},
      {type:'list',items:['Experienced local guides and professional drivers','Small groups and carefully planned routes','Trusted accommodation and support from our team throughout the tour']},
      {type:'paragraph',text:'Many of our guests travel solo, including women, and feel comfortable during their journey.'}
    ]
  },
  {
    q:'How can we arrange a Zoom call?',
    a:[
      {type:'paragraph',text:'Contact our manager to arrange a Zoom call. We’ll coordinate a convenient time to discuss tour details, answer your questions, and tailor the programme to your preferences.'}
    ]
  }
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
