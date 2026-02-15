import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/links')({
  component: LinksPage,
})

interface Link {
  title: string
  url: string
  description: string
}

interface LinkCategory {
  name: string
  links: Link[]
}

function isValidUrl(urlString: string): boolean {
  try {
    const url = new URL(urlString)
    return url.protocol === 'https:' || url.protocol === 'http:'
  } catch (error) {
    // Expected error: invalid URL format
    if (error instanceof TypeError) {
      return false
    }

    // Unexpected error - log for debugging
    console.error('Unexpected error validating URL:', {
      url: urlString,
      error: error instanceof Error ? error.message : String(error),
    })

    return false
  }
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

function LinkCard({ title, url, description }: Link) {
  const isValid = isValidUrl(url)

  if (!isValid) {
    console.error(`Invalid URL for link "${title}": ${url}`)
    return (
      <div className="p-6 border border-red-200 rounded-lg bg-red-50" role="alert">
        <h3 className="text-lg font-semibold text-red-900 mb-2">{title}</h3>
        <p className="text-red-700 text-sm">This link is currently unavailable</p>
      </div>
    )
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-6 border border-gray-200 rounded-lg hover:border-gray-400 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-all bg-white"
      aria-label={`${title} - opens in new window`}
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-gray-700 transition-colors">
        {title}
        <span className="ml-2 text-gray-400 text-sm" aria-hidden="true">↗</span>
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </a>
  )
}

function LinksPage() {
  return (
    <div className="min-h-screen bg-white px-6 py-8 md:py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Helpful Resources
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-12 md:mb-16 leading-relaxed">
          A collection of useful links and resources for transplant, chemotherapy, and medical information.
        </p>
        <div className="space-y-14 md:space-y-16">
          {LINK_CATEGORIES.map((category) => (
            <section key={category.name}>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8">{category.name}</h2>
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {category.links.map((link) => (
                  <LinkCard key={link.url} {...link} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
