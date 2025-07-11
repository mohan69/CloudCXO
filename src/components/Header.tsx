import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "@/context/AuthContext.tsx";
import logo from "@/assets/logo.svg";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";

const solutions: { title: string; href: string; description: string }[] = [
  {
    title: "Fractional CXO",
    href: "/cxos/cfo", // Example link, can be any role
    description:
      "Embed top-tier executive talent into your team on a part-time basis.",
  },
  {
    title: "CXO on Demand",
    href: "/request-cxo",
    description:
      "Access specialized C-level expertise for specific projects or challenges.",
  },
  {
    title: "Interim CXO",
    href: "/request-cxo",
    description:
      "Fill critical leadership gaps quickly with experienced executives.",
  },
];

const howItWorks: { title: string; href: string; description: string }[] = [
  {
    title: "For Businesses",
    href: "/how-it-works",
    description:
      "Learn how to find and onboard the perfect executive for your needs.",
  },
  {
    title: "For Executives",
    href: "/register",
    description:
      "Discover the benefits of joining our elite network of fractional leaders.",
  },
];

const Header = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link to="/" className="mr-6 flex items-center">
            <img src={logo} alt="CloudCXO" className="h-8 w-auto" />
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                      {solutions.map((component) => (
                        <ListItem
                          key={component.title}
                          title={component.title}
                          to={component.href}
                        >
                          {component.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>How it works</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                      {howItWorks.map((component) => (
                        <ListItem
                          key={component.title}
                          title={component.title}
                          to={component.href}
                        >
                          {component.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavLink to="/leadership" className={navigationMenuTriggerStyle()}>
                    Leadership
                  </NavLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          {isAuthenticated ? (
            <Button onClick={logout}>Logout</Button>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link to="/register">Register</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link> & { title: string }
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default Header;