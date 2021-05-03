import { Card, Flex, Typography, Paragraph, Button } from '@contentful/forma-36-react-components';
import { FC } from 'react';
import { Product } from './types/product';

interface ProductCardProps {
	product: Product;
	deleteFunction?: () => void;
	onClick?: () => void;
}

const ProductCard: FC<ProductCardProps> = ({ product, deleteFunction, onClick }) => {
	return (
		<Card title='Title' style={{ margin: '1rem 0' }} onClick={onClick}>
			<Flex>
				<Flex>
					<div
						style={{
							backgroundImage: `url('${product.media.source}')`,
							backgroundSize: 'cover',
							backgroundPosition: 'center',
							width: 70,
							height: 70,
						}}
					/>
				</Flex>
				<Flex flexGrow={1} marginLeft='spacingS'>
					<Typography>
						<Paragraph>{product.name}</Paragraph>
					</Typography>
				</Flex>
				{deleteFunction && (
					<Flex alignSelf='center'>
						<Button buttonType='negative' onClick={deleteFunction}>
							X
						</Button>
					</Flex>
				)}
			</Flex>
		</Card>
	);
};

export default ProductCard;
