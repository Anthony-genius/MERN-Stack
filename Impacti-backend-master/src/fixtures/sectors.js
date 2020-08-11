const ObjectId = require('mongoose').Schema.Types.ObjectId;

const { Sector } = require('../models/Sector');
const { Industry } = require('../models/Industry');
const { Sdg } = require('../models/Sdg');

const sectors = [
  {
    name: 'Consumer Goods',
    tag: 'ConsumerGoods',
    leadershipSdgsIds: [3, 8, 10, 12, 14, 15, 16],
    opportunitySdgsIds: [1, 6, 7, 8, 9, 11, 12, 17],
  },
  {
    name: 'Extractives & Mineral Processing',
    tag: 'Extractives',
    leadershipSdgsIds: [8, 9, 12, 14, 15, 16],
    opportunitySdgsIds: [7, 12],
  },
  {
    name: 'Financials',
    tag: 'Financials',
    leadershipSdgsIds: [7, 16],
    opportunitySdgsIds: [1, 2, 5, 8, 9, 10, 17],
  },
  {
    name: 'Food & Beverage',
    tag: 'FoodBeverage',
    leadershipSdgsIds: [2, 3, 8, 12, 14, 15],
    opportunitySdgsIds: [1, 2, 3, 6, 7, 8, 12],
  },
  {
    name: 'Health Care',
    tag: 'HealthCare',
    leadershipSdgsIds: [3, 6, 9, 12, 15, 16, 17],
    opportunitySdgsIds: [2, 3, 6, 9],
  },
  {
    name: 'Infrastructure',
    tag: 'Infrastructure',
    leadershipSdgsIds: [6, 7, 9, 11, 12, 14, 15],
    opportunitySdgsIds: [6, 7, 9, 11],
  },
  {
    name: 'Renewable Resources & Alternative Energy',
    tag: 'Renewables',
    leadershipSdgsIds: [2, 8, 9, 14, 15, 16],
    opportunitySdgsIds: [1, 7, 8, 9, 11, 12, 13],
  },
  {
    name: 'Resource Transformation',
    tag: 'Manufacturing',
    leadershipSdgsIds: [3, 6, 8, 12, 14, 15, 16],
    opportunitySdgsIds: [1, 6, 7, 8, 9, 12],
  },
  {
    name: 'Consumer Services',
    tag: 'Services',
    leadershipSdgsIds: [2, 3, 4, 8, 11, 14],
    opportunitySdgsIds: [2, 3, 4, 11, 12],
  },
  {
    name: 'Technology & Telecommunications',
    tag: 'Technology',
    leadershipSdgsIds: [3, 6, 8, 11, 15, 16],
    opportunitySdgsIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 17],
  },
  {
    name: 'Transportation',
    tag: 'Transportation',
    leadershipSdgsIds: [3, 12, 13, 16],
    opportunitySdgsIds: [8, 12, 13],
  },
];

const industries = [
  ['Apparel, Accessories & Footwear',
    'Appliance Manufacturing',
    'Building Products & Furnishings',
    'E - Commerce',
    'Household & Personal Products',
    'Multiline and Specialty Retailers & Distributors',
    'Toys & Sporting Goods',
  ],
  ['Coal Operations',
    'Construction Materials',
    'Iron & Steel Producers',
    'Metals & Mining',
    'Oil & Gas – Exploration & Production',
    'Oil & Gas – Midstream',
    'Oil & Gas – Refining & Marketing',
    'Oil & Gas – Services',
  ],
  ['Asset Management & Custody Activities',
    'Commercial Banks',
    'Consumer Finance',
    'Insurance',
    'Investment Banking & Brokerage',
    'Mortgage Finance',
    'Security & Commodity Exchanges',
  ],
  ['Agricultural Products',
    'Alcoholic Beverages',
    'Food Retailers & Distributors',
    'Meat, Poultry & Dairy',
    'Non - Alcoholic Beverages',
    'Processed Foods',
    'Restaurants',
    'Tobacco',
  ],
  ['Biotechnology & Pharmaceuticals',
    'Drug Retailers',
    'Health Care Delivery',
    'Health Care Distributors',
    'Managed Care',
    'Medical Equipment & Supplies',
  ],
  ['Electric Utilities & Power Generators',
    'Engineering & Construction Services',
    'Gas Utilities & Distributors',
    'Home Builders',
    'Real Estate',
    'Real Estate Services',
    'Waste Management',
    'Water Utilities & Services',
  ],
  ['Biofuels',
    'Forestry Management',
    'Fuel Cells & Industrial Batteries',
    'Pulp & Paper Products',
    'Solar Technology & Project Developers',
    'Wind Technology & Project Developers',
  ],
  ['Aerospace & Defense',
    'Chemicals',
    'Containers & Packaging',
    'Electrical & Electronic Equipment',
    'Industrial Machinery & Goods',
  ],
  ['Advertising & Marketing',
    'Casinos & Gaming',
    'Education',
    'Hotels & Lodging',
    'Leisure Facilities',
    'Media & Entertainment',
    'Professional & Commercial Services',
  ],
  ['Electronic Manufacturing Services & Original Design Manufacturing',
    'Hardware',
    'Internet Media & Services',
    'Semiconductors',
    'Software & IT Services',
    'Telecommunication Services',
  ],
  ['Air Freight & Logistics',
    'Airlines',
    'Auto Parts',
    'Automobiles',
    'Car Rental & Leasing',
    'Cruise Lines',
    'Marine Transportation',
    'Rail Transportation',
    'Road Transportation',
  ],
];

const sectorObjects = sectors.map((sector, i) => ({
  ...sector,
  leadershipSdgsNames: sector.leadershipSdgsIds.map(id => `SDG${id}`),
  opportunitySdgsNames: sector.opportunitySdgsIds.map(id => `SDG${id}`),
  industriesNames: industries[i],
}));

module.exports = {
  loadSectors: mongoose =>
    new Promise((resolve) => {
      Sector.insertMany(sectorObjects).then((result) => {
        result.forEach((e, i) => {
          industryObjects[i].forEach((x, n) => {
            const industry = new Industry(x);
            industry.save().then((a) => {
              e.industries = [...e.industries, a.id];
              if (e.industries.length === industryObjects[i].length) {
                e.save()
                  .then((_) => {
                    resolved++;
                    if (resolved === industries.length - 1) {
                      resolve(true);
                    }
                  })
                  .catch((err) => {
                    console.log('WYJEBAŁO SIĘ', err);
                  });
              }
            });
          });
        });
      });
    }),
  sectors: sectorObjects,
};
