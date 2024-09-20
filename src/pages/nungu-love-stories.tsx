import React from "react";
import HeroSlider from "@containers/hero-slider";
import NunguStarted from "@containers/nungu-started";
import Layout from "@components/layout/layout";
import type { GetStaticProps } from "next";
import { QueryClient } from "react-query";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { dehydrate } from "react-query/hydration";
import NunguShipping from "@containers/shipping-nungulovestory";
import Instagram from "@components/common/instagram";
import Subscription from "@components/common/subscription";
import { BannerQueenLovestory } from "@containers/banner-queen-lovestory";
import { siteSettings } from "@settings/site-settings";

export default function NunguLoveStories() {
  const HeroSliderData = {
    code: 200,
    status: "success",
    message: "success",
    data: {
      totalItems: 1,
      result: [
        {
          id: 1,
          name: "nungu-static-image",
          target_url: "http://www.google.com///",
          created_date: "2023-03-07T10:45:21.984Z",
          content: null,
          image_path: "/assets/images/NunguLoveStory/About-1.png",
        },
        // {
        //   id: 2,
        //   name: "nungu-static-image",
        //   target_url: "http://www.google.com///",
        //   created_date: "2023-03-07T10:45:21.984Z",
        //   content: null,
        //   image_path: "/assets/images/NunguLoveStory/About-1.png",
        // },
      ],
    },
  };
  return (
    <div className=" mx-auto max-w-[1920px]">
      {/* <div className="max-lg:mt-[59px] max-xl:mt-[8.8rem] ">
        <HeroSlider
          data={HeroSliderData}
          variantRounded="default"
          variant="fullWidth"
          mobile={siteSettings.BannerLoveStorySlider.mobile}
          desktop={siteSettings.BannerLoveStorySlider.desktop}
          prevNextButtons="none"
          className="!mb-24 !md:mb-14 !xl:mb-[60px] "
          typedata="static"
        />
      </div> */}
      <NunguStarted />
      {/* story 2 */}
      <div className="px-4 md:px-8 2xl:px-16">
        <div className="px-4 md:px-8 2xl:px-16 grid grid-cols-1 md:grid-cols-2 my-20 ">
          <div className="mt-15 sm:px-12 lg:mt-20 max-sm:grid md:order-2">
            <img
              className="mt-15 w-full h-full"
              src={"/assets/nlovestory/Love-800x800-Foundation.jpg"}
              alt={"item"}
            />
          </div>

          <div className="lg:mt-20 max-sm:grid ">
            {/* <div>
              <span className="text-[#E58A1F]">Story 2</span>
            </div> */}

            <h3 className="Tcc-text-our-nungustories-featured w-96 text-lg md:text-xl lg:text-2xl 2xl:text-3xl xl:leading-10 max-sm:mt-6 md:mt-0  font-semibold text-heading ">
              Foundation
            </h3>

            <h3 className="nungustories-featured-description mt-6 ">
              Kimberlite, the rock in which diamonds are found, is the
              foundation of the diamond industry. It represents the beginning of
              a journey that culminates in a polished diamond. Similarly, family
              can be considered the ‘Kimberlite’ of a healthy economy. A
              committed and purposeful partnership dedicated to raising children
              develops the discipline and work ethic found in South African
              miners who unearth our country’s natural resources.
            </h3>

            <h3 className="nungustories-featured-description mt-6 ">
              The importance of family cannot be overstated. It provides a solid
              foundation for personal growth and development. In a family unit,
              individuals learn to communicate, cooperate and work towards
              common goals. These are essential skills that are transferable to
              any workplace, including the mining industry.
            </h3>

            <h3 className="nungustories-featured-description mt-6">
              The dedication required to maintain a successful family is also
              vital for the mining industry. Like a committed partnership,
              mining requires discipline and perseverance. The miners who work
              tirelessly to extract diamonds from Kimberlite are a testament to
              this. They have a clear purpose and a drive to succeed, much like
              a family unit striving towards a common goal.
            </h3>
            <h3 className="nungustories-featured-description mt-6">
              In conclusion, just as Kimberlite is the foundation of the diamond
              industry, family is the foundation of a healthy economy. A
              committed partnership dedicated to raising a future generation
              instills the discipline and work ethic necessary for success in
              any industry. It is a reminder that success is not only measured
              in monetary gain but in the development of strong personal
              relationships and the contributions we make to our communities.
            </h3>
          </div>
        </div>
      </div>

      {/* story 3 */}
      <div className="px-4 md:px-8 2xl:px-16">
        <div className="px-4 md:px-8 2xl:px-16 grid grid-cols-1 md:grid-cols-2 my-20 ">
          <div className="mt-15 sm:px-12 lg:mt-20 max-sm:grid ">
            <img
              className="mt-15 w-full h-full"
              src={"/assets/nlovestory/Love-800x800-With-Respect.jpg"}
              alt={"item"}
            />
          </div>

          <div className="lg:mt-20 max-sm:grid ">
            {/* <div>
              <span className="text-[#E58A1F]">Story 3</span>
            </div> */}

            <h3 className="Tcc-text-our-nungustories-featured w-96 text-lg md:text-xl lg:text-2xl 2xl:text-3xl xl:leading-10  font-semibold text-heading max-sm:mt-6 md:mt-0 ">
              With Respect
            </h3>

            <h3 className="nungustories-featured-description mt-6 ">
              “ The story of African Diamonds is fraught with history of
              exploitation and abuse, but in recent years, the narrative has
              begun to shift. South Africa and other African countries that
              produce diamonds are leading the charge towards a brighter future.
              The image of a hand-under-open-hands is a powerful symbol of this
              change, representing the African gesture of respect and the
              newfound pride with which we can offer our natural resources to
              the world.
            </h3>

            <h3 className="nungustories-featured-description mt-6 ">
              This change in narrative is not just about the economic benefits
              of diamond production but also about the empowerment of African
              communities. As African Countries take control of their natural
              resources, they are creating opportunities for local communities
              to benefit from the diamond trade. This is a significant shift
              from the past when diamond production was often controlled by
              foreign companies who reaped most of the profits.
            </h3>

            <h3 className="nungustories-featured-description mt-6">
              As South Africans, we are proud to be at the forefront of this
              change. We can now offer out diamonds to the world with pride,
              knowing that they represent a brighter future for our communities.
              The hand-under-open-hand gesture is a reminder of the respect and
              dignity with which we want to conduct business. We are no longer
              willing to accept exploitation and abuse, and we are committed to
              ensuring that the benefits of Diamond production are shared by
              all.
            </h3>
            <h3 className="nungustories-featured-description mt-6">
              In conclusion, the story of African diamonds has begun to change,
              and the hand-under-open-hand symbolizes the shift towards a
              brighter future. It represents a new narrative of empowerment,
              respect and pride in natural resources of African countries. As we
              move forward, it is essential to remember the dark past of Diamond
              production and work towards creating a fair and equitable industry
              that benefits everyone.”
            </h3>
          </div>
        </div>
      </div>

      {/* story 4 */}
      <div className="px-4 md:px-8 2xl:px-16">
        <div className="px-4 md:px-8 2xl:px-16 grid grid-cols-1 md:grid-cols-2 my-20 ">
          <div className="md:order-1 mt-15 sm:px-12 lg:mt-20 max-sm:grid ">
            <img
              className="mt-15 w-full h-full"
              src={"/assets/nlovestory/Love-800x800-Love-Story.jpg"}
              alt={"item"}
            />
          </div>

          <div className="lg:mt-20 max-sm:grid ">
            {/* <div>
              <span className="text-[#E58A1F]">Story 4</span>
            </div> */}

            <h3 className="Tcc-text-our-nungustories-featured w-96 text-lg md:text-xl lg:text-2xl 2xl:text-3xl xl:leading-10 font-semibold text-heading max-sm:mt-6 md:mt-0">
              Love Story
            </h3>

            <h3 className="nungustories-featured-description mt-6 ">
              “ The image of a young couple in love, making a proposal in the
              rain is a powerful symbol of the depth of commitment and the
              unwavering belief in one another, despite their circumstances.
              This couple is filled with dreams and desires, and they have
              chosen to make the ultimate vow to each other, regardless of what
              the future may hold.
            </h3>

            <h3 className="nungustories-featured-description mt-6 ">
              Their decision to propose in the rain speaks volumes about the
              challenges that have faced and the resilience that they have
              developed in their relationship. It is likely that they have
              encountered skepticism and opposition from others who do not share
              their vision. But despite this, they have chosen to pursue their
              dreams and stand by each other.
            </h3>

            <h3 className="nungustories-featured-description mt-6">
              What is truly special about this couple is their values and
              beliefs in the true meaning of love. The tiny diamond on the ring
              is a testament to this. Rather than choosing a larger gem of
              similar monetary value, they have settled on something that
              symbolizes everlasting love. This is a powerful statement about
              the depth of their commitment to each other and their
              understanding that true love is not about the size or cost of a
              diamond but the strength and depth of their relationship.
            </h3>
            <h3 className="nungustories-featured-description mt-6">
              This piece is a reminder that love is not about the material
              things in life, but about the values and beliefs that we hold
              dear. It is a testament to the power of commitment and the
              importance of standing by those we love, no matter what the future
              may hold. It reminds us that the true value of a diamond is not in
              its size or cost but in the symbolism of everlasting love that it
              represents.”
            </h3>
          </div>
        </div>
      </div>

      {/* story 5 */}
      <div className="px-4 md:px-8 2xl:px-16">
        <div className="px-4 md:px-8 2xl:px-16 grid grid-cols-1 md:grid-cols-2 my-20 ">
          <div className="mt-15 sm:px-12 lg:mt-20 max-sm:grid ">
            <img
              className="mt-15 w-full h-full"
              src={"/assets/nlovestory/Love-800x800-Untold.jpg"}
              alt={"item"}
            />
          </div>

          <div className="lg:mt-20 max-sm:grid ">
            {/* <div>
              <span className="text-[#E58A1F]">Story 5</span>
            </div> */}

            <h3 className="Tcc-text-our-nungustories-featured w-96 text-lg md:text-xl lg:text-2xl 2xl:text-3xl xl:leading-10  font-semibold text-heading max-sm:mt-6 md:mt-0 ">
              Untold
            </h3>

            <h3 className="nungustories-featured-description mt-6 ">
              “ The creation of a personalized diamond ring is a special
              experience that often involves a consultation to select the
              diamond that reflects one’s personality; however, for many people
              of colour living in South Africa this concept may be foreign. The
              world of diamonds has been traditionally inaccessible to many, and
              the idea of holding an unset polished diamond or owning one may
              seem unattainable.
            </h3>

            <h3 className="nungustories-featured-description mt-6 ">
              But times are changing. Diamonds are an integral part of our
              heritage, and it is time that we embrace it. As we learn more
              about the diamond industry and the potential benefits it can bring
              to our communities, we can begin to appreciate the beauty and
              symbolism of these precious stones.
            </h3>

            <h3 className="nungustories-featured-description mt-6">
              The consultation process for a personalized diamond ring is a
              powerful way to connect with the diamond and understand its unique
              characteristics. It allows us to choose a diamond that reflects
              our personality and values, creating a truly personalized piece of
              jewellery that we can cherish for a lifetime.
            </h3>
            <h3 className="nungustories-featured-description mt-6">
              As people of colour in South Africa, we have a rich cultural
              heritage that is intertwined with the diamond industry. Diamonds
              have played an important role in our history, and it is time that
              we take ownership of our heritage and reclaim our place in the
              diamond industry
            </h3>
            <h3 className="nungustories-featured-description mt-6">
              By embracing diamonds, we can create opportunities for our
              communities and empower ourselves in the process. We can learn
              about the industry and demand fair practices that benefit everyone
              involved. We can also create beautiful, personalized pieces of
              jewellery that reflect our unique personalities and values.”
            </h3>
          </div>
        </div>
      </div>

      {/* story 6 */}
      <div className="px-4 md:px-8 2xl:px-16">
        <div className="px-4 md:px-8 2xl:px-16 grid grid-cols-1 md:grid-cols-2 my-20 ">
          <div className="md:order-1 mt-15 sm:px-12 lg:mt-20 max-sm:grid ">
            <img
              className="mt-15 w-full h-full"
              src={"/assets/nlovestory/Love-800x800-Based-on-a-True-Story.jpg"}
              alt={"item"}
            />
          </div>

          <div className="lg:mt-20 max-sm:grid ">
            {/* <div>
              <span className="text-[#E58A1F]">Story 6</span>
            </div> */}

            <h3 className="Tcc-text-our-nungustories-featured w-96 text-lg md:text-xl lg:text-2xl 2xl:text-3xl xl:leading-10  font-semibold text-heading max-sm:mt-6 md:mt-0 ">
              Based on a True Story:
            </h3>

            <h3 className="nungustories-featured-description mt-6 ">
              “The hands in the picture belong to Kealeboga and Ursula Pule, and
              the Diamond Ring is their actual Wedding Ring. This piece is much
              tighter in composition compared to a “Love Story.” This is because
              with maturity comes wisdom and a focused mindset about the reality
              of things. As we let go of the unnecessary, the world becomes
              smaller and more intimate.
            </h3>

            <h3 className="nungustories-featured-description mt-6 ">
              The Pules’ story is extraordinary. They exist in an industry where
              the odds are stacked heavily against them, but they continue to
              persevere and excel. They are a symbol of the change that is
              happening in the diamond industry; one that is increasingly
              becoming more inclusive and diverse.
            </h3>

            <h3 className="nungustories-featured-description mt-6">
              Their journey is one of excellence, perseverance, and
              determination. As a couple, they have overcome numerous challenges
              and have emerged stronger and more resilient. Their Wedding Ring
              is not just a symbol of their love for each other but also a
              testament to their strength and commitment to their craft.
            </h3>
            <h3 className="nungustories-featured-description mt-6">
              The Diamond Industry has a long history of exclusion and
              inequality, but the Pules are a shining example of how things are
              changing. They are trailblazers in their industry, breaking down
              barriers and creating opportunities for others to follow in their
              footsteps.
            </h3>
            <h3 className="nungustories-featured-description mt-6">
              Their success is not just about their individual achievements but
              also about the impact they are making on their community. As they
              continue to pave the way for others, they inspire us all to strive
              for excellence and to never give up on our dreams.”
            </h3>
          </div>
        </div>
      </div>

      {/* <NunguShipping /> */}

      {/* <BannerQueenLovestory /> */}

      <div className="px-4 md:px-8 2xl:px-16">
        <Subscription className="bg-opacity-0 px-5 sm:px-16 xl:px-0 mb-12 md:mb-14 xl:mb-16 !py-0 !md:py-0 !lg:py-0" />
      </div>

      <div className="px-4 md:px-8 2xl:px-16">
        <Instagram className="mb-4 md:mb-5 xl:mb-16" variant="rounded" />
      </div>
    </div>
  );
}

NunguLoveStories.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const queryClient = new QueryClient();

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      ...(await serverSideTranslations(locale!, [
        "common",
        "forms",
        "menu",
        "footer",
      ])),
    },
    revalidate: 60,
  };
};
