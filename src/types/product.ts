// -------------------------------------------- PRODUCT --------------------------------------------

export interface Price {
	raw: number;
	formatted: string;
	formatted_with_symbol: string;
	formatted_with_code: string;
}

export interface Inventory {
	managed: boolean;
	available: number;
}

export interface Media {
	type: string;
	source: string;
}

export interface Seo {
	title: string;
	description: string;
}

export interface Conditionals {
	is_active: boolean;
	is_free: boolean;
	is_tax_exempt: boolean;
	is_pay_what_you_want: boolean;
	is_inventory_managed: boolean;
	is_sold_out: boolean;
	has_digital_delivery: boolean;
	has_physical_delivery: boolean;
	has_images: boolean;
	has_video: boolean;
	has_rich_embed: boolean;
	collects_fullname: boolean;
	collects_shipping_address: boolean;
	collects_billing_address: boolean;
	collects_extrafields: boolean;
}

export interface Is {
	active: boolean;
	free: boolean;
	tax_exempt: boolean;
	pay_what_you_want: boolean;
	inventory_managed: boolean;
	sold_out: boolean;
}

export interface Has {
	digital_delivery: boolean;
	physical_delivery: boolean;
	images: boolean;
	video: boolean;
	rich_embed: boolean;
}

export interface Collects {
	fullname: boolean;
	shipping_address: boolean;
	billing_address: boolean;
	extrafields: boolean;
}

export interface CheckoutUrl {
	checkout: string;
	display: string;
}

export interface Category {
	id: string;
	slug: string;
	name: string;
}

export interface ImageDimensions {
	width: number;
	height: number;
}

export interface Asset {
	id: string;
	url: string;
	is_image: boolean;
	filename: string;
	file_size: number;
	file_extension: string;
	image_dimensions: ImageDimensions;
	meta: any[];
	created_at: number;
	updated_at: number;
}

export interface Product {
	id: string;
	created: number;
	updated: number;
	active: boolean;
	permalink: string;
	name: string;
	description: string;
	price: Price;
	inventory: Inventory;
	media: Media;
	sku: string;
	sort_order: number;
	seo: Seo;
	thank_you_url?: any;
	meta?: any;
	conditionals: Conditionals;
	is: Is;
	has: Has;
	collects: Collects;
	checkout_url: CheckoutUrl;
	extrafields: any[];
	variant_groups: any[];
	categories: Category[];
	assets: Asset[];
	related_products: any[];
}

export type Links = {};

export type Pagination = {
	total: number;
	count: number;
	per_page: number;
	current_page: number;
	total_pages: number;
	links: Links;
};

export type Meta = {
	pagination: Pagination;
};

export type ProductQuery = {
	data: Product[];
	meta: Meta;
};
