import * as Plot from "../../_npm/@observablehq/plot@0.6.14/0bada646.js";
import * as d3 from "../../_npm/d3@7.9.0/7055d4c5.js";
import * as topojson from "../../_npm/topojson-client@3.1.0/44d97fcb.js";

/**
 * State name to abbreviation mapping
 */
const stateNameToAbbr = {
  "Alabama": "AL", "Alaska": "AK", "Arizona": "AZ", "Arkansas": "AR",
  "California": "CA", "Colorado": "CO", "Connecticut": "CT", "Delaware": "DE",
  "Florida": "FL", "Georgia": "GA", "Hawaii": "HI", "Idaho": "ID",
  "Illinois": "IL", "Indiana": "IN", "Iowa": "IA", "Kansas": "KS",
  "Kentucky": "KY", "Louisiana": "LA", "Maine": "ME", "Maryland": "MD",
  "Massachusetts": "MA", "Michigan": "MI", "Minnesota": "MN", "Mississippi": "MS",
  "Missouri": "MO", "Montana": "MT", "Nebraska": "NE", "Nevada": "NV",
  "New Hampshire": "NH", "New Jersey": "NJ", "New Mexico": "NM", "New York": "NY",
  "North Carolina": "NC", "North Dakota": "ND", "Ohio": "OH", "Oklahoma": "OK",
  "Oregon": "OR", "Pennsylvania": "PA", "Rhode Island": "RI", "South Carolina": "SC",
  "South Dakota": "SD", "Tennessee": "TN", "Texas": "TX", "Utah": "UT",
  "Vermont": "VT", "Virginia": "VA", "Washington": "WA", "West Virginia": "WV",
  "Wisconsin": "WI", "Wyoming": "WY", "District of Columbia": "DC"
};

/**
 * Abbreviation to state name mapping
 */
const abbrToStateName = Object.fromEntries(
  Object.entries(stateNameToAbbr).map(([name, abbr]) => [abbr, name])
);

/**
 * Normalize state identifier to full name
 * Accepts both full name and abbreviation
 */
function normalizeStateName(state) {
  if (!state || typeof state !== 'string') return null;
  // If it's an abbreviation, convert to full name
  if (state.length <= 3 && abbrToStateName[state.toUpperCase()]) {
    return abbrToStateName[state.toUpperCase()];
  }
  // Otherwise assume it's already a full name
  return state;
}

/**
 * Aggregates fraud amounts by state (normalized to full names)
 * @param {Array} data - Array of fraud cases
 * @returns {Map} Map of state name to fraud amount
 */
function aggregateByStateName(data) {
  const aggregated = new Map();
  data.forEach(item => {
    const stateName = normalizeStateName(item.state);
    if (stateName) {
      aggregated.set(stateName, (aggregated.get(stateName) || 0) + item.fraudAmount);
    }
  });
  return aggregated;
}

/**
 * Count cases by state (normalized to full names)
 * @param {Array} data - Array of fraud cases
 * @returns {Map} Map of state name to case count
 */
function countByStateName(data) {
  const counts = new Map();
  data.forEach(item => {
    const stateName = normalizeStateName(item.state);
    if (stateName) {
      counts.set(stateName, (counts.get(stateName) || 0) + 1);
    }
  });
  return counts;
}

/**
 * Creates a US choropleth map showing fraud data by state
 *
 * @param {Array} data - Array of fraud cases with state and fraudAmount properties
 * @param {Object} us - US TopoJSON data
 * @param {Object} options - Chart options
 * @param {number} options.width - Chart width (default: 975)
 * @param {number} options.height - Chart height (default: 610)
 * @param {string} options.colorScheme - D3 color scheme (default: "OrRd")
 * @param {string} options.metric - What to show: "amount" or "count" (default: "amount")
 * @returns {SVGElement} The Plot SVG element
 */
export function usStateFraudMap(data, us, options = {}) {
  const {
    width = 640,
    height = 400,
    colorScheme = "OrRd",
    metric = "amount"
  } = options;

  // Get states from TopoJSON
  const states = topojson.feature(us, us.objects.states);
  const statemesh = topojson.mesh(us, us.objects.states, (a, b) => a !== b);

  // Aggregate data by state
  const stateData = metric === "count"
    ? countByStateName(data)
    : aggregateByStateName(data);

  // Create lookup for state names from TopoJSON (uses FIPS codes)
  // The us-atlas states have 'name' property
  const stateValues = new Map();
  states.features.forEach(feature => {
    const stateName = feature.properties.name;
    const value = stateData.get(stateName) || 0;
    stateValues.set(feature.id, { value, name: stateName });
  });

  // Format value for display
  const formatValue = metric === "count"
    ? d => `${d} cases`
    : d => `$${d3.format(".3s")(d).replace(/G/, "B")}`;

  // Format for legend ticks
  const tickFormat = metric === "count"
    ? d => d
    : d => `$${d3.format(".2s")(d).replace(/G/, "B")}`;

  return Plot.plot({
    width,
    height,
    projection: "albers-usa",
    color: {
      type: "quantize",
      n: 5,
      domain: [0, d3.max(stateData.values())],
      scheme: colorScheme,
      label: metric === "count" ? "Cases" : "Fraud amount",
      legend: true,
      tickFormat
    },
    marks: [
      Plot.geo(states, {
        fill: d => stateValues.get(d.id)?.value || 0,
        stroke: "#fff",
        strokeWidth: 0.5,
        title: d => {
          const info = stateValues.get(d.id);
          return info ? `${info.name}\n${formatValue(info.value)}` : null;
        }
      }),
      Plot.geo(statemesh, {
        stroke: "#fff",
        strokeWidth: 1,
        fill: null
      })
    ]
  });
}

/**
 * Async function to fetch US TopoJSON and create the map
 * Use this in Observable Framework with await
 */
export async function createUsStateFraudMap(data, options = {}) {
  // Use non-projected TopoJSON so we can apply projection in Plot
  const us = await d3.json("https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json");
  return usStateFraudMap(data, us, options);
}
