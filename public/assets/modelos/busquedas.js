import axios from "axios";
import path from 'node:path'
import { fileURLToPath } from 'node:url';
import { writeFileSync, readFileSync, existsSync } from 'node:fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class Busquedas {
    historial = [];
    dbPath = './public/assets/db/data.json';

    constructor() {
        this.cargarHistorial();
    }

    async ciudad(lugar = '') {
        const consulta = axios.create({
            baseURL: 'https://api.mapbox.com/search/geocode/v6/forward',
            params: {
                q: `${lugar}`,
                language: 'es', 
                limit: 5,
                'access_token': process.env.MAPBOX_KEY
            }
        });
        const { data } = await consulta.get();
        return data.features.map( (ubicacion) => ({
            id: ubicacion.id,
            lugar: ubicacion.properties.full_address,
            lon: ubicacion.geometry.coordinates[0],
            lat: ubicacion.geometry.coordinates[1] 
        }));
        
    }

    async listadoWeather(lat, lon){
        const consulta = axios.create({
            baseURL: 'https://api.openweathermap.org/data/2.5/weather',
            params: {
                'lat': lat,
                'lon': lon, 
                'appid': process.env.OPEN_WEATHER,
                'units': 'metric'
            }
        });
        const { data } = await consulta.get();
        return {
            clima: data.weather?.[0]?.main,
            temp: data.main?.temp,
            temp_min: data.main?.temp_min,
            temp_max: data.main?.temp_max,
            feels_like: data.main.feels_like
        };
    }

    guardarHistorial = (registro) => {
        this.historial = this.historial.filter(
            ciudad => ciudad.lugar !== registro.lugar
        );
        this.historial.unshift(registro);
        writeFileSync(
            this.dbPath,
            JSON.stringify(this.historial, null, 2)
        );
    };


    cargarHistorial = () => {
        if (!existsSync(this.dbPath)) {
            this.historial = [];
            return;
        }
        const data = readFileSync(this.dbPath, { encoding: 'utf-8' });
        this.historial = JSON.parse(data);
    };

}