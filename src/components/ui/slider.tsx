"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

type SliderProps = {
  className?: string
  defaultValue?: number[]
  value?: number[]
  min?: number
  max?: number
  step?: number
  onValueChange?: (value: number[]) => void
  disabled?: boolean
}

/** Native range input — reliable on Next.js static export (Radix thumbs break without full hydration). */
function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  step = 1,
  onValueChange,
  disabled,
}: SliderProps) {
  const isControlled = value !== undefined
  const [internal, setInternal] = React.useState(defaultValue?.[0] ?? min)

  const current = isControlled ? (value?.[0] ?? min) : internal

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const next = Number(event.target.value)
    if (!isControlled) {
      setInternal(next)
    }
    onValueChange?.([next])
  }

  return (
    <input
      type="range"
      data-slot="slider"
      min={min}
      max={max}
      step={step}
      value={current}
      disabled={disabled}
      onChange={handleChange}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={current}
      className={cn(
        "h-2 w-full cursor-pointer appearance-none rounded-full bg-muted accent-primary",
        "disabled:pointer-events-none disabled:opacity-50",
        "[&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:bg-background [&::-webkit-slider-thumb]:shadow-sm",
        className
      )}
    />
  )
}

export { Slider }
