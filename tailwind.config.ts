import type { Config } from 'tailwindcss';

const config = {
    darkMode: ['class'],
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
    ],
    prefix: '',
    theme: {
    	container: {
    		center: true,
    		padding: '2rem',
    		screens: {
    			'2xl': '1400px'
    		}
    	},
    	fontFamily: {
    		poppins: ['Poppins', 'sans-serif'],
    		SFPro: ['SF Pro Display', 'sans-serif']
    	},
    	extend: {
    		backgroundImage: {
    			'radial-gradient': 'radial-gradient(circle at bottom right, var(--tw-gradient-stops))'
    		},
    		boxShadow: {
    			'red-glow': '0 4px 100px rgba(255, 0, 0, 0.6)'
    		},
    		colors: {
    			'bg-gradient-start': 'hsl(var(--bg-gradient-start) / <alpha-value>)',
    			'bg-gradient-end': 'hsl(var(--bg-gradient-end) / <alpha-value>)',
    			border: 'hsl(var(--border) / <alpha-value>)',
    			input: 'hsl(var(--input) / <alpha-value>)',
    			ring: 'hsl(var(--ring) / <alpha-value>)',
    			background: 'hsl(var(--background) / <alpha-value>)',
    			foreground: 'hsl(var(--foreground) / <alpha-value>)',
    			primary: {
    				DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
    				foreground: 'hsl(var(--primary-foreground) / <alpha-value>)'
    			},
    			secondary: {
    				DEFAULT: 'hsl(var(--secondary) / <alpha-value>)',
    				foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
    				foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
    				foreground: 'hsl(var(--muted-foreground) / <alpha-value>)'
    			},
    			accent: {
    				DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
    				foreground: 'hsl(var(--accent-foreground) / <alpha-value>)'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover) / <alpha-value>)',
    				foreground: 'hsl(var(--popover-foreground) / <alpha-value>)'
    			},
    			card: {
    				DEFAULT: 'hsl(var(--card) / <alpha-value>)',
    				foreground: 'hsl(var(--card-foreground) / <alpha-value>)'
    			},
    			sidebar: {
    				DEFAULT: 'hsl(var(--sidebar-background) / <alpha-value>)',
    				foreground: 'hsl(var(--sidebar-foreground) / <alpha-value>)',
    				primary: 'hsl(var(--sidebar-primary) / <alpha-value>)',
    				'primary-foreground': 'hsl(var(--sidebar-primary-foreground) / <alpha-value>)',
    				accent: 'hsl(var(--sidebar-accent) / <alpha-value>)',
    				'accent-foreground': 'hsl(var(--sidebar-accent-foreground) / <alpha-value>)',
    				border: 'hsl(var(--sidebar-border) / <alpha-value>)',
    				ring: 'hsl(var(--sidebar-ring) / <alpha-value>)'
    			}
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
    		keyframes: {
    			fadeOut: {
    				'0%': {
    					opacity: '1'
    				},
    				'100%': {
    					opacity: '0'
    				}
    			},
    			'accordion-down': {
    				from: {
    					height: '0'
    				},
    				to: {
    					height: 'var(--radix-accordion-content-height)'
    				}
    			},
    			'accordion-up': {
    				from: {
    					height: 'var(--radix-accordion-content-height)'
    				},
    				to: {
    					height: '0'
    				}
    			},
    			glow: {
    				'0%, 100%': {
    					boxShadow: '0 0 5px hsl(var(--primary))'
    				},
    				'50%': {
    					boxShadow: '0 0 5px hsl(var(--primary) / 0)'
    				}
    			},
    			moveToBottom: {
    				'0%': {
    					transform: 'translateY(0)'
    				},
    				'100%': {
    					transform: 'translateY(22vh)'
    				}
    			},
    			fadeIn: {
    				'0%': {
    					opacity: '0',
    					transform: 'scale(0.95)'
    				},
    				'100%': {
    					opacity: '1',
    					transform: 'scale(1)'
    				}
    			}
    		},
    		animation: {
    			'accordion-down': 'accordion-down 0.2s ease-out',
    			'accordion-up': 'accordion-up 0.2s ease-out',
    			glow: 'glow 10s infinite',
    			fadeOut: 'fadeOut 3s 2s forwards',
    			moveToBottom: 'moveToBottom 1s forwards',
    			fadeIn: 'fadeIn 1s ease-out forwards'
    		}
    	}
    },
    plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;