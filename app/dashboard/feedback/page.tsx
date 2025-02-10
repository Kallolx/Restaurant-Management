"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { mockFeedbacks, mockFoodReports } from "@/types/report-feedback";
import { Filter } from "lucide-react";

export default function FeedbackPage() {
  return (
    <div className="mb-3">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-medium">Customer Feedback</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between pb-3.5 pt-3.5">
            <CardTitle className="text-lg">Customer Food Reports</CardTitle>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Filter className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              {mockFoodReports.map((report) => (
                <Card key={report.id} className="border shadow-sm bg-[#FEF7FF]">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between pb-4 border-b">
                      <div className="flex items-center gap-3">
                        <div className="flex h-7 w-7 p-1.5 items-center justify-center rounded-lg border text-xs border-[#FF9500]">
                          {report.id}
                        </div>
                        <div>
                          <h3 className="text-sm font-medium">{report.name}</h3>
                          <p className="text-xs text-muted-foreground">
                            Contact: {report.contact}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 grid gap-2 text-xs">
                      <div className="grid grid-cols-2">
                        <div>
                          <Label className="text-xs">Issue date:</Label>
                          <p>{report.issueDate}</p>
                        </div>
                        <div>
                          <Label className="text-xs">Issue item:</Label>
                          <p>{report.issueItem}</p>
                        </div>
                      </div>
                      <div>
                        <Label className="text-xs">Issue statement:</Label>
                        <p>{report.issueStatement}</p>
                      </div>
                    </div>

                    <RadioGroup
                      defaultValue={report.status}
                      className="mt-4 flex gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="in-progress"
                          id={`in-progress-${report.id}`}
                        />
                        <Label
                          htmlFor={`in-progress-${report.id}`}
                          className="text-xs"
                        >
                          In-progress
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="solved"
                          id={`solved-${report.id}`}
                        />
                        <Label
                          htmlFor={`solved-${report.id}`}
                          className="text-xs"
                        >
                          Issue solved
                        </Label>
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader className="pb-3.5 pt-3.5">
            <CardTitle className="text-lg">Customer Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockFeedbacks.map((feedback) => (
                <Card key={feedback.id} className="border shadow-sm bg-white">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-7 w-7 border-[#FF9500] p-1.5 items-center justify-center rounded-lg border text-xs">
                        {feedback.id}
                      </div>
                      <div>
                        <h3 className="text-sm font-medium">{feedback.name}</h3>
                        <p className="text-xs text-muted-foreground">
                          Contact: {feedback.contact}
                        </p>
                      </div>
                    </div>
                    <p className="mt-4 text-xs">{feedback.feedback}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
