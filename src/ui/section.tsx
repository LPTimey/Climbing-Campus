import type React from "react";
import "./section.css";
import MaxWWrapper from "../components/max-w-wrapper";

export default function Section({
  children,
  className,
  id,
  width = "content",
  paddingBlock = false,
}: {
  children?: React.ReactNode;
  id?: string;
  width?: "full" | "content" | "text";
  className?: "string";
  paddingBlock?: boolean | string;
}) {
  let content = (
    <section
      id={id}
      className={className}
      {...(paddingBlock === true && { "data-padding": true })}
      {...(typeof paddingBlock === "string" && {style:{paddingBlock}})}
    >
      {children}
    </section>
  );
  let wrapper = (
    <MaxWWrapper asChild center {...(width === "text" && { small: true })}>
      {content}
    </MaxWWrapper>
  );
  return width === "full" ? content : wrapper;
}
