import { cn } from "@/utils/cn";
import { Card, CardBody, Skeleton } from "@heroui/react";
import { ReactNode } from "react";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";

type PropTypes = {
  creased: number | string;
  isCreased: boolean;
  icon?: ReactNode;
  isLoading?: boolean;
  bgIcon?: string;
  label: string;
  total: number | string;
};

const CardSummary = (props: PropTypes) => {
  const {
    creased,
    isCreased,
    icon,
    bgIcon,
    label,
    total,
    isLoading = false,
  } = props;

  return (
    <Skeleton isLoaded={!isLoading} className="rounded-lg">
      <Card className="w-full">
        <CardBody>
          <div className="p-1">
            <div className="flex items-start justify-between pb-2">
              <div>
                <span className="text-base text-default-400">{label}</span>

                <h4 className="text-2xl font-medium">{total}</h4>
              </div>

              {icon && (
                <div className="p-1">
                  <div
                    className={cn(
                      "rounded-full bg-blue-500 p-3",
                      bgIcon && `bg-${bgIcon}`,
                    )}
                  >
                    {icon}
                  </div>
                </div>
              )}
            </div>

            {creased && (
              <div className="flex gap-1 text-sm">
                <span className="text-default-400">
                  {isCreased ? "Increased By" : "Deccreased By"}
                </span>

                <span className={isCreased ? "text-success" : "text-red-600"}>
                  {creased}
                </span>

                {isCreased === true && (
                  <FiArrowUp className="text-xl text-success" />
                )}

                {isCreased === false && (
                  <FiArrowDown className="text-xl text-red-600" />
                )}
              </div>
            )}
          </div>
        </CardBody>
      </Card>
    </Skeleton>
  );
};

export default CardSummary;
