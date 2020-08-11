const genericSuccess = (req, res) => {
  res.status(200).send({ success: 'Success' });
};

const genericError = (req, res) => {
  res.status(400).send({ error_message: 'Error' });
};

module.exports = {
  genericSuccess,
  genericError,
};
