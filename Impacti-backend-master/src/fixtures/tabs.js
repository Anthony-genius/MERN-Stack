const WIDGETS = require('../constants/dashboardWidgets');

const tabs = [
    {  name: 'Overview', widgets: [
      WIDGETS.JOURNEY_PROGRESS,
      WIDGETS.LATEST_JOURNEY_REPORTS,
      WIDGETS.LATEST_ACHIEVEMENTS,
      WIDGETS.COMMITMENT_TRACKER,
    ], isDefault: true, index: 1 },
    {  name: 'Destinations', widgets: [
      WIDGETS.JOURNEY_PROGRESS,
      WIDGETS.LATEST_JOURNEY_REPORTS,
    ], isDefault: true, index: 2 },
    {  name: 'Reports & Analysis', widgets: [], isDefault: true, index: 3 },
    {  name: 'Data management', widgets: [], isDefault: true, index: 4 },
    {  name: 'Commitment tracker', widgets: [], isDefault: true, index: 5 },
    {  name: 'Achievements', widgets: [], isDefault: true, index: 6 },
];

module.exports = {
    tabs,
};