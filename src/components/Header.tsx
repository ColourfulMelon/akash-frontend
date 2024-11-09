import {ThemeToggle} from "@/components/ThemeToggle";
import logoCircle from "@/assets/logo_circle.png";
import Image from "next/image";

export default function Header(){

    return (
        <header className="flex items-center justify-between p-4 w-full text-white px-10">
            <div className="flex items-center gap-4">
                <Image src={logoCircle} alt="Logo" width={70} />
                <h1 className="text-3xl font-poppins font-thin">Alchemist</h1>
            </div>

            {/*<ThemeToggle/>*/}
        </header>
    )
}