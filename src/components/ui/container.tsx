import { useUI } from "@contexts/ui.context";
import cn from "classnames";
interface Props {
  className?: string;
  children?: any;
  el?: HTMLElement;
  clean?: boolean;
}

const Container: React.FC<Props> = ({
  children,
  className,
  el = "div",
  clean,
}) => {
  const { setModalView, openModal } = useUI();

  const rootClassName = cn(className, {
    "mx-auto max-w-[1920px]": !clean,
  });

  const handleAppoitmentPopup = () => {
    setModalView("APPOINTMENT");
    return openModal();
  };

  let Component: React.ComponentType<React.HTMLAttributes<HTMLDivElement>> =
    el as any;

  return (
    <>
      <Component className={rootClassName}>{children}</Component>

      {/* <button
        title="Make An Appointment"
        className="TCC-make-an-appointment fixed z-90 bottom-10 right-8 bg-gray-600 w-20 h-20 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:bg-gray-700 hover:drop-shadow-2xl hover:animate-pulse duration-300"
        onClick={handleAppoitmentPopup}
      ></button> */}
    </>
  );
};

export default Container;
