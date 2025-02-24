import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

export function DatePicker({ label, date, onChange }: { label: string; date: Date | undefined; onChange: (date: Date | undefined) => void }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex items-center justify-between w-full sm:w-[250px]">
          {date ? format(date, "PPP") : `Select ${label}`}
          <CalendarIcon className="ml-2 h-4 w-4 text-secondary" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={date} onSelect={onChange} />
      </PopoverContent>
    </Popover>
  );
}
