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
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { apiClient } from "@/services/apiClient";
import { useQuery, useMutation } from "@tanstack/react-query";

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
  const [showPreviewDialog, setShowPreviewDialog] = useState(false);
  const [settings, setSettings] = useState<BackgroundSettings>({
    textColor: "white",
    opacity: 50,
    selectedTheme: themes[0].id,
  });
  const [isUploading, setIsUploading] = useState(false);
  const [customThemes, setCustomThemes] = useState<{ id: string; url: string }[]>([]);

  // Fetch current settings
  const { data: currentSettings } = useQuery({
    queryKey: ['restaurant-settings'],
    queryFn: async () => {
      const response = await apiClient.get('/restaurants/settings/');
      return response.data;
    }
  });

  // Update settings mutation
  const updateSettings = useMutation({
    mutationFn: async (newSettings: BackgroundSettings) => {
      const response = await apiClient.put('/restaurants/settings/', {
        background_settings: newSettings
      });
      return response.data;
    },
    onSuccess: () => {
      toast({
        title: t("Settings updated"),
        description: t("Your menu background settings have been saved"),
      });
    },
    onError: () => {
      toast({
        title: t("Update failed"),
        description: t("Failed to update settings. Please try again."),
        variant: "destructive",
      });
    }
  });

  // Upload custom theme mutation
  const uploadTheme = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      const response = await apiClient.post('/restaurants/wallpaper/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    },
    onSuccess: (data) => {
      const newCustomTheme = { id: `custom-${Date.now()}`, url: data.url };
      setCustomThemes(prev => [...prev.slice(0, 1), newCustomTheme]);
      setSettings(prev => ({ ...prev, selectedTheme: newCustomTheme.id }));
      updateSettings.mutate({
        ...settings,
        selectedTheme: newCustomTheme.id
      });
      toast({
        title: t("Theme uploaded"),
        description: t("Your custom theme has been uploaded and applied"),
      });
    }
  });

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setIsUploading(true);
      try {
        await uploadTheme.mutateAsync(file);
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

  const handleThemeClick = (themeId: string) => {
    const newSettings = { ...settings, selectedTheme: themeId };
    setSettings(newSettings);
    // For now, just show success message
    toast({
      title: t("Theme updated"),
      description: t("Your menu theme has been updated"),
    });
  };

  const handleSaveSettings = async (newSettings: BackgroundSettings) => {
    setSettings(newSettings);
    setIsModalOpen(false);
    // Show preview dialog after settings update
    setShowPreviewDialog(true);
  };

  const handleApplySettings = () => {
    // For now, just show success message
    toast({
      title: t("Settings updated"),
      description: t("Your menu background settings have been saved"),
    });
    setShowPreviewDialog(false);
  };

  return (
    <>
      <Card>
        <CardHeader className="p-4 pb-0">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">{t("Menu Background Theme")}</CardTitle>
            <Button variant="outline" onClick={() => setIsModalOpen(true)}>
              {t("Background settings")}
            </Button>
          </div>
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
                onClick={() => handleThemeClick(theme.id)}
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
                    onClick={() => customTheme && handleThemeClick(customTheme.id)}
                  >
                    {customTheme ? (
                      <div className="relative w-full h-full">
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
        </CardContent>
      </Card>

      <BackgroundSettingsModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        initialSettings={settings}
        onSave={handleSaveSettings}
        themes={themes}
      />

      {/* Settings Preview Dialog */}
      <Dialog open={showPreviewDialog} onOpenChange={setShowPreviewDialog}>
        <DialogContent className="max-w-md p-0">
          <div className="flex flex-col h-[70vh]">
            {/* Preview Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="relative">
                <img 
                  src={themes.find(t => t.id === settings.selectedTheme)?.url || customThemes.find(t => t.id === settings.selectedTheme)?.url}
                  alt="Theme preview"
                  className="w-full h-full object-cover"
                  style={{
                    opacity: settings.opacity / 100,
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className={`text-${settings.textColor} text-xl font-medium`}>
                    Sample Menu Text
                  </p>
                </div>
              </div>
            </div>

            {/* Fixed Bottom Buttons */}
            <div className="p-4 bg-white border-t flex flex-col items-center gap-2">
              <Button 
                className="w-full max-w-md bg-blue-500 hover:bg-blue-600 text-white"
                onClick={handleApplySettings}
              >
                Set as background
              </Button>
              <Button
                variant="ghost"
                className="text-red-500 hover:text-red-600"
                onClick={() => setShowPreviewDialog(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}