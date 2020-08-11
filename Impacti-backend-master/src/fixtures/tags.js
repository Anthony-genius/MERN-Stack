const tags = [
  { name: 'News' },
  { name: 'Event' },
  { name: 'Guidance' },
  { name: 'Data' },
  { name: 'CaseStudy' },
  { name: 'Standard' },
  { name: 'Partnership' },
  { name: 'Financing' },
  { name: 'Marketplace' },
  { name: 'Discussion' },
  { name: 'AllSDGs' },
  { name: 'Asia' },
  { name: 'Africa' },
  { name: 'NorthAmerica' },
  { name: 'SouthAmerica' },
  { name: 'Antartica' },
  { name: 'Europe' },
  { name: 'Oceania' },
  { name: 'Caribbean' },
  {
    oldName: 'Apparel, Accessories & Footwear',
    name: 'apparel',
  },
  {
    oldName: 'Appliance Manufacturing',
    name: 'appliances',
  },
  {
    oldName: 'Building Products & Furnishings',
    name: 'furnishings',
  },
  {
    oldName: 'Household & Personal Products',
    name: 'personalproducts',
  },
  {
    oldName: 'Toys & Sporting Goods',
    name: 'toyssports',
  },
  {
    oldName: 'Multiline and Specialty Retailers & Distributors',
    name: 'specialtyretail',
  },
  {
    oldName: 'E - Commerce',
    name: 'ecommerce',
  },
  {
    oldName: 'Coal Operations',
    name: 'coal',
  },
  {
    oldName: 'Metals & Mining',
    name: 'mining',
  },
  {
    oldName: 'Engineering & Construction Services',
    name: 'construction',
  },
  {
    oldName: 'Construction Materials',
    name: 'constructionmaterials',
  },
  {
    oldName: 'Iron & Steel Producers',
    name: 'ironsteel',
  },
  {
    oldName: 'Oil & Gas – Exploration & Production',
    name: 'gasexploration',
  },
  {
    oldName: 'Oil & Gas – Midstream',
    name: 'gasmidstream',
  },
  {
    oldName: 'Oil & Gas – Refining & Marketing',
    name: 'gasrefining',
  },
  {
    oldName: 'Oil & Gas – Services',
    name: 'gasservices',
  },
  {
    oldName: 'Asset Management & Custody Activities',
    name: 'assetmanagement',
  },
  {
    oldName: 'Investment Banking & Brokerage',
    name: 'investmentbanking',
  },
  {
    oldName: 'Security & Commodity Exchanges',
    name: 'exchanges',
  },
  {
    oldName: 'Commercial Banks',
    name: 'commercialbanks',
  },
  {
    oldName: 'Consumer Finance',
    name: 'consumerfinance',
  },
  {
    oldName: 'Mortgage Finance',
    name: 'mortgagefinance',
  },
  {
    oldName: 'Insurance',
    name: 'insurance',
  },
  {
    oldName: 'Agricultural Products',
    name: 'agriculture',
  },
  {
    oldName: 'Meat, Poultry & Dairy',
    name: 'livestock',
  },
  {
    oldName: 'Processed Foods',
    name: 'processedfoods',
  },
  {
    oldName: 'Alcoholic Beverages',
    name: 'alcohol',
  },
  {
    oldName: 'Non - Alcoholic Beverages',
    name: 'beverages',
  },
  {
    oldName: 'Food Retailers & Distributors',
    name: 'retailfood',
  },
  {
    oldName: 'Restaurants',
    name: 'restaurants',
  },
  {
    oldName: 'Tobacco',
    name: 'tobacco',
  },
  {
    oldName: 'Biotechnology & Pharmaceuticals',
    name: 'pharmaceuticals',
  },
  {
    oldName: 'Drug Retailers',
    name: 'drugretailers',
  },
  {
    oldName: 'Health Care Delivery',
    name: 'healthservices',
  },
  {
    oldName: 'Health Care Distributors',
    name: 'healthdistributors',
  },
  {
    oldName: 'Managed Care',
    name: 'managedcare',
  },
  {
    oldName: 'Medical Equipment & Supplies',
    name: 'medicalsupplies',
  },
  {
    oldName: 'Electric Utilities & Power Generators',
    name: 'electricalutilities',
  },
  {
    oldName: 'Gas Utilities & Distributors',
    name: 'gasutilities',
  },
  {
    oldName: 'Water Utilities & Services',
    name: 'waterutilities',
  },
  {
    oldName: 'Home Builders',
    name: 'homebuilders',
  },
  {
    oldName: 'Real Estate',
    name: 'realestate',
  },
  {
    oldName: 'Real Estate Services',
    name: 'realestateservices',
  },
  {
    oldName: 'Waste Management',
    name: 'wastemanagement',
  },
  {
    oldName: 'Biofuels',
    name: 'biofuels',
  },
  {
    oldName: 'Fuel Cells & Industrial Batteries',
    name: 'fuelcells',
  },
  {
    oldName: 'Solar Technology & Project Developers',
    name: 'solarenergy',
  },
  {
    oldName: 'Wind Technology & Project Developers',
    name: 'windenergy',
  },
  {
    oldName: 'Forestry Management',
    name: 'forestry',
  },
  {
    oldName: 'Pulp & Paper Products',
    name: 'pulppaper',
  },
  {
    oldName: 'Aerospace & Defense',
    name: 'defense',
  },
  {
    oldName: 'Containers & Packaging',
    name: 'packaging',
  },
  {
    oldName: 'Electrical & Electronic Equipment',
    name: 'electrical',
  },
  {
    oldName:
      'Electronic Manufacturing Services & Original Design Manufacturing',
    name: 'electronics',
  },
  {
    oldName: 'Industrial Machinery & Goods',
    name: 'industrialgoods',
  },
  {
    oldName: 'Chemicals',
    name: 'chemicals',
  },
  {
    oldName: 'Advertising & Marketing',
    name: 'marketing',
  },
  {
    oldName: 'Media & Entertainment',
    name: 'media',
  },
  {
    oldName: 'Casinos & Gaming',
    name: 'gaming',
  },
  {
    oldName: 'Hotels & Lodging',
    name: 'hotels',
  },
  {
    oldName: 'Leisure Facilities',
    name: 'leisurefacilities',
  },
  {
    oldName: 'Education',
    name: 'education',
  },
  {
    oldName: 'Professional & Commercial Services',
    name: 'commercialservices',
  },
  {
    oldName: 'Hardware',
    name: 'hardware',
  },
  {
    oldName: 'Software & IT Services',
    name: 'software',
  },
  {
    oldName: 'Internet Media & Services',
    name: 'internet',
  },
  {
    oldName: 'Semiconductors',
    name: 'semiconductors',
  },
  {
    oldName: 'Telecommunication Services',
    name: 'telecommunications',
  },
  {
    oldName: 'Airlines',
    name: 'airlines',
  },
  {
    oldName: 'Air Freight & Logistics',
    name: 'airfreight',
  },
  {
    oldName: 'Automobiles',
    name: 'automobiles',
  },
  {
    oldName: 'Auto Parts',
    name: 'autoparts',
  },
  {
    oldName: 'Car Rental & Leasing',
    name: 'carrental',
  },
  {
    oldName: 'Cruise Lines',
    name: 'cruiselines',
  },
  {
    oldName: 'Marine Transportation',
    name: 'marinetransport',
  },
  {
    oldName: 'Rail Transportation',
    name: 'railways',
  },
  {
    oldName: 'Road Transportation',
    name: 'roadways',
  },
];

module.exports = {
  tags,
};
