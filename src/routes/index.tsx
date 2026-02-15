import { createFileRoute, Link } from '@tanstack/react-router'
import { Calendar, Pill, Link as LinkIcon, LucideIcon } from 'lucide-react'

export const Route = createFileRoute('/')({ component: HomePage })

const CARD_CLASS = 'block p-8 bg-gray-50 rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all'

interface FeatureCard {
  to: string
  icon: LucideIcon
  title: string
  description: string
}

const FEATURE_CARDS: FeatureCard[] = [
  {
    to: '/transplant',
    icon: Calendar,
    title: 'Transplant Day Calculator',
    description: 'Calculate the number of days since your transplant procedure',
  },
  {
    to: '/chemo',
    icon: Pill,
    title: 'Chemotherapy Day Calculator',
    description: 'Track which day of your chemotherapy cycle you\'re on',
  },
  {
    to: '/links',
    icon: LinkIcon,
    title: 'Helpful Resources',
    description: 'Links to helpful medical resources and references',
  },
]

function FeatureCard({ to, icon: Icon, title, description }: FeatureCard) {
  return (
    <Link to={to} className={CARD_CLASS}>
      <div className="flex items-start gap-4">
        <Icon className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
        <div className="text-left">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">{title}</h2>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    </Link>
  )
}

function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            MedCalc
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Medical date calculators for tracking transplant and chemotherapy progress
          </p>
          <p className="text-lg text-gray-500 mb-12">
            Quickly calculate the number of days since your transplant or chemotherapy procedure
          </p>
        </div>
      </section>

      <section className="py-16 px-6 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {FEATURE_CARDS.slice(0, 2).map(card => (
            <FeatureCard key={card.to} {...card} />
          ))}
        </div>
        {FEATURE_CARDS.slice(2).map(card => (
          <FeatureCard key={card.to} {...card} />
        ))}
      </section>
    </div>
  )
}
