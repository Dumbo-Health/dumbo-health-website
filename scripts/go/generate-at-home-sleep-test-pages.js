const fs = require('fs');
const path = require('path');

const CONTENT_DIR = path.join(process.cwd(), 'src', 'content', 'go', 'at-home-sleep-test');

// Load data files
const cities = JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, 'data/cities.json'), 'utf8'));
const states = JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, 'data/state.json'), 'utf8'));

// Load template files
const template = JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, 'template/at-home-sleep-test.json'), 'utf8'));

let generatedCount = 0;
const pageType = 'at-home-sleep-test';

// State abbreviation mapping
const stateAbbreviations = {
    'florida': 'FL',
    'texas': 'TX'
};

const META_TITLE_MAX_LENGTH = 60;

function ensureMetaTitleUnderLimit(metaTitle) {
    if (typeof metaTitle !== 'string' || metaTitle.length <= META_TITLE_MAX_LENGTH) return metaTitle;
    return metaTitle
        .replace(/, Florida\b/g, ', FL')
        .replace(/, Texas\b/g, ', TX')
        .slice(0, META_TITLE_MAX_LENGTH)
        .replace(/\s+\S*$/, '') // trim at last word boundary
        .trim();
}

// State-specific semantic variations for unique content per region
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
            {
                "text": "Jacksonville",
                "image_src": "/locations/jacksonville.png",
                "image_alt": "Jacksonville, Florida",
                "link": "/go/at-home-sleep-test/jacksonville-florida"
            },
            {
                "text": "Miami",
                "image_src": "/locations/miami.png",
                "image_alt": "Miami, Florida",
                "link": "/go/at-home-sleep-test/miami-florida"
            },
            {
                "text": "Tampa",
                "image_src": "/locations/tampa.png",
                "image_alt": "Tampa, Florida",
                "link": "/go/at-home-sleep-test/tampa-florida"
            },
            {
                "text": "Orlando",
                "image_src": "/locations/orlando.png",
                "image_alt": "Orlando, Florida",
                "link": "/go/at-home-sleep-test/orlando-florida"
            },
            {
                "text": "St. Petersburg",
                "image_src": "/locations/st-petersburg.png",
                "image_alt": "St. Petersburg, Florida",
                "link": "/go/at-home-sleep-test/st-petersburg-florida"
            }
        ]
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
            {
                "text": "Houston",
                "image_src": "/locations/houston.png",
                "image_alt": "Houston, Texas",
                "link": "/go/at-home-sleep-test/houston-texas"
            },
            {
                "text": "San Antonio",
                "image_src": "/locations/san-antonio.png",
                "image_alt": "San Antonio, Texas",
                "link": "/go/at-home-sleep-test/san-antonio-texas"
            },
            {
                "text": "Dallas",
                "image_src": "/locations/dallas.png",
                "image_alt": "Dallas, Texas",
                "link": "/go/at-home-sleep-test/dallas-texas"
            },
            {
                "text": "Fort Worth",
                "image_src": "/locations/fort-worth.png",
                "image_alt": "Fort Worth, Texas",
                "link": "/go/at-home-sleep-test/fort-worth-texas"
            },
            {
                "text": "Austin",
                "image_src": "/locations/austin.png",
                "image_alt": "Austin, Texas",
                "link": "/go/at-home-sleep-test/austin-texas"
            }
        ]
    }
};

// Function to replace template variables
function replaceTemplateVariables(template, variables) {
    let jsonString = JSON.stringify(template);

    // Replace all template variables
    Object.keys(variables).forEach(key => {
        const regex = new RegExp(`{{${key}}}`, 'g');
        jsonString = jsonString.replace(regex, variables[key]);
    });

    return JSON.parse(jsonString);
}

function getLocationContent(locationSlug, stateSlug, variables={}) {
    var locationContent = {};
    const contentFilePath = path.join(CONTENT_DIR, 'find-contents', `sleep-doctor-${locationSlug}-${stateSlug}.json`);
    if (fs.existsSync(contentFilePath)) {
        locationContent = JSON.parse(fs.readFileSync(contentFilePath, 'utf8'));
    } else {
        locationContent = JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, 'find-contents', 'default-contents.json'), 'utf8'));
    }
    for (const key in locationContent) {
        if (typeof locationContent[key] === 'object' && Array.isArray(locationContent[key])) {
            if (locationContent[key].length === 1) {
                locationContent[key] = "<strong>" + locationContent[key][0] + "</strong>";
            } else if (locationContent[key].length > 1) {
                var listContent = locationContent[key];
                locationContent[key] = listContent.slice(0, listContent.length - 1).map(item => "<strong>" + item + "</strong>").join(', ');
                locationContent[key] += ' or ' + "<strong>" + listContent[listContent.length - 1] + "</strong>";
            } else {
                locationContent[key] = "";
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

// Function to generate page data using templates
function generatePageData(location, locationType, state) {
    const locationName = location.name;
    const locationSlug = location.slug;
    const locationTimezone = location.timezone;
    const stateSlug = state.slug;
    const stateName = state.name;
    const geoContext = locationType === 'city'
        ? locationName
        : stateName;
    const geoName = locationType === 'state'
        ? stateName
        : `${geoContext}, ${stateName}`;
    
    // Create geo with abbreviated state for headlines
    const stateAbbr = stateAbbreviations[stateSlug.toLowerCase()] || stateName;
    const geoShort = locationType === 'state'
        ? stateAbbr
        : `${locationName}, ${stateAbbr}`;
    
    const locationContent = getLocationContent(locationSlug, stateSlug, {
        geo: geoContext
    });

    // Get state-specific variations for semantic uniqueness
    const stateVars = stateVariations[stateSlug] || stateVariations.florida;

    // Create variables object for template substitution
    const variables = {
        city_slug: locationType === 'city' ? locationSlug : '',
        state_slug: stateSlug,
        timezone: locationTimezone,
        geo: geoName,
        geo_short: geoShort,
        location: locationName,
        state: stateName,
        ...locationContent,
        ...stateVars,
    };

    // Replace template variables
    var pageData = replaceTemplateVariables(template, variables);

    // Add cities_served for state-level pages (arrays can't go through template replacement)
    if (locationType === 'state' && stateVars.cities_served) {
        pageData.cities_served = stateVars.cities_served;
    }

    // Add content data if it exists
    const contentsDir = path.join(CONTENT_DIR, 'contents');
    const contentFilePath = path.join(contentsDir, `${pageType}-${location.slug}-${state.slug}.json`);
    if (fs.existsSync(contentFilePath)) {
        const contentData = JSON.parse(fs.readFileSync(contentFilePath, 'utf8'));
        pageData = { ...pageData, ...contentData };
    }
    
    // Add additional metadata that's not in templates
    pageData.name = `At-Home Sleep Study in ${geoName}`;
    pageData.city_slug = locationType === 'city' ? locationSlug : '';
    pageData.state_slug = stateSlug;
    pageData.city = locationType === 'city' ? locationName : '';
    pageData.state = stateName;

    // Add location-specific data for runtime use
    pageData.location_type = locationType;
    pageData.formatted_location = geoName;
    pageData.geo_context = geoContext;

    // Ensure meta_title is within SEO limit (50-60 chars)
    pageData.meta_title = ensureMetaTitleUnderLimit(pageData.meta_title);

    // Add city data if this is a city-level page
    if (locationType === 'city') {
        pageData.city_data = {
            phone_number: location.phone_number || "+1 (786) 348-2820",
            min_lat: location.min_lat,
            max_lat: location.max_lat,
            min_lon: location.min_lon,
            max_lon: location.max_lon,
            center_lat: location.center_lat,
            center_lon: location.center_lon,
            zoom: location.zoom
        };

        pageData.bounding_box = {
            min_lat: location.min_lat,
            max_lat: location.max_lat,
            min_lon: location.min_lon,
            max_lon: location.max_lon,
            center_lat: location.center_lat,
            center_lon: location.center_lon,
            zoom: location.zoom
        };
    }
    // Add state data if this is a state-level page
    else if (locationType === 'state') {
        pageData.state_data = {
            phone_number: location.phone_number || "+1 (786) 348-2820",
            min_lat: location.min_lat,
            max_lat: location.max_lat,
            min_lon: location.min_lon,
            max_lon: location.max_lon,
            center_lat: location.center_lat,
            center_lon: location.center_lon,
            zoom: location.zoom
        };
        pageData.bounding_box = {
            min_lat: location.min_lat,
            max_lat: location.max_lat,
            min_lon: location.min_lon,
            max_lon: location.max_lon,
            center_lat: location.center_lat,
            center_lon: location.center_lon,
            zoom: location.zoom
        };
    }

    return pageData;
}

// Ensure pages directory exists
const pagesDir = path.join(CONTENT_DIR, 'pages');
if (!fs.existsSync(pagesDir)) {
    fs.mkdirSync(pagesDir, { recursive: true });
}

console.log('🚀 Starting at-home-sleep-test page generation...');

const pagesGenerated = [];

// Generate pages for each state
states.forEach(state => {
    if (state.live === 'TRUE') {
        console.log(`Generating ${pageType} page for ${state.name}`);
        const pageData = generatePageData(state, 'state', state);
        const filename = `${pageType}-${state.slug}.json`;
        const filePath = path.join(pagesDir, filename);
        pagesGenerated.push({
            localUrl: `http://127.0.0.1:3000/go/at-home-sleep-test/${state.slug}`,
            remoteUrl: `https://www.dumbo.health/go/at-home-sleep-test/${state.slug}`,
            pageType: pageType,
            city: null,
            state: state.name
        });

        pageData.final_url = `https://www.dumbo.health/go/at-home-sleep-test/${state.slug}`;

        fs.writeFileSync(filePath, JSON.stringify(pageData, null, 2));
        generatedCount++;

        // Generate city-level pages
        cities.forEach(city => {
            if (city.state_slug === state.slug && city.live === 'TRUE') {
                console.log(`Generating ${pageType} page for ${state.name} - ${city.name} (${generatedCount + 1} th page)`);
                const pageData = generatePageData(city, 'city', state);
                const filename = `${pageType}-${city.slug}-${state.slug}.json`;
                const filePath = path.join(pagesDir, filename);
                
                pagesGenerated.push({
                    localUrl: `http://127.0.0.1:3000/go/at-home-sleep-test/${city.slug}-${state.slug}`,
                    remoteUrl: `https://www.dumbo.health/go/at-home-sleep-test/${city.slug}-${state.slug}`,
                    pageType: pageType,
                    city: city.name,
                    state: state.name
                });

                pageData.final_url = `https://www.dumbo.health/go/at-home-sleep-test/${city.slug}-${state.slug}`;
                fs.writeFileSync(filePath, JSON.stringify(pageData, null, 2));
                generatedCount++;
            }
        });
    }
});

console.log(`✅ Successfully generated ${generatedCount} JSON pages for at-home-sleep-test!`);
console.log(`📁 Pages saved to: ${pagesDir}`);

fs.writeFileSync(path.join(process.cwd(), 'public/go/_at-home-sleep-test-state-city-pages-generated.json'), JSON.stringify(pagesGenerated, null, 2));
