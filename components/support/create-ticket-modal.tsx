"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { Ticket } from "@/types/support";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Upload } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const ticketSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  issueCategory: z.string().min(1, "Please select an issue category"),
  subject: z.string().min(1, "Subject is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  priority: z.string().min(1, "Please select a priority level"),
  date: z.date({
    required_error: "Please select a date",
  }),
});

interface CreateTicketModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ticket?: Ticket;
  mode?: "create" | "edit";
}

export function CreateTicketModal({
  open,
  onOpenChange,
  ticket,
  mode = "create",
}: CreateTicketModalProps) {
  const form = useForm<z.infer<typeof ticketSchema>>({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      issueCategory: "",
      subject: "",
      description: "",
      priority: "",
      date: new Date(),
    },
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    if (mode === "edit" && ticket) {
      form.reset({
        name: ticket.name,
        email: ticket.email,
        phone: ticket.phone || "",
        issueCategory: ticket.issueCategory,
        subject: ticket.subject,
        description: ticket.description,
        priority: ticket.priority,
        date: new Date(ticket.date),
      });
    }
  }, [mode, ticket, form]);

  const onSubmit = (values: z.infer<typeof ticketSchema>) => {
    console.log(values);
    // Handle form submission

    // Reset form and files
    form.reset();
    setFiles([]);
    onOpenChange(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[800px] p-0">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col h-[calc(90vh)]"
          >
            {/* Header */}
            <DialogTitle className="p-6 border-b">
              <div className="text-xl font-medium">Support Ticket</div>
              <div className="text-sm text-muted-foreground mt-1">
                ST ID-#165874
              </div>
            </DialogTitle>

            {/* Scrollable Content */}
            <ScrollArea className="flex-1">
              <div className="space-y-4 lg:space-y-6 p-6">
                {/* Name Field */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="lg:grid lg:grid-cols-[200px,1fr] lg:items-center lg:gap-4">
                      <FormLabel className="">Name</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input placeholder="Full name" {...field} />
                        </FormControl>
                        <FormMessage className="absolute -bottom-5 text-xs" />
                      </div>
                    </FormItem>
                  )}
                />

                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="lg:grid lg:grid-cols-[200px,1fr] lg:items-center lg:gap-4">
                      <FormLabel className="">Email</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="ex-example@email.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="absolute -bottom-5 text-xs" />
                      </div>
                    </FormItem>
                  )}
                />

                {/* Phone Field */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="lg:grid lg:grid-cols-[200px,1fr] lg:items-center lg:gap-4">
                      <FormLabel className="">Phone (optional)</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input placeholder="ex-0178455545***" {...field} />
                        </FormControl>
                        <FormMessage className="absolute -bottom-5 text-xs" />
                      </div>
                    </FormItem>
                  )}
                />

                {/* Issue Category Field */}
                <FormField
                  control={form.control}
                  name="issueCategory"
                  render={({ field }) => (
                    <FormItem className="lg:grid lg:grid-cols-[200px,1fr] lg:items-center lg:gap-4">
                      <FormLabel className="">Issue category</FormLabel>
                      <div className="relative">
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select issue category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="order">Order Issues</SelectItem>
                            <SelectItem value="payment">
                              Payment Issues
                            </SelectItem>
                            <SelectItem value="technical">
                              Technical Issues
                            </SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="absolute -bottom-5 text-xs" />
                      </div>
                    </FormItem>
                  )}
                />

                {/* Subject Field */}
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem className="lg:grid lg:grid-cols-[200px,1fr] lg:items-center lg:gap-4">
                      <FormLabel className="">Subject</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input placeholder="ex-Failed payment" {...field} />
                        </FormControl>
                        <FormMessage className="absolute -bottom-5 text-xs" />
                      </div>
                    </FormItem>
                  )}
                />

                {/* Description Field */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="lg:grid lg:grid-cols-[200px,1fr] lg:items-start lg:gap-4">
                      <FormLabel className="">Description</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Textarea
                            placeholder="Write your message here"
                            className="min-h-[100px] resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="absolute -bottom-5 text-xs" />
                      </div>
                    </FormItem>
                  )}
                />

                {/* Priority Level Field */}
                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem className="lg:grid lg:grid-cols-[200px,1fr] lg:items-center lg:gap-4">
                      <FormLabel className="">Priority level</FormLabel>
                      <div className="relative">
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="low">Low</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="absolute -bottom-5 text-xs" />
                      </div>
                    </FormItem>
                  )}
                />

                {/* Date Field */}
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="lg:grid lg:grid-cols-[200px,1fr] lg:items-center lg:gap-4">
                      <FormLabel className="">Date</FormLabel>
                      <div className="relative">
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className="w-full bg-secondary justify-start text-left font-normal"
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage className="absolute -bottom-5 text-xs" />
                      </div>
                    </FormItem>
                  )}
                />

                {/* File Upload */}
                <div className="lg:grid lg:grid-cols-[200px,1fr] lg:items-center lg:gap-4">
                  <FormLabel className="">Attachments (optional)</FormLabel>
                  <div className="space-y-2">
                    <div className="border rounded-md p-3 flex items-center justify-between bg-secondary">
                      <span className="text-sm text-muted-foreground">
                        {files.length > 0
                          ? files.map((f) => f.name).join(", ")
                          : "ex-screenshots., photos"}
                      </span>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Upload
                      </Button>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      className="hidden"
                      onChange={handleFileUpload}
                      accept="image/*,.pdf"
                    />
                    {files.length > 0 && (
                      <div className="text-sm text-muted-foreground">
                        {files.length} file(s) selected
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </ScrollArea>

            {/* Footer */}
            <div className="p-6 border-t flex items-center justify-end space-x-4">
              <Button
                type="button"
                variant="destructive"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant={"primary"}>
                {mode === "create" ? "Submit Ticket" : "Update Ticket"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
