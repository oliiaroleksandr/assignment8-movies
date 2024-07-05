import { useState } from "react";
import {
  Button,
  Checkbox,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { genres } from "./const";
import { CheckedState } from "@radix-ui/react-checkbox";

type Props = {
  onChange: (genres: string[]) => void;
  value: string[];
};

const GenresSelect = ({ onChange, value }: Props) => {
  const [open, setOpen] = useState(false);

  const handleIntereactOutside = (e: Event) => {
    const target = e.target as Element;
    if (target?.closest(".autocomplete")) {
      e.preventDefault();
    }
  };

  const handleCheckedChange = (checked: CheckedState, genre: string) => {
    if (genre === "Any") {
      if (checked) {
        const newValue = genres.map((g) => g.value);
        onChange(newValue);
      } else {
        onChange([]);
      }

      return;
    }

    if (checked) {
      const newValue = [...value, genre];
      onChange(newValue);
      return;
    }

    if (value.includes("Any")) {
      const newValue = value.filter((v) => v !== genre && v !== "Any");
      onChange(newValue);
      return;
    }

    const newValue = value.filter((v) => v !== genre);
    onChange(newValue);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button className="genres-select w-full justify-between border border-border bg-background text-foreground hover:bg-background hover:text-foreground">
          Genre{" "}
          <ChevronDownIcon
            className={cn(
              "ml-2 h-4 w-4 transition-transform",
              open && "rotate-180",
            )}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        onInteractOutside={handleIntereactOutside}
        className="genres-select"
      >
        <div className="flex flex-col gap-3">
          {genres.map((genre) => {
            return (
              <div
                key={genre.value}
                className="flex flex-row items-center space-x-3 space-y-0"
              >
                <Checkbox
                  id={`genre-${genre.value}`}
                  checked={value.includes(genre.value)}
                  onCheckedChange={(checked) =>
                    handleCheckedChange(checked, genre.value)
                  }
                />
                <Label htmlFor={`genre-${genre.value}`}>{genre.label}</Label>
              </div>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default GenresSelect;
