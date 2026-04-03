import * as Plot from "../../_npm/@observablehq/plot@0.6.17/_esm.js";
import * as d3 from "../../_npm/d3@7.9.0/_esm.js";

/**
 * Aggregates fraud amounts by state
 * @param {Array} data - Array of fraud cases with state and fraudAmount properties
 * @returns {Array<{state: string, fraudAmount: number}>} Aggregated data by state
 */
export function aggregateByState(data) {
  const aggregated = {};
  data.forEach(item => {
    if (aggregated[item.state]) {
      aggregated[item.state] += item.fraudAmount;
    } else {
      aggregated[item.state] = item.fraudAmount;
    }
  });
  return Object.entries(aggregated).map(([state, fraudAmount]) => ({
    state,
    fraudAmount
  }));
}

/**
 * Counts cases by state
 * @param {Array} data - Array of fraud cases with state property
 * @returns {Array<{state: string, count: number}>} Count data by state
 */
export function countByState(data) {
  const counts = {};
  data.forEach(item => {
    const state = item.state;
    counts[state] = (counts[state] || 0) + 1;
  });
  return Object.entries(counts).map(([state, count]) => ({ state, count }));
}

/**
 * Creates a horizontal bar chart showing fraud amounts by state
 *
 * @param {Array} data - Array of fraud cases
 * @param {Object} options - Chart options
 * @param {number} options.height - Chart height (default: 350)
 * @param {number} options.limit - Number of states to show (default: 6)
 * @param {string} options.colorScheme - D3 color scheme (default: "OrRd")
 * @returns {SVGElement} The Plot SVG element
 */
export function stateFraudAmountChart(data, options = {}) {
  const { height = 350, limit = 6, colorScheme = "OrRd" } = options;
  const aggregatedData = aggregateByState(data);

  return Plot.plot({
    marginTop: 0,
    paddingTop: 0,
    paddingLeft: 10,
    marginLeft: 80,
    marginRight: 50,
    marginBottom: 0,
    height,
    x: { axis: null },
    y: { label: null },
    style: {
      fontSize: "1.0em",
    },
    color: {
      scheme: colorScheme,
      legend: false,
    },
    marks: [
      Plot.barX(aggregatedData, {
        x: "fraudAmount",
        y: "state",
        fill: "fraudAmount",
        sort: { y: "x", reverse: true, limit }
      }),
      Plot.text(aggregatedData, {
        text: d => `$${d3.format(".3s")(d.fraudAmount).replace(/G/, "B")}`,
        y: "state",
        x: "fraudAmount",
        textAnchor: "start",
        dx: 3,
        fill: "black"
      })
    ]
  });
}

/**
 * Creates a horizontal bar chart showing case counts by state
 *
 * @param {Array} data - Array of fraud cases
 * @param {Object} options - Chart options
 * @param {number} options.height - Chart height (default: 350)
 * @param {number} options.limit - Number of states to show (default: 6)
 * @param {string} options.colorScheme - D3 color scheme (default: "OrRd")
 * @returns {SVGElement} The Plot SVG element
 */
export function stateCaseCountChart(data, options = {}) {
  const { height = 350, limit = 6, colorScheme = "OrRd" } = options;
  const countsData = countByState(data);

  return Plot.plot({
    marginTop: 0,
    paddingTop: 0,
    paddingLeft: 10,
    marginLeft: 80,
    marginRight: 50,
    marginBottom: 0,
    height,
    x: { axis: null },
    y: { label: null },
    style: {
      fontSize: "1.0em",
    },
    color: {
      scheme: colorScheme,
      legend: false,
    },
    marks: [
      Plot.barX(countsData, {
        x: "count",
        y: "state",
        fill: "count",
        sort: { y: "x", reverse: true, limit }
      }),
      Plot.text(countsData, {
        text: "count",
        y: "state",
        x: "count",
        textAnchor: "start",
        dx: 3,
        fill: "black"
      })
    ]
  });
}
