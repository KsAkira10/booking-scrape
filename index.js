const puppeteer = require('puppeteer');

let bookingUrl = 'https://www.booking.com/searchresults.pt-br.html?label=gen173nr-1FCAEoggI46AdIM1gEaCCIAQGYAS24ARfIAQzYAQHoAQH4AQuIAgGoAgO4AvWw2vIFwAIB&sid=49fbfe19c91ef96f716dc8730db915f1&sb=1&sb_lp=1&src=index&src_elem=sb&error_url=https%3A%2F%2Fwww.booking.com%2Findex.pt-br.html%3Flabel%3Dgen173nr-1FCAEoggI46AdIM1gEaCCIAQGYAS24ARfIAQzYAQHoAQH4AQuIAgGoAgO4AvWw2vIFwAIB%3Bsid%3D49fbfe19c91ef96f716dc8730db915f1%3Bsb_price_type%3Dtotal%26%3B&sr_autoscroll=1&ss=Santiago%2C+Regi%C3%A3o+metropolitana%2C+Chile&is_ski_area=&checkin_year=2020&checkin_month=8&checkin_monthday=3&checkout_year=2020&checkout_month=8&checkout_monthday=14&group_adults=2&group_children=0&no_rooms=1&b_h4u_keep_filters=&from_sf=1&ss_raw=Chile&ac_position=0&ac_langcode=xb&ac_click_type=b&dest_id=-901202&dest_type=city&iata=SCL&place_id_lat=-33.437822&place_id_lon=-70.650486&search_pageview_id=7e4371bb107c00cb&search_selected=true&search_pageview_id=7e4371bb107c00cb&ac_suggestion_list_length=5&ac_suggestion_theme_list_length=0';
(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 926 });
  await page.goto(bookingUrl);

  // get hotel details
  let hotelData = await page.evaluate(() => {
    let hotels = [];
    // get the hotel elements
    let hotelsElms = document.querySelectorAll('div.sr_property_block[data-hotelid]');
    // get the hotel data
    hotelsElms.forEach((hotelelement) => {
      let hotelJson = {};
      try {
        hotelJson.name = hotelelement.querySelector('span.sr-hotel__name').innerText;
        hotelJson.reviews = hotelelement.querySelector('span.review-score-widget__subtext').innerText;
        hotelJson.rating = hotelelement.querySelector('span.review-score-badge').innerText;
        if (hotelelement.querySelector('strong.price')) {
          hotelJson.price = hotelelement.querySelector('strong.price').innerText;
        }
      }
      catch (exception) {
        console.error(exception)
      }
      hotels.push(hotelJson);
    });
    return hotels;
  });

  console.dir(hotelData);
})();