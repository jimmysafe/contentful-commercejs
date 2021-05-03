import { FieldExtensionSDK } from '@contentful/app-sdk';
import { Button, Modal, Paragraph } from '@contentful/forma-36-react-components';
import { useEffect, useState } from 'react';
//@ts-ignore
import Commerce from '@chec/commerce.js';
import { Product } from '../CommerceJS/types/product';
import ProductCard from '../CommerceJS/ProductCard';

interface FieldProps {
	sdk: FieldExtensionSDK;
}

const Field = ({ sdk }: FieldProps) => {
	const currentValue = sdk.field.getValue() ?? [];

	const [commerce, _] = useState<any>(
		//@ts-ignore
		new Commerce(sdk.parameters.installation.apikey)
	);
	const [isShown, setShown] = useState<boolean>(false);
	const [products, setProducts] = useState<any[]>([]);
	const [addedProducts, setAddedProducts] = useState<Product[]>(currentValue);

	useEffect(() => sdk.window.updateHeight(500), []);

	// FETCH PRODUCTS FROM COMMERCEJS IF MODAL IS OPEN
	useEffect(() => {
		if (isShown) {
			(async () => {
				try {
					const { data } = await commerce.products.list();
					setProducts(data);
				} catch (err) {
					console.log(err);
				}
			})();
		}
	}, [isShown]);

	// UPDATES CONTENTFUL PRODUCTS WHENEVER WE ADD A PRODUCT
	sdk.field.onValueChanged((value) => {
		if (value) {
			if (value.length !== addedProducts.length) {
				setAddedProducts(value);
			}
		}
	});

	const addProduct = (product: Product) => {
		sdk.field.setValue(currentValue.concat([product]));
		setShown(false);
	};

	const removeProduct = (prodToRemove: Product) => {
		sdk.field.setValue(currentValue.filter((prod: Product) => prod.id !== prodToRemove.id));
	};

	//@ts-ignore
	if (!sdk.parameters.installation.apikey) {
		<Paragraph>Invalid CommerceJS Api Key</Paragraph>;
	}

	return (
		<>
			<Button onClick={() => setShown(true)}>Add Product</Button>
			{addedProducts.map((product: Product) => (
				<ProductCard
					key={product.id}
					product={product}
					deleteFunction={() => removeProduct(product)}
				/>
			))}

			<Modal title='Centered modal' isShown={isShown} onClose={() => console.log('closed')}>
				{() => (
					<>
						<Modal.Header title='Title' />
						<Modal.Content>
							{products.map((product: Product) => (
								<ProductCard
									key={product.id}
									product={product}
									onClick={() => addProduct(product)}
								/>
							))}
						</Modal.Content>
						<Modal.Controls>
							<Button buttonType='muted' onClick={() => setShown(false)}>
								Close
							</Button>
						</Modal.Controls>
					</>
				)}
			</Modal>
		</>
	);
};

export default Field;
