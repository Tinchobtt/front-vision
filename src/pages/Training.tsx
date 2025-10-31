import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import FileUpload from "@/components/FileUpload"
import DateRangePicker from "@/components/DateRangePicker"
import { useToast } from "@/hooks/use-toast"
import { Sparkles, TrendingUp } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { testAPI } from "../api/services/test"

const Training = () => {
    const [file, setFile] = useState<File | null>(null);
    const [predictionDate, setPredictionDate] = useState<Date>();
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const navigate = useNavigate();

    const handleUpload = async () => {
        if (!file) {
            toast({
                title: "Error",
                description: "Por favor, selecciona un archivo Excel",
                variant: "destructive",
            })
            return
        }

        setIsLoading(true);
        // Simular predicción
        const response = await testAPI(file)

        if(response.status == 200){
            setIsLoading(false)
            toast({
                title: "Predicción completada",
                description: "Los resultados están listos para visualizar.",
            })
            navigate("/resultados")
        }
    }

    const handlePredict = async () => {
        if (!predictionDate) {
            toast({
                title: "Error",
                description: "Por favor, selecciona una fecha para la predicción",
                variant: "destructive",
            })
            return
        }

        setIsLoading(true);
        // Simular predicción
        setTimeout(() => {
            setIsLoading(false)
            toast({
                title: "Predicción completada",
                description: "Los resultados están listos para visualizar.",
            })
            navigate("/resultados")
        }, 2000)
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">
                    Entrenamiento y Predicción
                </h2>
                <p className="text-muted-foreground">
                    Carga tus datos y obtén predicciones de ventas impulsadas por IA
                </p>
            </div>

            <Card className="shadow-card border-border">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            <TrendingUp className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                            <CardTitle>Cargar Datos de Entrenamiento</CardTitle>
                            <CardDescription>
                                Sube un archivo Excel con tus datos históricos de ventas
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <FileUpload 
                        onFileSelect={setFile} 
                    />
                    <Button
                        onClick={handleUpload}
                        disabled={!file || isLoading}
                        className="w-full gradient-primary hover:opacity-90 transition-opacity shadow-glow"
                    >
                        {isLoading ? "Cargando..." : "Entrenar Modelo"}
                    </Button>
                </CardContent>
            </Card>

            <Card className="shadow-card border-border">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center">
                            <Sparkles className="h-4 w-4 text-accent" />
                        </div>
                        <div>
                        <CardTitle>Realizar Predicción</CardTitle>
                        <CardDescription>
                            Selecciona una fecha para predecir las ventas (hasta 7 días)
                        </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <DateRangePicker onDateSelect={setPredictionDate} />
                    <Button
                        onClick={handlePredict}
                        disabled={!predictionDate || isLoading}
                        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground shadow-glow transition-all"
                    >
                        {isLoading ? "Procesando..." : "Generar Predicción"}
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}

export default Training