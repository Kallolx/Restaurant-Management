"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import {
  profileFormSchema,
  restaurantSettingsSchema,
} from "@/lib/validations/settings";
import type {
  ProfileFormValues,
  RestaurantSettingsValues,
} from "@/types/settings";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Pencil, Upload, User } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiClient } from "@/services/apiClient";
import { useToast } from "@/hooks/use-toast";

export default function SettingsForm() {
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  // Fetch current settings
  const { data: currentSettings, isLoading } = useQuery({
    queryKey: ['restaurant-settings'],
    queryFn: async () => {
      const response = await apiClient.get('/restaurants/settings/');
      return response.data;
    }
  });

  // Update settings mutation
  const updateSettings = useMutation({
    mutationFn: async (data: RestaurantSettingsValues) => {
      const response = await apiClient.put('/restaurants/settings/update/', {
        show_name: data.showName,
        show_logo: data.showLogo,
        restaurant_name: data.restaurantName,
        restaurant_logo: data.logo || null,
        add_tax: data.addTax,
        tax_percentage: data.taxPercentage,
        add_vat: data.addVat,
        vat_percentage: data.vatPercentage,
        table_capacity: data.tableCapacity,
        menu_wallpaper: data.menuWallpaper,
        text_color: data.textColor,
        background_opacity: data.backgroundOpacity
      });
      return response.data;
    },
    onSuccess: () => {
      toast({
        title: "Settings Updated",
        description: "Restaurant settings have been successfully updated.",
      });
    },
    onError: (error) => {
      toast({
        title: "Update Failed",
        description: "Failed to update restaurant settings. Please try again.",
        variant: "destructive",
      });
      console.error('Update error:', error);
    }
  });

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "Farhan Ahamed",
      email: "fahexample@gmail.com",
      role: "Staff",
      phone: "+88014574842",
      password: "mypassword",
      avatar: "",
    },
  });

  const restaurantForm = useForm<RestaurantSettingsValues>({
    resolver: zodResolver(restaurantSettingsSchema),
    defaultValues: {
      tableCapacity: currentSettings?.table_capacity || 25,
      showName: currentSettings?.show_name || true,
      showLogo: currentSettings?.show_logo || true,
      restaurantName: currentSettings?.restaurant_name || "",
      logo: currentSettings?.restaurant_logo || "",
      addTax: currentSettings?.add_tax || false,
      taxPercentage: currentSettings?.tax_percentage || 0,
      addVat: currentSettings?.add_vat || false,
      vatPercentage: currentSettings?.vat_percentage || 0,
      menuWallpaper: currentSettings?.menu_wallpaper || "",
      textColor: currentSettings?.text_color || "#FFFFFF",
      backgroundOpacity: currentSettings?.background_opacity || 50
    }
  });

  // Update form when settings are loaded
  useEffect(() => {
    if (currentSettings) {
      restaurantForm.reset({
        tableCapacity: currentSettings.table_capacity,
        showName: currentSettings.show_name,
        showLogo: currentSettings.show_logo,
        restaurantName: currentSettings.restaurant_name,
        logo: currentSettings.restaurant_logo,
        addTax: currentSettings.add_tax,
        taxPercentage: currentSettings.tax_percentage,
        addVat: currentSettings.add_vat,
        vatPercentage: currentSettings.vat_percentage,
        menuWallpaper: currentSettings.menu_wallpaper,
        textColor: currentSettings.text_color,
        backgroundOpacity: currentSettings.background_opacity
      });
    }
  }, [currentSettings]);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
        form.setValue("avatar", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
        restaurantForm.setValue("logo", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onProfileSubmit = (data: ProfileFormValues) => {
    // Here you would typically send the data to your backend
    console.log("Profile data submitted:", data);
    toast({
      title: "Profile Updated",
      description: "Your profile information has been successfully updated.",
    });
  };

  const onRestaurantSubmit = (data: RestaurantSettingsValues) => {
    updateSettings.mutate(data);
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-center mb-6">
          <div className="relative">
            {avatarPreview ? (
              <img
                src={avatarPreview}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="w-12 h-12 text-gray-400" />
              </div>
            )}
            <button
              className="absolute bottom-0 right-0 p-1.5 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
              onClick={() => avatarInputRef.current?.click()}
            >
              {avatarPreview ? (
                <Pencil className="w-4 h-4" />
              ) : (
                <Upload className="w-4 h-4" />
              )}
            </button>
            <input
              type="file"
              ref={avatarInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleAvatarChange}
            />
          </div>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onProfileSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button variant="primary" type="submit" className="w-full">
              Save Profile Information
            </Button>
          </form>
        </Form>

        <Form {...restaurantForm}>
          <form
            onSubmit={restaurantForm.handleSubmit(onRestaurantSubmit)}
            className="space-y-4 pt-6 border-t mt-6"
          >
            <FormField
              control={restaurantForm.control}
              name="tableCapacity"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between items-center">
                    <FormLabel>Table capacity</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        className="w-20"
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={restaurantForm.control}
              name="showName"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Show Restaurant Name</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {restaurantForm.watch("showName") && (
              <FormField
                control={restaurantForm.control}
                name="restaurantName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} placeholder="Restaurant name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={restaurantForm.control}
              name="addTax"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Add Tax</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {restaurantForm.watch("addTax") && (
              <FormField
                control={restaurantForm.control}
                name="taxPercentage"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between items-center">
                      <FormLabel>Tax Percentage</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.1"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                          className="w-20"
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={restaurantForm.control}
              name="addVat"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Add VAT</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {restaurantForm.watch("addVat") && (
              <FormField
                control={restaurantForm.control}
                name="vatPercentage"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between items-center">
                      <FormLabel>VAT Percentage</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.1"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                          className="w-20"
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={restaurantForm.control}
              name="showLogo"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Show Restaurant Logo</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {restaurantForm.watch("showLogo") && (
              <div>
                {logoPreview ? (
                  <div className="relative w-40 h-40 mx-auto">
                    <img
                      src={logoPreview}
                      alt="Restaurant logo"
                      className="w-full h-full object-contain"
                    />
                    <button
                      className="absolute top-2 right-2 p-1.5 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
                      onClick={() => logoInputRef.current?.click()}
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => logoInputRef.current?.click()}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload logo
                  </Button>
                )}
                <input
                  type="file"
                  ref={logoInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleLogoChange}
                />
              </div>
            )}

            <Button 
              variant="primary" 
              type="submit" 
              className="w-full"
              disabled={updateSettings.isPending}
            >
              {updateSettings.isPending ? "Saving..." : "Save Restaurant Settings"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
