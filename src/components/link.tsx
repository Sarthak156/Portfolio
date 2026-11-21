import * as React from "react";

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
}

/**
 * Minimal client-side router link (replaces TanStack Router's <Link />).
 * Pages live under "#/..." hashes, which keeps plain "#chapter" fragment
 * anchors free for in-page chapter navigation.
 */
export function Link({ to, children, ...props }: LinkProps) {
  return (
    <a href={`#${to}`} {...props}>
      {children}
    </a>
  );
}
