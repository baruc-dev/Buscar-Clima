const container = document.querySelector('.container');
const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima);
})


function buscarClima(e)
{
    e.preventDefault();

    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;


    if(ciudad === '' || pais === '')
    {
        mostrarError("Ambos campos son obligatorios");

        return;
    }

    consultarAPI(ciudad, pais);




    
}

function mostrarError(mensaje)
{
   

    const alertaexiste = document.querySelector('.bg-red-100')

    if (!alertaexiste)
    {
    const alerta = document.createElement('DIV');

    alerta.classList.add('bg-red-100' ,'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center');

    alerta.innerHTML = 
    `
    <strong class="font-bold">Error!</strong>
    <span class="block">${mensaje}</span>
    `;

    container.appendChild(alerta);


    setTimeout(() => 
    {
        alerta.remove();
    }, 2000 );
    }

}

function mostrarClima(datos)
{
   const temp = parseInt(datos.main.temp - 272.15);
   const climaArreglo = datos.weather;
   const clima = climaArreglo[0].main;
   const tempMin = parseInt(datos.main.temp_min - 272.15);
   const tempMax = parseInt(datos.main.temp_max - 272.15);
   
const actual = document.createElement('p');
actual.innerHTML = `${temp} &#8451;`;
actual.classList.add('font-bold','text-6xl');
const climaImpresa = document.createElement('p');
climaImpresa.classList.add('font-bold', 'text-2xl');
climaImpresa.textContent = clima;
const minimaImpresa = document.createElement('P');
minimaImpresa.textContent = "Temperatura Mínima: " +tempMin;
const maximaImpresa = document.createElement('P');
maximaImpresa.textContent = "Temperatura Máxima: " + tempMax;

const resultadoDiv = document.createElement('DIV');
resultadoDiv.classList.add('text-center', 'text-white', 'resultadodiv');
resultadoDiv.appendChild(actual);
resultadoDiv.appendChild(climaImpresa);
resultadoDiv.appendChild(minimaImpresa);
resultadoDiv.appendChild(maximaImpresa);
resultado.appendChild(resultadoDiv);

const body = document.querySelector('.body');
body.style.backgroundRepeat = 'no-repeat';
body.style.backgroundSize = 'cover';

if(clima === 'Clear' || clima == 'Clouds')
{
    console.log("despejado");
    body.style.backgroundImage = 'url(img/despejado.gif)';
}



   console.log(temp, clima, tempMin, tempMax);
}

function consultarAPI(ciudad, pais)
{
    const appID = '';
    const url = `https://api.openweathermap.org/data/2.5/weather?q= ${ciudad}, ${pais}&appid=${appID}`;

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {
            limpiarHTML();
            if(datos.cod == '404')
            {
                mostrarError("La Ciudad No Existe o Está Mal Escrita");
            }
            else
            {
                mostrarClima(datos);
            }
        }  )
        

}

function limpiarHTML()
{
    const tempAnterior = document.querySelector('.resultadodiv');


    if (tempAnterior)
    {
       tempAnterior.remove();
    }
}