import Container from "@components/ui/container";
import WidgetLink from "@components/widgets/widget-link";
import cn from "classnames";

interface WidgetsProps {
  widgets: {
    id: number;
    widgetTitle?: string;
    lists: any;
    isCompanyIntroduction?: boolean;
    logo?: any;
  }[];

  variant?: "contemporary";
}

const Widgets: React.FC<WidgetsProps> = ({ widgets, variant }) => {
  return (
    <Container>
      <div
        className={cn(
          "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-9 xl:gap-5  pb-9 md:py-10 lg:py-12 2xl:py-12 3xl:py-15 lg:mb-0.5 2xl:mb-0 px-4 md:px-8 2xl:px-16",
          {
            // 'xl:grid-cols-6': variant !== 'contemporary',
            "xl:grid-cols-6": variant === "contemporary",
          }
        )}
      >
        {widgets?.map((widget) => (
          <WidgetLink
            key={`footer-widget--key${widget.id}`}
            data={widget}
            className="pb-3 md:pb-0"
            variant="contemporary"
          />
        ))}
      </div>
    </Container>
  );
};

export default Widgets;
