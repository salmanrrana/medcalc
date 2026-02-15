interface Link {
  title: string
  url: string
  description: string
}

interface LinkCategory {
  name: string
  links: Link[]
}

const LINK_CATEGORIES: LinkCategory[] = [
  {
    name: 'Transplant Resources',
    links: [
      {
        title: 'National Marrow Donor Program',
        url: 'https://www.nmdp.org/',
        description: 'Information about bone marrow and stem cell transplantation',
      },
      {
        title: 'Blood and Marrow Transplant Information Network',
        url: 'https://www.bmtinfonet.org/',
        description: 'Patient resources and support for transplant recipients',
      },
      {
        title: 'Leukemia & Lymphoma Society',
        url: 'https://www.lls.org/',
        description: 'Support and education for blood cancer patients',
      },
    ],
  },
  {
    name: 'Chemotherapy Resources',
    links: [
      {
        title: 'National Cancer Institute',
        url: 'https://www.cancer.gov/',
        description: 'Comprehensive cancer information and treatment guidelines',
      },
      {
        title: 'American Cancer Society',
        url: 'https://www.cancer.org/',
        description: 'Cancer information, support, and resources',
      },
      {
        title: 'CancerCare',
        url: 'https://www.cancercare.org/',
        description: 'Free support and assistance for cancer patients',
      },
    ],
  },
  {
    name: 'General Medical',
    links: [
      {
        title: 'PubMed',
        url: 'https://pubmed.ncbi.nlm.nih.gov/',
        description: 'Database of biomedical literature',
      },
      {
        title: 'Medline Plus',
        url: 'https://medlineplus.gov/',
        description: 'Consumer health information from the National Library of Medicine',
      },
      {
        title: 'Mayo Clinic',
        url: 'https://www.mayoclinic.org/',
        description: 'Medical information and patient resources',
      },
    ],
  },
]

export default function LinksSection() {
  return (
    <div className="space-y-12">
      {LINK_CATEGORIES.map((category) => (
        <div key={category.name}>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{category.name}</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {category.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 border border-gray-200 rounded-lg hover:border-cyan-400 hover:shadow-md transition-all bg-white"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-cyan-600 transition-colors">
                  {link.title}
                  <span className="ml-2 text-gray-400 text-sm">↗</span>
                </h3>
                <p className="text-gray-600 text-sm">{link.description}</p>
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
