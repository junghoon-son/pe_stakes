import {html} from "../../_npm/htl@0.3.1/063eb405.js";
import * as d3 from "../../_npm/d3@7.9.0/7055d4c5.js";
import {yearHeatmap} from "./yearHeatmap.1e8263f3.js";

/**
 * Formats a number as currency with appropriate suffix (M, B)
 * @param {number} amount - The amount to format
 * @param {string} precision - d3 format precision (default: ".2s")
 * @returns {string} Formatted currency string
 */
export function formatCurrency(amount, precision = ".2s") {
  return `$${d3.format(precision)(amount).replace(/G/, "B")}`;
}

/**
 * Creates a fraud case card component
 *
 * @param {Object} data - The fraud case data
 * @param {string} data.title - Case title
 * @param {string} data.caseNumber - Case number
 * @param {string} data.state - State where fraud occurred
 * @param {string} data.plaintiff - Plaintiff name
 * @param {string|string[]} data.defendant - Defendant name(s)
 * @param {string} data.summary - Case summary
 * @param {string} data.category - Fraud category
 * @param {number} data.fraudAmount - Amount of alleged fraud
 * @param {string} data.affectedCount - Number of affected parties
 * @param {Array<{url: string, text: string}>} data.relatedLinks - Related links
 * @param {Array<{comment: string, added_by: string}>} data.commentary - Comments on the case
 * @param {Object} data.timeline - Timeline info
 * @param {number} data.timeline.start_year - Fraud start year
 * @param {number} data.timeline.end_year - Fraud end year
 * @param {Object} options - Optional configuration
 * @param {number} options.timelineStartYear - First year in timeline (default: 2014)
 * @param {number} options.timelineEndYear - Last year in timeline (default: 2024)
 * @returns {HTMLElement} The card element
 */
export function fraudCard(data, options = {}) {
  const {
    timelineStartYear = 2014,
    timelineEndYear = 2026
  } = options;

  const defendantText = data.defendant
    ? (Array.isArray(data.defendant) ? data.defendant.join(', ') : data.defendant)
    : 'No defendant';

  const commentaryHtml = data.commentary && Array.isArray(data.commentary) && data.commentary.length > 0
    ? data.commentary.map(c => html`
        <div class="comment-admonition">
          ${c.comment} <b style="text-align: right;">- ${c.added_by}</b>
        </div>
      `)
    : "";

  const dismissalHtml = data.dismissals && Array.isArray(data.dismissals) && data.dismissals.length > 0
    ? data.dismissals.map(d => html`
        <div class="dismissal-banner">
          <strong>CASE DISMISSED — ${d.defendant}</strong><br>
          Dismissed on ${d.date} by ${d.court}.<br>
          <em>${d.note}</em>
        </div>
      `)
    : "";

  return html`<div class="fraud-card">
    <div class="card-header">
      <div class="case-title">${data.title}</div>
      <div class="case-number">${data.caseNumber}</div>
    </div>
    ${dismissalHtml}
    <div class="card-content">
      <div class="main-content">
        <div class="state-container">
          <span class="badge state-badge">${data.state}</span>
        </div>
        <div class="battle-container">
          <div class="party-card winner">
            <span class="party-label">Plaintiff:</span>
            <div>${data.plaintiff}</div>
          </div>
          <div class="party-card">
            <span class="party-label">Defendant:</span>
            <div><span class="key-entity">${defendantText}</span></div>
          </div>
        </div>
        <div class="summary">
          ${data.summary}
        </div>
      </div>
      <div class="number-column">
        <div class="category">${data.category}</div>
        <div class="fraud-amount-container">
          <div class="number-label">Alleged Fraud</div>
          <div class="fraud-amount">${formatCurrency(data.fraudAmount)}</div>
        </div>
        <div>${data.affectedCount}</div>
        <h4>Related:</h4>
        <div class="related-links">
          ${data.relatedLinks.map(link => html`
            <a href="${link.url}" class="related-link">${link.text}</a>
          `)}
        </div>
      </div>
    </div>
    <div class="card-footer">
      <div class="comment-content">
        ${commentaryHtml}
      </div>
    </div>
    <div class="card-footer">
      <div class="timeline">
        <h4>Fraud Years:</h4>
        ${yearHeatmap(timelineStartYear, timelineEndYear, data.timeline.start_year, data.timeline.end_year)}
      </div>
    </div>
  </div>`;
}

/**
 * Renders a list of fraud cards
 * @param {Array} cases - Array of fraud case data
 * @param {Object} options - Options passed to each card
 * @returns {Array<HTMLElement>} Array of card elements
 */
export function fraudCardList(cases, options = {}) {
  return cases.map(entry => fraudCard(entry, options));
}
