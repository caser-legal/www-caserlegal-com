'use client';

import { useMemo, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { COURT_TYPES, STATES, type CourtType } from './store';

export function Checkbox({
  checked,
  onChange,
  label,
  className,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn('flex cursor-pointer items-center gap-2 text-sm', className)}>
      <input
        type="checkbox"
        className="size-4 rounded border-input accent-[var(--primary)]"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
      />
      {label}
    </label>
  );
}

function toggle<T>(list: T[], item: T, on: boolean): T[] {
  return on ? [...new Set([...list, item])] : list.filter((value) => value !== item);
}

export function CourtTypeFields({ value, onChange }: { value: CourtType[]; onChange: (next: CourtType[]) => void }) {
  return (
    <fieldset className="space-y-2">
      <legend className="text-sm font-medium">Court types</legend>
      <p className="text-xs text-muted-foreground">Leave all unchecked to search every court type.</p>
      <div className="flex flex-wrap gap-4 pt-1">
        {COURT_TYPES.map((type) => (
          <Checkbox
            key={type.value}
            label={type.label}
            checked={value.includes(type.value)}
            onChange={(on) => onChange(toggle(value, type.value, on))}
          />
        ))}
      </div>
    </fieldset>
  );
}

export function StateFields({ value, onChange }: { value: string[]; onChange: (next: string[]) => void }) {
  const [filter, setFilter] = useState('');
  const visible = useMemo(() => {
    const needle = filter.trim().toLowerCase();
    return needle
      ? STATES.filter((state) => state.name.toLowerCase().includes(needle) || state.code.toLowerCase() === needle)
      : STATES;
  }, [filter]);

  return (
    <fieldset className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <legend className="text-sm font-medium">
          States {value.length > 0 && <span className="text-muted-foreground">({value.length})</span>}
        </legend>
        <div className="flex gap-1">
          <Button type="button" variant="ghost" size="sm" onClick={() => onChange(STATES.map((state) => state.code))}>
            Select All
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={() => onChange([])}>
            Clear
          </Button>
        </div>
      </div>
      <p className="text-xs text-muted-foreground">Leave empty to search every state.</p>
      <Label htmlFor="state-filter" className="sr-only">
        Find a state
      </Label>
      <Input id="state-filter" placeholder="Find a state" value={filter} onChange={(event) => setFilter(event.target.value)} />
      <div className="grid max-h-56 grid-cols-2 gap-x-4 gap-y-2 overflow-y-auto rounded-md border p-3">
        {visible.map((state) => (
          <Checkbox
            key={state.code}
            label={state.name}
            checked={value.includes(state.code)}
            onChange={(on) => onChange(toggle(value, state.code, on))}
          />
        ))}
        {visible.length === 0 && <p className="col-span-2 text-sm text-muted-foreground">No states match.</p>}
      </div>
    </fieldset>
  );
}
