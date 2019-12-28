document.querySelector('#boton').addEventListener('click',function(){
    obtenerDatos();


});

function obtenerDatos(){
    let url = `https://prod-61.westus.logic.azure.com/workflows/984d35048e064b61a0bf18ded384b6cf/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=6ZWKl4A16kST4vmDiWuEc94XI5CckbUH5gWqG-0gkAw
    `;

    const api = new XMLHttpRequest();
    api.open('GET', url, true);

    
    

    api.onreadystatechange = function(){
        if(this.status == 200 && this.readyState == 4){
            let datos = JSON.parse(this.responseText);
            var datos1 = datos.response;            
            var ordenRating = datos1.sort(orden);            
            console.log(ordenRating);            
            
            
            let resultado = document.querySelector('#resultado');
            resultado.innerHTML = '';
            
           
            
        
            for(let item of datos1 ){                
                resultado.innerHTML += `
                <tr> 
                <td>${item.title}</td>
                <td>${item.year}</td>
                <td>${item.rating}</td>
                <td>${item.metascore}</td>
                <td>${item.director}</td>
                </tr>` ; 
            }

            enviarDatos(datos1);
            
                      
        }
        
    }
    api.send();

    
    
}

function orden(a, b){
    if (a.rating < b.rating){
        return 1;
    }
    if(a.rating > b.rating){
        return -1;
    }
    
    return 0;
}

function ordenMeta(a, b){
    if (a.metascore < b.metascore){
        return 1;
    }
    if(a.metascore > b.metascore){
        return -1;
    }
    
    return 0;
}



function enviarDatos(datos2){
    var ordenMetascore = datos2.sort(ordenMeta);
    console.log(ordenMetascore);
    var info = {   "RUT": "20138662-4",   "Peliculas": ordenMetascore } 

    result=$.ajax({
        type: "POST",
        
        url: "https://prod-62.westus.logic.azure.com:443/workflows/779069c026094a32bb8a18428b086b2c/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=o_zIF50Dd_EpozYSPSZ6cWB5BRQc3iERfgS0m-4gXUo",
        data: JSON.stringify(info),
        contentType: 'application/json',
        dataType: 'json',
        async: false
    }).responseText;
    
    console.log(info);
    console.log(result);

   
}
