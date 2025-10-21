import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { TrendingUp, DollarSign, Target, Activity } from "lucide-react";

// Mock data
const mockData = [
  { fecha: "Lun", ventas: 45000, prediccion: 47000 },
  { fecha: "Mar", ventas: 52000, prediccion: 53000 },
  { fecha: "Mié", ventas: 48000, prediccion: 49500 },
  { fecha: "Jue", ventas: 61000, prediccion: 62000 },
  { fecha: "Vie", ventas: 55000, prediccion: 56500 },
  { fecha: "Sáb", ventas: 67000, prediccion: 68000 },
  { fecha: "Dom", ventas: 43000, prediccion: 44000 },
];

const mockMetrics = [
  {
    title: "Ventas Predichas",
    value: "$68,000",
    change: "+12.5%",
    icon: DollarSign,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    title: "Precisión del Modelo",
    value: "94.2%",
    change: "+2.1%",
    icon: Target,
    color: "text-success",
    bg: "bg-success/10",
  },
  {
    title: "Tendencia",
    value: "Positiva",
    change: "+8.3%",
    icon: TrendingUp,
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    title: "Confianza",
    value: "Alta",
    change: "92%",
    icon: Activity,
    color: "text-primary",
    bg: "bg-primary/10",
  },
];

const Results = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Resultados de Predicción
        </h2>
        <p className="text-muted-foreground">
          Análisis detallado de tus predicciones de ventas
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockMetrics.map((metric) => (
          <Card key={metric.title} className="shadow-card border-border hover:shadow-glow transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
              <div className={`h-8 w-8 rounded-lg ${metric.bg} flex items-center justify-center`}>
                <metric.icon className={`h-4 w-4 ${metric.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-success mt-1">
                {metric.change} desde el último período
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-card border-border">
          <CardHeader>
            <CardTitle>Tendencia de Ventas</CardTitle>
            <CardDescription>
              Comparación entre ventas reales y predicciones
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="fecha" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="ventas"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  name="Ventas Reales"
                />
                <Line
                  type="monotone"
                  dataKey="prediccion"
                  stroke="hsl(var(--accent))"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Predicción"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-card border-border">
          <CardHeader>
            <CardTitle>Análisis Comparativo</CardTitle>
            <CardDescription>
              Distribución semanal de ventas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="fecha" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Legend />
                <Bar dataKey="ventas" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} name="Ventas Reales" />
                <Bar dataKey="prediccion" fill="hsl(var(--accent))" radius={[8, 8, 0, 0]} name="Predicción" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-card border-border">
        <CardHeader>
          <CardTitle>Tabla de Predicciones Detallada</CardTitle>
          <CardDescription>
            Datos históricos y predicciones semanales
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold">Fecha</th>
                  <th className="text-right py-3 px-4 font-semibold">Ventas Reales</th>
                  <th className="text-right py-3 px-4 font-semibold">Predicción</th>
                  <th className="text-right py-3 px-4 font-semibold">Diferencia</th>
                  <th className="text-right py-3 px-4 font-semibold">Precisión</th>
                </tr>
              </thead>
              <tbody>
                {mockData.map((row, index) => {
                  const diff = row.prediccion - row.ventas;
                  const accuracy = ((1 - Math.abs(diff) / row.ventas) * 100).toFixed(1);
                  return (
                    <tr key={index} className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
                      <td className="py-3 px-4">{row.fecha}</td>
                      <td className="text-right py-3 px-4 font-medium">
                        ${row.ventas.toLocaleString()}
                      </td>
                      <td className="text-right py-3 px-4 font-medium text-accent">
                        ${row.prediccion.toLocaleString()}
                      </td>
                      <td className={`text-right py-3 px-4 font-medium ${diff >= 0 ? "text-success" : "text-destructive"}`}>
                        {diff >= 0 ? "+" : ""}${diff.toLocaleString()}
                      </td>
                      <td className="text-right py-3 px-4 font-medium text-success">
                        {accuracy}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Results;
