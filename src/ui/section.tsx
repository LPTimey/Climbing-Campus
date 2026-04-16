import type React from "react";
import "./section.css";
import MaxWWrapper from "../components/max-w-wrapper";

export default function Section({
  children,
  className,
  id,
  width = "content",
}: {
  children?: React.ReactNode;
  id?: string;
  width?: "full" | "content" | "text";
  className?: "string";
}) {
  let content = (
    <section id={id} className={className}>
      {children}
    </section>
  );
  let wrapper = (
    <MaxWWrapper asChild center {...(width==="text" && {small:true})}>
      {content}
    </MaxWWrapper>
  );
  return width ? wrapper : content;
}
