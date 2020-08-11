const findReports = (req, res) => {
  res.status(200).send(
    { data: req.intersectingDestinations.map(
      e => ({
        ...e,
        reports: [],
      }),
    ) });
};

module.exports = {
  findReports,
};
