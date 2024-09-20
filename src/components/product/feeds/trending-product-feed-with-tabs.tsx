import SectionHeader from "@components/common/theProcess-section-header";
import { useHomeAboutQuery } from "../../../framework/Home/product";
import Button from "@components/ui/button";
import Link from "@components/ui/link";
import { ROUTES } from "@utils/routes";

const TrendingProductFeedWithTabs: React.FC<any> = ({ data }) => {
  // const { data } = useHomeAboutQuery()
  const mainContentData = {
    id: data?.data?.mainContentData[0]?.id,
    sort_title: data?.data?.mainContentData[0]?.sort_title,
    title: data?.data?.mainContentData[0]?.title,
    content: data?.data?.mainContentData[0]?.content,
  };
  const content1 = {
    id: data?.data?.result[0]?.id,
    title: data?.data?.result[0]?.title,
    content: data?.data?.result[0]?.content,
    target: data?.data?.result[0]?.target_link,
    buttonname: data?.data?.result[0]?.button_name,
    image: `${process.env.NEXT_PUBLIC_IMG_URL}${data?.data?.result[0]?.image_path}`,
  };

  const content2 = {
    id: data?.data?.result[1]?.id,
    title: data?.data?.result[1]?.title,
    content: data?.data?.result[1]?.content,
    target: data?.data?.result[1]?.target_link,
    buttonname: data?.data?.result[1]?.button_name,
    image: `${process.env.NEXT_PUBLIC_IMG_URL}${data?.data?.result[1]?.image_path}`,
  };

  return (
    <div className="mb-12 md:mb-14 xl:mb-16 px-4 md:px-8 2xl:px-16">
      <div>
        <SectionHeader
          sectionHeading={mainContentData.sort_title}
          topVarient={true}
          className="pb-0.5 mb-1 sm:mb-1.5 md:mb-2 lg:mb-3 2xl:mb-4 3xl:mb-5 mt-20"
        />
        <SectionHeader
          topVarient={false}
          sectionHeading={mainContentData.title}
          className="pb-0.5 sm:mb-1.5 md:mb-2 lg:mb-3 2xl:mb-4 3xl:mb-5 mb-20"
        />
      </div>
      <div className="text-center my-12">
        <div className="mx-auto max-w-[768px]">{mainContentData.content}</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 my-10 gap-12">
        <div className="p-8">
          <p className="my-12 TCC-Process-font">{content1.title}</p>
          <img
            className="mt-20 w-full"
            src={content1.image}
            alt={content1.target}
          />
        </div>

        <div className="w-full p-8">
          <img className="w-full" src={content2.image} alt={""} />
          <div className="mt-10">
            <div className="w-full text-justify">{content2.content}</div>
          </div>
          {/* <Link href={ROUTES.PRODUCT}>
            <Button className="mt-10">{content2.buttonname}</Button>
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default TrendingProductFeedWithTabs;
