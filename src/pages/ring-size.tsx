import Layout from "@components/layout/layout-three";
import Text from "@components/ui/text";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useContext } from "react";
import Link from "@components/ui/link";
import { ROUTES } from "@utils/routes";
import { CompanyInfoContext } from "@contexts/company_info/company_info";
import SectionHeader from "@components/common/theProcess-section-header";

const ringSize = [
  {
    id: 1,
    size: 3,
    insideSize: 42.9,
  },
  {
    id: 2,
    size: 3.5,
    insideSize: 45.5,
  },
  {
    id: 3,
    size: 4,
    insideSize: 46.8,
  },
  {
    id: 4,
    size: 4.5,
    insideSize: 48.0,
  },
  {
    id: 5,
    size: 5,
    insideSize: 49.3,
  },
  {
    id: 6,
    size: 5.5,
    insideSize: 50.6,
  },

  {
    id: 7,
    size: 6,
    insideSize: 51.9,
  },
  {
    id: 8,
    size: 6.5,
    insideSize: 53.1,
  },
  {
    id: 9,
    size: 7,
    insideSize: 54.4,
  },
  {
    id: 10,
    size: 7.5,
    insideSize: 55.7,
  },
  {
    id: 11,
    size: 8,
    insideSize: 57.0,
  },
  {
    id: 11,
    size: 8.5,
    insideSize: 58.3,
  },
  {
    id: 12,
    size: 9,
    insideSize: 59.5,
  },
  {
    id: 13,
    size: 9.5,
    insideSize: 60.8,
  },
  {
    id: 14,
    size: 10,
    insideSize: 62.1,
  },
  {
    id: 15,
    size: 10.5,
    insideSize: 63.4,
  },
  {
    id: 16,
    size: 11,
    insideSize: 64.6,
  },
  {
    id: 17,
    size: 11.5,
    insideSize: 65.9,
  },
  {
    id: 18,
    size: 12,
    insideSize: 67.2,
  },
  {
    id: 19,
    size: 12.5,
    insideSize: 68.5,
  },
  {
    id: 20,
    size: 13,
    insideSize: 69.7,
  },
  {
    id: 21,
    size: 13.5,
    insideSize: 42.9,
  },
];
const Bracelate = [
  {
    id: 1,
    bracelets: "X-Small",
    wristmeasurements: "4.76-5.25 in.",
    wristmeasurementsmm: "121-133 mm",
  },
  {
    id: 2,
    bracelets: "Small",
    wristmeasurements: "5.26-5.75 in.",
    wristmeasurementsmm: "134-146 mm",
  },
  {
    id: 3,
    bracelets: "Medium",
    wristmeasurements: "5.76-6.25 in.",
    wristmeasurementsmm: "146-159 mm",
  },
  {
    id: 4,
    bracelets: "Large",
    wristmeasurements: "6.26-6.75 in.",
    wristmeasurementsmm: "159-171 mm",
  },
  {
    id: 5,
    bracelets: "X-Large",
    wristmeasurements: "6.76-7.25 in.   ",
    wristmeasurementsmm: "172-184 mm",
  },
  {
    id: 6,
    bracelets: "XX-Large",
    wristmeasurements: "7.26–7.75in.",
    wristmeasurementsmm: "184–197mm",
  },
  {
    id: 7,
    bracelets: "XXX-Large",
    wristmeasurements: "7.76–8.25in.",
    wristmeasurementsmm: "197–210mm",
  },
];
const pendants = [
  {
    id: 1,
    length: 16,
    lengthCm: 40.5,
  },
  {
    id: 2,
    length: 18,
    lengthCm: 47.75,
  },
  {
    id: 3,
    length: 20,
    lengthCm: 50.75,
  },
  {
    id: 4,
    length: 24,
    lengthCm: 61.0,
  },
  {
    id: 5,
    length: 30,
    lengthCm: 76.25,
  },
  {
    id: 6,
    length: 36,
    lengthCm: 91.5,
  },
];

const RingSize = () => {
  const { companyInfo } = useContext(CompanyInfoContext);
  return (
    <div className="px-4 md:px-8 2xl:px-16 max-sm:mt-36 md:mt-24 lg:mt-8  mx-auto max-w-[1920px]">
      <SectionHeader
        topVarient={false}
        sectionHeading={"Ring Size"}
        className="pb-0.5 sm:mb-1.5 md:mb-2 lg:mb-3 2xl:mb-4 3xl:mb-5 "
      />
      <div className="flex justify-center pt-10 pb-10  gap-10 max-md:grid max-md:grid-cols-2">
        <div className="scrollbar w-72 h-[35rem] " id="style-3">
          <div className="force-overflow">
            <table className="table bg-white ">
              <thead>
                <tr>
                  <th scope="col">Size</th>
                  <th className="pl-20" scope="col">
                    Inside circumference mm
                  </th>
                </tr>
              </thead>
              <tbody>
                {ringSize &&
                  ringSize.map((i) => {
                    return (
                      <tr key={i.id}>
                        <td className="text-center">{i.size}</td>
                        <td className="pl-20 p-2 text-center">
                          {i.insideSize}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="p-10 pl-36">
          <img
            src="/assets/images/revaluation.png"
            width="w-full"
            height="h-full"
          />
        </div>
      </div>

      {/* bracelate  */}

      <div className="mt-20">
        <SectionHeader
          topVarient={false}
          sectionHeading={"Bracelate Size"}
          className="pb-0.5 sm:mb-1.5 md:mb-2 lg:mb-3 2xl:mb-4 3xl:mb-5 "
        />
        <div className="flex justify-center pt-10 pb-10  gap-10 ">
          <table className="table bg-white h-[70%] ">
            <thead>
              <tr>
                <th scope="col">Bracelate</th>
                <th className="pl-20" scope="col">
                  Wrist measurements
                </th>
              </tr>
            </thead>
            <tbody>
              {Bracelate &&
                Bracelate.map((i) => {
                  return (
                    <tr key={i.id}>
                      <td className="text-center">{i.bracelets}</td>
                      <td className="pl-20 p-2 text-center">
                        {i.wristmeasurements}
                      </td>
                      <td>{i.wristmeasurementsmm}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>

          <div className=" pl-36 w-2/3 ">
            <img
              src="/assets/Photos/bracelate.jpeg"
              width="w-2/3"
              height="h-full"
            />
          </div>
        </div>
      </div>

      {/* pendents */}
      <div className="mt-20">
        <SectionHeader
          topVarient={false}
          sectionHeading={"Pendants Size"}
          className="pb-0.5 sm:mb-1.5 md:mb-2 lg:mb-3 2xl:mb-4 3xl:mb-5 "
        />
        <div className="flex justify-center pt-10 pb-10  gap-10 ">
          <table className="table bg-white  h-10">
            <thead>
              <tr>
                <th scope="col">{"Length(in)"}</th>
                <th className="pl-20" scope="col">
                  {"Length(cm)"}
                </th>
              </tr>
            </thead>
            <tbody>
              {pendants &&
                pendants.map((i) => {
                  return (
                    <tr key={i.id}>
                      <td className="text-center">{i.length}</td>
                      <td className="pl-20 p-2 text-center">{i.lengthCm}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>

          <div className=" pl-36 ">
            <img
              src="/assets/Photos/Necklace-Size-Guide-Desktop-US.webp"
              width="w-full"
              height="h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
RingSize.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        "common",
        "forms",
        "menu",
        "footer",
      ])),
    },
  };
};
export default RingSize;
