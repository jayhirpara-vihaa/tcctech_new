import Text from '@components/ui/text'
import Link from '@components/ui/link'
import { useTranslation } from 'next-i18next'

interface Props {
  sectionHeading: string
  categorySlug?: string
  className?: string
  textClassName?: string
}

const SectionHeader: React.FC<Props> = ({
  sectionHeading = 'text-section-title',
  categorySlug,
  className = 'pb-0.5',
}) => {
  const { t } = useTranslation('common')
  return (
    <div className={`flex items-center justify-center mt-2 ${className}`}>
      <Text className={sectionHeading === "text-our-jewelry-selection" ? "Tcc-text-our-Jewelry-Section" : "Tcc-text-our-best-selling"} variant='mediumHeading'>
        {t(`${sectionHeading}`)}
      </Text>
      {categorySlug && (
        <Link
          href={categorySlug}
          className='text-xs lg:text-sm xl:text-base text-heading mt-0.5 lg:mt-1'
        >
          {t('text-see-all-product')}
        </Link>
      )}
    </div>
  )
}

export default SectionHeader
