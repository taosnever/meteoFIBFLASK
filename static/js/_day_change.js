var dias = new Array(7);
dias[0] = 'Domingo';
dias[1] = 'Lunes';
dias[2] = 'Martes';
dias[3] = 'Miércoles';
dias[4] = 'Jueves';
dias[5] = 'Viernes';
dias[6] = 'Sábado';

var meses = new Array(12);
meses[0] = 'Enero';
meses[1] = 'Febrero';
meses[2] = 'Marzo';
meses[3] = 'Abril';
meses[4] = 'Mayo';
meses[5] = 'Junio';
meses[6] = 'Julio';
meses[7] = 'Agosto';
meses[8] = 'Setiembre';
meses[9] = 'Octubre';
meses[10] = 'Noviembre';
meses[11] = 'Diciembre';


function comprueba_dia(dia) {
    'use strict';
    dia = dia - 1;
    if (dia < 0) {
        dia = 6;
    }
    return dia;
}

$(document).ready(function () {
    'use strict';
    var hoy = new Date(),
        dia_anterior = comprueba_dia(hoy.getDay()),
        i,
        horaElem;
    
    /* Mostar el dia actual */
    $('#hoy').text(dias[hoy.getDay()] + ' ' + hoy.getDate() + ' de ' + meses[hoy.getMonth()]);
    
    /* Añadir tantos elementos como horas pasadas */
    for (i = 0; i <= hoy.getHours(); i += 1) {
        /*horaElem = '<a href="#!"><p><strong>' + i + ':00</strong></p></a>';*/
        if (i === hoy.getHours()) {
            $('<a href="#!"><p><strong>' + i + ':00<table class="table tableVal"><thead><th>Temperatura</th><th>Humedad</th><th>Presión atmosférica</th></thead><tbody><td>23º</td><td>60%</td><td>1027.31 hPa</td></tbody></table></strong></p></a>').addClass('list-group-item active').appendTo('#horas');
        } else {
            $('<a href="#!"><p><strong>' + i + ':00</strong></p></a>').addClass('list-group-item').appendTo('#horas');
        }
    }
    
    /* Parametros meteorologicos para cada hora mostrados al hacer click */
    $('#horas').on('click', 'a', function () {
        $('.active').removeClass('active');
        $('.tableVal').remove();
        $(this).append('<table class="table tableVal"><thead><th>Temperatura</th><th>Humedad</th><th>Presión atmosférica</th></thead><tbody><th>23º</th><th>60%</th><th>1027.31 hPa</th></tbody></table>');
        $(this).addClass('active');
    });
    
    /* Ajustar adecuadamente la tabla de nediciones con los ultimos 7 dias */
    $('#d7').text(dias[hoy.getDay()]);
    $('#d6').text(dias[dia_anterior]);
    dia_anterior = comprueba_dia(dia_anterior);
    $('#d5').text(dias[dia_anterior]);
    dia_anterior = comprueba_dia(dia_anterior);
    $('#d4').text(dias[dia_anterior]);
    dia_anterior = comprueba_dia(dia_anterior);
    $('#d3').text(dias[dia_anterior]);
    dia_anterior = comprueba_dia(dia_anterior);
    $('#d2').text(dias[dia_anterior]);
    dia_anterior = comprueba_dia(dia_anterior);
    $('#d1').text(dias[dia_anterior]);
});
