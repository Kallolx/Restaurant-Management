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

  // Get auth data from localStorage
  const getAuthData = () => {
    try {
      const auth = localStorage.getItem('auth');
      if (auth) {
        const authData = JSON.parse(auth);
        // Find the current user's staff member record
        const staffMember = authData.restaurant.staff_members.find(
          (member: any) => member.user.uuid === authData.user.uuid
        );
        return {
          user: authData.user,
          restaurant: authData.restaurant,
          role: staffMember?.role || authData.role,
          staffMember
        };
      }
      return null;
    } catch (error) {
      console.error('Error getting auth data:', error);
      return null;
    }
  };

  const authData = getAuthData();

  // Initialize profile form with user data from auth
  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: authData?.user?.name || "",
      email: authData?.user?.email || "",
      phone: authData?.user?.phone?.startsWith('0') 
        ? authData.user.phone 
        : `0${authData?.user?.phone}` || "",
      profile_picture: authData?.user?.profile_picture || null,
    },
  });

  // Initialize restaurant form with restaurant data from auth
  const restaurantForm = useForm<RestaurantSettingsValues>({
    resolver: zodResolver(restaurantSettingsSchema),
    defaultValues: {
      table_capacity: 25,
      show_name: true,
      show_logo: true,
      restaurant_name: authData?.restaurant?.name || "",
      restaurant_logo: authData?.restaurant?.logo || null,
      add_tax: false,
      tax_percentage: 0,
      add_vat: false,
      vat_percentage: 0,
      menu_wallpaper: null,
      text_color: "#FFFFFF",
      background_opacity: 50
    }
  });

  // Set initial previews if available
  useEffect(() => {
    if (authData?.user?.profile_picture) {
      setAvatarPreview(authData.user.profile_picture);
    }
    if (authData?.restaurant?.logo) {
      setLogoPreview(authData.restaurant.logo);
    }
  }, [authData]);

  // Fetch restaurant settings
  const { data: currentSettings, isLoading: isSettingsLoading } = useQuery({
    queryKey: ['restaurant-settings', authData?.restaurant?.uuid],
    queryFn: async () => {
      if (!authData?.restaurant?.uuid) throw new Error('No restaurant UUID found');
      const response = await apiClient.get(`/api/restaurants/${authData.restaurant.uuid}/settings/`);
      return response.data;
    },
    enabled: !!authData?.restaurant?.uuid,
    onSuccess: (data) => {
      // Reset form with settings data
      restaurantForm.reset(data);
    }
  });

  // Update profile mutation
  const updateProfile = useMutation({
    mutationFn: async (data: ProfileFormValues) => {
      if (!authData?.user?.uuid) throw new Error('No user UUID found');
      // Remove leading 0 from phone if present
      const phone = data.phone.startsWith('0') ? data.phone.slice(1) : data.phone;
      const response = await apiClient.put(`/api/users/${authData.user.uuid}/`, {
        ...data,
        phone
      });
      return response.data;
    },
    onSuccess: (data) => {
      // Update auth data in localStorage with new profile info
      const currentAuth = localStorage.getItem('auth');
      if (currentAuth) {
        const authData = JSON.parse(currentAuth);
        authData.user = data;
        localStorage.setItem('auth', JSON.stringify(authData));
      }

      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });
    }
  });

  // Update settings mutation
  const updateSettings = useMutation({
    mutationFn: async (data: RestaurantSettingsValues) => {
      if (!authData?.restaurant?.uuid) throw new Error('No restaurant UUID found');
      const response = await apiClient.put(`/api/restaurants/${authData.restaurant.uuid}/settings/update/`, {
        show_name: data.show_name,
        show_logo: data.show_logo,
        restaurant_name: data.restaurant_name,
        restaurant_logo: data.restaurant_logo || null,
        add_tax: data.add_tax,
        tax_percentage: data.tax_percentage,
        add_vat: data.add_vat,
        vat_percentage: data.vat_percentage,
        table_capacity: data.table_capacity,
        menu_wallpaper: data.menu_wallpaper,
        text_color: data.text_color,
        background_opacity: data.background_opacity
      });
      return response.data;
    }
  });

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
        profileForm.setValue("profile_picture", reader.result as string);
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
        restaurantForm.setValue("restaurant_logo", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onProfileSubmit = (data: ProfileFormValues) => {
    updateProfile.mutate(data);
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

        <Form {...profileForm}>
          <form
            onSubmit={profileForm.handleSubmit(onProfileSubmit)}
            className="space-y-4"
          >
            <FormField
              control={profileForm.control}
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
              control={profileForm.control}
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
              control={profileForm.control}
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
              name="table_capacity"
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
              name="show_name"
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

            {restaurantForm.watch("show_name") && (
              <FormField
                control={restaurantForm.control}
                name="restaurant_name"
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
              name="add_tax"
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

            {restaurantForm.watch("add_tax") && (
              <FormField
                control={restaurantForm.control}
                name="tax_percentage"
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
              name="add_vat"
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

            {restaurantForm.watch("add_vat") && (
              <FormField
                control={restaurantForm.control}
                name="vat_percentage"
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
              name="show_logo"
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

            {restaurantForm.watch("show_logo") && (
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
