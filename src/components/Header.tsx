import {ThemeToggle} from "@/components/ThemeToggle";

export default function Header(){

    return (
        <header className="flex items-center justify-between p-4 w-full">
            <h1 className="text-2xl">My App</h1>

            <ThemeToggle/>
        </header>
    )
}