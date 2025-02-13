"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/providers/language-provider";
import { ImagePlus, Loader2, Plus } from "lucide-react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { BackgroundSettingsModal } from "./background-settings-modal";
import type { BackgroundSettings, BackgroundTheme } from "@/types/settings";

const themes: BackgroundTheme[] = [
  {
    id: "1",
    url: "/themes/theme1.png",
    alt: "Coffee beans on dark background",
  },
  {
    id: "2",
    url: "/themes/theme2.png",
    alt: "Restaurant interior",
  },
  {
    id: "3",
    url: "/themes/theme3.png",
    alt: "Food presentation",
  },
  {
    id: "4",
    url: "/themes/theme4.png",
    alt: "Culinary art",
  },
];

export default function ThemeSelector() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [settings, setSettings] = useState<BackgroundSettings>({
    textColor: "white",
    opacity: 50,
    selectedTheme: themes[0].id,
  });
  const [isUploading, setIsUploading] = useState(false);
  const [customThemes, setCustomThemes] = useState<{ id: string; url: string }[]>([]);

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setIsUploading(true);
      try {
        // Here you would typically upload to your server/cloud storage
        const formData = new FormData();
        formData.append("file", file);
        
        // Simulating upload delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // For demo, we're using local URL
        const imageUrl = URL.createObjectURL(file);
        const newCustomTheme = { id: `custom-${Date.now()}`, url: imageUrl };
        setCustomThemes(prev => [...prev.slice(0, 1), newCustomTheme]);
        setSettings(prev => ({ ...prev, selectedTheme: newCustomTheme.id }));
        
        toast({
          title: t("Theme uploaded successfully"),
          description: t("Your custom theme has been applied to the menu"),
        });
      } catch (error) {
        toast({
          title: t("Upload failed"),
          description: t("Please try again"),
          variant: "destructive",
        });
      } finally {
        setIsUploading(false);
      }
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 1,
    multiple: false
  });

  const handleSaveSettings = (newSettings: BackgroundSettings) => {
    setSettings(newSettings);
    toast({
      title: t("Theme settings updated"),
      description: t("Your menu background settings have been saved"),
    });
  };

  return (
    <>
      <Card>
        <CardHeader className="p-4 pb-0">
          <CardTitle className="text-xl">{t("Menu Background Theme")}</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 mb-4">
            {themes.map((theme) => (
              <div
                key={theme.id}
                className={`aspect-video rounded-lg overflow-hidden cursor-pointer transition-all ${
                  settings.selectedTheme === theme.id
                    ? "ring-2 ring-primary"
                    : "hover:ring-2 hover:ring-primary/50"
                }`}
                onClick={() => {
                  setSettings(prev => ({ ...prev, selectedTheme: theme.id }));
                  toast({
                    title: t("Theme selected"),
                    description: t("Your menu background has been updated"),
                  });
                }}
              >
                <img
                  src={theme.url}
                  alt={theme.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Custom Theme Section */}
          <div className="mt-4">
            <h3 className="text-sm font-medium mb-2">{t("Custom Themes")}</h3>
            <div className="grid grid-cols-2 gap-4">
              {[...Array(2)].map((_, index) => {
                const customTheme = customThemes[index];
                return (
                  <div
                    key={index}
                    {...(customTheme ? {} : getRootProps())}
                    className={`
                      aspect-video rounded-lg overflow-hidden cursor-pointer transition-all
                      ${customTheme ? '' : 'border-2 border-dashed'}
                      ${settings.selectedTheme === customTheme?.id ? "ring-2 ring-primary" : "hover:ring-2 hover:ring-primary/50"}
                      ${isUploading ? "opacity-50" : ""}
                    `}
                  >
                    {customTheme ? (
                      <div 
                        className="relative w-full h-full"
                        onClick={() => {
                          setSettings(prev => ({ ...prev, selectedTheme: customTheme.id }));
                          toast({
                            title: t("Custom theme selected"),
                            description: t("Your menu background has been updated"),
                          });
                        }}
                      >
                        <img
                          src={customTheme.url}
                          alt="Custom theme"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity">
                          <p className="text-white text-sm">{t("Click to select or drag new image")}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-50">
                        {isUploading ? (
                          <Loader2 className="h-6 w-6 animate-spin text-primary" />
                        ) : (
                          <div className="text-center">
                            <Plus className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                            <p className="text-sm text-gray-600">
                              {t("Add custom theme")}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                    {!customTheme && <input {...getInputProps()} />}
                  </div>
                );
              })}
            </div>
          </div>

          <Button
            variant="link"
            className="mt-4 text-primary"
            onClick={() => setIsModalOpen(true)}
          >
            {t("Background settings")}
          </Button>
        </CardContent>
      </Card>

      <BackgroundSettingsModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        initialSettings={settings}
        onSave={handleSaveSettings}
        themes={themes}
      />
    </>
  );
}