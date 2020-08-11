const { Path } = require('../models/Path');
const { Destination } = require('../models/Destination');
const WIDGETS = require('../constants/dashboardWidgets');

const filterMongoObjects = filterExpr => list => list.filter(filterExpr).map(e => e._id);

const paths = [
  {
    order: 0,
    name: 'Great Workplace',
    tag: 'GreatWorkplace',
    shortDescription:
      'Employees prefer workplaces where their rights, work, ideas and diverse voices are valued.',
    description:
      'Great workplaces are built by companies that respect labour rights, ensure worker safety, and offer fair wages & benefits.It’s where employees can find equal opportunities for training, advancement & innovation.',
    displayColor: 'rgb(208,85,59)',
    iconLocation: 'workplace.png',
    widgets: Object.keys(WIDGETS),
    tabs: filterMongoObjects(() => true),
  },
  {
    order: 1,
    name: 'Governance & Ethics',
    tag: 'GoodGovernance',
    shortDescription: 'Businesses that combine purpose with profit can attract loyal customers, staff and investors.',
    description:
      'Ethical businesses value integrity and transparency at the highest levels, guided by visionary CEOs and diverse boards. They comply with laws, mitigate risks, consult with stakeholders, and lead partnerships to drive positive change across their industry.',
    displayColor: 'rgb(136,82,104)',
    iconLocation: 'governance.png',
    widgets: Object.keys(WIDGETS),
    tabs: filterMongoObjects(() => true),
  },
  {
    order: 2,
    name: 'Green Operations',
    tag: 'GreenOperations',
    shortDescription: 'Reducing your environmental footprint can save costs and make your operations more resilient.',
    description:
      'Green operations make more efficient use of resources including energy, water and materials and minimize impacts on air, soil, water and biodiversity.',
    displayColor: 'rgb(87,147,46)',
    iconLocation: 'green-operations.png',
    widgets: Object.keys(WIDGETS),
    tabs: filterMongoObjects(() => true),
  },
  {
    order: 3,
    name: 'Responsible Sourcing',
    tag: 'SupplyChain',
    shortDescription: 'Businesses are increasingly being held responsible for the practices of suppliers and distributors along their value chain.',
    description:
      'Businesses can influence suppliers to adopt sustainable & ethical practices through contract terms or codes of conduct. Inclusive supply chains can be built by engaging and training small, local, women and minority-owned businesses and entrepreneurs.',
    displayColor: 'rgb(241,196,97)',
    iconLocation: 'supply-chain.png',
    widgets: Object.keys(WIDGETS),
    tabs: filterMongoObjects(() => true),
  },
  {
    order: 4,
    name: 'Community Impact',
    tag: 'Communities',
    shortDescription: 'Businesses that support communities benefit from stable operating environments and skilled labour forces.',
    description:
      'Businesses, especially SMEs are the engines of local economic growth - creating jobs, offering training, and extending workplace services and infrastructure. They can help strengthen communities and address societal challenges through their philanthropy, CSR and volunteer programs.',
    displayColor: 'rgb(33,123,108)',
    iconLocation: 'community.png',
    widgets: Object.keys(WIDGETS),
    tabs: filterMongoObjects(() => true),
  },
  {
    order: 5,
    name: 'Products & Services',
    tag: 'ProductsServices',
    shortDescription:
      'Businesses that design sustainable products & services can trigger innovation and access new markets.',
    description:
      'Businesses can advance more resource-efficient manufacturing,  infrastructure and technology - and promote designs that minimize a product’s impact through its life-cycle. Through product labeling, certifications and marketing, businesses can help consumers make sustainable choices.',
    displayColor: 'rgb(81,92,112)',
    iconLocation: 'products.png',
    widgets: Object.keys(WIDGETS),
    tabs: filterMongoObjects(() => true),
  },
];

const destinations = [
  {
    name: 'Sustainability Management',
    description:
      'Assess your basic sustainability profile in the areas of environmentally sustainable operations, staff well-being, corporate integrity, sustainable innovation, community outreach and/or sustainable sourcing. Manage impacts by setting goals, implementing actions and tracking improvement over time. You can generate an Impacti sustainability report summarizing your sustainability profile and progress at any point.',
    recommendedPaths: list => list.map(e => e._id),
  },
  {
    name: 'Climate Neutral Operations',
    description:
      'Want to claim climate neutrality of your operations or program? Assess your carbon footprint, take actions to reduce it, offset remaining Greenhouse Gas emissions and report on your progress.',
    recommendedPaths: list =>
      list.filter(e => e.name === 'Environmental footprint').map(e => e._id),
  },
  {
    name: 'Climate Neutral Products',
    description:
      'Want to offer a climate neutral product or service? Assess the product’s carbon footprint, take actions to reduce it, offset remaining Greenhouse Gas emissions and generate certification-ready reports.',
    recommendedPaths: list => list.filter(e => e.name === 'Sustainable Innovation').map(e => e._id),
  },
  {
    name: 'Greenhouse Gas Protocol',
    description:
      'Assess, manage and report your carbon footprint in compliance with WRI’s Greenhouse Gas Protocol and ISO 14064 Part1.',
    recommendedPaths: list =>
      list.filter(e => e.name === 'Environmental footprint').map(e => e._id),
  },
  {
    name: 'Global Reporting Initiative (GRI)',
    description:
      'Undertake a comprehensive materiality assessment to identify which sustainability impacts are material for you and your stakeholders. Assess, manage and report material sustainability impacts in compliance with GRI. Generate beautiful reports for public disclosure.',
    recommendedPaths: list => list.map(e => e._id),
  },
  {
    name: 'Contribution to Sustainable Development Goals (SDGs)',
    description:
      'Demonstrate how your operations contribute to globally agreed sustainability priorities - assess and maximize your impacts based on the Sustainable Development Goals and generate beautiful reports for public disclosure.',
    recommendedPaths: list => list.map(e => e._id),
  },
  {
    name: 'Carbon Disclosure Project (CDP)',
    description:
      'Assess, manage and report your environmental impacts in a format consistent to participate in the Carbon Disclosure Project.',
    recommendedPaths: list =>
      list.filter(e => e.name === 'Environmental footprint').map(e => e._id),
  },
  {
    name: 'Environmental Management System (EMS)',
    description:
      'Develop and implement a comprehensive Environmental Management System that enables you to seek ISO 14001 certification.',
    recommendedPaths: list => list.map(e => e._id),
  },
];

module.exports = {
  loadPathsAndDestinations: mongoose =>
    new Promise((resolve) => {
      Path.insertMany(paths).then((result) => {
        Destination.insertMany(
          destinations.map(e =>
            Object.assign({}, e, { recommendedPaths: e.recommendedPaths(result) }),
          ),
        ).then((_) => {
          resolve(true);
        });
      });
    }),
  paths,
  destinations,
};
