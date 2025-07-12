import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import MobileNav from './mobileNav'
import { SignedIn, SignIn, UserButton } from '@clerk/nextjs'

const Navbar = () => {
  return (
    <nav className='flex flex-between fixed z-50 w-full bg-dark-1 px-6 py-3 
    lg:px-10'>
      <Link 
      href={"/"}
      className='flex items-center gap-1'>
        <Image
        src="/icons/logo.svg"
        height={32}
        width={32}
        alt='vibe'
        className='max-sm:size-7'
        />
        <p className='text-[26px] font-extrabold max-sm:text-[15px] text-white'>Vibe</p>

      </Link>
      <div className='flex-between gap-5'>
       <SignedIn>
        <UserButton/>
       </SignedIn>
      
        <MobileNav />

      </div>

    </nav>
  )
}

export default Navbar