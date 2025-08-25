import * as React from "react"
import type { TooltipContentProps } from "@radix-ui/react-tooltip"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Toggle } from "@/components/ui/toggle"
import { cn } from "@/lib/utils"

interface ToolbarButtonProps extends React.ComponentProps<typeof Toggle> {
  isActive?: boolean
  tooltip?: string
  tooltipOptions?: TooltipContentProps
}

export const ToolbarButton = React.forwardRef<
  React.ElementRef<typeof Toggle>,
  ToolbarButtonProps
>(({
  isActive,
  children,
  tooltip,
  className,
  tooltipOptions,
  ...props
}, ref) => {
  const toggleButton = (
    <Toggle 
      ref={ref}
      className={cn({ "bg-accent": isActive }, className)} 
      {...props}
    >
      {children}
    </Toggle>
  )

  if (!tooltip) {
    return toggleButton
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{toggleButton}</TooltipTrigger>
      <TooltipContent {...tooltipOptions}>
        <div className="flex flex-col items-center text-center">{tooltip}</div>
      </TooltipContent>
    </Tooltip>
  )
})

ToolbarButton.displayName = "ToolbarButton"

export default ToolbarButton
