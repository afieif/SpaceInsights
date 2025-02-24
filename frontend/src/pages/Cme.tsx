import { useEffect, useState } from "react";
import { fetchCME, CMEAnalysis } from "../services/nasaService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format, subDays, addDays, differenceInDays } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext } from "@/components/ui/pagination";
import { DatePicker } from "@/components/ui/DatePicker";
import { ArrowUp, ArrowDown } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const chartConfig = {
    views: {
      label: "-",
    },
    speed: {
      label: "Speed",
      color: "hsl(var(--primary))",
    },
    halfAngle: {
      label: "Angle",
      color: "hsl(var(--secondary))",
    },
  } satisfies ChartConfig

  export default function Cme() {
    const today = new Date();
    const defaultStartDate = subDays(today, 30);
    
    const [data, setData] = useState<CMEAnalysis[]>([]);
    const [loading, setLoading] = useState(false);
    const [startDate, setStartDate] = useState<Date | undefined>(defaultStartDate);
    const [endDate, setEndDate] = useState<Date | undefined>(today);
    const [page, setPage] = useState(1);
    const [activeChart, setActiveChart] = useState<keyof typeof chartConfig>("speed")
    const perPage = 10;
  
    const [sortField, setSortField] = useState<keyof CMEAnalysis | null>(null);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  
    useEffect(() => {
      fetchData();
    }, [startDate, endDate]);
  
    const fetchData = async () => {
      if (!startDate || !endDate) return;
      setLoading(true);
      try {
        const formattedStart = format(startDate, "yyyy-MM-dd");
        const formattedEnd = format(endDate, "yyyy-MM-dd");
        const response = await fetchCME(formattedStart, formattedEnd);
        setData(response);
      } catch (error) {
        console.error("Failed to fetch CME Analysis:", error);
      }
      setLoading(false);
    };
  
    const handleSort = (field: keyof CMEAnalysis) => {
      if (sortField === field) {
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
      } else {
        setSortField(field);
        setSortOrder("asc");
      }
    };
  
    const handleStartDateChange = (date: Date | undefined) => {
      if (!date) return;
      let newEndDate = endDate;
      if (!endDate || differenceInDays(endDate, date) > 30) {
        newEndDate = addDays(date, 30);
      }
      setStartDate(date);
      setEndDate(newEndDate);
    };
  
    const handleEndDateChange = (date: Date | undefined) => {
      if (!date) return;
      let newStartDate = startDate;
      if (!startDate || differenceInDays(date, startDate) > 30) {
        newStartDate = subDays(date, 30);
      }
      setEndDate(date);
      setStartDate(newStartDate);
    };
  
    const sortedData = [...data].sort((a, b) => {
      if (!sortField) return 0;
      const valueA = a[sortField];
      const valueB = b[sortField];
  
      if (typeof valueA === "string" && typeof valueB === "string") {
        return sortOrder === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
      } else if (typeof valueA === "number" && typeof valueB === "number") {
        return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
      }
      return 0;
    });
  
    const startIndex = (page - 1) * perPage;
    const paginatedData = sortedData.slice(startIndex, startIndex + perPage);
  
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Coronal Mass Ejections (CME) Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <Card className="p-4 border-primary mb-1">
            <CardHeader className="flex flex-col sm:flex-row items-stretch space-y-0 border-b p-0 sm:p-4">
              <div className="flex flex-1 flex-col justify-start gap-2 sm:flex-row sm:gap-5 sm:px-6 py-5 sm:py-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <DatePicker label="Start Date" date={startDate} onChange={handleStartDateChange}/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <DatePicker label="End Date" date={endDate} onChange={handleEndDateChange} />
                </div>
              </div>
  
              <div className="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-0">
                {["speed", "halfAngle"].map((key) => {
                  const chart = key as keyof typeof chartConfig
                  return (
                    <button
                      key={chart}
                      data-active={activeChart === chart}
                      className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                      onClick={() => setActiveChart(chart)}
                    >
                      <span className="text-xs text-muted-foreground">
                        {chartConfig[chart].label}
                      </span>
                    </button>
                  )
                })}
              </div>
            </CardHeader>
            <CardContent className="px-2 sm:px-6 py-4 sm:py-6">
            {loading ? (
              <Skeleton className="aspect-auto w-full h-[250px] sm:h-[300px]"/>
            ) : (
              <ChartContainer config={chartConfig} className="aspect-auto w-full h-[250px] sm:h-[300px]">
                <BarChart
                  accessibilityLayer
                  data={data}
                  margin={{ left: 12, right: 12 }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="id"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    minTickGap={32}
                    tickFormatter={(value) => {
                      const date = new Date(value.slice(0, 10));
                      return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
                    }}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        className="w-[150px]"
                        nameKey="Value"
                        labelFormatter={(value) => {
                          return new Date(value.slice(0, 10)).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          });
                        }}
                      />
                    }
                  />
                  <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
                </BarChart>
              </ChartContainer>
            )}
            </CardContent>
          </Card>
  
          {loading ? (
            <div className="space-y-2 p-4">
              {[...Array(10)].map((_, index) => (
                <div key={index} className="flex space-x-2">
                  <Skeleton className="h-10 w-full" /> {/* ID */}
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead onClick={() => handleSort("id")} className="cursor-pointer">
                        ID {sortField === "id" && (sortOrder === "asc" ? <ArrowUp size={14} className="text-secondary" /> : <ArrowDown size={14} className="text-secondary"/>)}
                      </TableHead>
                      <TableHead onClick={() => handleSort("time")} className="cursor-pointer">
                        Date {sortField === "time" && (sortOrder === "asc" ? <ArrowUp size={14} className="text-secondary"/> : <ArrowDown size={14} className="text-secondary" />)}
                      </TableHead>
                      <TableHead onClick={() => handleSort("speed")} className="cursor-pointer">
                        Speed (km/s) {sortField === "speed" && (sortOrder === "asc" ? <ArrowUp size={14} className="text-secondary"/> : <ArrowDown size={14} className="text-secondary"/>)}
                      </TableHead>
                      <TableHead onClick={() => handleSort("halfAngle")} className="cursor-pointer">
                        Half Angle (°) {sortField === "halfAngle" && (sortOrder === "asc" ? <ArrowUp size={14} className="text-secondary"/> : <ArrowDown size={14} className="text-secondary"/>)}
                      </TableHead>
                      <TableHead onClick={() => handleSort("latitude")} className="cursor-pointer">
                        Latitude {sortField === "latitude" && (sortOrder === "asc" ? <ArrowUp size={14} className="text-secondary"/> : <ArrowDown size={14} className="text-secondary"/>)}
                      </TableHead>
                      <TableHead onClick={() => handleSort("longitude")} className="cursor-pointer">
                        Longitude {sortField === "longitude" && (sortOrder === "asc" ? <ArrowUp size={14} className="text-secondary"/> : <ArrowDown size={14} className="text-secondary"/>)}
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedData.length > 0 ? (
                      paginatedData.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.id}</TableCell>
                          <TableCell>{item.time}</TableCell>
                          <TableCell>{item.speed.toFixed(1)}</TableCell>
                          <TableCell>{item.halfAngle.toFixed(1)}</TableCell>
                          <TableCell>{item.latitude.toFixed(2)}</TableCell>
                          <TableCell>{item.longitude.toFixed(2)}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center">
                          No data available
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
  
              {data.length > perPage && (
                <Pagination className="mt-4">
                  <PaginationContent>
                    <PaginationItem>
                      {page > 1 && <PaginationPrevious onClick={() => setPage((prev) => Math.max(prev - 1, 1))} />}
                    </PaginationItem>
                    <PaginationItem>
                      {startIndex + perPage < data.length && <PaginationNext onClick={() => setPage((prev) => (prev * perPage < data.length ? prev + 1 : prev))} />}
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </>
          )}
        </CardContent>
      </Card>
    );
  }
  