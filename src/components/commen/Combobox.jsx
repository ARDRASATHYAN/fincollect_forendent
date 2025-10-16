import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useState } from "react";
import { Button } from "../ui/button";
import { PiCaretUpDownLight } from "react-icons/pi";

export default function Combobox({ options = [], value, onValueChange, placeholder, maxLength = 15 }) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const filteredOptions = options.filter((opt) =>
    (opt.label || opt).toLowerCase().includes(inputValue.toLowerCase())
  );

  // Compute display text
  let displayText = value?.label || value || placeholder;
  if (displayText.length > maxLength) {
    displayText = displayText.slice(0, maxLength) + "...";
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {displayText}
          <PiCaretUpDownLight className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[500px] p-0">
        <Command>
          <CommandInput
            placeholder="Type to search..."
            value={inputValue}
            onValueChange={setInputValue}
            className="border-b"
          />
          <CommandList>
            {filteredOptions.map((opt) => (
              <CommandItem
                key={opt.id || opt}
                onSelect={() => {
                  onValueChange(opt);
                  setOpen(false);
                  setInputValue("");
                }}
              >
                {opt.label || opt}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
