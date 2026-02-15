document.getElementById("btnHistorial").addEventListener("click", function() {
    window.location.href = "/historial";
});

const input = document.getElementById("inputCiudad");
const sugerenciasDiv = document.getElementById("sugerencias");

let timeout;

input.addEventListener("input", function(e){

    clearTimeout(timeout);

    const texto = e.target.value;

    if(texto.length < 3){
        sugerenciasDiv.innerHTML = "";
        return;
    }

    timeout = setTimeout(async () => {

        const resp = await fetch(`/api/ciudades?nombre=${texto}`);
        const ciudades = await resp.json();

        mostrarSugerencias(ciudades);

    }, 400);
});

function mostrarSugerencias(ciudades){

    sugerenciasDiv.innerHTML = "";

    ciudades.forEach(ciudad => {

        const div = document.createElement("div");
        div.classList.add("sugerencia-item");
        div.textContent = ciudad.lugar;

        div.addEventListener("click", async () => {

            input.value = ciudad.lugar;

            sugerenciasDiv.innerHTML = "";

            const resp = await fetch(
                `/api/weather?lat=${ciudad.lat}&lon=${ciudad.lon}`
            );

            const clima = await resp.json();

            llenarTabla(ciudad, clima);

            await fetch('/api/historial', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'  
                },
                body: JSON.stringify({
                    lugar: ciudad.lugar,
                    lat: ciudad.lat,
                    lon: ciudad.lon,
                    clima: clima.clima,
                    temp: clima.temp,
                    temp_max: clima.temp_max,
                    temp_min: clima.temp_min,
                    feels_like: clima.feels_like
                })
            });

        });

        sugerenciasDiv.appendChild(div);
    });
}

function llenarTabla(ciudad, clima){

    const tbody = document.getElementById("tablaElementos");

    tbody.innerHTML = `
        <tr>
            <td>${ciudad.lugar}</td>
            <td>${ciudad.lat}</td>
            <td>${ciudad.lon}</td>
            <td>${clima.clima}</td>
            <td>${clima.temp} °C</td>
            <td>${clima.temp_max} °C</td>
            <td>${clima.temp_min} °C</td>
            <td>${clima.feels_like} °C</td>
        </tr>
    `;
}
