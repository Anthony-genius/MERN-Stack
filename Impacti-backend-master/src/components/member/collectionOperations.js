const { Entity } = require('../../models/Entity');

const recursiveSave = (propagate, member) => (set, change) => new Promise((resolve) => {
  change(member, set)
    .save()
    .then(() => {
      if (!propagate) {
        resolve();
      } else {
        Entity.find({
          parent: member.id,
        }).then(
          (res) => {
            Promise.all(
              res.map(e => recursiveSave(propagate, e)(set, change)),
            ).then(() => resolve());
          },
        );
      }
    });
});

module.exports = {
  recursiveSave,
};
