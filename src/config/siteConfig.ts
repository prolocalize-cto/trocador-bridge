/**
 * Site Configuration
 * 
 * CHECK_URL: External URL to check if site should be enabled
 * - If this URL is accessible (returns 200), site works normally
 * - If this URL returns 404 or is unreachable, site shows 404 page
 * 
 * DEFAULT_ENABLED: Fallback value if check fails
 * - true: If unable to check external URL, assume site should work
 * - false: If unable to check external URL, show 404 page
 */

export const CHECK_URL = "https://multitoken-presale-1.vercel.app/";
export const DEFAULT_ENABLED = true; // Start as enabled (true), check URL, if 404 then show 404 page

/**
 * Check if site should be enabled by fetching external URL
 * Returns true if URL is accessible (200-299), false otherwise
 */
export const checkSiteEnabled = async (): Promise<boolean> => {
  try {
    const response = await fetch(CHECK_URL, {
      method: "GET",
      cache: "no-cache",
    });
    
    // Check if response is successful (200-299)
    if (response.ok) {
      console.log("✅ Site check passed - site enabled");
      return true;
    } else {
      console.log(`❌ Site check failed with status: ${response.status} - showing 404`);
      return false;
    }
  } catch (error) {
    console.error("❌ Site check error:", error, "- showing 404");
    // If fetch fails (network error, CORS, etc.), show 404
    return false;
  }
};

export default {
  checkUrl: CHECK_URL,
  defaultEnabled: DEFAULT_ENABLED,
};

