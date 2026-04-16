import "./max-w-wrapper.css";
import { cloneElement, isValidElement } from "react";
import type { ReactElement, HTMLAttributes } from "react";

type Props = {
  children?: React.ReactNode;
  center?: boolean;
  asChild?: boolean;
  small?: boolean;
};

export default function MaxWWrapper({
  children,
  center = false,
  asChild = false,
  small = false,
}: Props) {
  if (asChild && isValidElement(children)) {
    const child = children as ReactElement<HTMLAttributes<HTMLElement>>;

    return cloneElement(child, {
      className: `content-width ${child.props.className ?? ""}`,
      ...(center && { "data-center": true }),
      ...(small && { "data-small": true }),
    });
  }

  return (
    <div
      className="content-width"
      {...(center && { "data-center": true })}
      {...(small && { "data-small": true })}
    >
      {children}
    </div>
  );
}
