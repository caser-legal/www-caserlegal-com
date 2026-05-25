import type { ReactNode } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

/** Shared height for card footer actions sitewide */
export const CARD_ACTION_CLASS = 'w-full h-10 shrink-0';

type ContactCardProps = {
  title: string;
  /** Single string or two lines for aligned card headers */
  description: string | readonly [string, string];
  icon: ReactNode;
  children: React.ReactNode;
  className?: string;
};

export function ContactCard({ title, description, icon, children, className }: ContactCardProps) {
  const descriptionNode = Array.isArray(description) ? (
    <span className="block leading-snug">
      <span className="block">{description[0]}</span>
      <span className="block">{description[1]}</span>
    </span>
  ) : (
    description
  );

  return (
    <Card className={cn('flex flex-col h-full text-center', className)}>
      <CardHeader className="pb-3">
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
          {icon}
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription className="text-sm min-h-[3.25rem] flex items-center justify-center">
          {descriptionNode}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col flex-1 pt-0 gap-4">{children}</CardContent>
    </Card>
  );
}

type ContactCardActionProps = {
  href: string;
  label: string;
  variant?: 'default' | 'outline';
  internal?: boolean;
  icon?: React.ReactNode;
};

export function ContactCardAction({
  href,
  label,
  variant = 'default',
  internal = false,
  icon,
}: ContactCardActionProps) {
  const content = (
    <>
      {icon}
      {label}
    </>
  );

  if (internal) {
    return (
      <Button variant={variant} className={CARD_ACTION_CLASS} asChild>
        <Link href={href}>{content}</Link>
      </Button>
    );
  }

  return (
    <Button variant={variant} className={CARD_ACTION_CLASS} asChild>
      <a href={href}>{content}</a>
    </Button>
  );
}
