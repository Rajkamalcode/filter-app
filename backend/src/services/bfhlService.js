const mime = require('mime-types');

// Utility function to handle base64 file validation
function validateFile(file_b64) {
  if (!file_b64) return { file_valid: false, file_mime_type: null, file_size_kb: 0 };

  const buffer = Buffer.from(file_b64, 'base64');
  const file_size_kb = buffer.length / 1024;
  const file_mime_type = mime.lookup(buffer);

  return {
    file_valid: !!file_mime_type,
    file_mime_type: file_mime_type || 'unknown',
    file_size_kb: file_size_kb.toFixed(2),
  };
}

// Main service logic to process data
function processData(data, file_b64) {
  if (!Array.isArray(data)) throw new Error('Data should be an array');

  const numbers = [];
  const alphabets = [];
  let highest_lowercase_alphabet = null;

  data.forEach((item) => {
    if (!isNaN(item)) {
      numbers.push(item);
    } else if (typeof item === 'string' && item.length === 1) {
      alphabets.push(item);
      if (item === item.toLowerCase() && (!highest_lowercase_alphabet || item > highest_lowercase_alphabet)) {
        highest_lowercase_alphabet = item;
      }
    }
  });

  const fileInfo = validateFile(file_b64);

  return {
    numbers,
    alphabets,
    highest_lowercase_alphabet: highest_lowercase_alphabet ? [highest_lowercase_alphabet] : [],
    ...fileInfo,
  };
}

module.exports = { processData };
