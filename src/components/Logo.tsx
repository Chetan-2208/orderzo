"use client";

interface LogoProps {
  size?: number
  variant?: 'mark' | 'lockup'
  color?: 'brand' | 'white' | 'ink'
  className?: string
}

export default function Logo({ size = 40, variant = 'mark', color = 'brand', className = '' }: LogoProps) {
  const src = `/brand/svg/orderzo-${variant}-${color}.svg`
  
  return (
    <img
      src={src}
      alt="Orderzo"
      className={className}
      style={{ height: size, width: 'auto' }}
    />
  )
}
