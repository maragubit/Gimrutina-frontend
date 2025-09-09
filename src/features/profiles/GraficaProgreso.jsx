import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
function GraficaProgreso({data}){
    return(<>
     <ResponsiveContainer className="bg-dark" width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" stroke="white" tickFormatter={(date) => {
    const [year, month, day] = date.split("-"); // ⬅ separa por guion
    return `${day}/${month}/${year}`;           // ⬅ devuelve invertido
  }}
/>
        
        {/* eje izquierdo → peso */}
        <YAxis yAxisId="left"  stroke="red" label={{ value: "Peso (kg)", angle: -90, position: "insideLeft" }} />
        
        {/* eje derecho → reps */}
        <YAxis yAxisId="right"  stroke="green" orientation="right" label={{ value: "Reps", angle: 90, position: "insideRight" }} />
        
        <Tooltip />
        <Legend style={{color:"white"}} />
        
        {/* línea de peso */}
        <Line yAxisId="left" type="monotone" dataKey="weight" stroke="red" activeDot={{ r: 8 }} />
        
        {/* línea de reps */}
        <Line yAxisId="right" type="monotone" dataKey="reps" stroke="green" />
      </LineChart>
    </ResponsiveContainer>
    </>)
}
export default GraficaProgreso;