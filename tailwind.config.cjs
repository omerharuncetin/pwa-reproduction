/* jshint esversion: 9 */

const { spacing, fontFamily } = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

function withOpacityValue(variable) {
	return ({ opacityValue }) => {
		if (opacityValue === undefined) {
			return `rgb(var(${variable}))`;
		}
		return `rgb(var(${variable}) / ${opacityValue})`;
	};
}

const config = {
	mode: 'jit',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		extend: {
			animation: {
				'spin-slow': 'spin 20s linear infinite',
			},
			screens: {
				'large-plus': '1166px',
				'medium-plus': '812px',
			},
			width: {
				'100px': '100px',
				'11.5/12': '97.78%',
			},
			borderWidth: {
				3: '3px',
			},
			margin: {
				30: '7.5rem',
			},
			borderRadius: {
				thin: '4px',
				normal: '9px',
				large: '18px',
				'5xl': '36px'
			},
			spacing: {
				'4.5': '22px',
				15: '60px',
				19: '5.2rem',
				26: '6.5rem',
			},
			boxShadow: {
				"normal": "0px 15px 30px 0px rgba(0, 0, 0, 0.15);"
			},
			colors: {
				// v2 colors
				primary: '#FF4000',
				'primary-object-dark': '#DADEE5',
				'layer1-dark': '#0D0D12',
				'layer2-dark': '#12131A',
				'layer2-border-dark': '#1A1C26',
				'disabled-dark': '#525966',
				'disabled-bg-dark': '#1B1D24',
				'bg-hover-dark': '#292B33',
				'tertiary-object-dark': '#B8BDCC',
				'primary-object': '#3D3F4D',
				'secondary-object': '#666D80',
				'secondary-object-dark': '#B8BDCC',
				'tertiary-object': '#7A8398',
				'bg-pressed': '#DFE1E7',
				'bg-pressed-dark': '#383B4D',
				disabled: '#A4ACB9',
				'disabled-bg': '#F8FAFB',
				layer1: '#F6F8FA',
				layer2: '#FFFFFF',
				'layer2-border': '#EEF0F2',
				'bg-hover': '#ECEFF3',
				'secondary-red': '#DF1C41',
				'form-button-stroke': 'rgba(255, 255, 255, 0.12)',
				'form-button-stroke-dark': 'rgba(255, 255, 255, 0.12)',
				'form-button-stroke-gray-10': 'rgba(223, 225, 231, 0.10)',
				'form-button-stroke-gray': 'rgba(223, 225, 231, 0.50)',
				'form-button-stroke-gray-dark': 'rgba(255, 255, 255, 0.12)',
				'secondary-green': '#37D362',
				'secondary-purple': '#B252FD',
				'secondary-yellow': '#F5BD25',
				'box-bg': '#FBFDFF',
				'box-bg-dark': '#12121A',
				"mobile-menu-dark": "rgba(18, 19, 26, 0.90)",
				"mobile-menu": "rgba(255, 255, 255, 0.90)",
				"modal-bg": "rgba(246, 248, 250, 0.80)",
				"modal-bg-dark": "rgba(13, 13, 18, 0.80)",
				// v1 colors
				'light-blue-opaque': '#DCF3FE',
				'dark-blue-opaque': '#79C0E1',
				secondary: withOpacityValue('--color-secondary'),
				'light-blue': '#49EAFA',
				'dark-external': '#4B4B4B',
				'dark-mode': 'rgb(40 40 40)',
				'dark-list-even': '#2D2D2D',
				'dark-bg': 'rgb(23 23 23)',
				'dark-bg-lighter': '#1B1B1B',
				'light-bg': 'rgb(248 250 252)',
				'light-bg-darker': 'rgb(241 245 249)',
				'dark-text': '#DADADA',
				'sky-950': '#082F49',
				'light-gray': '#DDDDDD',
				'light-text': '#4A4A4A',
				'light-text-title': 'rgb(15 23 42)',
				'icon-gray': '#484848',
				'dark-blue': '#17426D',
				'dark-text-light': '#7E7E7E',
				'dark-text-title': '#ececec',
				'dark-border': '#464646',
				'dark-hover-border': colors.slate[700],
				'dark-border-lighter': colors.slate[500],
				'dark-hover-bg': colors.slate[700],
				'dark-feed-item-hover': colors.slate[800],
				'dark-button-text': colors.slate[50],
				'dark-button-bg': colors.slate[600],
				'dark-button-border': colors.slate[800],
				'dark-button-hover-border': colors.slate[900],
				'dark-button-hover-text': colors.slate[100],
				'dark-input-bg': '#2d2d2d',
				'dark-input-bg-lighter': colors.slate[600],
				'dark-input-border': colors.slate[600],
				'dark-input-text': colors.slate[100],
			},
			fontSize: {
				'3xl': '1.875rem',
				'4xl': '2.25rem',
			},
			fontFamily: {
				sans: ['Inter', ...fontFamily.sans],
				display: ['Inter', ...fontFamily.sans],
				body: ['Inter', ...fontFamily.sans],
			},
			typography: (theme) => ({
				DEFAULT: {
					css: {
						color: theme('colors.gray.700'),
						a: {
							color: theme('colors.blue.500'),
							'&:hover': {
								color: theme('colors.blue.700'),
							},
							code: { color: theme('colors.blue.400') },
						},
						'h2,h3,h4': {
							'scroll-margin-top': spacing[32],
						},
						code: { color: theme('colors.pink.500') },
						'blockquote p:first-of-type::before': false,
						'blockquote p:last-of-type::after': false,
					},
				},
				dark: {
					css: {
						color: theme('colors.gray.300'),
						a: {
							color: theme('colors.blue.400'),
							'&:hover': {
								color: theme('colors.blue.600'),
							},
							code: { color: theme('colors.blue.400') },
						},
						blockquote: {
							borderLeftColor: theme('colors.gray.700'),
							color: theme('colors.gray.300'),
						},
						'h2,h3,h4': {
							color: theme('colors.gray.100'),
							'scroll-margin-top': spacing[32],
						},
						hr: { borderColor: theme('colors.gray.700') },
						ol: {
							li: {
								'&:before': { color: theme('colors.gray.500') },
							},
						},
						ul: {
							li: {
								'&:before': { backgroundColor: theme('colors.gray.500') },
							},
						},
						strong: { color: theme('colors.gray.300') },
						thead: {
							color: theme('colors.gray.100'),
						},
						tbody: {
							tr: {
								borderBottomColor: theme('colors.gray.700'),
							},
						},
					},
				},
			}),
		},
	},
	variants: {
		typography: ['dark'],
		extend: {
			listStyleType: ['hover', 'focus'],
			listStylePosition: ['hover', 'focus'],
		},
	},
	plugins: [require('@tailwindcss/typography')],
};

module.exports = config;
