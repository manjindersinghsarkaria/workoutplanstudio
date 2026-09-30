/**
 * Validates and filters alternate exercises based on required fields.
 * 
 * Requirements: 10.1, 10.2, 10.3, 10.4, 10.5
 */

/**
 * Validates a single alternate exercise.
 * 
 * @param {*} alt - The alternate exercise to validate
 * @returns {boolean} - True if the alternate has required fields (id, name)
 */
export function validateAlternate(alt) {
  if (!alt || typeof alt !== 'object') {
    return false;
  }
  if (!alt.id || typeof alt.id !== 'string') {
    return false;
  }
  if (!alt.name || typeof alt.name !== 'string') {
    return false;
  }
  return true;
}

/**
 * Filters an array of alternates, keeping only valid ones.
 * Logs warnings for invalid alternates.
 * 
 * @param {Array} alternates - Array of alternate exercises to filter
 * @returns {Array} - Array of valid alternates
 */
export function filterValidAlternates(alternates) {
  if (!Array.isArray(alternates)) {
    return [];
  }

  const validAlternates = [];
  
  alternates.forEach((alt, index) => {
    if (validateAlternate(alt)) {
      validAlternates.push(alt);
    } else {
      // Log warning for invalid alternate
      console.warn(
        `Invalid alternate exercise at index ${index}:`,
        alt,
        'Missing required fields (id, name) or invalid data type'
      );
    }
  });

  return validAlternates;
}
