import {html} from "../../_npm/htl@0.3.1/063eb405.js";
import * as d3 from "../../_npm/d3@7.9.0/7055d4c5.js";

/**
 * Formats a number as currency with appropriate suffix (M, B)
 * @param {number} amount - The amount to format
 * @param {string} precision - d3 format precision (default: ".3s")
 * @returns {string} Formatted currency string
 */
function formatCurrency(amount, precision = ".3s") {
  return `$${d3.format(precision)(amount).replace(/G/, "B")}`;
}

/**
 * Calculates total fraud amount from an array of cases
 * @param {Array} data - Array of fraud cases with fraudAmount property
 * @returns {number} Total fraud amount
 */
export function totalFraudAmount(data) {
  return data.reduce((total, item) => total + (Number(item.fraudAmount) || 0), 0);
}

/**
 * Gets unique states from an array of cases
 * @param {Array} data - Array of fraud cases with state property
 * @returns {string[]} Array of unique state names
 */
export function uniqueStates(data) {
  return [...new Set(data.map(item => item.state))];
}

/**
 * Creates a single stat card component
 *
 * @param {string|number} value - The value to display
 * @param {string} caption - The caption/label for the stat
 * @returns {HTMLElement} The stat card element
 */
export function statCard(value, caption) {
  return html`
    <div class="big-number-card">
      <div class="big-number">${value}</div>
      <div class="big-number-caption">${caption}</div>
    </div>
  `;
}

/**
 * Creates a stats panel for fraud data showing total amount, case count, and unique states
 *
 * @param {Array} data - Array of fraud case data
 * @param {Object} options - Configuration options
 * @param {boolean} options.showStates - Whether to show unique states count (default: true)
 * @returns {HTMLElement} The stats panel element
 */
export function fraudStatsPanel(data, options = {}) {
  const { showStates = true } = options;

  const totalAmount = formatCurrency(totalFraudAmount(data));
  const caseCount = data.length;
  const stateCount = uniqueStates(data).length;

  return html`
    <div class="stats-container">
      ${statCard(totalAmount, "Total Fraud Amount")}
      ${statCard(caseCount, "Cases")}
      ${showStates ? statCard(stateCount, "Unique States") : ""}
    </div>
  `;
}
