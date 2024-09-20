import Text from "@components/ui/text";
import Input from "@components/ui/input";
import Button from "@components/ui/button";
import { useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import {
  subscriptionInputType,
  useSubscriptionMutation,
} from "@framework/subscription/subscription-add";
import { useEffect, useState } from "react";

const datas = {
  title: "common:text-get-our-latest-update",
  description: "common:text-subscribe-description",
  buttonText: "common:button-subscribe",
};

interface Props {
  className?: string;
  disableBorderRadius?: boolean;
}

type FormValues = {
  email: string;
};

const defaultValues = {
  email: "",
};

const Subscription: React.FC<Props> = ({
  className = "px-5 sm:px-8 md:px-16 2xl:px-24",
  disableBorderRadius = false,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<subscriptionInputType>({
    defaultValues,
  });
  const { t } = useTranslation();
  const { title, description, buttonText } = datas;
  const { data: subscriptionData, mutate: subscriptionAdd } = useSubscriptionMutation();
  const [email, setEmail] = useState("");
  function addsubscription() {
    subscriptionAdd({
      email: email,
    });
  }
  const handleEmail = (e: any) => {
    setEmail(e.target.value);
  };
  useEffect(() => {
    setEmail("");
  }, [subscriptionData]);

  return (
    <>
      <div className="flex items-center justify-center mt-20 ">
        <Text variant="mediumHeading" className="Tcc-text-our-Jewelry-Section">
          {t(`${title}`)}
        </Text>
      </div>
      <div className="px-4 flex mb-12 items-center justify-center Tcc-text-our-best-selling pb-0.5 md:mb-5 lg:mb-6 2xl:mb-7 3xl:mb-8">
        <p className="mt-7 break-normal text-black ">{t(`${description}`)}</p>
      </div>
      {/* Form */}
      <div className="mt-7 flex items-center justify-center">
        <form
          onSubmit={handleSubmit(addsubscription)}
          className="sm:w-96 md:w-[545px] "
          noValidate
        >
          <div className="content-center">
            <Input
              disableBorderRadius={disableBorderRadius}
              placeholderKey="forms:placeholder-email-subscribe"
              type="email"
              variant="solid"
              className="w-full"
              value={email}
              inputClassName="px-4 lg:px-7 h-12 lg:h-14 text-center sm:text-start bg-white"
              {...register("email", {
                required: "forms:email-required",
                pattern: {
                  value:
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "forms:email-error",
                },
              })}
              onChange={(e: any) => handleEmail(e)}
              errorKey={errors.email?.message}
            />
            <div className="mt-7 flex items-center justify-center mb-7 hover:w-[101%] hover:h-[101%]">
              <Button disableBorderRadius={disableBorderRadius} className="">
                <span className="lg:py-0.5">{t(`${buttonText}`)}</span>
              </Button>
            </div>

            {/* <div className="flex items-center justify-center mb-7">
              <input type="checkbox" className="checked:primary mr-2" />I Agree
              To The Privacy policy.
            </div> */}
          </div>
        </form>
      </div>
    </>
  );
};

export default Subscription;
