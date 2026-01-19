"use client"

export function NeonText({ children, className = '' }) {
    return (
        <span className={`text-gray-800 ${className}`}>
            {children}
        </span>
    )
}
