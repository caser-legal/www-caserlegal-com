"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"
import { useMounted } from "@/lib/use-mounted"

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  const mounted = useMounted()
  const _values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : [min, max],
    [value, defaultValue, min, max]
  )

  const fillPercent = React.useMemo(() => {
    const span = max - min
    if (span <= 0) return 0
    return Math.min(100, Math.max(0, ((_values[0] - min) / span) * 100))
  }, [_values, min, max])

  if (!mounted) {
    return (
      <div
        data-slot="slider"
        aria-hidden
        className={cn(
          "relative flex h-6 w-full touch-none items-center select-none",
          className
        )}
      >
        <div className="bg-muted relative h-1.5 w-full grow overflow-hidden rounded-full">
          <div
            className="bg-primary absolute h-full rounded-full"
            style={{ width: `${fillPercent}%` }}
          />
        </div>
        <div
          data-slot="slider-thumb"
          className="border-primary bg-background absolute block size-4 shrink-0 rounded-full border shadow-sm"
          style={{ left: `${fillPercent}%`, transform: "translateX(-50%)" }}
        />
      </div>
    )
  }

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className={cn(
          "bg-muted relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5"
        )}
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className={cn(
            "bg-primary absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
          )}
        />
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          className="border-primary bg-background ring-ring/50 block size-4 shrink-0 rounded-full border shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
        />
      ))}
    </SliderPrimitive.Root>
  )
}

export { Slider }
