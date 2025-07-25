"use client"

import React from 'react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription, 
    SheetHeader,     
    SheetTitle,       
    SheetTrigger,
} from "@/components/ui/sheet"
import Image from 'next/image'
import Link from 'next/link'
import { sidebarLinks } from '@/constant'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

const MobileNav = () => {
    const pathname = usePathname()
    return (
        <section className='w-full max-w-[264px]'>
            <Sheet>
                <SheetTrigger asChild>
                    <Image
                        src={"/icons/hamburger.svg"}
                        width={26}
                        height={26}
                        alt='hamburger'
                        className='cursor-pointer sm:hidden '
                    />
                </SheetTrigger>
                <SheetContent side={'left'} className='border-none bg-dark-1'>
                    <Link
                        href={"/"}
                        className='flex items-center gap-1'>
                        <Image
                            src="/icons/logo.svg"
                            height={32}
                            width={32}
                            alt='vibe'
                            className='max-sm:size-10'
                        />
                        <p className='text-white flex text-semibold'>Vibe</p>
                       
                    </Link>

                    {/*
                      ******************************************************
                      THIS IS THE CRUCIAL PART TO ADD FOR ACCESSIBILITY:
                      ******************************************************
                    */}
                    <SheetHeader>
                        <SheetTitle className='text-white'></SheetTitle> {/* Accessible Title */}
                       
                    </SheetHeader>
                    {/*
                      ******************************************************
                      END OF CRUCIAL PART
                      ******************************************************
                    */}

                    <div className='flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto'>
                        <SheetClose asChild>
                            <section className='flex h-full flex-col gap-6 pt-16 text-white '>
                                {sidebarLinks.map((link) => {
                                    const isActive = pathname === link.route || pathname.startsWith(`${link.route}/`)

                                    return (
                                        <SheetClose asChild key={link.route}>
                                            <Link
                                                href={link.route}
                                                key={link.label}
                                                className={cn("flex gap-4 items-center p-4 rounded-lg w-full max-w-60", {
                                                    'bg-blue-600': isActive,
                                                })}
                                            >
                                                <Image
                                                    src={link.imgUrl}
                                                    alt={link.label}
                                                    width={20}
                                                    height={20}
                                                />
                                                <p className='font-semibold'>{link.label}</p> {/* Make sure link.label is rendered */}
                                            </Link>
                                        </SheetClose>
                                    )
                                })}
                            </section>
                        </SheetClose>
                    </div>
                </SheetContent>
            </Sheet>
        </section>
    )
}

export default MobileNav;