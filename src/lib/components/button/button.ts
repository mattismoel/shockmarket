import type { HTMLAnchorAttributes, HTMLButtonAttributes } from "svelte/elements";

type LinkProps = HTMLAnchorAttributes & {
	href: string;
};

type NormalProps = HTMLButtonAttributes & {
	href?: never;
};

export type ButtonProps = LinkProps | NormalProps;
