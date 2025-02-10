"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { BackgroundSettings, BackgroundTheme } from "@/types/settings";
import { Plus } from "lucide-react";
import { useState } from "react";
import { ColorPicker } from "./color-picker";
import { OpacitySlider } from "./opacity-slider";

interface BackgroundSettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialSettings: BackgroundSettings;
  onSave: (settings: BackgroundSettings) => void;
  themes: BackgroundTheme[];
}

export function BackgroundSettingsModal({
  open,
  onOpenChange,
  initialSettings,
  onSave,
  themes,
}: BackgroundSettingsModalProps) {
  const [settings, setSettings] = useState<BackgroundSettings>(initialSettings);

  const handleSave = () => {
    onSave(settings);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Background settings</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <ColorPicker
            value={settings.textColor}
            onChange={(color) => setSettings({ ...settings, textColor: color })}
          />
          <OpacitySlider
            value={settings.opacity}
            onChange={(opacity) =>
              setSettings({ ...settings, opacity: opacity })
            }
          />
          <div className="space-y-4">
            <h4 className="font-medium">Set theme</h4>
            <div className="grid grid-cols-4 gap-4">
              {themes.map((theme) => (
                <div
                  key={theme.id}
                  className={`aspect-square rounded-lg overflow-hidden cursor-pointer transition-all ${
                    settings.selectedTheme === theme.id
                      ? "ring-2 ring-primary"
                      : "hover:ring-2 hover:ring-primary/50"
                  }`}
                  onClick={() =>
                    setSettings({ ...settings, selectedTheme: theme.id })
                  }
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
                className="aspect-square flex items-center justify-center"
                onClick={() => {
                  // Handle custom theme upload
                }}
              >
                <Plus className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </div>
        <DialogFooter className="flex justify-between">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
