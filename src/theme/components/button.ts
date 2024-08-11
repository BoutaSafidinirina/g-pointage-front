import { mode } from '@chakra-ui/theme-tools';
export const buttonStyles = {
	components: {
		Button: {
			baseStyle: {
				borderRadius: '16px',
				boxShadow: '45px 76px 113px 7px rgba(112, 144, 176, 0.08)',
				transition: '.25s all ease',
				boxSizing: 'border-box',
				_focus: {
					boxShadow: 'none'
				},
				_active: {
					boxShadow: 'none'
				}
			},
			variants: {
				outline: () => ({
					borderRadius: '16px'
				}),
				brand: (props: any) => ({
					bg: mode('brand.600', 'brand.600')(props),
					color: 'brand.500',
					_focus: {
						bg: mode('brand.600', 'brand.600')(props)
					},
					_active: {
						bg: mode('brand.600', 'brand.600')(props)
					},
					_hover: {
						bg: mode('brand.500', 'brand.500')(props)
					}
				}),
				darkBrand: (props: any) => ({
					bg: mode('brand.900', 'brand.900')(props),
					color: 'navy.800',
					_focus: {
						bg: mode('brand.900', 'brand.900')(props)
					},
					_active: {
						bg: mode('brand.900', 'brand.900')(props)
					},
					_hover: {
						bg: mode('brand.800', 'brand.800')(props)
					}
				}),
				lightBrand: (props: any) => ({
					bg: mode('whiteAlpha.100', 'whiteAlpha.100')(props),
					color: mode('brand.500', 'brand.500')(props),
					_focus: {
						bg: mode('whiteAlpha.100', 'whiteAlpha.100')(props)
					},
					_active: {
						bg: mode('whiteAlpha.100', 'whiteAlpha.100')(props)
					},
					_hover: {
						bg: mode('whiteAlpha.200', 'whiteAlpha.200')(props)
					}
				}),
				primaryButton: (props: any) => ({
					bg: mode('whiteAlpha.100', 'whiteAlpha.100')(props),
					color: mode('secondaryGray.900', 'secondaryGray.900')(props),
					_focus: {
						bg: mode('whiteAlpha.100', 'whiteAlpha.100')(props)
					},
					_active: {
						bg: mode('whiteAlpha.100', 'whiteAlpha.100')(props)
					},
					_hover: {
						bg: mode('whiteAlpha.200', 'whiteAlpha.200')(props)
					}
				}),
				light: (props: any) => ({
					bg: mode('whiteAlpha.100', 'whiteAlpha.100')(props),
					color: mode('secondaryGray.900', 'secondaryGray.900')(props),
					_focus: {
						bg: mode('whiteAlpha.100', 'whiteAlpha.100')(props)
					},
					_active: {
						bg: mode('whiteAlpha.100', 'whiteAlpha.100')(props)
					},
					_hover: {
						bg: mode('whiteAlpha.200', 'whiteAlpha.200')(props)
					}
				}),
				action: (props: any) => ({
					fontWeight: '500',
					borderRadius: '50px',
					bg: mode('brand.400', 'brand.400')(props),
					color: mode('secondaryGray.900', 'secondaryGray.900')(props),
					_focus: {
						bg: mode('brand.400', 'brand.400')(props)
					},
					_active: { bg: mode('brand.400', 'brand.400')(props) },
					_hover: {
						bg: mode('brand.400', 'brand.400')(props)
					}
				}),
				setup: (props: any) => ({
					fontWeight: '500',
					borderRadius: '50px',
					bg: mode('secondaryGray.500', 'secondaryGray.500')(props),
					border: mode('1px solid', '0px solid')(props),
					borderColor: mode('transparent', 'transparent')(props),
					color: mode('white', 'white')(props),
					_focus: {
						bg: mode('secondaryGray.400', 'secondaryGray.400')(props)
					},
					_active: { bg: mode('secondaryGray.400', 'secondaryGray.400')(props) },
					_hover: {
						bg: mode('secondaryGray.400', 'secondaryGray.400')(props)
					}
				})
			}
		}
	}
};
