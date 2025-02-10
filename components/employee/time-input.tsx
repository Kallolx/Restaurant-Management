"use client";

import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";

interface TimeInputProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
}

export function TimeInput({
  placeholder,
  value,
  onChange,
  onBlur,
}: TimeInputProps) {
  const [inputType, setInputType] = useState("text");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    // Change to time type and show picker
    setInputType("time");
    // Small delay to ensure type change before showing picker
    setTimeout(() => {
      inputRef.current?.showPicker();
    }, 0);
  };

  return (
    <Input
      ref={inputRef}
      type={inputType}
      value={value}
      placeholder={placeholder}
      onClick={handleClick}
      onFocus={handleClick}
      onBlur={() => {
        if (!value) setInputType("text");
        onBlur?.();
      }}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
