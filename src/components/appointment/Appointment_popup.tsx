import Input from "@components/ui/input";
import Button from "@components/ui/button";
import { useTranslation } from "next-i18next";
import TextArea from "@components/ui/text-area";
import { useForm } from "react-hook-form";
import { CheckBox } from "@components/ui/checkbox";
import {
  AppointmentInputType,
  useAppointmentMutation,
} from "@framework/inquiries/make-appointment";
import { useUI } from "@contexts/ui.context";

const LoginForm: React.FC = () => {
  const { t } = useTranslation();
  const { data, mutate: login } = useAppointmentMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AppointmentInputType>();

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
  }
  const { closeModal } = useUI();

  const handleAppointmentSubmit = () => {
    if (data?.message === "success") {
      return closeModal();
    } else {
      return closeModal();
    }
  };

  return (
    <>
      <div className="overflow-hidden bg-white mx-auto w-auto lg:w-full border border-gray-300 py-5 px-5 sm:px-8">
        <div>
          <h1 className="TCC-medium-text mt-3 text-center">
            Make an Appointment
          </h1>
          <p className="TCC-small-text mt-3">
            Our jewelry specialists are happy to answer your questions.
          </p>

          <div className="border-b border-slate-300 mt-5" />
        </div>
        <form
          onSubmit={handleSubmit(makeAppointment)}
          className="flex flex-col justify-center"
          noValidate
        >
          <div className="mt-10">
            <div className="grid grid-cols-2 space-2">
              <Input
                id="first_name"
                className="w-[90%] mt-5"
                variant="solid"
                placeholder="First Name"
                {...register("first_name", {
                  required: `${t("forms:password-required")}`,
                })}
              />
              <Input
                id="last_name"
                className="w-[90%] mt-5"
                variant="solid"
                placeholder="Last Name"
                {...register("last_name", {
                  required: `${t("forms:password-required")}`,
                })}
              />
            </div>
            <div className="grid grid-cols-2 space-2">
              <Input
                id="email"
                className="w-[90%] mt-5"
                variant="solid"
                placeholder="Email Address"
                {...register("email", {
                  required: `${t("forms:password-required")}`,
                })}
              />
              <Input
                id="phone_number"
                className="w-[90%] mt-5"
                variant="solid"
                placeholder="Phone (Optional)"
                {...register("phone_number", {
                  required: `${t("forms:password-required")}`,
                })}
              />
            </div>
            <TextArea
              className="w-full  mt-5"
              id="message"
              placeholder="Message"
              {...register("message", {
                required: `${t("forms:password-required")}`,
              })}
            />
          </div>
          <div className="my-3">
            <CheckBox labelKey="forms:label-send-updates" />
          </div>
          <div className="flex justify-center">
            <Button
              type="submit"
              onClick={handleAppointmentSubmit}
              className="h-12 md:mt-1 text-sm lg:text-base w-full sm:w-auto"
            >
              {t("common:button-schedule")}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};
export default LoginForm;
