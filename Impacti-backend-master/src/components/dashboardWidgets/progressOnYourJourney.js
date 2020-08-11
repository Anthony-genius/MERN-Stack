const calculateProgress = (req, res) => {
  res.status(200).send(
    { data: req.intersectingDestinations.map(
      e => ({
        ...e,
        progress: Math.random(),
      }),
    ) });
};

module.exports = {
  calculateProgress,
};
