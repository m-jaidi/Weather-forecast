$(document).ready(function () {

    $("#current_form").submit(function (e) {
        e.preventDefault();

        $("#error").text("");

        let city = $("#city");


        let url = "http://api.openweathermap.org/data/2.5/weather?q=" + city.val() + "&appid=" + "8569139d9e9416ec810993c138e59412" + "&units=metric";


        $.ajax({
            url: url,
            type: "GET",
            dataType: "json",
            success: function (info) {
                $("#country").text(", " + info.sys.country);
                $("#mycity").text(" for " + info.name);
                $("#weather").text(info.weather[0].main);
                $("#desc").html("<img src=https://openweathermap.org/img/w/" + info.weather[0].icon +
                    ".png></img>" + info.weather[0].description);
                $("#temp").html(info.main.temp + " &deg;C");
                $("#pressure").text(info.main.pressure + " hPa");
                $("#humidity").text(info.main.humidity + " %");
                $("#minTemp").html(info.main.temp_min + " &deg;C");
                $("#maxTemp").html(info.main.temp_max + " &deg;C");
                $("#wind_speed").text(info.wind.speed + "m/s");
                $("#wind_direction").html(info.wind.deg + " &deg");
            },


            error: function (error) {
                $("#error").text(error.responseJSON.message);
            }
        });
    });


    $("#forecast_form").submit(function (e) {

        e.preventDefault();
        $('#tbody tr').remove();
        $("#country").text("");
        $("#mycity").text("");
        $("#error").text("");

        let city = $("#city");
        let forecast = $("#forecast");

        if (forecast.val() == "") {
            $("#error").text("cnt from 1 to 17");
        }


        let url = "http://api.openweathermap.org/data/2.5/forecast/daily?q=" + city.val() + "&cnt=" + forecast.val() + "&appid=" + "c10bb3bd22f90d636baa008b1529ee25" + "&units=metric";

        $.ajax({
            url: url,
            type: "GET",
            dataType: "json",
            success: function (info) {
                $("#country").text(", " + info.city.country);
                $("#mycity").text(" for " + info.city.name);
                for (i = 0; i < forecast.val(); i++) {
                    $('#tbody').append('<tr><td><img src=https://openweathermap.org/img/w/' + info.list[i].weather[0].icon +
                        '.png></img><td>'
                        + info.list[i].weather[0].main + '</td>' +
                        '<td>' + info.list[i].weather[0].description +
                        '</td>' + '<td>' + info.list[i].feels_like.morn + '&deg;C</td>' +
                        '<td>' + info.list[i].feels_like.night + '&deg;C</td>' +
                        '<td>' + info.list[i].temp.min + '&deg;C</td>' +
                        '<td>' + info.list[i].temp.max + '&deg;C</td>' +
                        '<td>' + info.list[i].pressure + 'hPa</td>' +
                        '<td>' + info.list[i].humidity + '%</td>' +
                        '<td>' + info.list[i].speed + 'm/s</td>' +
                        '<td>' + info.list[i].deg + '&deg</td>');
                }

            },


            error: function (error) {
                $("#error").text(error.responseJSON.message);
            }

        });
    });
});

