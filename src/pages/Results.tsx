import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { TrendingUp, DollarSign, Target, Activity } from "lucide-react"
import { useDataContext } from "../context/DataContext"

// Mock data - Solo predicciones futuras
const mockData = [
    { 
        fecha: "Lun 23/12", 
        prediccion: 47000, 
        confianza: 94,
        productos: [
            { nombre: "Producto A", cantidad: 150 },
            { nombre: "Producto B", cantidad: 120 },
            { nombre: "Producto C", cantidad: 100 },
            { nombre: "Producto D", cantidad: 85 },
        ]
    },
    { 
        fecha: "Mar 24/12", 
        prediccion: 53000, 
        confianza: 92,
        productos: [
            { nombre: "Producto A", cantidad: 180 },
            { nombre: "Producto B", cantidad: 140 },
            { nombre: "Producto C", cantidad: 110 },
            { nombre: "Producto D", cantidad: 95 },
        ]
    },
    { 
        fecha: "Mié 25/12", 
        prediccion: 72000, 
        confianza: 88,
        productos: [
            { nombre: "Producto A", cantidad: 240 },
            { nombre: "Producto B", cantidad: 200 },
            { nombre: "Producto C", cantidad: 160 },
            { nombre: "Producto D", cantidad: 120 },
        ]
    },
    { 
        fecha: "Jue 26/12", 
        prediccion: 65000, 
        confianza: 90,
        productos: [
            { nombre: "Producto A", cantidad: 210 },
            { nombre: "Producto B", cantidad: 170 },
            { nombre: "Producto C", cantidad: 150 },
            { nombre: "Producto D", cantidad: 110 },
        ]
    },
    { 
        fecha: "Vie 27/12", 
        prediccion: 58000, 
        confianza: 91,
        productos: [
            { nombre: "Producto A", cantidad: 190 },
            { nombre: "Producto B", cantidad: 150 },
            { nombre: "Producto C", cantidad: 130 },
            { nombre: "Producto D", cantidad: 100 },
        ]
    },
    { 
        fecha: "Sáb 28/12", 
        prediccion: 69000, 
        confianza: 89,
        productos: [
            { nombre: "Producto A", cantidad: 230 },
            { nombre: "Producto B", cantidad: 180 },
            { nombre: "Producto C", cantidad: 160 },
            { nombre: "Producto D", cantidad: 115 },
        ]
    },
    { 
        fecha: "Dom 29/12", 
        prediccion: 48000, 
        confianza: 93,
        productos: [
            { nombre: "Producto A", cantidad: 160 },
            { nombre: "Producto B", cantidad: 130 },
            { nombre: "Producto C", cantidad: 100 },
            { nombre: "Producto D", cantidad: 90 },
        ]
    },
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

type Producto = {
    nombre: string;
    cantidad: number
}

type DiaAgrupado = {
    fecha: string
    productos: Producto[]
}

const Results = () => {
    const { data } = useDataContext()
    
    // Check if data is empty
    if (!data || data.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 animate-fade-in">
                <div className="text-center space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">
                        No hay predicciones disponibles
                    </h2>
                    <p className="text-muted-foreground">
                        Debes realizar una predicción antes de ver los resultados
                    </p>
                </div>
                <Card className="max-w-md shadow-card border-border">
                    <CardContent className="pt-6">
                        <p className="text-sm text-muted-foreground text-center">
                            Ve a la página de entrenamiento y carga tus datos para generar predicciones de ventas.
                        </p>
                    </CardContent>
                </Card>
            </div>
        )
    }
    
    const groupByDateObj = data.reduce((acc: Record<string, Producto[]>, item: any) => {
        const date = item.fecha_prediccion

        if (!acc[date]) {
            acc[date] = []
        }

        acc[date].push({
            nombre: item.nombre,
            cantidad: item.pred_cantidad
        })

        return acc
    }, {})

    const groupByDate: DiaAgrupado[] = Object.entries(groupByDateObj).map(
        ([fecha, productos]: [string, Producto[]]) => ({
            fecha,
            productos
        })
    )
    
    // Get all unique products
    const allProducts: string[] = Array.from(
        new Set(data.map((item: any) => item.nombre as string))
    )
    
    const productsToShow: string[] = allProducts.slice(0, 10)
    
    const getDiaSemanaFromDate = (fechaString: string) => {
        const dias = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
        const fecha = new Date(fechaString);

        const diaSemana = dias[fecha.getDay()];

        const dia = fecha.getDate().toString().padStart(2, "0");
        const mes = (fecha.getMonth() + 1).toString().padStart(2, "0");

        return `${diaSemana} ${dia}/${mes}`;
    }
    
    const getCantidadForProductAndDate = (productName: string, fecha: string) => {
        const item = data.find((d: any) => d.nombre === productName && d.fecha_prediccion === fecha)
        return item ? Math.round(item.pred_cantidad) : 0
    }

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
            <Card className="shadow-card border-border">
                <CardHeader>
                    <CardTitle>Predicciones por Producto</CardTitle>
                    <CardDescription>
                        Cantidades predichas para cada producto en los próximos días
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-[400px]">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-border">
                                        <th className="text-left py-3 px-4 font-semibold text-sm">Producto</th>
                                        {groupByDate.map((day, index) => (
                                            <th key={index} className="text-center py-3 px-2 font-semibold text-sm">
                                                {getDiaSemanaFromDate(day.fecha)}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {productsToShow.map((productName, pIndex) => (
                                        <tr key={pIndex} className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
                                            <td className="py-3 px-4 font-medium">{productName}</td>
                                            {groupByDate.map((day, dIndex) => (
                                                <td key={dIndex} className="text-center py-3 px-2">
                                                    <span className="font-bold text-primary">
                                                        {getCantidadForProductAndDate(productName, day.fecha)}
                                                    </span>
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card>
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
        </div>
    )
}

export default Results;
