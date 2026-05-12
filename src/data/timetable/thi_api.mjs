/**
 * @typedef {Object} TimeTableParams
 * @property {number} sem - Semester (SoSe26 = 50)
 * @property {string} showdate - Date in format "month/day/year" (e.g., "4/30/2026")
 * @property {"week"} viewtype - Type of view: currently supports "week" or other portal modes
 * @property {number} timezone - Timezone offset (usually integer, e.g., 2 for CEST)
 * @property {string} Session - Current Session ID (Cookie value from the portal)
 * @property {string} User - UserName (vvnXXXX)
 * @property {string} mode - usually "calendar" or similar portal constants
 * @property {number} stgru - Studiengruppe number (integer)
 * @property {string} [csrfToken] - CSRF Token if required (optional, depending on endpoint security)
 */

const fromNetworkTab = `
await fetch("https://www3.primuss.de/stpl/index.php?FH=fhin&Language=de&sem=50&method=list", {
    "credentials": "include",
    "headers": {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:150.0) Gecko/20100101 Firefox/150.0",
        "Accept": "application/json, text/javascript, */*; q=0.01",
        "Accept-Language": "de,en-US;q=0.9,en;q=0.8",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "anti-csrf-token": "undefined",
        "X-Requested-With": "XMLHttpRequest",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        "Pragma": "no-cache",
        "Cache-Control": "no-cache"
    },
    "referrer": "https://www3.primuss.de/stpl/index.php?FH=fhin&Language=de&Session=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx&User=xxxxxx",
    "body": "showdate=4%2F30%2F2026&viewtype=week&timezone=2&Session=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx&User=xxxxxx&mode=calendar&stgru=1329",
    "method": "POST",
    "mode": "cors"
});
`;

/**
 * Fetches the TimeTable data.
 *
 * @param {TimeTableParams} params - Object containing all portal parameters and credentials.
 * @returns {Promise<string>} - Returns the raw response text or parsed JSON depending on config.
 *
 * @example
 * // Example based on a real browser network request
 * const result = await fetchATimeTable({
 *   sem: 50, // SoSe26
 *   showdate: "4/30/2026",
 *   viewtype: "week",
 *   timezone: 2,
 *   Session: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
 *   User: "vvn1234",
 *   mode: "calendar",
 *   stgru: 1329,
 *   csrfToken: undefined // optional
 * });
 *
 * console.log(result);
 */
export default async function fetchATimeTable(params) {
  const {
    showdate,
    viewtype,
    timezone,
    Session,
    User,
    mode,
    stgru,
    csrfToken,
    sem,
  } = params;

  // Build the URL encoded body safely
  const body = new URLSearchParams();
  body.set("showdate", showdate);
  body.set("viewtype", viewtype);
  body.set("timezone", timezone.toString());
  body.set("Session", Session);
  body.set("User", User);
  body.set("mode", mode);
  body.set("stgru", stgru.toString());
  body.set("sem", sem.toString());
  const baseUrl = "https://www3.primuss.de/stpl/index.php";

  /** @type {HeadersInit} */
  const headers = {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:128.0) Gecko/20100101 Firefox/128.0", // Updated Version
    Accept: "application/json, text/javascript, */*; q=0.01",
    "Accept-Language": "de,en-US;q=0.9,en;q=0.8",
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    // Only include CSRF if provided (Security Best Practice)
    "anti-csrf-token": csrfToken || "undefined",
    "X-Requested-With": "XMLHttpRequest",
    Pragma: "no-cache",
    "Cache-Control": "no-cache",
  };

  // Construct referer dynamically if not already fixed
  const referrerUrl = new URL(`${baseUrl}?FH=fhin&Language=de&sem=${sem}`);
  if (Session && User) {
    referrerUrl.searchParams.set("Session", Session);
    referrerUrl.searchParams.set("User", User);
  }

  const response = await fetch(
    `${baseUrl}?FH=fhin&Language=de&sem=${sem}&method=list`,
    {
      method: "POST",
      credentials: "include", // Ensures browser cookies are sent automatically
      headers,
      referrer: referrerUrl.toString(),
      body: body.toString(),
    },
  );

  if (!response.ok) {
    throw new Error(`HTTP Error ${response.status}: ${await response.text()}`);
  }

  // Depending on the API contract, return the raw Response or parse JSON.
  // Here we default to returning the Response object.
  return response.text();
}
