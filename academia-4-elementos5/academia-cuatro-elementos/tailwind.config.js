/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: '#2B5D3A',
					foreground: 'hsl(var(--primary-foreground))',
				},
				secondary: {
					DEFAULT: '#4A90E2',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				accent: {
					DEFAULT: '#F5A623',
					foreground: 'hsl(var(--accent-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: 0 },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: 0 },
				},
				'float-air': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-6px)' },
				},
				'ripple-water': {
					'0%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.08)' },
					'100%': { transform: 'scale(1)' },
				},
				'flare-fire': {
					'0%, 100%': { transform: 'scale(1)', filter: 'drop-shadow(0 0 0px rgba(251, 146, 60, 0.6))' },
					'50%': { transform: 'scale(1.14)', filter: 'drop-shadow(0 0 10px rgba(251, 146, 60, 0.9))' },
				},
				'rumble-earth': {
					'0%, 100%': { transform: 'translate(0, 0)' },
					'25%': { transform: 'translate(1px, 0)' },
					'75%': { transform: 'translate(-1px, 0)' },
				},
				'pulse-time': {
					'0%, 100%': { opacity: '0.75' },
					'50%': { opacity: '1' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float-air': 'float-air 2.8s ease-in-out infinite',
				'ripple-water': 'ripple-water 1.8s ease-in-out infinite',
				'flare-fire': 'flare-fire 1.1s ease-in-out infinite',
				'rumble-earth': 'rumble-earth 0.6s ease-in-out infinite',
				'pulse-time': 'pulse-time 2s ease-in-out infinite',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
}
