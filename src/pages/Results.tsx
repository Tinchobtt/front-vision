import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { TrendingUp, DollarSign, Target, Activity } from "lucide-react";
import { useEffect } from "react";
import { testAPI } from '../api/services/test.js'

// Mock data - Solo predicciones futuras
const mockData = [
    { fecha: "Lun 23/12", prediccion: 47000, confianza: 94 },
    { fecha: "Mar 24/12", prediccion: 53000, confianza: 92 },
    { fecha: "Mié 25/12", prediccion: 72000, confianza: 88 },
    { fecha: "Jue 26/12", prediccion: 65000, confianza: 90 },
    { fecha: "Vie 27/12", prediccion: 58000, confianza: 91 },
    { fecha: "Sáb 28/12", prediccion: 69000, confianza: 89 },
    { fecha: "Dom 29/12", prediccion: 48000, confianza: 93 },
]

const mockMetrics = [
    {
        title: "Venta Máxima Predicha",
        value: "$72,000",
        description: "Miércoles 25/12",
        icon: DollarSign,
        color: "text-primary",
        bg: "bg-primary/10",
    },
    {
        title: "Promedio Semanal",
        value: "$58,857",
        description: "7 días proyectados",
        icon: TrendingUp,
        color: "text-accent",
        bg: "bg-accent/10",
    },
    {
        title: "Confianza Promedio",
        value: "91%",
        description: "Alta precisión",
        icon: Target,
        color: "text-success",
        bg: "bg-success/10",
    },
    {
        title: "Total Proyectado",
        value: "$412,000",
        description: "Semana completa",
        icon: Activity,
        color: "text-primary",
        bg: "bg-primary/10",
    },
]

const Results = () => {

    const test = async () => {
        await testAPI()
    }

    useEffect(()=>{
        test()
    }, [])

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
                            <p className="text-xs text-muted-foreground mt-1">
                                {metric.description}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="shadow-card border-border">
                    <CardHeader>
                        <CardTitle>Predicción de Ventas</CardTitle>
                        <CardDescription>
                            Proyección de ventas para los próximos 7 días
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={mockData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                                <XAxis 
                                    dataKey="fecha" 
                                    stroke="hsl(var(--muted-foreground))"
                                    fontSize={12}
                                />
                                <YAxis 
                                    stroke="hsl(var(--muted-foreground))"
                                    fontSize={12}
                                />
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
                                    dataKey="prediccion"
                                    stroke="hsl(var(--primary))"
                                    strokeWidth={3}
                                    name="Ventas Predichas"
                                    dot={{ fill: "hsl(var(--primary))", r: 5 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card className="shadow-card border-border">
                    <CardHeader>
                        <CardTitle>Distribución Semanal</CardTitle>
                        <CardDescription>
                            Volumen de ventas proyectado por día
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={mockData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                                <XAxis 
                                    dataKey="fecha" 
                                    stroke="hsl(var(--muted-foreground))"
                                    fontSize={12}
                                />
                                <YAxis 
                                    stroke="hsl(var(--muted-foreground))"
                                    fontSize={12}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "hsl(var(--card))",
                                        border: "1px solid hsl(var(--border))",
                                        borderRadius: "var(--radius)",
                                    }}
                                />
                                <Legend />
                                <Bar 
                                    dataKey="prediccion" 
                                    fill="hsl(var(--accent))" 
                                    radius={[8, 8, 0, 0]} 
                                    name="Ventas Predichas" 
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            <Card className="shadow-card border-border">
                <CardHeader>
                    <CardTitle>Tabla de Predicciones Detallada</CardTitle>
                    <CardDescription>
                        Proyección completa de ventas para la próxima semana
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-border">
                                <th className="text-left py-3 px-4 font-semibold">Fecha</th>
                                <th className="text-right py-3 px-4 font-semibold">Ventas Predichas</th>
                                <th className="text-right py-3 px-4 font-semibold">Rango Mínimo</th>
                                <th className="text-right py-3 px-4 font-semibold">Rango Máximo</th>
                                <th className="text-right py-3 px-4 font-semibold">Confianza</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mockData.map((row, index) => {
                                    const minRange = Math.floor(row.prediccion * 0.92)
                                    const maxRange = Math.floor(row.prediccion * 1.08)
                                    return (
                                        <tr key={index} className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
                                        <td className="py-3 px-4 font-medium">{row.fecha}</td>
                                        <td className="text-right py-3 px-4 font-bold text-primary">
                                            ${row.prediccion.toLocaleString()}
                                        </td>
                                        <td className="text-right py-3 px-4 font-medium text-muted-foreground">
                                            ${minRange.toLocaleString()}
                                        </td>
                                        <td className="text-right py-3 px-4 font-medium text-muted-foreground">
                                            ${maxRange.toLocaleString()}
                                        </td>
                                        <td className="text-right py-3 px-4">
                                            <span className={`font-medium ${
                                                row.confianza >= 90 ? "text-success" : 
                                                row.confianza >= 85 ? "text-accent" : 
                                                "text-muted-foreground"
                                            }`}>
                                            {row.confianza}%
                                            </span>
                                        </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default Results;
