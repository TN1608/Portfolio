import { Linkedin, User } from "lucide-react"
import Link from "next/link"
import { FaFacebook, FaGithub } from "react-icons/fa"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function AboutMeButton() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className="cursor-pointer text-sm sm:text-base" variant="default">
                    <User className="mr-2 h-4 w-4" /> More About Me
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>About Me</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Link
                        href="https://www.linkedin.com/in/tuấn-nguyễn-đình-70a790359"
                        className="w-full flex items-center"
                        target="_blank"
                    >
                        <Linkedin className="mr-2 h-4 w-4 text-blue-600" />
                        LinkedIn
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link
                        href="https://www.facebook.com/TuanNguyen160804/"
                        className="w-full flex items-center"
                        target="_blank"
                    >
                        <FaFacebook className="mr-2 h-4 w-4 text-blue-500" />
                        Facebook
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link
                        href="https://github.com/TN1608"
                        className="w-full flex items-center"
                        target="_blank"
                    >
                        <FaGithub className="mr-2 h-4 w-4 text-black dark:text-white" />
                        Github
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
