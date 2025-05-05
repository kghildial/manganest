import { EPaginationEllipses, TPaginationPageNumber } from '@/types/utils.types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function timeAgo(from: Date, to: Date = new Date()): string {
  const diffMs = to.getTime() - from.getTime();
  const diffMinutes = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMinutes < 1) return 'just now';
  if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  if (diffDays < 14) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  }

  return from.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function getVisiblePages(current: number, total: number): TPaginationPageNumber[] {
  const pages: TPaginationPageNumber[] = [];

  // Always show first 3 pages
  for (let i = 1; i <= Math.min(3, total); i++) {
    pages.push(i);
  }

  // Show start ellipsis if current - 1 is beyond page 4
  if (current - 1 > 4) {
    pages.push(EPaginationEllipses.Start);
  }

  // Add current -1, current, current +1 if in valid range
  const midStart = Math.max(4, current - 1);
  const midEnd = Math.min(total - 3, current + 1);
  for (let i = midStart; i <= midEnd; i++) {
    if (!pages.includes(i)) {
      pages.push(i);
    }
  }

  // Show end ellipsis if current + 1 is before total - 3
  if (current + 1 < total - 3) {
    pages.push(EPaginationEllipses.End);
  }

  // Always show last 3 pages
  for (let i = Math.max(total - 2, 4); i <= total; i++) {
    if (!pages.includes(i)) {
      pages.push(i);
    }
  }

  return pages;
}

export const scrollToElement = (el: Element) => {
  const yOffset = -80; // based on the header height

  const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
  window.scrollTo({ top: y, behavior: 'smooth' });
};
