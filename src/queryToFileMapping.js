const fs = require("fs");

/**
 * Search for files in a directory based on a query.
 * @param {string} directory - The directory to search in.
 * @param {string} query - The search query.
 * @returns {string[]} - An array of matching file names.
 */
function searchFiles(directory, query) {
  // Get a list of all files in the directory
  const files = fs.readdirSync(directory);

  // Split the query into individual search terms
  const searchTerms = query.toLowerCase().split(" ");

  // Filter files based on partial match with query terms
  const matchingFiles = files.filter((file) => {
    // Convert file name to lowercase for case-insensitive matching
    const fileName = file.toLowerCase();
    // Check if all search terms are present in the file name
    return searchTerms.every((term) => fileName.includes(term));
  });

  // Return matching file names
  return matchingFiles;
}

module.exports = { searchFiles };
