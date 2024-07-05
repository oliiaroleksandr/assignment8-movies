import { useState } from "react";
import {
  Button,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  RadioGroup,
  RadioGroupItem,
} from "../ui";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { ratings } from "./const";
import StarRating from "../StarRating";

type Props = {
  value: number;
  onChange: (rating: number) => void;
};

const RatingsSelect = ({ value, onChange }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="ratings-select">
        <Button className="genres-select w-full justify-between border border-border bg-background text-foreground hover:bg-background hover:text-foreground">
          Rating{" "}
          <ChevronDownIcon
            className={cn(
              "ml-2 h-4 w-4 transition-transform",
              open && "rotate-180",
            )}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="ratings-select w-[calc(2_*_var(--radix-popover-trigger-width)_+1rem)]"
        align="start"
      >
        <RadioGroup
          value={value.toString()}
          onValueChange={(value) => onChange(+value)}
        >
          {ratings.map((rating) => (
            <div key={rating} className="flex items-center space-x-3">
              <RadioGroupItem id={`rating-${rating}`} value={rating.toString()}>
                {rating}
              </RadioGroupItem>
              <Label htmlFor={`rating-${rating}`}>
                <StarRating rating={rating} />
              </Label>
            </div>
          ))}
        </RadioGroup>
      </PopoverContent>
    </Popover>
  );
};

export default RatingsSelect;
