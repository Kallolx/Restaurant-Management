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
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
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
  const [settings, setSettings] = useState<BackgroundSettings>(() => {
    // Initialize from localStorage or use defaults
    if (typeof window !== 'undefined') {
      const savedSettings = localStorage.getItem('menuSettings');
      if (savedSettings) {
        return JSON.parse(savedSettings);
      }
    }
    return {
      textColor: "white",
      opacity: 50,
      selectedTheme: themes[0].url,
    };
  });
  const [isUploading, setIsUploading] = useState(false);
  const [customThemes, setCustomThemes] = useState<BackgroundTheme[]>([]);

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
      const response = await apiClient.post('/wallpapers/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    },
    onSuccess: (data) => {
      const newCustomTheme: BackgroundTheme = {
        id: `custom-${Date.now()}`,
        url: data.url,
        alt: "Custom uploaded theme"
      };
      setCustomThemes(prev => [...prev.slice(0, 1), newCustomTheme]);
      setSettings(prev => ({ ...prev, selectedTheme: newCustomTheme.url }));
      // Show preview dialog after upload
      setShowPreviewDialog(true);
    },
    onError: (error) => {
      console.error('Upload error:', error);
      toast({
        title: t("Upload failed"),
        description: t("Failed to upload custom theme. Please try again."),
        variant: "destructive",
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

  const handleThemeClick = (theme: BackgroundTheme) => {
    const newSettings = { ...settings, selectedTheme: theme.url };
    setSettings(newSettings);
    // Save to localStorage
    localStorage.setItem('menuSettings', JSON.stringify(newSettings));
    // Trigger storage event for other components
    window.dispatchEvent(new Event('storage'));
    
    // Show preview dialog after theme selection
    setShowPreviewDialog(true);
  };

  const handleSaveSettings = (newSettings: BackgroundSettings) => {
    setSettings(newSettings);
    setIsModalOpen(false);
    // Show preview dialog after settings update
    setShowPreviewDialog(true);
  };

  const handleApplySettings = () => {
    // Save settings to localStorage
    localStorage.setItem('menuSettings', JSON.stringify(settings));
    // Trigger storage event for other components
    window.dispatchEvent(new Event('storage'));
    
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
                  settings.selectedTheme === theme.url
                    ? "ring-2 ring-primary"
                    : "hover:ring-2 hover:ring-primary/50"
                }`}
                onClick={() => handleThemeClick(theme)}
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
                      ${settings.selectedTheme === customTheme?.url ? "ring-2 ring-primary" : "hover:ring-2 hover:ring-primary/50"}
                      ${isUploading ? "opacity-50" : ""}
                    `}
                    onClick={() => customTheme && handleThemeClick(customTheme)}
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
        <DialogContent className="max-w-md p-0 overflow-hidden">
          <div className="flex flex-col h-[80vh] relative">
            <div className="p-4 border-b bg-white z-20">
              <DialogTitle className="text-lg font-medium">
                {t("Preview Menu Background")}
              </DialogTitle>
            </div>
            
            {/* Preview Content */}
            <div className="flex-1 overflow-y-auto relative">
              {/* Background Theme - Now contained within the dialog */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${settings.selectedTheme})`,
                  opacity: settings.opacity / 100,
                }}
              />

              {/* Content Container */}
              <div className="relative z-10 min-h-full">
                {/* Header */}
                <div className="sticky top-0 z-20">
                  <div className="bg-white/90 px-4 py-3 flex items-center justify-between shadow-md">
                    <div className="flex items-center gap-2">
                      <img src="/logo.svg" alt="HungryHub" className="h-8 w-8" />
                      <div>
                        <h1 className="font-bold text-sm">HungryHub</h1>
                        <p className="text-xs text-gray-500">Online Food Menu</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Menu Content */}
                <div className="p-4">
                  <div className="space-y-6">
                    {/* Categories */}
                    {[
                      {
                        name: "Popular Items",
                        items: [
                          {
                            name: "Beef Burger",
                            description: "Premium beef patty with fresh vegetables",
                            price: 220,
                            image: "/menu-items/burger.jpg"
                          },
                          {
                            name: "Chicken Pizza",
                            description: "Wood-fired pizza with grilled chicken",
                            price: 450,
                            image: "/menu-items/pizza.jpg"
                          }
                        ]
                      },
                      {
                        name: "Main Course",
                        items: [
                          {
                            name: "Grilled Salmon",
                            description: "Fresh salmon with herbs and lemon",
                            price: 650,
                            image: "/menu-items/salmon.jpg"
                          },
                          {
                            name: "Beef Steak",
                            description: "Premium cut with mushroom sauce",
                            price: 850,
                            image: "/menu-items/steak.jpg"
                          }
                        ]
                      }
                    ].map((category, index) => (
                      <div key={category.name}>
                        <h3 className={`text-base font-medium bg-orange-400 text-${settings.textColor} px-2 py-1 rounded-lg mb-3 
                          ${index % 2 === 0 ? 'w-1/2' : 'w-1/2 ml-auto text-right'}`}>
                          {category.name}
                        </h3>
                        <div className="space-y-3">
                          {category.items.map((item) => (
                            <div key={item.name} className="flex items-center gap-3 bg-white/90 p-3 rounded-lg">
                              <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                                <img 
                                  src={item.image} 
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="font-medium text-sm truncate">{item.name}</h3>
                                <p className="text-xs text-gray-500 line-clamp-2">
                                  {item.description}
                                </p>
                                <span className="font-bold text-sm">৳ {item.price}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Fixed Bottom Buttons */}
            <div className="p-4 bg-white border-t flex flex-col items-center gap-2 z-20">
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