const ugandaNdcs = [
  {
    sector: 'Agriculture',
    logo: 'SDG2',
    opportunities: [
      {
        name: 'Expand agricultural services',
        sdgs: ['SDG2', 'SDG13', 'SDG8']
      },
      {
        name: 'Expand value addition in agriculture',
        subTitle:
          'post-harvest handling & storage, access to markets, micro-finance',
        sdgs: ['SDG2', 'SDG13', 'SDG8']
      },
      {
        name: 'Expand small-scale water infrastructure for agriculture',
        sdgs: ['SDG2', 'SDG13', 'SDG6']
      },
      {
        name: 'Expand electricity to rural agricultural areas',
        subTitle:
          'for value-addition & irrigation through expanded electricity grid or off-grid solar',
        sdgs: ['SDG2', 'SDG13', 'SDG7']
      },
      {
        name: 'Expand Climate-Smart Agriculture(CSA)',
        subTitle: 'cropping technique etc',
        sdgs: ['SDG2', 'SDG13', 'SDG15']
      },
      {
        name: 'Expand diversification of crops and livestock',
        subTitle:
          'livestock breeding research, manure management practices etc',
        sdgs: ['SDG2', 'SDG13', 'SDG15']
      },
      {
        name: 'Expand research on climate-resilient crops & animal breeds',
        sdgs: ['SDG2', 'SDG13']
      },
      {
        name: 'Expand rangeland management',
        sdgs: ['SDG2', 'SDG13', 'SDG15']
      },
      {
        name:
          'Expand climate information & early warning systems for agriculuture',
        sdgs: ['SDG2', 'SDG13']
      }
    ]
  },
  {
    sector: 'Forestry',
    logo: 'SDG15',
    opportunities: [
      {
        name: 'Promote intensified & sustained forest restoration',
        subTitle: 'afforestation & reforestation including in urban areas',
        sdgs: ['SDG6', 'SDG15', 'SDG8']
      },
      {
        name: 'Encourage agro-forestry',
        sdgs: ['SDG13', 'SDG15', 'SDG2']
      },
      {
        name: 'Support community forest management groups',
        sdgs: ['SDG13', 'SDG15', 'SDG1', 'SDG8']
      },
      {
        name: 'Support forest law enforcement & governance',
        subTitle: '',
        sdgs: ['SDG13', 'SDG15', 'SDG16']
      },
      {
        name:
          'Support institutions responsible for forest management & development',
        sdgs: ['SDG13', 'SDG15', 'SDG16']
      },
      {
        name: 'Reverse trend of deforestation',
        sdgs: ['SDG13', 'SDG15']
      },
      {
        name: 'Promote biodiversity & watershed conservation',
        subTitle: 'including re-establishment of wildlife corridors',
        sdgs: ['SDG13', 'SDG15', 'SDG6']
      }
    ]
  },
  {
    sector: 'Water',
    logo: 'SDG6',
    opportunities: [
      {
        name: 'Improve water efficiency',
        sdgs: ['SDG6', 'SDG13']
      },
      {
        name: 'Improve water supply for economic & domestic use',
        subTitle:
          'Especially agriculture & domestic use, including water harvesting & storage',
        sdgs: ['SDG6', 'SDG13', 'SDG1', 'SDG9']
      },
      {
        name: 'Protect water catchment areas from pollution',
        sdgs: ['SDG6', 'SDG13']
      },
      {
        name: 'Support Integrated Water Resources Management systems',
        subTitle:
          'particularly in cities, to prevent floods & better conserve water ressources',
        sdgs: ['SDG6', 'SDG13']
      }
    ]
  },
  {
    sector: 'Health',
    logo: 'SDG3',
    opportunities: [
      {
        name:
          'Expand understanding of climate risk assessments on health & health systems',
        sdgs: ['SDG3', 'SDG13']
      },
      {
        name: 'Expand early warning systems for disease outbreaks',
        sdgs: ['SDG3', 'SDG13']
      },
      {
        name: 'Support public awareness campaigns to promote better hygiene',
        sdgs: ['SDG3', 'SDG13']
      },
      {
        name: 'Expand hospital buildings & facilities',
        subTitle: 'including regional referral hospitals',
        sdgs: ['SDG3', 'SDG13', 'SDG11']
      },
      {
        name: 'Support better access to medicines & medical equipment',
        sdgs: ['SDG3', 'SDG13']
      },
      {
        name: 'Support training of health care professionals',
        sdgs: ['SDG3', 'SDG13', 'SDG4']
      },
      {
        name: 'Improve water & sanitation facilities',
        subTitle: 'to limit outbreaks of water-borne diseases',
        sdgs: ['SDG3', 'SDG13', 'SDG6']
      }
    ]
  },
  {
    sector: 'Infrastructure',
    logo: 'SDG11',
    opportunities: [
      {
        name: 'Make buildings more climate-resilient',
        subTitle: 'both existing buildings & new construction',
        sdgs: ['SDG11', 'SDG13']
      },
      {
        name: 'Access & manage climate risks of infrastructure projects',
        sdgs: ['SDG11', 'SDG13']
      },
      {
        name: 'Make transportation more climate-resilient',
        sdgs: ['SDG11', 'SDG13']
      }
    ]
  },
  {
    sector: 'Risk Assessment',
    logo: 'SDG13',
    opportunities: [
      {
        name: 'Integrate climate change into business decision-making',
        subTitle:
          'including climate risk assessment, reporting on climate impacts etc.',
        sdgs: ['SDG13', 'SDG12']
      },
      {
        name: 'Improve early warning systems for disaster & climate change',
        sdgs: ['SDG13', 'SDG11', 'SDG1']
      },
      {
        name: 'Improve emergency response for disasters & climate change',
        subTitle:
          'Including support for institutions responsible for emergency response, contingency funds to care for emergency needs following an extreme climate event',
        sdgs: ['SDG13', 'SDG11', 'SDG1', 'SDG16']
      }
    ]
  },
  {
    sector: 'Wetlands',
    logo: 'SDG14',
    opportunities: [
      {
        name: 'Support development of a national wetland investory',
        subTitle:
          'Including re-inventory and assessment of all wetlands in Uganda',
        sdgs: ['SDG14', 'SDG13']
      },
      {
        name: 'Support wetland research, ecotourism & education centres',
        subTitle: 'goal: design & implement 11 RAMSAR wetland sites',
        sdgs: ['SDG14', 'SDG13']
      },
      {
        name:
          'Support institutions responsible for wetland law enforcement & governance',
        subTitle:
          'goal: design & implement 111 district wetland actions plans with carbon sink potential, and 15 RAMSAR sites & framework wetland management plans',
        sdgs: ['SDG14', 'SDG13', 'SDG16']
      },
      {
        name: 'Support wetland restoration',
        subTitle:
          'goal: increase coverage by 12% by 2030 throuh demarcation, gazettement & restoration of degraded wetland',
        sdgs: ['SDG14', 'SDG13']
      }
    ]
  },
  {
    sector: 'Energy',
    logo: 'SDG7',
    opportunities: [
      {
        name: 'Support energy efficiency in the modern energy sector',
        subTitle: 'especially in hospitals',
        sdgs: ['SDG7', 'SDG13', 'SDG3']
      },
      {
        name: 'Support energy efficiency of the biomass',
        subTitle:
          'both production & utilization technologies, including cookstoves & induction burners',
        sdgs: ['SDG7', 'SDG13', 'SDG1', 'SDG15']
      },
      {
        name: 'Expand renewable & clean energy',
        subTitle:
          'both energy production & use - to achieve at least, MW renewable energy capacity by 2030',
        sdgs: ['SDG7', 'SDG13', 'SDG1']
      },
      {
        name: 'Expand solar energy systems',
        sdgs: ['SDG7', 'SDG13', 'SDG1']
      },
      {
        name: 'Provide off-grid solar systems in remote areas',
        subTitle:
          'to support water supply, agricultural extension services and value addition, and especially in schools',
        sdgs: ['SDG7', 'SDG13', 'SDG1', 'SDG2', 'SDG4', 'SDG6', 'SDG8']
      },
      {
        name: 'Extend electricity grid to undeserved areas',
        subTitle:
          'power lines, substations, transmission facilities to support water supply, agriculture',
        sdgs: ['SDG7', 'SDG13', 'SDG1', 'SDG2', 'SDG6']
      },
      {
        name: 'Improve hydropower generation',
        subTitle: 'to ensure careful management of water resources',
        sdgs: ['SDG7', 'SDG13', 'SDG6']
      },
      {
        name: 'Climate-proof investments in the electricity power sector',
        sdgs: ['SDG7', 'SDG13', 'SDG9']
      }
    ]
  }
]

export default ugandaNdcs
