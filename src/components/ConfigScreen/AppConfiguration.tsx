import { AppExtensionSDK } from '@contentful/app-sdk';
import { Card, Paragraph, Form, TextField, HelpText } from '@contentful/forma-36-react-components';
import { FC, useEffect, useState } from 'react';

interface ConfigProps {
	sdk: AppExtensionSDK;
}

interface ApiCheck {
	success: boolean;
	message: string;
}

const AppConfiguration: FC<ConfigProps> = ({ sdk }) => {
	const [apikey, setApikey] = useState<string>('');
	const [apiCheck, setApiCheck] = useState<ApiCheck | null>(null);

	// IF EXISTING/SAVED API KEY THEN POPULATE INPUT FIELD ON LOAD
	useEffect(() => {
		(async () => {
			const params = await sdk.app.getParameters();
			//@ts-expect-error
			if (params && params.apikey) {
				//@ts-expect-error
				setApikey(params.apikey);
			}
		})();
	}, []);

	// CHECK IF APIKEY IS VALID
	useEffect(() => {
		(async () => {
			const res = await fetch('https://api.chec.io/v1/merchants/', {
				method: 'GET',
				headers: {
					'X-Authorization': apikey,
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			});
			const data = await res.json();
			if (data.error) {
				setApiCheck({ success: false, message: data.error.message });
			} else {
				setApiCheck({ success: true, message: 'Valid CommerceJS API key' });
			}
		})();
	}, [apikey]);

	// WHEN YOU CLICK THE SAVE BUTTON
	sdk.app.onConfigure(() => {
		return {
			parameters: {
				apikey,
			},
		};
	});

	return (
		<Card padding='default' style={{ maxWidth: '38em', margin: '3em auto' }}>
			<Paragraph>
				CommerceJS app enables developers and content creators to easily add a custom product list.
			</Paragraph>
			<Form>
				<Paragraph>Save your CommerceJS Public API key below:</Paragraph>
				<TextField
					labelText='API KEY'
					name='api_key'
					value={apikey}
					id='api_key'
					//@ts-expect-error
					onChange={(e) => setApikey(e.target.value)}
					required
				/>
				{apiCheck && (
					<HelpText style={{ color: apiCheck.success ? 'green' : 'red' }}>
						{apiCheck.message}
					</HelpText>
				)}
			</Form>
		</Card>
	);
};

export default AppConfiguration;
