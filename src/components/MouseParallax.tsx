import { motion, useAnimation } from 'framer-motion'
import { FC, ReactNode, useEffect } from 'react'

interface MouseParallaxInterface {
  children: ReactNode
  className?: string
}

export const MouseParallax: FC<MouseParallaxInterface> = ({ children, className }) => {
  const imgAnimation = useAnimation()

  const handleMouseMove = (e: MouseEvent): void => {
    const moveX = e.clientX - window.innerWidth / 2
    const moveY = e.clientY - window.innerHeight / 2
    const offsetFactor = 15
    imgAnimation.start({
      x: moveX / offsetFactor,
      y: moveY / offsetFactor,
    })
  }

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div className={className}>
      <motion.div animate={imgAnimation}>{children}</motion.div>
    </div>
  )
}
