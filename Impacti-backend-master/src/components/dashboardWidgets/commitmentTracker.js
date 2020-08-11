const getCommitments = (req, res) => {
  res.status(200).send(
    {
      data: [],
    });
};

module.exports = {
  getCommitments,
};
