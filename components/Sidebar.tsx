"use client"

import { sidebarLinks } from '@/constant'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Sidebar = () => {
    const pathname=usePathname();
  return (
    <section className='sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-dark-1 pd-6 
    pt-28 text-white max-sm:hidden lg:w-[264px]'>
        <div className='flex flex-1 flex-col gap-6'>
            {sidebarLinks.map((link)=>{
                 const isActive=pathname === link.route|| pathname.startsWith(`${link.route}/`)

                 return(
                   <Link
                   href={link.route}
                   key={link.label}
                   className={cn("flex gap-4 items-center p-4 rounded-lg justify-start",{
                    'bg-blue-600':isActive,                   }
                    
                   )}
                   >
                    <Image
                    src={link.imgUrl}
                    alt={link.label}
                    width={24}
                    height={24}
                    />
                    <p className='text-lg font-semibold max-lg:hidden'></p>

                      {link.label}

                   </Link>
                 )
            })}
            

            
        </div>
    
    
    </section>
  )
}

export default Sidebar