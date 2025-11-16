import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { TrendingUp, DollarSign, Target, Activity } from "lucide-react"
import { useDataContext } from "../context/DataContext"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

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
    
    const groupByDateObj = data.reduce((acc, item) => {
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
        ([fecha, productos]) => ({
            fecha,
            productos: productos as Producto[]
        })
    )
    
    const getDiaSemanaFromDate = (fechaString) => {
        const dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
        const fecha = new Date(fechaString);

        const diaSemana = dias[fecha.getDay()];

        const dia = fecha.getDate().toString().padStart(2, "0");
        const mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
        const anio = fecha.getFullYear();

        return `${diaSemana} - ${dia}/${mes}/${anio}`;
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
                    <CardTitle>Predicciones por Día</CardTitle>
                    <CardDescription>
                        Proyección detallada de ventas por producto para cada día
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                        {groupByDate.map((day, index) => {
                            // const minRange = Math.floor(day.prediccion * 0.92)
                            // const maxRange = Math.floor(day.prediccion * 1.08)
                            return (
                                <AccordionItem key={index} value={`day-${index}`}>
                                    <AccordionTrigger className="hover:no-underline">
                                        <div className="flex items-center justify-between w-full pr-4">
                                            <div className="flex items-center gap-4">
                                                <span className="font-semibold text-base">{getDiaSemanaFromDate(day.fecha)}</span>
                                                {/* <span className="text-sm text-muted-foreground">
                                                    Total: <span className="font-bold text-primary">${day.prediccion.toLocaleString()}</span>
                                                </span> */}
                                            </div>
                                            {/* <div className="flex items-center gap-4">
                                                <span className="text-xs text-muted-foreground">
                                                    Rango: ${minRange.toLocaleString()} - ${maxRange.toLocaleString()}
                                                </span>
                                                <span className={`text-sm font-medium ${
                                                    day.confianza >= 90 ? "text-success" : 
                                                    day.confianza >= 85 ? "text-accent" : 
                                                    "text-muted-foreground"
                                                }`}>
                                                    {day.confianza}% confianza
                                                </span>
                                            </div> */}
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <div className="pt-4">
                                            <h4 className="text-sm font-semibold mb-3 text-muted-foreground">Cantidad Predicha por Producto</h4>
                                            <div className="space-y-2">
                                                {day.productos.map((producto, pIndex) => (
                                                    <div 
                                                        key={pIndex} 
                                                        className="flex items-center justify-between py-2 px-2 rounded-lg bg-secondary/100 hover:bg-secondary/100 transition-colors"
                                                    >
                                                        <span className="font-medium">{producto.nombre}</span>
                                                        <span className="font-bold text-primary">
                                                            {Math.round(producto.cantidad)} unidades
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            )
                        })}
                    </Accordion>
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
