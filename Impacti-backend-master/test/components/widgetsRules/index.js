import {
  assert,
} from 'chai';
import {
  describe,
  it,
} from 'mocha';
import proxyquire from 'proxyquire';

const paths = [
  { name: 'Path1', id: 1, tabs: [1, 2], widgets: ['1', '2'] },
  { name: 'Path2', id: 2, tabs: [2, 3], widgets: ['2', '3'] },
  { name: 'Path3', id: 3, tabs: [3, 1], widgets: ['3', '1'] },
];

const tabs = [
  { name: 'Tab1', id: 1, widgets: ['1', '2'], index: 1 },
  { name: 'Tab2', id: 2, widgets: ['3', '2'], index: 2 },
  { name: 'Tab3', id: 3, widgets: ['1', '3'], index: 3 },
];

const merged = [
  { name: 'Path1',
    id: 1,
    tabs: [
      { name: 'Tab1', id: 1, widgets: ['1', '2'], index: 1 },
      { name: 'Tab2', id: 2, widgets: ['3', '2'], index: 2 },
    ],
    widgets: ['1', '2'] },
  { name: 'Path2',
    id: 2,
    tabs: [
      { name: 'Tab2', id: 2, widgets: ['3', '2'], index: 2 },
      { name: 'Tab3', id: 3, widgets: ['1', '3'], index: 3 },
    ],
    widgets: ['2', '3'] },
  { name: 'Path3',
    id: 3,
    tabs: [
      { name: 'Tab3', id: 3, widgets: ['1', '3'], index: 3 },
      { name: 'Tab1', id: 1, widgets: ['1', '2'], index: 1 },
    ],
    widgets: ['3', '1'] },
];

const filtered = [
  { name: 'Path1',
    id: 1,
    tabs: [
      { name: 'Tab1', id: 1, widgets: ['1', '2'], index: 1 },
      { name: 'Tab2', id: 2, widgets: ['2'], index: 2 },
    ],
    widgets: ['1', '2'] },
  { name: 'Path2',
    id: 2,
    tabs: [
      { name: 'Tab2', id: 2, widgets: ['3', '2'], index: 2 },
      { name: 'Tab3', id: 3, widgets: ['3'], index: 3 },
    ],
    widgets: ['2', '3'] },
  { name: 'Path3',
    id: 3,
    tabs: [
      { name: 'Tab3', id: 3, widgets: ['1', '3'], index: 3 },
      { name: 'Tab1', id: 1, widgets: ['1'], index: 1 },
    ],
    widgets: ['3', '1'] },
];

const Path = {
  find: () => Promise.resolve(paths),
};

const Tab = {
  find: () => Promise.resolve(tabs),
};

const basicReq = {};
const basicRes = {};

const withLoadedData = {
  paths,
  tabs,
};

const withBasicResult = {
  tabs,
  paths,
  result: merged,
};

const withFilteredResult = {
  tabs,
  paths,
  result: filtered,
};

const {
  loadAllData,
  transformData,
  applyWidgetRules,
  appendDefaultPath,
} = proxyquire(
  '../../../src/components/widgetsRules/index.js', {
    '../../models/Path': { Path, '@noCallThru': true },
    '../../models/Tab': { Tab, '@noCallThru': true },
  },
);

describe('widgetsRules/loadAllData', () => {
  it('shouldCallNext', (done) => {
    loadAllData(basicReq, basicRes, () => {
      assert.equal(1, 1);
      done();
    });
  });

  it('shouldSetPaths', (done) => {
    loadAllData(basicReq, basicRes, () => {
      assert.deepEqual(basicReq.paths, paths);
      done();
    });
  });

  it('shouldSetTabs', (done) => {
    loadAllData(basicReq, basicRes, () => {
      assert.deepEqual(basicReq.tabs, tabs);
      done();
    });
  });
});

describe('widgetRules/transformData', () => {
  it('shouldCallNext', () => {
    transformData(withLoadedData, basicRes, () => {
      assert.deepEqual(1, 1);
    });
  });

  it('shouldMergePathsAndTabs', () => {
    transformData(withLoadedData, basicRes, () => {
      assert.deepEqual(withLoadedData.result, merged);
    });
  });
});

describe('widgetRules/applyWidgetRules', () => {
  it('shouldCallNext', () => {
    applyWidgetRules(withBasicResult, basicRes, () => {
      assert.deepEqual(1, 1);
    });
  });

  it('shouldMergePathsAndTabs', () => {
    applyWidgetRules(withBasicResult, basicRes, () => {
      assert.deepEqual(withBasicResult.result, filtered);
    });
  });
});

describe('widgetRules/appendDefaultPath', () => {
  it('shouldCallNext', () => {
    appendDefaultPath(withBasicResult, basicRes, () => {
      assert.deepEqual(1, 1);
    });
  });

  it('shouldAddDefaultPath', () => {
    appendDefaultPath(withFilteredResult, basicRes, () => {
      assert.equal(withFilteredResult.result.length, 4);
    });
  });

  it('shouldRemoveWidgetsFromPaths', () => {
    appendDefaultPath(withFilteredResult, basicRes, () => {
      assert.equal(withFilteredResult.result.reduce((acc, e) => acc + (e.widgets ? 1 : 0), 0), 0);
    });
  });
});
