"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import bwhLogo from "../images/BWH logo.svg";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const components: { title: string; href: string; description: string }[] = [
    {
        title: "Level 1",
        href: "/map",
        description: "Level 1 map of hospital.",
    },
    {
        title: "Level 2",
        href: "/map",
        description: "Level 2 map of hospital.",
    },
];

export default function NavMenu() {
    return (
        <NavigationMenu className="flex bg-secondary w-full top-bar fixed">
            <NavigationMenuList className="w-screen">
                <NavigationMenuLink>
                    <Link to="/welcome">
                        <div className="logo rounded hover:bg-gray-200">
                            <img
                                src={bwhLogo}
                                alt="BWH logo"
                                style={{ height: "50px" }}
                            />
                        </div>
                    </Link>
                </NavigationMenuLink>
                <NavigationMenuItem className="rounded hover:bg-gray-200">
                    <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                    >
                        <Link
                            to="/login"
                            className="text-black hover:text-black"
                        >
                            Log-in
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem className="rounded hover:bg-gray-200">
                    <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                    >
                        <Link
                            to="/flower-service"
                            className="text-black hover:text-black"
                        >
                            Flower Service Request
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem className="rounded hover:bg-gray-200">
                    <NavigationMenuTrigger className="rounded text-black hover:text-black focus:text-black active:text-black">
                        Maps
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="rounded-md grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                            {components.map((component) => (
                                <ListItem
                                    className="text-black hover:text-black hover:bg-gray-200 rounded"
                                    key={component.title}
                                    title={component.title}
                                    href={component.href}
                                >
                                    {component.description}
                                </ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className,
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">
                        {title}
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    );
});
ListItem.displayName = "ListItem";
