import React from "react";

const NunguStarted = () => {
  const image = "/assets/nlovestory/Blog-800x800-e.jpg";
  return (
    <div className="px-4 md:px-8 2xl:px-16">
      <div className="px-4 md:px-8 2xl:px-16 grid grid-cols-1 md:grid-cols-2 my-20 ">
        <div className="mt-15 sm:px-12 lg:mt-20 max-sm:grid ">
          <img className="mt-15 w-full h-full" src={image} alt={"item"} />
        </div>

        <div className="lg:mt-20 max-sm:grid ">
          {/* <div>
            <span className="text-[#E58A1F]">Story 1</span>
          </div> */}
          <h3 className="Tcc-text-our-nungustories-featured w-96 text-lg md:text-xl lg:text-2xl 2xl:text-3xl xl:leading-10 font-semibold text-heading max-sm:mt-6 md:mt-0 ">
            Our Love Story
          </h3>

          <h3 className="nungustories-featured-description mt-6">
            Everyone’s love story is uniquely their own, just as Kealeboga and
            Ursula Pule’s story. They met by accident and fell in love by
            choice, it was a fate written in the stars. Kealeboga and Ursula’s
            love started as a Rough Diamond, a story that was still to be
            written.
          </h3>

          <h3 className="nungustories-featured-description mt-6 ">
            Once you have found the perfect ‘Rough Diamond’ the one that can be
            molded into the most beautiful shape, this is where the building
            together begins; each memory or moment is a new facet added to the
            Diamond, you polish together, you create together, you make mistakes
            and find out what works and what doesn’t to create an outcome that
            radiates a fiery sparkle of deep love. As Michelangelo famously
            said: “Every block of stone has a statue inside and it is the task
            of the sculptor to release it.”
          </h3>

          <h3 className="nungustories-featured-description mt-6">
            Kealeboga and Ursula love that their story reflects the meaning
            behind a Diamond, a pure symbol of strength, invincibility, purity,
            faithfulness, and eternal love. Kealeboga and Ursula Pule’s love for
            each other, diamonds and their associated heritage with South Africa
            led them to create a proudly South African Bespoke Diamond Jewellery
            Brand that is rooted in core values of Provenance, Substance, and
            Authenticity.
          </h3>
        </div>
      </div>
    </div>
  );
};

export default NunguStarted;
