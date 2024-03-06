import { Button, Divider } from "@nextui-org/react";
import { SearchNormal as ISearch } from "iconsax-react";
import { FaStarOfLife as IStarlogo } from "react-icons/fa";

export default function Header() {
  return (
    <>
      <header>
        <div className="header w-full h-[4em] bg-inherit flex items-center justify-between px-4">
        <IStarlogo
            size={30}
            className="star-logo transition-colors duration-300 hover:text-[#00007c]"
          />
          <Button
            className="search-dicipline-button hover:bg-[#00007c] hover:text-white"
            startContent={<ISearch variant="Bold" size={15} />}
            radius="sm"
          >
            Selecionar Disciplinas
          </Button>
        </div>
        <Divider className="mb-4" />
      </header>
    </>
  );
}
