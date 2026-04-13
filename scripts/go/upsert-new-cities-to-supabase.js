/**
 * Upserts new city pages to Supabase go_at_home_sleep_test_pages table.
 * Run: node scripts/go/upsert-new-cities-to-supabase.js
 */

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const CONTENT_DIR = path.join(__dirname, '../../src/content/go/at-home-sleep-test');
const CITIES_FILE = path.join(CONTENT_DIR, 'data/cities.json');

// ─── New cities to add ────────────────────────────────────────────────────────

const NEW_CITIES = [
  // Florida (live: FALSE → is_published: false)
  {"name":"Palm Beach Gardens","live":"FALSE","slug":"palm-beach-gardens","county_slug":"palm-beach","state_slug":"florida","timezone":"EST","phone_number":"+1 (786) 348-2820","min_lat":"26.7856259","max_lat":"26.8980018","min_lon":"-80.2693218","max_lon":"-80.0574322","center_lat":"26.8233946","center_lon":"-80.1386547","zoom":"12"},
  {"name":"Wellington","live":"FALSE","slug":"wellington","county_slug":"palm-beach","state_slug":"florida","timezone":"EST","phone_number":"+1 (786) 348-2820","min_lat":"26.592521","max_lat":"26.6846569","min_lon":"-80.3641803","max_lon":"-80.1744501","center_lat":"26.6549551","center_lon":"-80.2375279","zoom":"12"},
  {"name":"Jupiter","live":"FALSE","slug":"jupiter","county_slug":"palm-beach","state_slug":"florida","timezone":"EST","phone_number":"+1 (786) 348-2820","min_lat":"26.8823176","max_lat":"26.9708806","min_lon":"-80.1734724","max_lon":"-80.0567704","center_lat":"26.9342246","center_lon":"-80.0942087","zoom":"12"},
  {"name":"Apopka","live":"FALSE","slug":"apopka","county_slug":"orange","state_slug":"florida","timezone":"EST","phone_number":"+1 (786) 348-2820","min_lat":"28.621787","max_lat":"28.786096","min_lon":"-81.593217","max_lon":"-81.459657","center_lat":"28.6732806","center_lon":"-81.5116471","zoom":"12"},
  {"name":"North Miami","live":"FALSE","slug":"north-miami","county_slug":"miami-dade","state_slug":"florida","timezone":"EST","phone_number":"+1 (786) 348-2820","min_lat":"25.880872","max_lat":"25.9304162","min_lon":"-80.227543","max_lon":"-80.126668","center_lat":"25.8900949","center_lon":"-80.1867138","zoom":"12"},
  {"name":"Horizon West","live":"FALSE","slug":"horizon-west","county_slug":"orange","state_slug":"florida","timezone":"EST","phone_number":"+1 (786) 348-2820","min_lat":"28.434433","max_lat":"28.514433","min_lon":"-81.6665207","max_lon":"-81.5865207","center_lat":"28.474433","center_lon":"-81.6265207","zoom":"12"},
  {"name":"Palm Harbor","live":"FALSE","slug":"palm-harbor","county_slug":"pinellas","state_slug":"florida","timezone":"EST","phone_number":"+1 (786) 348-2820","min_lat":"28.048667","max_lat":"28.123066","min_lon":"-82.84829","max_lon":"-82.70877","center_lat":"28.0856815","center_lon":"-82.756907","zoom":"12"},
  {"name":"Margate","live":"FALSE","slug":"margate","county_slug":"broward","state_slug":"florida","timezone":"EST","phone_number":"+1 (786) 348-2820","min_lat":"26.2107408","max_lat":"26.2741585","min_lon":"-80.2340259","max_lon":"-80.1905378","center_lat":"26.2445263","center_lon":"-80.206436","zoom":"12"},
  {"name":"Four Corners","live":"FALSE","slug":"four-corners","county_slug":"lake","state_slug":"florida","timezone":"EST","phone_number":"+1 (786) 348-2820","min_lat":"28.2325377","max_lat":"28.4348267","min_lon":"-81.7089915","max_lon":"-81.5855134","center_lat":"28.3550481","center_lon":"-81.6770547","zoom":"12"},
  {"name":"Winter Haven","live":"FALSE","slug":"winter-haven","county_slug":"polk","state_slug":"florida","timezone":"EST","phone_number":"+1 (786) 348-2820","min_lat":"27.9006397","max_lat":"28.0922184","min_lon":"-81.7701168","max_lon":"-81.6276636","center_lat":"28.0222435","center_lon":"-81.7328568","zoom":"12"},
  {"name":"Coconut Creek","live":"FALSE","slug":"coconut-creek","county_slug":"broward","state_slug":"florida","timezone":"EST","phone_number":"+1 (786) 348-2820","min_lat":"26.2147522","max_lat":"26.3278649","min_lon":"-80.2030451","max_lon":"-80.1669327","center_lat":"26.2517482","center_lon":"-80.1789351","zoom":"12"},
  {"name":"The Hammocks","live":"FALSE","slug":"the-hammocks","county_slug":"miami-dade","state_slug":"florida","timezone":"EST","phone_number":"+1 (786) 348-2820","min_lat":"25.6537064","max_lat":"25.688651","min_lon":"-80.479546","max_lon":"-80.4157669","center_lat":"25.6718443","center_lon":"-80.4478013","zoom":"12"},
  // Texas (live: TRUE → is_published: true)
  {"name":"Wylie","live":"TRUE","slug":"wylie","county_slug":"collin","state_slug":"texas","timezone":"CST","phone_number":"+1 (786) 348-2820","min_lat":"32.9682633","max_lat":"33.1008636","min_lon":"-96.5958747","max_lon":"-96.4234072","center_lat":"33.0151561","center_lon":"-96.5388038","zoom":"12"},
  {"name":"Little Elm","live":"TRUE","slug":"little-elm","county_slug":"denton","state_slug":"texas","timezone":"CST","phone_number":"+1 (786) 348-2820","min_lat":"33.132876","max_lat":"33.240458","min_lon":"-96.9771204","max_lon":"-96.8819671","center_lat":"33.1626194","center_lon":"-96.9375051","zoom":"12"},
  {"name":"Euless","live":"TRUE","slug":"euless","county_slug":"tarrant","state_slug":"texas","timezone":"CST","phone_number":"+1 (786) 348-2820","min_lat":"32.810594","max_lat":"32.8816288","min_lon":"-97.155983","max_lon":"-97.033088","center_lat":"32.8370727","center_lon":"-97.0819541","zoom":"12"},
  {"name":"Texas City","live":"TRUE","slug":"texas-city","county_slug":"galveston","state_slug":"texas","timezone":"CST","phone_number":"+1 (786) 348-2820","min_lat":"29.300965","max_lat":"29.566376","min_lon":"-95.0788828","max_lon":"-94.714285","center_lat":"29.396013","center_lon":"-94.9175485","zoom":"12"},
  {"name":"DeSoto","live":"TRUE","slug":"desoto","county_slug":"dallas","state_slug":"texas","timezone":"CST","phone_number":"+1 (786) 348-2820","min_lat":"32.565004","max_lat":"32.6476411","min_lon":"-96.9084633","max_lon":"-96.8223619","center_lat":"32.5897831","center_lon":"-96.8570183","zoom":"12"},
  {"name":"Burleson","live":"TRUE","slug":"burleson","county_slug":"johnson","state_slug":"texas","timezone":"CST","phone_number":"+1 (786) 348-2820","min_lat":"30.2955574","max_lat":"30.7308478","min_lon":"-96.9635725","max_lon":"-96.272111","center_lat":"30.4764878","center_lon":"-96.6353488","zoom":"12"},
  {"name":"Port Arthur","live":"TRUE","slug":"port-arthur","county_slug":"jefferson","state_slug":"texas","timezone":"CST","phone_number":"+1 (786) 348-2820","min_lat":"29.6331171","max_lat":"30.032348","min_lon":"-94.1066173","max_lon":"-93.8113504","center_lat":"29.8716577","center_lon":"-93.9332302","zoom":"12"},
  {"name":"Fulshear","live":"TRUE","slug":"fulshear","county_slug":"fort-bend","state_slug":"texas","timezone":"CST","phone_number":"+1 (786) 348-2820","min_lat":"29.6444541","max_lat":"29.7325985","min_lon":"-95.9298424","max_lon":"-95.8460355","center_lat":"29.6925638","center_lon":"-95.9001865","zoom":"12"},
  {"name":"Rockwall","live":"TRUE","slug":"rockwall","county_slug":"rockwall","state_slug":"texas","timezone":"CST","phone_number":"+1 (786) 348-2820","min_lat":"32.8139075","max_lat":"32.9823882","min_lon":"-96.5189592","max_lon":"-96.2972188","center_lat":"32.8923464","center_lon":"-96.4066987","zoom":"12"},
  {"name":"Galveston","live":"TRUE","slug":"galveston","county_slug":"galveston","state_slug":"texas","timezone":"CST","phone_number":"+1 (786) 348-2820","min_lat":"28.9963439","max_lat":"29.5982641","min_lon":"-95.233081","max_lon":"-94.3662785","center_lat":"29.3872254","center_lon":"-94.992736","zoom":"12"},
  {"name":"Celina","live":"TRUE","slug":"celina","county_slug":"collin","state_slug":"texas","timezone":"CST","phone_number":"+1 (786) 348-2820","min_lat":"33.2518497","max_lat":"33.4054821","min_lon":"-96.8942193","max_lon":"-96.7137543","center_lat":"33.3242486","center_lon":"-96.7842367","zoom":"12"},
  {"name":"Grapevine","live":"TRUE","slug":"grapevine","county_slug":"tarrant","state_slug":"texas","timezone":"CST","phone_number":"+1 (786) 348-2820","min_lat":"32.878493","max_lat":"32.993643","min_lon":"-97.1298384","max_lon":"-97.01569","center_lat":"32.9337381","center_lon":"-97.0788754","zoom":"12"},
];

// ─── Same logic as generate-at-home-sleep-test-pages.js ───────────────────────

const stateAbbreviations = { florida: 'FL', texas: 'TX' };

const META_TITLE_MAX_LENGTH = 60;

function ensureMetaTitleUnderLimit(metaTitle) {
  if (typeof metaTitle !== 'string' || metaTitle.length <= META_TITLE_MAX_LENGTH) return metaTitle;
  return metaTitle
    .replace(/, Florida\b/g, ', FL')
    .replace(/, Texas\b/g, ', TX')
    .slice(0, META_TITLE_MAX_LENGTH)
    .replace(/\s+\S*$/, '')
    .trim();
}

const stateVariations = {
  florida: {
    climate_context: "year-round warm climate",
    lifestyle_mention: "active outdoor lifestyle and beach communities",
    health_angle: "Many Floridians with sleep apnea find symptoms worsen during humid summer months",
    regional_challenge: "Long wait times at Florida sleep centers often exceed 6-8 weeks",
    demographic_note: "Florida's large retirement community means sleep apnea affects many residents over 50",
    urgency_phrase: "Don't let another sleepless night in the Sunshine State hold you back",
    local_benefit: "Skip the traffic and parking hassles at busy Florida medical centers",
    cities_served: [
      { text: "Jacksonville", image_src: "/locations/jacksonville.png", image_alt: "Jacksonville, Florida", link: "/go/at-home-sleep-test/jacksonville-florida" },
      { text: "Miami", image_src: "/locations/miami.png", image_alt: "Miami, Florida", link: "/go/at-home-sleep-test/miami-florida" },
      { text: "Tampa", image_src: "/locations/tampa.png", image_alt: "Tampa, Florida", link: "/go/at-home-sleep-test/tampa-florida" },
      { text: "Orlando", image_src: "/locations/orlando.png", image_alt: "Orlando, Florida", link: "/go/at-home-sleep-test/orlando-florida" },
      { text: "St. Petersburg", image_src: "/locations/st-petersburg.png", image_alt: "St. Petersburg, Florida", link: "/go/at-home-sleep-test/st-petersburg-florida" },
    ],
  },
  texas: {
    climate_context: "hot summers and variable weather",
    lifestyle_mention: "busy work schedules and long commutes across sprawling metro areas",
    health_angle: "Texas residents with untreated sleep apnea face higher risks in the state's demanding heat",
    regional_challenge: "Driving across Texas cities for sleep clinic appointments wastes hours of your day",
    demographic_note: "With Texas' fast-growing population, sleep clinic availability hasn't kept pace with demand",
    urgency_phrase: "Texans deserve better than outdated sleep testing methods",
    local_benefit: "No need to navigate crowded Texas highways for a simple sleep test",
    cities_served: [
      { text: "Houston", image_src: "/locations/houston.png", image_alt: "Houston, Texas", link: "/go/at-home-sleep-test/houston-texas" },
      { text: "San Antonio", image_src: "/locations/san-antonio.png", image_alt: "San Antonio, Texas", link: "/go/at-home-sleep-test/san-antonio-texas" },
      { text: "Dallas", image_src: "/locations/dallas.png", image_alt: "Dallas, Texas", link: "/go/at-home-sleep-test/dallas-texas" },
      { text: "Fort Worth", image_src: "/locations/fort-worth.png", image_alt: "Fort Worth, Texas", link: "/go/at-home-sleep-test/fort-worth-texas" },
      { text: "Austin", image_src: "/locations/austin.png", image_alt: "Austin, Texas", link: "/go/at-home-sleep-test/austin-texas" },
    ],
  },
};

const statesData = {
  florida: { name: 'Florida', slug: 'florida' },
  texas: { name: 'Texas', slug: 'texas' },
};

function getLocationContent(locationSlug, stateSlug, variables = {}) {
  let locationContent = {};
  const contentFilePath = path.join(CONTENT_DIR, 'find-contents', `sleep-doctor-${locationSlug}-${stateSlug}.json`);
  if (fs.existsSync(contentFilePath)) {
    locationContent = JSON.parse(fs.readFileSync(contentFilePath, 'utf8'));
  } else {
    locationContent = JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, 'find-contents', 'default-contents.json'), 'utf8'));
  }
  for (const key in locationContent) {
    if (typeof locationContent[key] === 'object' && Array.isArray(locationContent[key])) {
      if (locationContent[key].length === 1) {
        locationContent[key] = '<strong>' + locationContent[key][0] + '</strong>';
      } else if (locationContent[key].length > 1) {
        const listContent = locationContent[key];
        locationContent[key] = listContent.slice(0, listContent.length - 1).map(item => '<strong>' + item + '</strong>').join(', ');
        locationContent[key] += ' or ' + '<strong>' + listContent[listContent.length - 1] + '</strong>';
      } else {
        locationContent[key] = '';
      }
    }
    for (const variable in variables) {
      if (typeof locationContent[key] === 'string') {
        locationContent[key] = locationContent[key].replaceAll(`{{${variable}}}`, variables[variable]);
      }
    }
  }
  return locationContent;
}

function replaceTemplateVariables(tmpl, variables) {
  let jsonString = JSON.stringify(tmpl);
  Object.keys(variables).forEach(key => {
    const regex = new RegExp(`{{${key}}}`, 'g');
    jsonString = jsonString.replace(regex, variables[key]);
  });
  return JSON.parse(jsonString);
}

function generatePageData(city, state) {
  const stateSlug = state.slug;
  const stateName = state.name;
  const stateAbbr = stateAbbreviations[stateSlug.toLowerCase()] || stateName;
  const geoName = `${city.name}, ${stateName}`;
  const geoShort = `${city.name}, ${stateAbbr}`;

  const locationContent = getLocationContent(city.slug, stateSlug, { geo: city.name });
  const stateVars = stateVariations[stateSlug] || stateVariations.florida;

  const variables = {
    city_slug: city.slug,
    state_slug: stateSlug,
    timezone: city.timezone,
    geo: geoName,
    geo_short: geoShort,
    location: city.name,
    state: stateName,
    ...locationContent,
    ...stateVars,
  };

  const template = JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, 'template/at-home-sleep-test.json'), 'utf8'));
  let pageData = replaceTemplateVariables(template, variables);

  // Check for contents override
  const contentsFilePath = path.join(CONTENT_DIR, 'contents', `at-home-sleep-test-${city.slug}-${stateSlug}.json`);
  if (fs.existsSync(contentsFilePath)) {
    const contentData = JSON.parse(fs.readFileSync(contentsFilePath, 'utf8'));
    pageData = { ...pageData, ...contentData };
  }

  pageData.name = `At-Home Sleep Study in ${geoName}`;
  pageData.slug = `${city.slug}-${stateSlug}`;
  pageData.city_slug = city.slug;
  pageData.state_slug = stateSlug;
  pageData.city = city.name;
  pageData.state = stateName;
  pageData.location_type = 'city';
  pageData.formatted_location = geoName;
  pageData.geo_context = city.name;
  pageData.is_published = city.live === 'TRUE';
  pageData.final_url = `https://www.dumbo.health/go/at-home-sleep-test/${city.slug}-${stateSlug}`;
  pageData.meta_title = ensureMetaTitleUnderLimit(pageData.meta_title);

  pageData.city_data = {
    phone_number: city.phone_number || '+1 (786) 348-2820',
    min_lat: city.min_lat,
    max_lat: city.max_lat,
    min_lon: city.min_lon,
    max_lon: city.max_lon,
    center_lat: city.center_lat,
    center_lon: city.center_lon,
    zoom: city.zoom,
  };

  pageData.bounding_box = {
    min_lat: city.min_lat,
    max_lat: city.max_lat,
    min_lon: city.min_lon,
    max_lon: city.max_lon,
    center_lat: city.center_lat,
    center_lon: city.center_lon,
    zoom: city.zoom,
  };

  return pageData;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

  // 1. Update cities.json
  console.log('📝 Updating cities.json...');
  const existingCities = JSON.parse(fs.readFileSync(CITIES_FILE, 'utf8'));
  const existingSlugs = new Set(existingCities.map(c => c.slug));
  const citiesToAdd = NEW_CITIES.filter(c => !existingSlugs.has(c.slug));
  const updatedCities = [...existingCities, ...citiesToAdd];
  fs.writeFileSync(CITIES_FILE, JSON.stringify(updatedCities, null, 3));
  console.log(`  Added ${citiesToAdd.length} cities to cities.json (${updatedCities.length} total)`);

  // 2. Generate + upsert each city
  let successCount = 0;
  let errorCount = 0;

  for (const city of NEW_CITIES) {
    const state = statesData[city.state_slug];
    if (!state) {
      console.error(`  ✗ Unknown state: ${city.state_slug} for ${city.name}`);
      errorCount++;
      continue;
    }

    const pageData = generatePageData(city, state);
    const slug = pageData.slug;

    // Strip fields that aren't columns in the DB table
    const { final_url, name, geo_context, ...dbRecord } = pageData;

    const { error } = await supabase
      .from('go_at_home_sleep_test_pages')
      .upsert(dbRecord, { onConflict: 'slug' });

    if (error) {
      console.error(`  ✗ ${slug}: ${error.message}`);
      errorCount++;
    } else {
      const status = pageData.is_published ? 'published' : 'draft';
      console.log(`  ✓ ${slug} [${status}]`);
      successCount++;
    }
  }

  console.log(`\n✅ Done: ${successCount} upserted, ${errorCount} errors`);
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
