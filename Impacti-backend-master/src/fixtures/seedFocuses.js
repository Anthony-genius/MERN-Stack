const mongoose = require('mongoose');

const { baseAssessmentFocuses } = require('./baseAssessmentFocuses');

const { getConfig } = require('../config/config');

const { Sdg } = require('../models/Sdg');
const { BaseAssessmentFocus } = require('../models/BaseAssessmentFocus');

mongoose.connect(getConfig('connectionString'), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}); // connect to database
mongoose.Promise = global.Promise;

Promise.all([
  ...baseAssessmentFocuses.map((e, i) =>
    BaseAssessmentFocus.findOneAndUpdate(
      {
        $or: [
          { focusArea: e.oldFocusArea ? e.oldFocusArea : e.focusArea },
          { focusArea: e.focusArea },
        ],
      },
      e,
      {
        upsert: true,
        new: true,
      },
    ).then((res) => {
      const sdgsNames = baseAssessmentFocuses[i].sdgId.map(sdg => `SDG${sdg}`);
      return Sdg.find({ shortName: { $in: sdgsNames } }).then((sdgs) => {
        res.sdgs = sdgs.map(x => x._id);

        return res
          .save()
          .then(() => {})
          .catch((err) => {
            console.log('oops', err);
          });
      });
    }),
  ),
])
  .then(() => {
    mongoose.connection.close();
  })
  .catch((err) => {
    console.log(err);
  });
