import clsx from 'clsx'
import Image from 'next/image'
import logoSvg from '@/images/logos/logo.svg'

export function Logo({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={clsx('flex flex-row items-center gap-2', className)}
      {...props}
    >
      <Image
        src={logoSvg}
        alt="AEO.dev"
        width={24}
        height={24}
        className="h-6 w-auto flex-shrink-0"
      />
      <span className="text-sm font-semibold text-zinc-900 dark:text-white tracking-tight whitespace-nowrap">
        AEO.dev
      </span>
    </div>
  )
}
