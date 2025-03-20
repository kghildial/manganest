import React from 'react';

import { Card } from '@/components/ui/card';

import { cn } from '@/lib/utils';

const CustomCard = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <Card ref={ref} className={cn(className)} {...props} />,
);

export default CustomCard;
