"use client"
import { useRef, useEffect } from "react"

export default function MeshBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    let t = 0
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = "rgba(22, 55, 100, 0.05)"

      for (let x = 0; x < canvas.width; x += 30) {
        for (let y = 0; y < canvas.height; y += 30) {
          const dx = Math.sin((x + t) * 0.01) * 20
          const dy = Math.cos((y + t) * 0.01) * 20
          ctx.fillRect(x + dx, y + dy, 2, 2)
        }
      }
      t += 1
      requestAnimationFrame(animate)
    }
    animate()

    return () => window.removeEventListener("resize", resize)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
    />
  )
}
