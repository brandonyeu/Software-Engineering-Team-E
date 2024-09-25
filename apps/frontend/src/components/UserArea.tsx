import { useAuth0 } from "@auth0/auth0-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogIn, LogOut, Settings, User } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function UserArea() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const { isAuthenticated, loginWithPopup, logout } = useAuth0();

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        setIsOpen(false);
    }, [isAuthenticated]);

    const handleLogin = () => {
        loginWithPopup();
    };

    const handleLogout = () => {
        logout();
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={() => setIsOpen(!isOpen)}>
                <Button
                    className={`fixed top-0 right-0 mt-2 mr-2 z-50 text-foreground dark:border-2 dark:border-border ${isAuthenticated ? " w-10 h-10 rounded-full" : "hover:bg-accent"}`}
                >
                    {isAuthenticated ? (
                        <Avatar>
                            <AvatarImage
                                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                                alt="user avatar"
                            />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    ) : (
                        "Log-in"
                    )}
                </Button>
            </DropdownMenuTrigger>
            {isOpen &&
                (isAuthenticated ? (
                    <DropdownMenuContent
                        side="right"
                        className="w-56 mt-2 z-50 dark:bg-primary-element"
                    >
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem className={"dark:hover:text-background"}>
                                <User className="mr-2 h-4 w-4" />
                                <Link to="/dashboard">Dashboard</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className={"dark:hover:text-background"}>
                                <Settings className="mr-2 h-4 w-4" />
                                <Link to="/settings">Settings</Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={handleLogout}
                                className="hover:bg-destructive dark:hover:text-background"
                            >
                                <LogOut className="mr-2 h-4 w-4" />
                                <span className="hover:underline">Log out</span>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                ) : (
                    <DropdownMenuContent side="right" className="w-56 z-50">
                        <DropdownMenuLabel>Log In</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem onClick={handleLogin}>
                                <LogIn className="mr-2 h-4 w-4" />
                                <span className="hover:underline">Log-in</span>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                ))}
        </DropdownMenu>
    );
}
