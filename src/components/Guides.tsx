import { Button } from '@/components/Button'
import { Heading } from '@/components/Heading'

const guides = [
  {
    href: '/why-aeo-matters',
    name: 'Why AEO Matters',
    description: 'Understand the market disruption: 50% traffic decline predictions, AI search growth, and why early adoption is critical.',
  },
  {
    href: '/strategies/overview',
    name: 'Optimization Strategies',
    description:
      'Comprehensive guide to quotes, statistics, Wikipedia, Reddit, PR, and content optimization methods.',
  },
  {
    href: '/measuring-success',
    name: 'Measuring AEO Success',
    description:
      'Track brand visibility, citation rates, and AI referral traffic. Set up analytics and monitor your progress.',
  },
  {
    href: '/checklist',
    name: 'AEO Checklist',
    description:
      'Complete implementation checklist covering entities, technical SEO, content, PR, community, and measurement.',
  },
]

export function Guides() {
  return (
    <div className="my-16 xl:max-w-none">
      <Heading level={2} id="guides">
        Guides
      </Heading>
      <div className="not-prose mt-4 grid grid-cols-1 gap-8 border-t border-zinc-900/5 pt-10 sm:grid-cols-2 xl:grid-cols-4 dark:border-white/5">
        {guides.map((guide) => (
          <div key={guide.href}>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">
              {guide.name}
            </h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              {guide.description}
            </p>
            <p className="mt-4">
              <Button href={guide.href} variant="text" arrow="right">
                Read more
              </Button>
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
