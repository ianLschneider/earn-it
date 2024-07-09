import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMediaQuery } from '../utils/useMediaQuery'
import { Link } from 'react-router-dom'
import EarnItLogo from '../assets/earn-it-logo.svg'


// framer variants
// nav variant
const navMotion = {
    // initial state - hidden
    hidden: {
      x: '100%',
      opacity: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.15,
        ease: 'easeOut',
      },
    },
    // active state - visible
    visible: {
      x: 10,
      opacity: 1,
      transition: {
        duration: 0.35,
        when: 'withChildren',
        staggerChildren: 0.15,
        ease: 'easeOut',
      },
    },
    // exit state - exit
    exit: {
      x: '100%',
      opacity: 0,
      transition: {
        duration: 0.35,
        when: 'withChildren',
        staggerChildren: 0,
        staggerDirection: -1,
        ease: 'easeIn',
      },
    },
  }
  
  // nav item variant
  const navItemMotion = {
    // initial state - hidden
    hidden: {
      opacity: 0,
      x: 100,
      transition: {
        duration: 0.35,
        ease: 'easeIn',
      },
    },
    // active state - visible
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.35,
        ease: 'easeInOut',
      },
    },
    // exit state - exit
    exit: {
      opacity: 0,
      x: 50,
      transition: {
        duration: 0.1
      },
    },
}


const Nav = () => {
    const isDesktop: boolean = useMediaQuery('(min-width: 1024px)')
    // hamburger menu toggle state
    const [toggled, setToggled] = useState<boolean>(false)
    // state for background change on scroll
    
    const [scrollBackground, setScrollBackground] = useState<boolean>(false)

    // change background function
    const changeBackground = () => {
        if (window.scrollY > 50) {
        setScrollBackground(true)
        } else {
        setScrollBackground(false)
        }
    }
    
    // useEffect for preventing scroll when nav is toggled
    useEffect(() => {
        if (toggled) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }
    }, [toggled])

    // event listener for scroll
    window.addEventListener('scroll', changeBackground)

    const navHeight: number = !isDesktop ? 90 : 130

    return (
        <nav 
            className={`bg-white h-[102px] w-[100%] relative top-0 left-0 z-10 flex items-center justify-between p-4 font-medium transition ease-in-out duration-200 ${
                scrollBackground ? 'border-b' : 'border-b'
            }`}
        >
            {/* navbar if desktop */}
            {isDesktop && (
                    <>
                        <Link to='/' className='cursor-pointer'>
                            <div className='flex items-center justify-center'>
                                <h1><img src={EarnItLogo} alt='EarnIt Rewards Chart' className='w-[70px]' /></h1>
                            </div>
                        </Link>
                        <div className='flex items-center gap-4 text-sm'>
                            <Link
                            to='/profiles/'
                            className='cursor-pointer text-base hover:text-secondary transition duration-200'
                            >
                            Profiles
                            </Link>
                            <Link to='/rewards/'
                             className='bg-primary text-white hover:bg-secondary px-6 py-2.5 transition duration-200 uppercase font-semibold rounded-full cursor-pointer '>
                                Rewards
                            </Link>
                        </div>
                    </>
                )
            }

            {/* navbar for tablet and below */}
            {/* hamburger icon */}
            {!isDesktop && (
                    <div className='flex items-center justify-between w-full'>
                        <Link
                            to='/'
                            className='cursor-pointer'
                            onClick={() => setToggled(false)}
                        >
                            <div className='flex items-center justify-center'>
                                <h1><img src={EarnItLogo} alt='EarnIt Logo' className='w-[70px]' /></h1>
                            </div>
                        </Link>
                        <div
                            onClick={() => setToggled(prevToggled => !prevToggled)}
                            className='space-y-1 cursor-pointer z-50'
                        >
                            <motion.span
                            animate={{ rotateZ: toggled ? 45 : 0, y: toggled ? 8 : 0 }}
                            className='block h-1 w-8 bg-primary rounded'
                            ></motion.span>
                            <motion.span
                            animate={{ scale: toggled ? 0 : 1 }}
                            className='block h-1 w-8 bg-primary rounded'
                            ></motion.span>
                            <motion.span
                            animate={{
                                rotateZ: toggled ? -45 : 0,
                                y: toggled ? -8 : 0,
                            }}
                            className='block h-1 w-8 bg-primary rounded'
                            ></motion.span>
                        </div>
                    </div>
                )
            }
            <AnimatePresence>
                {/* nav container */}
                {toggled && !isDesktop && (
                    <motion.div
                    variants={navMotion}
                    initial='hidden'
                    animate='visible'
                    exit='exit'
                    className='fixed top-[102px] left-4 w-[100%] h-screen flex items-center justify-center z-10 bg-white border-l'
                    >
                        {/* nav links container */}
                        <div className='flex flex-col items-center justify-center gap-12 h-full'>
                            <motion.div variants={navItemMotion}>
                            <Link
                                to='/profiles/'
                                className='cursor-pointer text-2xl sm:text-4xl'
                                onClick={() => setToggled(false)}
                            >
                                Profiles
                            </Link>
                            </motion.div>
                            <motion.div variants={navItemMotion}>
                            <Link to='/rewards/' onClick={() => setToggled(false)} className='bg-primary rounded-full cursor-pointer text-white hover:text-secondary px-8 py-2.5 sm:px-10 transition duration-200 text-2xl sm:text-4xl uppercase font-semibold'>
                                Rewards
                            </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}

export default Nav