const bfhlService = require('../services/bfhlService');

exports.handleGetRequest = (req, res) => {
  res.status(200).json({ operation_code: 1 });
};

exports.handlePostRequest = (req, res) => {
  try {
    const { data, file_b64 } = req.body;
    const result = bfhlService.processData(data, file_b64);

    res.status(200).json({
      is_success: true,
      user_id: 'john_doe_17091999', // static example
      email: 'john@xyz.com', // static example
      roll_number: 'ABCD123', // static example
      ...result,
    });
  } catch (error) {
    res.status(400).json({
      is_success: false,
      message: error.message,
    });
  }
};
