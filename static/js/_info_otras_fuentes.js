
$(document).ready(function () {
    'use strict';
    
    /************** Interpretar información del XML ******************/
    var arrInfoAemet = [];
    $.ajax({
        async: false,
        type: "GET",
        url: "static/xml/aemet.xml",
        dataType: "xml",
        success: function (xml) {
            
            $(xml).find('dia').each(function () {
                var diaInfo = {
                    fecha: $(this).attr('fecha'),
                    horasInfo: []
                };

                $(this).find('temperatura').each(function () {
                    var info = {
                        hora: parseInt($(this).attr('periodo')),
                        temp: parseInt($(this).text())
                    };
                    diaInfo.horasInfo.push(info);
                });
                
                var i = 0;
                $(this).find('humedad_relativa').each(function () {
                    diaInfo.horasInfo[i].hum = parseInt($(this).text());
                    i += 1;
                });
                
                arrInfoAemet.push(diaInfo);
            });
            console.log(arrInfoAemet);
        }
    });
    
    /************** Dibujar la gráfica de comparación ******************/
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

    var hoy = new Date();
    var diaActual = dias[hoy.getDay()] + ' ' + hoy.getDate() + ' de ' + meses[hoy.getMonth()];

/*
    function horasVecGraficoFunc() {
        'use strict';
        var temp = [],
            i;
        //((a < b) ? 2 : 3); i = hoy.getHours() - 11
        for (i = 0; i <= hoy.getHours(); i += 1) {
            temp.push(i);
        }

        return temp;
    }*/
    //var horasVec = horasVecFunc();
    var horasVecGrafico = function () {
        var tmp = [],
            i;
        //((a < b) ? 2 : 3); i = hoy.getHours() - 11
        for (i = 0; i <= hoy.getHours(); i += 1) {
            tmp.push(i);
        }

        return tmp;
    };
    /*
    var tempVecGrafico = function () {
        var tmp = [],
            i;
        
        for (i = 0; i < arrInfoAemet[0].horasInfo.length; i += 1) {
            alert(arrInfoAemet[0].horasInfo[i].temp);
            tmp.push(arrInfoAemet[0].horasInfo[i].temp);
        }
        return tmp;
    };
    */
    function pepe () {
        var tmp = [],
            i;
        alert(arrInfoAemet.length);
        for (i = 0; i < arrInfoAemet[0].horasInfo.length; i += 1) {
            tmp.push(arrInfoAemet[0].horasInfo[i].temp);
        }
        return tmp;
    }
    var tempVecGrafico = pepe();
    console.log(tempVecGrafico);

    $(function () {
        Highcharts.chart('contenedorTemp', {
            title: {
                text: 'Temperatura en Barcelona',
                x: -20 //center
            },
            subtitle: {
                text: diaActual,
                x: -20
            },
            xAxis: {
                categories: horasVecGrafico
            },
            yAxis: {
                title: {
                    text: 'Temperatura (°C)'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                valueSuffix: '°C'
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            series: [{
                name: 'Estación',
                //data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
                data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6, 1.1, 2.2, 3.3, 4.4, 3.3, 2.2, 1.1, 2.2]
            }, {
                name: 'Aemet',
                //data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]  
                data: tempVecGrafico
            }]
        });
    });
});



/*

$(document).ready(function () {
    'use strict';
    var arrInfoAemet = [];
    var nm;
    $.ajax({
        type: "GET",
        url: "xml/aemet.xml",
        dataType: "xml",
        success: function (xml) {
            
            $(xml).find('dia').each(function () {
                var diaInfo = [];
                var fecha = $(this).attr('fecha');


                $(this).find('temperatura').each(function () {
                    var hora = $(this).attr('periodo');
                    hora.temp = $(this).text();
                    alert(hora.temp);
                    diaInfo.push(hora);
                });
                diaInfo.dia = fecha;
                arrInfoAemet.push(diaInfo);
                $("#testDiv").append('<h1>' + diaInfo.dia + '</h1><h2>' + diaInfo + '</h2>');
            });
        }
    });
});

*/
    /*
	$.ajax({
		type: "GET",
		url: "xml/aemet.xml",
		dataType: "xml",
		success: function (xml) {
                $(xml).find('site').each(function(){
				var id = $(this).attr('id');
				var title = $(this).find('title').text();
				var url = $(this).find('url').text();
				$('').html(''+title+'').appendTo('#page-wrap');
				$(this).find('desc').each(function(){
					var brief = $(this).find('brief').text();
					var long = $(this).find('long').text();
					$('').html(brief).appendTo('#link_'+id);
					$('').html(long).appendTo('#link_'+id);
				});
			});
		}
	});
});*/