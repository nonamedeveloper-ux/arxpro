import { ReactNode } from 'react'
import SectionHeader from './section-header'
import MoreButton from './more-button'

interface SectionProps {
  sectionClassName?: string
  sectionHeaderTitle: string
  sectionHeaderDescription?: string
  moreButtonLabel?: string
  moreButtonPath?: string
  moreButtonClassName?: string
  moreButtonOnClick?: () => void
  children?: ReactNode
  id?: string
}

export default function Section({
  sectionHeaderTitle,
  sectionHeaderDescription,
  sectionClassName,
  moreButtonLabel,
  moreButtonPath,
  moreButtonClassName,
  moreButtonOnClick,
  children,
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`flex justify-center flex-col py-16 gap-y-12 ${sectionClassName}`}
    >
      <SectionHeader title={sectionHeaderTitle} description={sectionHeaderDescription} />

      {children && children}

      {moreButtonLabel && (moreButtonPath || moreButtonOnClick) && (
        <div className='mx-auto'>
          <MoreButton
            label={moreButtonLabel}
            path={moreButtonPath}
            onClick={moreButtonOnClick}
            className={moreButtonClassName}
          />
        </div>
      )}
    </section>
  )
}
