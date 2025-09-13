import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { CalendarIcon, Filter, Search, Clock } from "lucide-react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";

interface DashboardFiltersProps {
  campaigns: Array<{ id: string; name: string }>;
  selectedCampaigns: string[];
  dateRange: DateRange | undefined;
  onCampaignChange: (campaignIds: string[]) => void;
  onDateRangeChange: (dateRange: DateRange | undefined) => void;
  onClearFilters: () => void;
}

export function DashboardFilters({
  campaigns,
  selectedCampaigns,
  dateRange,
  onCampaignChange,
  onDateRangeChange,
  onClearFilters,
}: DashboardFiltersProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isCampaignDropdownOpen, setIsCampaignDropdownOpen] = useState(false);
  const [campaignSearchQuery, setCampaignSearchQuery] = useState("");
  const [startTime, setStartTime] = useState("00:00");
  const [endTime, setEndTime] = useState("23:59");

  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.name.toLowerCase().includes(campaignSearchQuery.toLowerCase())
  );

  const handleCampaignToggle = (campaignId: string) => {
    if (campaignId === 'all') {
      onCampaignChange(['all']);
      return;
    }

    let newSelected = [...selectedCampaigns];
    if (newSelected.includes('all')) {
      newSelected = newSelected.filter(id => id !== 'all');
    }

    if (newSelected.includes(campaignId)) {
      newSelected = newSelected.filter(id => id !== campaignId);
    } else {
      newSelected.push(campaignId);
    }

    if (newSelected.length === 0) {
      newSelected = ['all'];
    }

    onCampaignChange(newSelected);
  };

  const getSelectedCampaignText = () => {
    if (selectedCampaigns.includes('all')) {
      return 'All Campaigns';
    }
    if (selectedCampaigns.length === 1) {
      const campaign = campaigns.find(c => c.id === selectedCampaigns[0]);
      return campaign?.name || 'Select campaigns';
    }
    return `${selectedCampaigns.length} campaigns selected`;
  };

  const handleDateTimeChange = (range: DateRange | undefined) => {
    if (range?.from && range?.to) {
      // Apply time to the dates
      const fromDateTime = new Date(range.from);
      const toDateTime = new Date(range.to);
      
      const [fromHours, fromMinutes] = startTime.split(':').map(Number);
      const [toHours, toMinutes] = endTime.split(':').map(Number);
      
      fromDateTime.setHours(fromHours, fromMinutes, 0, 0);
      toDateTime.setHours(toHours, toMinutes, 59, 999);
      
      onDateRangeChange({ from: fromDateTime, to: toDateTime });
    } else {
      onDateRangeChange(range);
    }
  };

  return (
    <Card className="shadow-soft border-card-border">
      <CardContent className="p-4">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Filters:</span>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 items-end lg:items-center">
            {/* Campaign Multi-Select Dropdown */}
            <Popover open={isCampaignDropdownOpen} onOpenChange={setIsCampaignDropdownOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full sm:w-56 justify-start text-left font-normal text-sm h-9"
                >
                  <span className="truncate">{getSelectedCampaignText()}</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-0 bg-background border-border" align="start">
                <div className="p-2 border-b border-border">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search campaigns..."
                      value={campaignSearchQuery}
                      onChange={(e) => setCampaignSearchQuery(e.target.value)}
                      className="pl-8 h-8 text-sm bg-background"
                    />
                  </div>
                </div>
                <div className="max-h-64 overflow-y-auto p-2">
                  <div className="flex items-center space-x-2 p-2 hover:bg-muted/50 rounded cursor-pointer" 
                       onClick={() => handleCampaignToggle('all')}>
                    <Checkbox 
                      checked={selectedCampaigns.includes('all')}
                      className="h-4 w-4"
                    />
                    <span className="text-sm font-medium">All Campaigns</span>
                  </div>
                  {filteredCampaigns.map((campaign) => (
                    <div
                      key={campaign.id}
                      className="flex items-center space-x-2 p-2 hover:bg-muted/50 rounded cursor-pointer"
                      onClick={() => handleCampaignToggle(campaign.id)}
                    >
                      <Checkbox 
                        checked={selectedCampaigns.includes(campaign.id)}
                        className="h-4 w-4"
                      />
                      <span className="text-sm truncate">{campaign.name}</span>
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>

            {/* Date & Time Range Picker */}
            <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full sm:w-72 justify-start text-left font-normal text-sm h-9"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange?.from ? (
                    dateRange.to ? (
                      <span className="truncate">
                        {format(dateRange.from, "MMM dd, HH:mm")} - {format(dateRange.to, "MMM dd, HH:mm")}
                      </span>
                    ) : (
                      format(dateRange.from, "MMM dd, y")
                    )
                  ) : (
                    <span>Select date & time range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-background border-border" align="start">
                <div className="p-4">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange?.from}
                    selected={dateRange}
                    onSelect={handleDateTimeChange}
                    numberOfMonths={1}
                    className={cn("pointer-events-auto")}
                  />
                  <div className="border-t border-border pt-4 mt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-medium text-muted-foreground mb-1 block">Start Time</label>
                        <div className="relative">
                          <Clock className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="time"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            className="pl-8 h-8 text-sm bg-background"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-muted-foreground mb-1 block">End Time</label>
                        <div className="relative">
                          <Clock className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="time"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                            className="pl-8 h-8 text-sm bg-background"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <Button
              variant="outline"
              onClick={onClearFilters}
              className="whitespace-nowrap text-sm h-9 px-3"
              size="sm"
            >
              Clear
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}