# Adding a New City for At-Home Sleep Test Pages

This guide explains how to add a new city (or state) to the programmatic at-home sleep test pages under `/go/at-home-sleep-test/[slug]`.

## Content Locations

All at-home sleep test content lives under:

```
src/content/go/at-home-sleep-test/
├── data/
│   ├── cities.json      # City definitions (name, slug, state, coordinates, etc.)
│   └── state.json       # State definitions (name, slug, live flag)
├── template/
│   └── at-home-sleep-test.json   # Template with {{variables}} for page content
├── find-contents/       # Location-specific content overrides
│   ├── default-contents.json
│   └── sleep-doctor-{city}-{state}.json
├── contents/            # Optional per-page content overrides
│   └── at-home-sleep-test-{city}-{state}.json
└── pages/               # Generated JSON pages (output of script)
    └── at-home-sleep-test-{slug}.json
```

## Adding a New City

### 1. Add the city to `data/cities.json`

Add an entry with:

- `name` – Display name (e.g. "Miami")
- `slug` – URL slug (e.g. "miami")
- `state_slug` – Must match a key in `data/state.json` (e.g. "florida")
- `live` – `"TRUE"` to include in generation
- `timezone` – e.g. `"America/New_York"`
- `phone_number` – Optional; defaults to `+1 (786) 348-2820`
- Map coordinates: `min_lat`, `max_lat`, `min_lon`, `max_lon`, `center_lat`, `center_lon`, `zoom`

Example:

```json
{
  "name": "New City",
  "slug": "new-city",
  "state_slug": "florida",
  "live": "TRUE",
  "timezone": "America/New_York",
  "min_lat": 25.5,
  "max_lat": 26.0,
  "min_lon": -80.5,
  "max_lon": -80.0,
  "center_lat": 25.75,
  "center_lon": -80.25,
  "zoom": 10
}
```

### 2. (Optional) Add state to `data/state.json`

If the state is new, add an entry with `name`, `slug`, and `live: "TRUE"`.

### 3. (Optional) Add `find-contents` for custom copy

Create `find-contents/sleep-doctor-{city}-{state}.json` if you need location-specific copy. Otherwise the script uses `default-contents.json`.

### 4. Update `stateVariations` in the generation script (for new states)

If you add a new state, edit `scripts/go/generate-at-home-sleep-test-pages.js` and add a `stateVariations` entry with:

- `climate_context`, `lifestyle_mention`, `health_angle`, etc.
- `cities_served` – array of featured cities with `text`, `image_src`, `image_alt`, `link` (use `/go/at-home-sleep-test/{slug}` for links)

### 5. Run the generation script

```bash
npm run go:generate-at-home-sleep-test
```

This will:

- Read `data/cities.json` and `data/state.json`
- Use the template and find-contents to build each page
- Write JSON files to `src/content/go/at-home-sleep-test/pages/`
- Write a manifest to `public/go/_at-home-sleep-test-state-city-pages-generated.json`

### 6. Verify

- Visit `/go/at-home-sleep-test/{city}-{state}` (e.g. `/go/at-home-sleep-test/new-city-florida`)
- `/go/find/sleep-doctor-{city}-{state}` should redirect to the same page

## Adding a New State

1. Add the state to `data/state.json` with `live: "TRUE"`.
2. Add a `stateVariations` entry in `scripts/go/generate-at-home-sleep-test-pages.js` (including `stateAbbreviations` and `cities_served`).
3. Add cities to `data/cities.json` with `state_slug` matching the new state.
4. Run `npm run go:generate-at-home-sleep-test`.

## Notes

- Image paths in `cities_served` use `/locations/...`; the UI prepends `/go` for assets under `public/go/`.
- Links in generated JSON use `/go/at-home-sleep-test/...` for the main app.
- The find route (`/go/find/sleep-doctor-*`) redirects to the corresponding at-home-sleep-test page.
