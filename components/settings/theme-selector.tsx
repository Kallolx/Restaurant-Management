"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/providers/language-provider";
import { ImagePlus, Loader2, Plus, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { BackgroundSettingsModal } from "./background-settings-modal";
import type { BackgroundSettings, BackgroundTheme } from "@/types/settings";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { apiClient } from "@/services/apiClient";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface Wallpaper {
  uuid: string;
  name: string;
  image: string;
  image_url: string;
  is_default: boolean;
  display_order: number;
  is_active: boolean;
}

interface MenuItem {
  uuid: string;
  name: string;
  price: number;
  description: string;
  image: string;
  type: "food" | "drinks";
}

export default function ThemeSelector() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const queryClient = useQueryClient();
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
      selectedTheme: "",
    };
  });
  const [isUploading, setIsUploading] = useState(false);
  const [customThemes, setCustomThemes] = useState<BackgroundTheme[]>([]);

  // Get restaurant UUID from localStorage
  const getRestaurantId = () => {
    if (typeof window !== 'undefined') {
      const auth = localStorage.getItem('auth');
      if (auth) {
        const { restaurant } = JSON.parse(auth);
        return restaurant.uuid;
      }
    }
    return null;
  };

  const RESTAURANT_ID = getRestaurantId();

  // Fetch wallpapers
  const { data: wallpapers = [] } = useQuery<Wallpaper[]>({
    queryKey: ['wallpapers'],
    queryFn: async () => {
      const response = await apiClient.get('/wallpapers/');
      return response.data;
    }
  });

  // Fetch current settings
  const { data: currentSettings } = useQuery({
    queryKey: ['restaurant-settings'],
    queryFn: async () => {
      try {
        if (!RESTAURANT_ID) throw new Error('Restaurant ID not found');
        const response = await apiClient.get(`/restaurants/${RESTAURANT_ID}/settings/`);
        console.log('Current settings response:', response.data);
        return response.data;
      } catch (error) {
        console.error('Error fetching settings:', error);
        throw error;
      }
    },
    enabled: !!RESTAURANT_ID
  });

  // Fetch menu items
  const { data: menuItems = [] } = useQuery<MenuItem[]>({
    queryKey: ['menu-items'],
    queryFn: async () => {
      if (!RESTAURANT_ID) throw new Error('Restaurant ID not found');
      const response = await apiClient.get(`/restaurants/${RESTAURANT_ID}/menu/`);
      return response.data;
    },
    enabled: !!RESTAURANT_ID
  });

  // Group menu items by type with proper type checking
  const groupedMenuItems = menuItems.reduce((acc, item) => {
    const category = item.type === "food" ? "Food" : "Drinks";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  // Update settings mutation
  const updateSettings = useMutation({
    mutationFn: async (newSettings: BackgroundSettings) => {
      try {
        if (!RESTAURANT_ID) throw new Error('Restaurant ID not found');
        console.log('Updating settings with:', newSettings);
        
        // Get current settings to maintain other values
        const currentData = await apiClient.get(`/restaurants/${RESTAURANT_ID}/settings/`);
        const existingSettings = currentData.data;

        // Merge new theme settings with existing settings
        const response = await apiClient.put(`/restaurants/${RESTAURANT_ID}/settings/update/`, {
          ...existingSettings,
          menu_wallpaper: newSettings.selectedTheme,
          text_color: newSettings.textColor,
          background_opacity: newSettings.opacity
        });
        
        console.log('Settings update response:', response.data);
        return response.data;
      } catch (error) {
        console.error('Error updating settings:', error);
        throw error;
      }
    },
    onSuccess: () => {
      toast({
        title: t("Settings updated"),
        description: t("Your menu background settings have been saved"),
      });
      // Invalidate both restaurant settings and menu settings queries
      queryClient.invalidateQueries({ queryKey: ['restaurant-settings'] });
      queryClient.invalidateQueries({ queryKey: ['menu-settings'] });
      // Also invalidate any queries that contain 'settings' in their key
      queryClient.invalidateQueries({ predicate: (query) => query.queryKey.some(key => key?.toString().includes('settings')) });
      
      // Store the latest settings in localStorage for immediate access
      if (typeof window !== 'undefined') {
        localStorage.setItem('menuSettings', JSON.stringify(settings));
      }
    },
    onError: (error: any) => {
      console.error('Settings update error:', error);
      toast({
        title: t("Update failed"),
        description: error.response?.data?.detail || t("Failed to update settings. Please try again."),
        variant: "destructive",
      });
    }
  });

  // Upload custom theme mutation
  const uploadTheme = useMutation({
    mutationFn: async (file: File) => {
      try {
        const formData = new FormData();
        // Only send the required fields that the API expects
        formData.append('name', 'bg_for_restaurant');
        formData.append('image', file);
        formData.append('is_active', 'true');

        console.log('Uploading wallpaper with data:', {
          name: 'bg_for_restaurant',
          fileName: file.name,
          isActive: true
        });

        const response = await apiClient.post('/wallpapers/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Upload response:', response.data);
        return response.data;
      } catch (error) {
        console.error('Error uploading wallpaper:', error);
        throw error;
      }
    },
    onSuccess: (data: Wallpaper) => {
      // Update wallpapers query cache
      queryClient.setQueryData<Wallpaper[]>(['wallpapers'], (old = []) => {
        return [...old, data];
      });

      // Update settings with new wallpaper and apply it immediately
      const newSettings = {
        ...settings,
        selectedTheme: data.uuid
      };
      setSettings(newSettings);
      
      // Apply the new wallpaper immediately
      updateSettings.mutate(newSettings);

      toast({
        title: t("Wallpaper uploaded"),
        description: t("Your custom wallpaper has been uploaded and applied"),
      });
    },
    onError: (error: any) => {
      console.error('Upload error:', error);
      toast({
        title: t("Upload failed"),
        description: error.response?.data?.detail || t("Failed to upload custom wallpaper. Please try again."),
        variant: "destructive",
      });
    }
  });

  // Add delete wallpaper mutation
  const deleteWallpaper = useMutation({
    mutationFn: async (uuid: string) => {
      const response = await apiClient.delete(`/wallpapers/${uuid}/`);
      return response.data;
    },
    onSuccess: (_, uuid) => {
      // Update wallpapers query cache
      queryClient.setQueryData<Wallpaper[]>(['wallpapers'], (old = []) => {
        return old.filter(w => w.uuid !== uuid);
      });

      // If the deleted wallpaper was selected, clear the selection
      if (settings.selectedTheme === uuid) {
        setSettings(prev => ({ ...prev, selectedTheme: "" }));
      }

      toast({
        title: t("Wallpaper deleted"),
        description: t("The wallpaper has been removed successfully"),
      });
    },
    onError: (error) => {
      console.error('Delete error:', error);
      toast({
        title: t("Delete failed"),
        description: t("Failed to delete wallpaper. Please try again."),
        variant: "destructive",
      });
    }
  });

  // Initialize settings from backend data
  useEffect(() => {
    if (currentSettings) {
      setSettings({
        textColor: currentSettings.text_color || "white",
        opacity: currentSettings.background_opacity || 50,
        selectedTheme: currentSettings.menu_wallpaper || ""
      });
    }
  }, [currentSettings]);

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

  const handleThemeClick = (wallpaper: Wallpaper) => {
    const newSettings = { ...settings, selectedTheme: wallpaper.uuid };
    setSettings(newSettings);
    // Show preview dialog after theme selection
    setShowPreviewDialog(true);
  };

  const handleSaveSettings = (newSettings: BackgroundSettings) => {
    setSettings(newSettings);
    setIsModalOpen(false);
    // Show preview dialog after settings update
    setShowPreviewDialog(true);
  };

  const handleApplySettings = async () => {
    try {
      await updateSettings.mutateAsync(settings);
      setShowPreviewDialog(false);
    } catch (error) {
      console.error('Failed to update settings:', error);
    }
  };

  const handleDeleteWallpaper = async (uuid: string, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent triggering wallpaper selection
    try {
      await deleteWallpaper.mutateAsync(uuid);
    } catch (error) {
      console.error('Failed to delete wallpaper:', error);
    }
  };

  // Get the current wallpaper for preview
  const currentWallpaper = wallpapers.find(w => w.uuid === settings.selectedTheme);

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
            {wallpapers.map((wallpaper) => (
              <div
                key={wallpaper.uuid}
                className={`group relative aspect-video rounded-lg overflow-hidden cursor-pointer transition-all ${
                  settings.selectedTheme === wallpaper.uuid
                    ? "ring-2 ring-primary"
                    : "hover:ring-2 hover:ring-primary/50"
                }`}
                onClick={() => handleThemeClick(wallpaper)}
              >
                <img
                  src={wallpaper.image_url}
                  alt={wallpaper.name}
                  className="w-full h-full object-cover"
                />
                {!wallpaper.is_default && (
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
                    onClick={(e) => handleDeleteWallpaper(wallpaper.uuid, e)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          {/* Custom Theme Section */}
          <div className="mt-4">
            <h3 className="text-sm font-medium mb-2">{t("Custom Themes")}</h3>
            <div className="grid grid-cols-2 gap-4">
              <div
                {...getRootProps()}
                className={`
                  aspect-video rounded-lg overflow-hidden cursor-pointer transition-all
                  border-2 border-dashed
                  hover:ring-2 hover:ring-primary/50
                  ${isUploading ? "opacity-50" : ""}
                `}
              >
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
                <input {...getInputProps()} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <BackgroundSettingsModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        initialSettings={settings}
        onSave={handleSaveSettings}
        themes={wallpapers.map(w => ({
          id: w.uuid,
          url: w.image_url,
          alt: w.name
        }))}
      />

      {/* Settings Preview Dialog */}
      <Dialog open={showPreviewDialog} onOpenChange={setShowPreviewDialog}>
        <DialogContent className="max-w-md p-0 overflow-hidden">
          <div className="flex flex-col h-[80vh] relative">
            {/* Background Theme */}
            {currentWallpaper && (
              <div 
                className="absolute inset-0 w-full h-full"
                style={{
                  backgroundImage: `url(${currentWallpaper.image_url})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  opacity: settings.opacity / 100,
                }}
              />
            )}

            {/* Header */}
            <div className="relative z-20 p-4 border-b bg-white/95">
              <DialogTitle className="text-lg font-medium">
                {t("Preview Menu Background")}
              </DialogTitle>
            </div>
            
            {/* Preview Content */}
            <div className="flex-1 overflow-y-auto">
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
                    {Object.entries(groupedMenuItems).map(([category, items], index) => (
                      <div key={category}>
                        <h3 className={`text-base font-medium bg-orange-400 text-${settings.textColor} px-2 py-1 rounded-lg mb-3 
                          ${index % 2 === 0 ? 'w-1/2' : 'w-1/2 ml-auto text-right'}`}>
                          {category}
                        </h3>
                        <div className="space-y-3">
                          {items.map((item) => (
                            <div key={item.uuid} className="flex items-center gap-3 bg-white/95 p-3 rounded-lg backdrop-blur-sm">
                              {item.image && (
                                <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                                  <img 
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              )}
                              <div className="flex-1 min-w-0">
                                <h3 className="font-medium text-sm truncate">{item.name}</h3>
                                {item.description && (
                                  <p className="text-xs text-gray-500 line-clamp-2">
                                    {item.description}
                                  </p>
                                )}
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
            <div className="relative z-20 p-4 bg-white/95 border-t flex flex-col items-center gap-2">
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