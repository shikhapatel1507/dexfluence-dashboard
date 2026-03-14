import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Metrics() {

  const metrics = [
    { title: "Campaigns Running", value: "12" },
    { title: "Scripts Generated", value: "342" },
    { title: "Videos Generated", value: "128" },
    { title: "Posts Published", value: "89" }
  ]

  return (
    <div className="grid grid-cols-4 gap-6 mb-10">

      {metrics.map((metric, i) => (
        <Card key={i} className="bg-zinc-900 border-zinc-800">

          <CardHeader>
            <CardTitle>{metric.title}</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">
              {metric.value}
            </p>
          </CardContent>

        </Card>
      ))}

    </div>
  )
}