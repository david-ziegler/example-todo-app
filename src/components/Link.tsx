import { PropsWithChildren } from "react";

type Props = {
  onClick: () => void;
};

export function Link({ children, onClick }: PropsWithChildren<Props>) {
  return (
    <span
      className="text-muted-foreground cursor-pointer hover:underline hover:text-primary"
      onClick={onClick}
    >
      {children}
    </span>
  );
}
