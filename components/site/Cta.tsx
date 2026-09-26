import Link from "next/link";
import type {
  ButtonHTMLAttributes,
  ComponentPropsWithoutRef,
  ReactNode,
} from "react";

import { ArrowIcon } from "./ArrowIcon";

type CtaVariant = "primary" | "ghost" | "light" | "text";

type CtaBaseProps = {
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
  /** Arrow glyph after the label; text links use a diagonal arrow. */
  arrow?: boolean;
  variant?: CtaVariant;
};

type CtaLinkProps = CtaBaseProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, keyof CtaBaseProps | "className">;

type CtaButtonProps = CtaBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CtaBaseProps | "className"> & {
    href?: never;
  };

type CtaProps = CtaLinkProps | CtaButtonProps;

const variantClasses: Record<CtaVariant, string> = {
  primary: "ks-btn",
  ghost: "ks-btn ks-btn--ghost",
  light: "ks-btn ks-btn--light",
  text: "ks-tlink",
};

/**
 * The one action component: a square forest-ink block with a sliding arrow,
 * an outlined or light variant, or an italic serif text link.
 */
export function Cta(props: CtaProps) {
  const {
    arrow = true,
    children,
    className,
    fullWidth = false,
    variant = "primary",
    ...rest
  } = props;

  const classes = [
    variantClasses[variant],
    fullWidth && variant !== "text" ? "ks-btn--full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      <span>{children}</span>
      {arrow ? (
        variant === "text" ? (
          <span aria-hidden="true">↗</span>
        ) : (
          <ArrowIcon className="ks-btn__arrow" />
        )
      ) : null}
    </>
  );

  if ("href" in rest && rest.href !== undefined) {
    return (
      <Link className={classes} {...(rest as ComponentPropsWithoutRef<typeof Link>)}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  );
}
