import React, { FC } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface CompactToolTipProps {
  component: React.ReactNode;
  title: string;
}

const CompactToolTip: FC<CompactToolTipProps> = ({ component, title }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{component}</TooltipTrigger>
        <TooltipContent>
          <p>{title}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CompactToolTip;
