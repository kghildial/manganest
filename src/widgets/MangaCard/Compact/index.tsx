import React from 'react';
import Image from 'next/image';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import MangaCoverSample from '@/assets/images/Solo_Leveling_312.jpg';
import CustomCard from './CustomCard';
import { cn } from '@/lib/utils';

const Compact = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <CustomCard ref={ref} className={cn('flex p-2.5', className)} {...props}>
        <Image
          src={MangaCoverSample}
          alt="Manga Cover"
          width={60}
          height={80}
          className="rounded-xs border border-foreground"
        />
        <div className="ml-2.5 flex flex-1 flex-col justify-between border border-red-500">
          <CardHeader className="">
            <CardTitle className="font-3.25 font-title text-sm/5">Solo Leveling</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          {/* <CardContent>Card Content</CardContent> */}
          <CardFooter className="flex justify-between font-ui">
            <p className="font-3.25 text-xs/4 font-medium">Chapter 125</p>
            <p className="font-3.25 text-[0.625rem]/4 font-medium">25 minutes ago</p>
          </CardFooter>
        </div>
      </CustomCard>
    );
  },
);

export default Compact;
