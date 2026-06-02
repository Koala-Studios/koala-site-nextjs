import Link from "next/link";
import type {
  ButtonHTMLAttributes,
  ComponentPropsWithoutRef,
  ReactNode,
} from "react";

import { ArrowIcon } from "./ArrowIcon";
import styles from "./Cta.module.css";

type CtaVariant =
  | "transparent"
  | "outlined"
  | "outlinedPanel"
  | "overlay"
  | "full"
  | "text";
type CtaSize = "small" | "medium" | "large";
type CtaShape = "pill" | "box";
type CtaIcon = "none" | "inline" | "circle";
type CtaIconPosition = "left" | "right";

type CtaBaseProps = {
  arrowDirection?: "left" | "right";
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
  icon?: CtaIcon;
  iconPosition?: CtaIconPosition;
  shape?: CtaShape;
  size?: CtaSize;
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
  full: styles.variantFull,
  outlined: styles.variantOutlined,
  outlinedPanel: styles.variantOutlinedPanel,
  overlay: styles.variantOverlay,
  text: styles.variantText,
  transparent: styles.variantTransparent,
};

const sizeClasses: Record<CtaSize, string> = {
  large: styles.sizeLarge,
  medium: styles.sizeMedium,
  small: styles.sizeSmall,
};

const shapeClasses: Record<CtaShape, string> = {
  box: styles.shapeBox,
  pill: styles.shapePill,
};

function getClassName({
  className,
  fullWidth,
  icon,
  iconPosition,
  shape,
  size,
  variant,
}: Required<
  Pick<
    CtaBaseProps,
    "fullWidth" | "icon" | "iconPosition" | "shape" | "size" | "variant"
  >
> &
  Pick<CtaBaseProps, "className">) {
  return [
    styles.cta,
    variantClasses[variant],
    sizeClasses[size],
    shapeClasses[shape],
    icon === "circle" ? styles.hasCircle : "",
    icon === "circle" && iconPosition === "left" ? styles.hasCircleLeft : "",
    icon === "circle" && iconPosition === "right" ? styles.hasCircleRight : "",
    fullWidth ? styles.fullWidth : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

function renderIcon({
  arrowDirection,
  icon,
  iconPosition,
}: Required<Pick<CtaBaseProps, "arrowDirection" | "icon" | "iconPosition">>) {
  if (icon === "none") {
    return null;
  }

  return (
    <span
      className={[
        styles.icon,
        icon === "circle" ? styles.iconCircle : styles.iconInline,
        iconPosition === "left" ? styles.iconLeft : "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-hidden="true"
    >
      <ArrowIcon direction={arrowDirection} />
    </span>
  );
}

function renderContent({
  arrowDirection,
  children,
  icon,
  iconPosition,
}: Required<
  Pick<CtaBaseProps, "arrowDirection" | "children" | "icon" | "iconPosition">
>) {
  const iconElement = renderIcon({ arrowDirection, icon, iconPosition });

  if (iconPosition === "left") {
    return (
      <>
        {iconElement}
        <span className={styles.label}>{children}</span>
      </>
    );
  }

  return (
    <>
      <span className={styles.label}>{children}</span>
      {iconElement}
    </>
  );
}

function getPassthroughProps(props: CtaProps) {
  const passthroughProps = { ...props } as Record<string, unknown>;

  delete passthroughProps.arrowDirection;
  delete passthroughProps.children;
  delete passthroughProps.className;
  delete passthroughProps.fullWidth;
  delete passthroughProps.icon;
  delete passthroughProps.iconPosition;
  delete passthroughProps.shape;
  delete passthroughProps.size;
  delete passthroughProps.variant;

  return passthroughProps;
}

export function Cta(props: CtaProps) {
  const {
    arrowDirection = "right",
    children,
    className,
    fullWidth = false,
    icon = "inline",
    iconPosition = "right",
    shape = "pill",
    size = "medium",
    variant = "outlined",
  } = props;

  const ctaClassName = getClassName({
    className,
    fullWidth,
    icon,
    iconPosition,
    shape,
    size,
    variant,
  });
  const content = renderContent({
    arrowDirection,
    children,
    icon,
    iconPosition,
  });

  if ("href" in props && props.href !== undefined) {
    const linkProps = getPassthroughProps(
      props
    ) as ComponentPropsWithoutRef<typeof Link>;

    return (
      <Link className={ctaClassName} {...linkProps}>
        {content}
      </Link>
    );
  }

  const buttonProps = getPassthroughProps(
    props
  ) as ButtonHTMLAttributes<HTMLButtonElement>;

  return (
    <button className={ctaClassName} {...buttonProps}>
      {content}
    </button>
  );
}
