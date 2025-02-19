"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/providers/language-provider"
import { QRCodeCanvas } from "qrcode.react"
import { Button } from "../ui/button"
import { Download, Share2 } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { useEffect } from "react"

interface QRCodeSectionProps {
  restaurantId: string
}

export function QRCodeSection({ restaurantId }: QRCodeSectionProps) {
  const { t } = useLanguage()

  // Debug log to check restaurantId
  useEffect(() => {
    console.log('Restaurant ID in QR Section:', restaurantId);
  }, [restaurantId]);

  // Get the menu URL with Vercel deployment support
  const getMenuUrl = () => {
    if (!restaurantId || restaurantId === 'undefined' || restaurantId === 'null') {
      console.error('Invalid restaurant ID:', restaurantId);
      return '';
    }

    // For local development or custom domain
    const baseUrl = window.location.origin;
    const url = `${baseUrl}/menu/${restaurantId}`;
    console.log('Generated Menu URL:', url);
    return url;
  };

  const menuUrl = getMenuUrl();

  // Don't render if no valid restaurant ID
  if (!restaurantId || restaurantId === 'undefined' || restaurantId === 'null') {
    console.error('QR Code Section: Invalid restaurant ID:', restaurantId);
    return (
      <Card>
        <CardHeader>
          <CardTitle>{t("Menu QR Code")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            {t("Restaurant ID is required to generate QR code")}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("Menu QR Code")}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        {menuUrl && (
          <>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <QRCodeCanvas
                id="menu-qr-code"
                value={menuUrl}
                size={200}
                level="H"
                includeMargin={true}
              />
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Button onClick={handleDownloadQR} variant="outline">
                <Download className="mr-2 h-4 w-4" />
                {t("Download QR Code")}
              </Button>
              <Button onClick={handleShare} variant="outline">
                <Share2 className="mr-2 h-4 w-4" />
                {t("Share Menu")}
              </Button>
            </div>
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                {t("Scan this QR code to view the restaurant menu")}
              </p>
              <p className="text-xs text-muted-foreground break-all">
                {menuUrl}
              </p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );

  function handleDownloadQR() {
    const canvas = document.getElementById("menu-qr-code") as HTMLCanvasElement
    if (canvas) {
      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream")
      const downloadLink = document.createElement("a")
      downloadLink.href = pngUrl
      downloadLink.download = `restaurant-menu-qr.png`
      document.body.appendChild(downloadLink)
      downloadLink.click()
      document.body.removeChild(downloadLink)
      
      toast({
        title: t("QR Code Downloaded"),
        description: t("The QR code has been downloaded successfully."),
      })
    }
  }

  async function handleShare() {
    if (!menuUrl) return;

    try {
      if (navigator.share) {
        await navigator.share({
          title: t("Restaurant Menu"),
          text: t("Check out our menu!"),
          url: menuUrl,
        });
      } else {
        await navigator.clipboard.writeText(menuUrl);
        toast({
          title: t("Link Copied"),
          description: t("Menu link has been copied to clipboard."),
        });
      }
    } catch (error) {
      console.error('Error sharing:', error);
      toast({
        title: t("Error"),
        description: t("Failed to share menu link. Please try again."),
        variant: "destructive",
      });
    }
  }
}



