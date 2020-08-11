const { Tab } = require('../../models/Tab');
const { Path } = require('../../models/Path');

const serializeTab = tab => ({
  id: tab.id,
  widgets: tab.widgets,
  name: tab.name,
  index: tab.index,
});

const loadAllData = (req, res, next) => {
  Promise.all([
    Tab.find({}),
    Path.find({}),
  ]).then(
    ([tabs, paths]) => {
      req.tabs = tabs;
      req.paths = paths;

      next();
    },
  );
};

const transformData = (req, res, next) => {
  req.result = req.paths.map(
    e => ({
      id: e.id,
      name: e.name,
      tabs: e.tabs.map(a => req.tabs.find(x => x.id.toString() === a.toString())).map(serializeTab),
      widgets: e.widgets,
    }),
  );

  next();
};

const applyWidgetRules = (req, res, next) => {
  req.result = req.result.map(
    e => ({
      ...e,
      tabs: e.tabs.map(a => ({
        ...a,
        widgets: a.widgets.filter(x => e.widgets.includes(x)),
      })),
    }),
  );

  next();
};

const appendDefaultPath = (req, res, next) => {
  req.result = [
    ...req.result,
    {
      id: null,
      tabs: req.tabs.filter(e => e.isDefault).map(serializeTab).sort((a, b) => a.index > b.index),
      name: 'Overview',
    },
  ].map(e => ({
    ...e,
    widgets: undefined,
  }));

  next();
};

const send = (req, res) => {
  res.send({ config: req.result });
};

module.exports = {
  loadAllData,
  transformData,
  applyWidgetRules,
  appendDefaultPath,
  send,
};
