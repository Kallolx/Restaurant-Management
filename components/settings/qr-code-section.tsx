"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/providers/language-provider"
import { QRCodeCanvas } from "qrcode.react"
import { Button } from "../ui/button"
import { Download } from "lucide-react"

interface QRCodeSectionProps {
  restaurantId: string
}

export function QRCodeSection({ restaurantId }: QRCodeSectionProps) {
  const { t } = useLanguage()
  const menuUrl = `https://hungryhub-tau.vercel.app/menu/${restaurantId}`

  const handleDownloadQR = () => {
    const canvas = document.getElementById("menu-qr-code") as HTMLCanvasElement
    if (canvas) {
      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream")
      const downloadLink = document.createElement("a")
      downloadLink.href = pngUrl
      downloadLink.download = "restaurant-menu-qr.png"
      document.body.appendChild(downloadLink)
      downloadLink.click()
      document.body.removeChild(downloadLink)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("Menu QR Code")}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <div className="bg-white p-4 rounded-lg">
          <QRCodeCanvas
            id="menu-qr-code"
            value={menuUrl}
            size={200}
            level="H"
            includeMargin={true}
          />
        </div>
        <Button onClick={handleDownloadQR} className="w-full sm:w-auto">
          <Download className="mr-2 h-4 w-4" />
          {t("Download QR Code")}
        </Button>
        <p className="text-sm text-muted-foreground text-center">
          {t("Scan this QR code to view the restaurant menu")}
        </p>
      </CardContent>
    </Card>
  )
}



