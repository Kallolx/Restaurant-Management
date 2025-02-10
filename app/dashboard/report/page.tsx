"use client";

import { ReportsModal } from "@/components/report-feedback/report-modal";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { mockReports } from "@/types/report-feedback";
import { format } from "date-fns";
import { CalendarIcon, Download, FileText, Printer } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// Report Section Component
type DateRange = { from: Date | undefined; to: Date | undefined };
type ReportDates = {
  daily: DateRange;
  monthly: Date | undefined;
  yearly: string | undefined;
};

interface ReportSectionProps {
  title: string;
  description: string;
  type: "account" | "statistic";
  onViewPrevious: () => void;
}

function ReportSection({
  title,
  description,
  type,
  onViewPrevious,
}: ReportSectionProps) {
  const [dates, setDates] = useState<ReportDates>({
    daily: { from: undefined, to: undefined },
    monthly: undefined,
    yearly: undefined,
  });

  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: currentYear - 2019 }, (_, i) =>
    (2020 + i).toString()
  );

  const handleDailyChange = (field: "from" | "to", value: Date | undefined) => {
    setDates((prev) => ({
      ...prev,
      monthly: undefined,
      yearly: undefined,
      daily: { ...prev.daily, [field]: value },
    }));
  };

  const handleMonthlyChange = (value: Date | undefined) => {
    setDates((prev) => ({
      ...prev,
      daily: { from: undefined, to: undefined },
      yearly: undefined,
      monthly: value,
    }));
  };

  const handleYearlyChange = (value: string | undefined) => {
    setDates((prev) => ({
      ...prev,
      daily: { from: undefined, to: undefined },
      monthly: undefined,
      yearly: value,
    }));
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="space-y-1">
          <CardTitle className="text-lg">{title}</CardTitle>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <Button
          variant="link"
          size="sm"
          className="text-primary text-sm underline"
          onClick={onViewPrevious}
        >
          View previous reports
        </Button>
      </CardHeader>
      <CardContent className="">
        <div className="flex flex-row gap-3 w-full mobile-md:flex-wrap">
          <Card className="">
            <CardHeader className="p-4 pb-0">
              <CardTitle className="text-base font-medium">
                Daily report (Select date range)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-2.5">
              <div className="grid grid-cols-2 gap-4">
                <div className="">
                  <Label className="text-sm pb-1">From</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal truncate",
                          !dates.daily.from && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="" />
                        {dates.daily.from ? (
                          format(dates.daily.from, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={dates.daily.from}
                        onSelect={(date) => handleDailyChange("from", date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="">
                  <Label className="text-sm pb-1">To</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal truncate",
                          !dates.daily.to && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="" />
                        {dates.daily.to ? (
                          format(dates.daily.to, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={dates.daily.to}
                        onSelect={(date) => handleDailyChange("to", date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="flex-1">
            <CardHeader className="p-4 pb-0">
              <CardTitle className="text-base font-medium">
                Monthly report
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-2.5">
              <div>
                <Label className="text-sm pb-1">Select a Month</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !dates.monthly && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dates.monthly ? (
                        format(dates.monthly, "MMMM yyyy")
                      ) : (
                        <span>Pick a month</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dates.monthly}
                      onSelect={handleMonthlyChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </CardContent>
          </Card>

          <Card className="flex-1">
            <CardHeader className="p-4 pb-0">
              <CardTitle className="text-base font-medium">
                Yearly report
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-2.5">
              <div>
                <Label className="text-sm pb-1">Select a Year</Label>

                <Select value={dates.yearly} onValueChange={handleYearlyChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    {yearOptions.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center gap-4 pt-4 mt-4 border-t">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="text-sm pb-1">report.pdf.{type}</span>
          </div>
          <Button variant="ghost" size="sm" className="h-8 text-sm">
            <Download className="mr-2 h-3 w-3" />
            Download
          </Button>
          <Button variant="ghost" size="sm" className="h-8 text-sm">
            <Printer className="mr-2 h-3 w-3" />
            Print
          </Button>
          <Button
            size="sm"
            className="ml-auto bg-gradient-to-r from-blue-500 to-indigo-500"
          >
            Generate report
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// Main Component
export default function ReportsPage() {
  const [showReportsModal, setShowReportsModal] = useState(false);

  return (
    <div className="mb-3">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-medium">Report</h1>
        <Button
          asChild
          variant="outline"
          className="text-primary hover:text-primary hover:underline"
          size="lg"
        >
          <Link href="/dashboard/feedback">Customer feedback</Link>
        </Button>
      </div>

      <div className="space-y-6">
        <ReportSection
          title="Account Report"
          description="Generate an account report based on the selected time period"
          type="account"
          onViewPrevious={() => setShowReportsModal(true)}
        />

        <ReportSection
          title="Statistic Report"
          description="Generate a statistic report based on the selected time period"
          type="statistic"
          onViewPrevious={() => setShowReportsModal(true)}
        />
      </div>

      <ReportsModal
        open={showReportsModal}
        onOpenChange={setShowReportsModal}
        reports={mockReports}
      />
    </div>
  );
}
