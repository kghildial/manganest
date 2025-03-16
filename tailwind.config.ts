import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: 'var(--font-bebas_neue)',
        title: 'var(--font-inknut_antiqua)',
        body: 'var(--font-poppins)',
        ui: 'var(--font-poppins)',
      },
      fontSize: {
        // Mobile & Tablet Sizes
        h1: ['2.25rem', { lineHeight: '2.625rem' }], // 36px | 42px
        h2: ['1.875rem', { lineHeight: '2.25rem' }], // 30px | 36px
        h3: ['1.5rem', { lineHeight: '1.875rem' }], // 24px | 30px
        h4: ['1.25rem', { lineHeight: '1.625rem' }], // 20px | 26px
        h5: ['1.125rem', { lineHeight: '1.5rem' }], // 18px | 24px
        h6: ['1rem', { lineHeight: '1.375rem' }], // 16px | 22px
        // Desktop Sizes
        'h1-lg': ['4rem', { lineHeight: '4.375rem' }], // 64px | 70px
        'h2-lg': ['3rem', { lineHeight: '3.375rem' }], // 48px | 54px
        'h3-lg': ['2.25rem', { lineHeight: '2.625rem' }], // 36px | 42px
        'h4-lg': ['1.75rem', { lineHeight: '2.125rem' }], // 28px | 34px
        'h5-lg': ['1.5rem', { lineHeight: '1.875rem' }], // 24px | 30px
        'h6-lg': ['1.25rem', { lineHeight: '1.625rem' }], // 20px | 26px
        // Common Sizes
        body: ['1rem', { lineHeight: '1.5rem' }], // 16px | 24px
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 4px)',
        sm: 'calc(var(--radius) - 6px)',
        xs: 'calc(var(--radius) - 8px)',
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        border: 'var(--border)',
        accent: 'var(--accent)',
        secondary_bg1: 'var(--secondary-bg1)',
        secondary_bg2: 'var(--secondary-bg2)',
        secondary_bg2_50: 'var(--secondary-bg2_50)',
        foreground_tint: 'var(--foreground-tint)',
        foreground_tint_30: 'var(--foreground-tint_30)',
        accent_tint: 'var(--accent-tint)',
        accent_tint_20: 'var(--accent-tint_20)',
        // ShadCN config untouched
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        input: 'hsl(var(--input))',
        ring: 'var(--ring)',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      screens: {
        md: '768px',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
