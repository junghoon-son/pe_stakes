import * as Plot from "../../_npm/@observablehq/plot@0.6.17/a96a6bbb.js";
import * as d3 from "../../_npm/d3@7.9.0/66d82917.js";

/**
 * Creates a year heatmap visualization showing a range of years
 * with highlighted years indicating the fraud period.
 *
 * @param {number} startYear - First year to show in the heatmap
 * @param {number} endYear - Last year to show in the heatmap
 * @param {number} highlightStart - Start year of the highlighted period
 * @param {number} highlightEnd - End year of the highlighted period
 * @param {Object} options - Optional configuration
 * @param {number} options.height - Chart height (default: 25)
 * @returns {SVGElement} The Plot SVG element
 */
export function yearHeatmap(startYear, endYear, highlightStart, highlightEnd, options = {}) {
  const { height = 25 } = options;

  const years = d3.range(startYear, endYear + 1);
  const data = years.map(year => ({
    year,
    highlight: year >= highlightStart && year <= highlightEnd
  }));

  return Plot.plot({
    height,
    x: {
      type: "band",
      domain: years,
      padding: 0,
      label: null,
      tickSize: 0,
      tickPadding: 3,
      tickFormat: d => d.toString()
    },
    y: {
      domain: [0, 1],
      padding: 2,
      axis: null
    },
    color: {
      domain: [false, true],
      range: ["#f0f0f0", "#3182bd"]
    },
    marks: [
      Plot.cell(data, {
        x: "year",
        fill: d => d.highlight,
        title: d => `Year: ${d.year}${d.highlight ? " (Highlighted)" : ""}`,
        stroke: "white",
        strokeWidth: 1
      }),
    ],
    style: {
      backgroundColor: "white",
      fontSize: "9px",
      fontColor: "#f0f0f0"
    },
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    marginBottom: 10
  });
}
