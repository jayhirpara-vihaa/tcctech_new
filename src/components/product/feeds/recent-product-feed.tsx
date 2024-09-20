import ProductsBlockCarousel from '@containers/products-block-carousel'
import { PropsData } from '@framework/types'

const RecentProductFeed: React.FC<PropsData> = ({
  data,
  error,
  isLoading
}) => {
  const limit = 5
  // const { data, isLoading, error } = useTrendingProductsQuery()
  const allTrendingData = data?.data

  return (
    <ProductsBlockCarousel
      sectionHeading='text-new-arrivals'
      sectionDiscription='discriprion-new-arrivals'
      products={allTrendingData}
      loading={isLoading}
      error={error?.message}
      uniqueKey='new-arrivals'
      type='gridTrendy'
      // type='gridModernWide'
      className='mb-12 md:mb-14 xl:mb-16'
      imgWidth={435}
      imgHeight={435}
      productType={"featured"}
    />
  );
};

export default RecentProductFeed