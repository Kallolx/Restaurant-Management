"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { BackgroundSettings, BackgroundTheme } from "@/types/settings";
import { Plus } from "lucide-react";
import { useState } from "react";
import { BackgroundSettingsModal } from "./background-settings-modal";

const themes: BackgroundTheme[] = [
  {
    id: "1",
    url: "/placeholder.svg?height=200&width=200",
    alt: "Coffee beans on dark background",
  },
  {
    id: "2",
    url: "/placeholder.svg?height=200&width=200",
    alt: "Scattered coffee beans",
  },
  {
    id: "3",
    url: "/placeholder.svg?height=200&width=200",
    alt: "Golden lights bokeh",
  },
  {
    id: "4",
    url: "/placeholder.svg?height=200&width=200",
    alt: "Red bokeh lights",
  },
];

export default function ThemeSelector() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [settings, setSettings] = useState<BackgroundSettings>({
    textColor: "white",
    opacity: 50,
    selectedTheme: themes[0].id,
  });

  const handleSaveSettings = (newSettings: BackgroundSettings) => {
    setSettings(newSettings);
    // Here you would typically save the settings to your backend
  };

  return (
    <>
      <Card>
        <CardHeader className="p-4 pb-0">
          <CardTitle className="text-xl">Set menu background theme</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {themes.map((theme) => (
              <div
                key={theme.id}
                className={`aspect-square rounded-lg overflow-hidden cursor-pointer transition-all ${
                  settings.selectedTheme === theme.id
                    ? "ring-2 ring-primary"
                    : "hover:ring-2 hover:ring-primary/50"
                }`}
              >
                <img
                  src={theme.url}
                  alt={theme.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
            <Button
              variant="outline"
              className="aspect-square flex flex-col items-center justify-center gap-2"
            >
              <Plus className="w-6 h-6" />
            </Button>
            <Button
              variant="outline"
              className="aspect-square flex flex-col items-center justify-center gap-2"
            >
              <Plus className="w-6 h-6" />
            </Button>
          </div>
          <Button
            variant="link"
            className="mt-4 text-primary"
            onClick={() => setIsModalOpen(true)}
          >
            Background settings
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
