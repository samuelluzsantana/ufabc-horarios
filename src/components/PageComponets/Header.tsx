import { ReactNode, useState } from "react";
import { Divider } from "@nextui-org/react";
// commons
import Logo from "../Commons/Logo";


interface HeaderProps {
  isLogoHover?: boolean;
  children?: ReactNode;
}

export default function Header({ isLogoHover, children }: HeaderProps) {
  const [isHover, setIsHover] = useState(false);

  return (
    <>
      <header>
        <div className="header w-full h-[4em] bg-inherit flex items-center justify-between px-4">
          <Logo isHover={isLogoHover} />
          {children}
        </div>
        <Divider className="mb-4" />
      </header>
    </>
  );
}
