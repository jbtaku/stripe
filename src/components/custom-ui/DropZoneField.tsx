"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Control,
  FieldValues,
  Path,
  PathValue,
  UseFormSetValue,
} from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { Input } from "../ui/input";
import { useState } from "react";
import Image from "next/image";

interface Props<T extends FieldValues> {
  label: string;
  name: Path<T>;
  control: Control<T>;
  setValue: UseFormSetValue<T>;
}

function DropZoneField<T extends FieldValues>({
  label,
  name,
  control,
  setValue,
}: Props<T>) {
  const [image, setImage] = useState<string>();
  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0] as PathValue<T, Path<T>>;
    setValue(name, file);
    const dataUrl = URL.createObjectURL(file);
    setImage(dataUrl);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });
  return (
    <FormField
      name={name}
      control={control}
      render={() => (
        <FormItem>
          <FormLabel className="text-base">{label}</FormLabel>
          <div
            {...getRootProps()}
            className="grid place-items-center h-40 p-4 my-4 border-dashed border-2 border-slate-500 cursor-pointer"
          >
            {image ? (
              <Image
                src={image}
                width={200}
                height={128}
                alt="アップロードファイル"
                className="object-contain w-full h-32"
              />
            ) : (
              <p className="font-semibold text-slate-400">画像をアップロード</p>
            )}
            <FormControl>
              <Input {...getInputProps()} />
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default DropZoneField;
