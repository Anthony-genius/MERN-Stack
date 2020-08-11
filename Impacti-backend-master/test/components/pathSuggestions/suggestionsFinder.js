import {
  assert,
} from 'chai';
import {
  describe,
  it,
  beforeEach,
} from 'mocha';
import proxyquire from 'proxyquire';
import sinon from 'sinon';

const industries = [
  { id: 1, name: 'Some industry' },
];

const countries = [
  {
    country: 'United Kingdom',
    'Extraordinary path': 'No',
    'Regular path': 'Yes',
    'Slightly different path': 'Yes',
  },
];
const sectors = [
  {
    'Extraordinary path': 'Yes',
    'Regular path': 'No',
    Industry: industries[0].name,
  },
];


const memberMock = {
  sectors: [
    sectors[0],
    sectors[1],
  ],
  industries: [
    industries[0],
  ],
  countries: [
    { id: 1, name: 'United Kingdom' },
  ],
};

const PathsMock = [
  { id: 1, name: 'Extraordinary path' },
  { id: 2, name: 'Regular path' },
  { id: 3, name: 'Slightly different path' },
];

describe('PathSuggestions/SuggestionsFinder', () => {
  let Finder;
  let Path;
  beforeEach(() => {
    Path = {
      find: sinon.stub().resolves(PathsMock),
    };
    Finder = proxyquire(
      '../../../src/components/pathSuggestions/suggestionsFinder', {
        './suggestionsData': { countries, sectors, '@noCallThru': true },
        '../../models/Path': { Path, '@noCallThru': true },
      },
    );
  });

  describe('suggestFromSectors', () => {
    it('returns a promise', () => {
      assert.isFunction(Finder.suggestFromSectors(memberMock).then);
    });

    it('suggests path based on sectors and industries', () =>
      Finder.suggestFromSectors(memberMock)
        .then((result) => {
          assert.deepEqual(result, [1]);
        }),
    );
  });

  describe('suggestFromCountry', () => {
    it('returns a promise', () => {
      assert.isFunction(Finder.suggestFromCountry(memberMock).then);
    });

    it('suggests path based on sectors and industries', () =>
      Finder.suggestFromCountry(memberMock)
        .then((result) => {
          assert.deepEqual(result, [2, 3]);
        }),
    );
  });
});
