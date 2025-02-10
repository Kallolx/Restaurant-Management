"use client"

import { useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Printer } from 'lucide-react'
import { QRCodeSVG } from "qrcode.react"

export default function QrCodeSection() {
  const qrRef = useRef<HTMLDivElement>(null)
  const qrValue = "https://example.com/restaurant-menu"

  const handleDownload = () => {
    if (qrRef.current) {
      const canvas = document.createElement("canvas")
      const svg = qrRef.current.querySelector("svg")
      const svgData = new XMLSerializer().serializeToString(svg!)
      const img = new Image()
      
      img.onload = () => {
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext("2d")!
        ctx.fillStyle = "white"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, 0, 0)
        
        const link = document.createElement("a")
        link.download = "qr-code.png"
        link.href = canvas.toDataURL("image/png")
        link.click()
      }
      
      img.src = "data:image/svg+xml;base64," + btoa(svgData)
    }
  }

  const handlePrint = () => {
    const printWindow = window.open("", "", "width=600,height=600")
    if (printWindow) {
      const svg = qrRef.current?.querySelector("svg")
      if (svg) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Print QR Code</title>
              <style>
                body { margin: 0; display: flex; justify-content: center; align-items: center; height: 100vh; }
                svg { max-width: 100%; height: auto; }
              </style>
            </head>
            <body>
              ${svg.outerHTML}
              <script>
                window.onload = () => {
                  window.print();
                  window.close();
                }
              </script>
            </body>
          </html>
        `)
        printWindow.document.close()
      }
    }
  }

  return (
    <Card className="bg-gradient-to-br from-blue-600 to-purple-600 text-white">
      <CardContent className="p-6">
        <div className="flex flex-col items-center justify-center">
          <div className="bg-white p-4 rounded-lg mb-4" ref={qrRef}>
            <QRCodeSVG value={qrValue} size={200} />
          </div>
          <div className="flex gap-4">
            <Button
              variant="secondary"
              className="flex items-center gap-2"
              onClick={handleDownload}
            >
              <Download className="w-4 h-4" />
              Download
            </Button>
            <Button
              variant="secondary"
              className="flex items-center gap-2"
              onClick={handlePrint}
            >
              <Printer className="w-4 h-4" />
              Print
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

