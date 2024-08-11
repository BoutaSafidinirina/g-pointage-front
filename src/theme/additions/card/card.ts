import { mode } from '@chakra-ui/theme-tools';
const Card = {
	baseStyle: (props: any) => ({
		p: '20px',
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		position: 'relative',
		borderRadius: '20px',
		minWidth: '0px',
		wordWrap: 'break-word',
		bg: mode('#ffffff', '#ffffff')(props),
		backgroundClip: 'border-box',
		boxShadow:'0px 8px 16px rgba(0, 0, 0, 0.2)'
	})
};

export const CardComponent = {
	components: {
		Card
	}
};
