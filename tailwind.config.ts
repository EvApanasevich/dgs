import type { Config } from 'tailwindcss'

const config: Config = {
   content: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
   ],
   theme: {
      extend: {
         backgroundImage: {
            'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
            'gradient-conic':
               'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
         },
      },
      screens: {
         'xl': { 'max': '1023px' },
         'lg820': { 'max': '820px' },
         'lg': { 'max': '767px' },
         'md': { 'max': '639px' },
         'sm': { 'max': '480px' },
      },
      container: {
         padding: {
            DEFAULT: '1.5rem',
            sm: '2rem',
            lg: '2rem',
            xl: '2rem',
         },
      },
   },
   plugins: [],
}
export default config
