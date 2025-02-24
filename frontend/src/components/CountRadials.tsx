import { useEffect, useState } from "react"
import { fetchEventCounts, EventCounts } from "../services/eventCountService"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"
import { Skeleton } from "@/components/ui/skeleton"

export default function CountRadials() {
  const [counts, setCounts] = useState<EventCounts | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEventCounts()
      .then((data: EventCounts) => setCounts(data))
      .catch((error: any) => console.error(error))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="flex justify-between gap-2 flex-col lg:flex-row">
      {loading ? (
        <>
          <SkeletonRadial />
          <SkeletonRadial />
          <SkeletonRadial />
        </>
      ) : (
        <>
          <Radial title="Coronal Mass Ejections" value={counts?.cmeCount ?? 0} />
          <Radial title="Radiation Belt Enhancement" value={counts?.rbeCount ?? 0}/>
          <Radial title="Solar Flares" value={counts?.flrCount ?? 0}/>
        </>
      )}
    </div>
  )
}

type RadialProps = {
  title: string
  value: number
}

function Radial({ title, value }: RadialProps) {
  const chartData = [{ name: title, count: value, fill: "hsl(var(--primary))" }]
  const chartConfig = {
    count: { label: title },
  } satisfies ChartConfig

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle className="text-md">{title}</CardTitle>
        <CardDescription className="text-sm">Past 30 Days</CardDescription>
      </CardHeader>
      <CardContent className="h-[250px]">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
          <RadialBarChart data={chartData} startAngle={90} endAngle={90+(value%360)} innerRadius={80} outerRadius={110}>
            <PolarGrid gridType="circle" radialLines={false} stroke="none" className="first:fill-muted last:fill-background" polarRadius={[86, 74]} />
            <RadialBar dataKey="count" background cornerRadius={10} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) =>
                  viewBox && "cx" in viewBox && "cy" in viewBox ? (
                    <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                      <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-4xl font-bold">
                        {value.toLocaleString()}
                      </tspan>
                      <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                        Events
                      </tspan>
                    </text>
                  ) : null
                }
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

function SkeletonRadial() {
  return (
    <Card className="w-full flex-1">
      <CardHeader>
        <Skeleton className="h-6 w-40 mb-2" />
        <Skeleton className="h-4 w-24" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-[250px] rounded-lg" />
      </CardContent>
    </Card>
  )
}
