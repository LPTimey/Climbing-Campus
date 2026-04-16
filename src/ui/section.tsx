import type React from "react";
import "./section.css";
import MaxWWrapper from "../components/max-w-wrapper";

export default function Section({
  children,
  className,
  id,
  width,
}: {
  children?: React.ReactNode;
  id?: string;
  width?: { center?: boolean };
  className?: "string";
}) {
  let content = (
    <section id={id} className={className}>
      {children}
    </section>
  );
  let wrapper = <MaxWWrapper asChild {...width}>{content}</MaxWWrapper>;
  return width ? wrapper : content;
}
