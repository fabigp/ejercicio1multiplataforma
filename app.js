import express from 'express'
import path from 'node:path'
import { fileURLToPath } from 'node:url';
import hbs from 'hbs';
import dotenv from 'dotenv'
import { Busquedas } from './public/assets/modelos/busquedas.js';

dotenv.config()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = process.env.PORT;
const busquedas = new Busquedas();

app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'views', 'partials'));

app.use(express.static('public'));
app.use(express.json());

app.get('/api/ciudades', async (req, res) => {
    try {
        const { nombre } = req.query;
        const ciudades = await busquedas.ciudad(nombre);
        res.json(ciudades);
    } catch (error) {
        res.status(500).json({ error: 'Error buscando ciudades' });
    }
});

app.get('/api/weather', async (req, res) => {
    try {
        const { lat, lon } = req.query;
        const clima = await busquedas.listadoWeather(lat, lon);
        res.json(clima);
    } catch (error) {
        res.status(500).json({ error: 'Error obteniendo clima' });
    }
});

app.post('/api/historial', (req, res) => {
    const registro = req.body;
    busquedas.guardarHistorial(registro);
    res.json({ ok: true });
});

app.get('/api/historial', (req, res) => {
    res.json(busquedas.historial);
});


app.get('/', (request, response) => {
    response.render('home');
});

app.get('/historial', (req, res) => {
    res.render('historial', {
        historial: busquedas.historial
    });
});

app.get('/home', (request, response) => {
    response.render('home');
});

app.get(/.*/, (request, response) => {
    response.sendFile(path.resolve(__dirname, 'public/404.html'));
});

app.listen(port, () => {
    console.log("Escuchando ahora el puerto ", port);
});
