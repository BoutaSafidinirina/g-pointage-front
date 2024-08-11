import { mode } from '@chakra-ui/theme-tools';
export const badgeStyles = {
	components: {
		Badge: {
			baseStyle: {
				borderRadius: '10px',
				lineHeight: '100%',
				padding: '7px',
				paddingLeft: '12px',
				paddingRight: '12px'
			},
			variants: {
				outline: () => ({
					borderRadius: '16px'
				}),
				brand: (props: any) => ({
					bg: mode('brand.600', 'brand.600')(props),
					color: 'navy.800',
					_focus: {
						bg: mode('brand.600', 'brand.600')(props)
					},
					_active: {
						bg: mode('brand.600', 'brand.600')(props)
					},
					_hover: {
						bg: mode('brand.700', 'brand.700')(props)
					}
				})
			}
		}
	}
};
