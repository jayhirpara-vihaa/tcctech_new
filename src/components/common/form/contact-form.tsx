import Input from "@components/ui/input";
import Button from "@components/ui/button";
import { useForm } from "react-hook-form";
import TextArea from "@components/ui/text-area";
import { useTranslation } from "next-i18next";
import {
  AppointmentInputType,
  useAppointmentMutation,
} from "@framework/inquiries/make-appointment";

interface ContactFormValues {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: number;
  message: string;
}

const ContactForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AppointmentInputType>();
  function onSubmit(values: AppointmentInputType) {}
  const { data, mutate: login } = useAppointmentMutation();

  function makeAppointment({
    first_name,
    last_name,
    email,
    phone_number,
    message,
    created_by = 1,
  }: AppointmentInputType) {
    login({
      first_name,
      last_name,
      email,
      phone_number,
      message,
      created_by,
    });
    reset();
  }

  const { t } = useTranslation();
  return (
    <form
      onSubmit={handleSubmit(makeAppointment)}
      className="w-full mx-auto flex flex-col justify-center "
      noValidate
    >
      <div className="flex flex-col space-y-5">
        <div className="flex flex-col md:flex-row space-y-5 md:space-y-0">
          <Input
            labelKey="forms:label-first-name-reqired"
            placeholderKey="forms:placeholder-name"
            {...register("first_name", { required: "forms:name-required" })}
            className="w-full md:w-1/2 "
            errorKey={errors.first_name?.message}
            variant="solid"
          />
          <Input
            labelKey="forms:label-Last-name-reqired"
            placeholderKey="forms:placeholder-name"
            {...register("last_name", { required: "forms:name-required" })}
            className="w-full md:w-1/2 "
            errorKey={errors.last_name?.message}
            variant="solid"
          />
          <Input
            labelKey="forms:label-email-required"
            type="email"
            placeholderKey="forms:placeholder-email"
            {...register("email", {
              required: "forms:email-required",
              pattern: {
                value:
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "forms:email-error",
              },
            })}
            className="w-full md:w-1/2 md:ms-2.5 lg:ms-5 mt-2 md:mt-0"
            errorKey={errors.email?.message}
            variant="solid"
          />
        </div>
        <Input
          labelKey="forms:label-phone"
          {...register("phone_number", { required: "forms:name-subject" })}
          className="relative"
          placeholderKey="Phone Number"
          errorKey={errors.phone_number?.message}
          variant="solid"
        />
        <TextArea
          labelKey="forms:label-message"
          {...register("message")}
          className="relative mb-4"
          placeholderKey="forms:placeholder-message"
        />
        <div className="relative">
          <Button
            type="submit"
            className="h-12 lg:h-14 mt-1 text-sm lg:text-base w-full sm:w-auto hover:h-[3.3rem] hover:lg:h-[3.7rem]"
          >
            {t("common:button-send-message")}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ContactForm;
