import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

type VariantKey =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "h7"
  | "h8"
  | "s1"
  | "s2"
  | "s3"
  | "s4"
  | "s5"
  | "s6"
  | "s7"
  | "s8"
  | "p1"
  | "p2"
  | "p3"
  | "p4"
  | "p5"
  | "p6"
  | "p7"
  | "p8"
  | "p9";

const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: "scroll-m-20 text-[2rem] lg:text-[4rem] font-[700] leading-normal tracking-[0.08rem]",
      h2: "scroll-m-20 text-[1.875rem] lg:text-[3rem] font-[700] leading-normal tracking-[0.06rem]",
      h3: "scroll-m-10 text-[1.5rem] lg:text-[2.25rem] font-[700] leading-normal tracking-[0.045rem]",
      h4: "scroll-m-10 text-[1.25rem] lg:text-[2rem] font-[700] leading-normal tracking-[0.04rem]",
      h5: "text-[1rem] lg:text-[1.25rem] font-[700] leading-normal tracking-[0.025rem]",
      h6: "text-[0.875rem] lg:text-[1rem] font-[700] leading-normal tracking-[0.02rem]",
      h7: "text-[0.75rem] lg:text-[0.875rem] font-[700] leading-normal tracking-[0.0175rem]",
      h8: "text-[0.625rem] lg:text-[0.75rem] font-[700] leading-normal tracking-[0.015rem]",
      s1: "scroll-m-10 text-[2rem] lg:text-[4rem] font-[500] leading-normal tracking-[0.08rem]",
      s2: "scroll-m-10 text-[1.875rem] lg:text-[3rem] font-[500] leading-normal tracking-[0.06rem]",
      s3: "scroll-m-5 text-[1.5rem] lg:text-[2.25rem] font-[500] leading-normal tracking-[0.045rem]",
      s4: "scroll-m-5 text-[1.25rem] lg:text-[2rem] font-[500] leading-normal tracking-[0.04rem]",
      s5: "text-[1rem] lg:text-[1.25rem] font-[500] leading-normal tracking-[0.025rem]",
      s6: "text-[0.875rem] lg:text-[1rem] font-[500] leading-normal tracking-[0.02rem]",
      s7: "text-[0.75rem] lg:text-[0.875rem] font-[500] leading-normal tracking-[0.0175rem]",
      s8: "text-[0.625rem] lg:text-[0.75rem] font-[500] leading-normal tracking-[0.015rem]",
      p1: "scroll-m-10 text-[1.5rem] lg:text-[2.25rem] font-[400] leading-normal tracking-[0.045rem]",
      p2: "scroll-m-10 text-[1.25rem] lg:text-[2rem] font-[400] leading-normal tracking-[0.04rem]",
      p3: "text-[1rem] lg:text-[1.25rem] font-[400] leading-normal tracking-[0.025rem]",
      p4: "text-[0.875rem] lg:text-[1rem] font-[400] leading-normal tracking-[0.02rem]",
      p5: "text-[0.75rem] lg:text-[0.875rem] font-[400] leading-normal tracking-[0.0175rem]",
      p6: "text-[0.625rem] lg:text-[0.75rem] font-[400] leading-normal tracking-[0.015rem]",
      p7: "text-[0.5rem] lg:text-[0.625rem] font-[400] leading-normal tracking-[0.0125rem]",
      p8: "text-[0.375rem] lg:text-[0.5rem] font-[400] leading-normal tracking-[0.01rem]",
      p9: "text-[8px] lg:text-[14px] font-[400] leading-normal tracking-[0.01rem]",
    },
  },
});

const variantToTag: Record<VariantKey, string> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  h7: "h6",
  h8: "h6",
  s1: "h2",
  s2: "h3",
  s3: "h4",
  s4: "h5",
  s5: "h6",
  s6: "h6",
  s7: "h6",
  s8: "h6",
  p1: "p",
  p2: "p",
  p3: "p",
  p4: "p",
  p5: "p",
  p6: "p",
  p7: "p",
  p8: "p",
  p9: "p",
};

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: VariantKey;
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
  disableSelect?: boolean;
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  (
    {
      variant = "p5",
      children,
      className,
      asChild = false,
      disableSelect = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : variantToTag[variant];

    return (
      <Comp
        className={cn(
          typographyVariants({ variant, className }),
          disableSelect ? "select-none" : ""
        )}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

Typography.displayName = "Typography";

export { Typography };
