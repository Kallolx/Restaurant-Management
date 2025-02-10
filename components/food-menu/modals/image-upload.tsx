"use client";

import { cn } from "@/lib/utils";
import { ImageIcon, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface ImageUploadProps {
  value: string | File;
  onChange: (value: string | File) => void;
  onRemove: () => void;
  isFile?: boolean;
}

export function ImageUpload({
  value,
  onChange,
  onRemove,
  isFile = false,
}: ImageUploadProps) {
  const [error, setError] = useState<string>("");

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      if (file.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        if (isFile) {
          onChange(file);
        } else {
          onChange(event.target?.result as string);
        }
      };
      reader.readAsDataURL(file);
    },
    [isFile, onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    maxFiles: 1,
  });

  return (
    <div>
      <div
        {...getRootProps()}
        className={cn(
          "relative mt-2 flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50/50 px-6 py-10",
          isDragActive && "border-blue-500 bg-blue-50/50"
        )}
      >
        <input {...getInputProps()} />
        {value ? (
          <>
            <div className="absolute right-2 top-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove();
                }}
                className="rounded-full bg-red-500 p-1 text-white shadow-sm transition-colors hover:bg-red-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="relative h-40 w-40">
              <Image
                src={
                  typeof value === "string" ? value : URL.createObjectURL(value)
                }
                alt="Upload preview"
                className="rounded-lg object-cover"
                fill
              />
            </div>
          </>
        ) : (
          <div className="text-center">
            <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
            <div className="mt-4 flex text-sm leading-6 text-gray-600">
              <span className="relative cursor-pointer font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500">
                Click to upload
              </span>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs leading-5 text-gray-600">
              Max file size: 5MB
            </p>
          </div>
        )}
      </div>
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
}
