'use client';
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react';
import {Button} from '@/components/ui/button';
import Logo from '../../public/logo.png'
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuTrigger,
    NavigationMenuContent,
    NavigationMenuLink,
    navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';
import { signIn } from 'next-auth/react';
import { cn } from '@/lib/utils';

const components = [
    {
        title: 'Progress',
        href: '#',
        description: 'Progress bar',
    },
    {
        title: 'Tabs',
        href: '#',
        description: 'Tabs',
    }
]

const Header = () => {
    const [path, setPath] = useState('#products');

    return (
        <header className="p-4 flex justify-center items-center">
            <Link href={'/'} className='w-full flex gap-2 justify-left items-center'>
                <Image src={Logo} alt="logo" width={25} height={25}  />
                <span className='font-semibold dark:text-white'>taskr.</span>
            </Link>
            <NavigationMenu className="hidden md:block">
                <NavigationMenuList className="gap-6">
                    <NavigationMenuItem>
                        <NavigationMenuTrigger
                        onClick={() => setPath('#resources')} className={cn({
                            'dark:text-white' : path === '#resources',
                            'dark:text-white/40' : path!== '#resources',
                            'font-normal': true,
                            'text-xl': true,
                        })}>
                            Resources
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid
                gap-3
                p-6
                md:w-[400px]
                ld:w-[500px]
                lg:grid-cols-[.75fr_1fr]">
                                <li className='row-span-3'>
                                    <span className='flex h-full w-full select-none flex-col
                  justify-end
                  rounded-md
                  bg-gradient-to-b
                  from-muted/50
                  to-muted
                  p-6 no-underline
                  outline-none
                  focus:shadow-md  '>
                                        Welcome
                                    </span>
                                </li>
                                <ListItem href="#" title="Introduction">
                                    Re-usable components build using Radix UI and TailwindCSS
                                </ListItem>
                                <ListItem href="#" title="Installation">
                                    How to install dependencies and structure your project
                                </ListItem>
                                <ListItem href="#" title="Typography">
                                    Styles for heading, paragraphs, lists, and buttons etc...
                                </ListItem>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
    <NavigationMenuTrigger
    onClick={() => setPath('#pricing')} className={cn({
        'dark:text-white' : path === '#pricing',
        'dark:text-white/40' : path!== '#pricing',
        'font-normal': true,
        'text-xl': true,
    })}>
        Pricing
    </NavigationMenuTrigger>
    <NavigationMenuContent>
        <ul className="grid w-[400px] gap-3 p-4  md:grid-row-2">
            <ListItem href={"#"} title={"Pro plan"}>
                Full collaboration plan
            </ListItem>
            <ListItem href={"#"} title={"Free plan"}>
                Great for debuting
            </ListItem>
        </ul>
    </NavigationMenuContent>
</NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuContent>
                            <ul className='grid w-[400px]
              gap-3
              p-4
              md:w-[500px]
              md:grid-cols-2 
              lg:w-[600px]'>
                {components.map((item) => (
                    <ListItem key={item.title} href={item.href} title={item.title}>
                        {item.description}
                    </ListItem>
                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), {
                            'dark:text-white' : path === '#testimonials',
                            'dark:text-white/40' : path!== '#testimonials',
                            'font-normal': true,
                            'text-xl': true,
                        })}>
                            Testimonials
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            <aside className='flex w-full gap-2 justify-end'>
                <Link href={'/dasboard'}>
                    <Button onClick={() => signIn(undefined, { callbackUrl: '/dashboard'})} variant='btn-secondary' className="p-1 hidden sm:block">Login</Button>
                </Link>
                <Link href={'/register'}>
                    <Button variant='btn-primary' className="whitespace-nowrap">Register</Button>
                </Link>
            </aside>
        </header>
    )
};

export default Header;


const ListItem = React.forwardRef(({ className, title, children,...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a ref={ref} className={cn("group block select-none space-y-1 font-medium leading-none")} {...props}>
                    <div className="dark:text-white text-sm font-medium leading-none">{title}</div>
                    <p className="group-hover:text-white/70 line-clamp-2 text-sm leading-snug dark:text-white/40">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
});

ListItem.displayName = 'ListItem';
