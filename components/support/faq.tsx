"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqItems } from "@/lib/constants/support-data";

export function FAQ() {
  return (
    <Accordion type="single" collapsible className="space-y-2">
      {faqItems.map((item) => (
        <AccordionItem
          key={item.id}
          value={item.id}
          className="bg-muted/50 rounded-lg px-4"
        >
          <AccordionTrigger className="text-left">
            {item.id}. {item.question}
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            Answer: {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
