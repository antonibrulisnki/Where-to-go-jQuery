$(function() {
    // Najpierw pobieramy z z pilku db.json tablice places w której znajdują sę nasze elementy
    var url = "http://localhost:3000";
    var tableChild = $('table').children('tr');
    console.log(tableChild);
    $.ajax({
        method: "GET",
        url: url + "/places",
        dataType: "json"
    }).done(function(response) {
        //następnie iterujemy po otrzymanej tablicy aby dostać się po kolei do kazdego z elementów
        for (var i = 0; i < response.length; i++) {
            // console.log(response[i].id);
            var idNumber = i + 1;
            //teraz wygenerujemy nowe elementy w DOMie dzięki którym odczytam na stronie zawartość pliku JSON
            var tdAppend = $('<tr><td>' + response[i].id + '</td><td>' + response[i].northSouth + '</td><td>' + response[i].eastWest + '</td><td>' + response[i].name + '</td><td><input id="' + idNumber + '" class="button delate" type="button" value="Delete"</td></tr>');
            $('table').append(tdAppend);
        };
        //teraz tworzymy funkcje usuwania elementu w przycisku Delate
        $('.delate').on('click', function(event) {
            event.preventDefault();
            alert('The element with id ' + event.target.id + ' has just been removed.')
            $.ajax({
                method: "DELETE",
                url: url + "/places/" + event.target.id,
                dataType: "json"
            }).done(function(response) {
                console.log(response);
            });
            //tutaj odświeżamy stronę tak aby użytkownik od razu widział efekt swojego działania
            location.reload();
        })
    });
    //teraz należy stworzyć event który pozwoli nam na dodanie nowego elementu do naszego pliku JSON
    $('#add').on('click', function(event) {
        event.preventDefault();
        //pobieramy sobie do zmiennych wartości które użytkownik podał w polach tekstowych
        var description = $('#description').val();
        var northSouth = parseInt($('#northSouth').val());
        var eastWest = parseInt($('#eastWest').val());
        //na podstawie ilość elementów tr w DOM automatycznie wyznaczamy ID nowego elementu
        var newIdNumber = $("table tr").length;

        // !!! W tym miejscu popełniłem błąd, powinienem pobrać tablice i na nowo nadać elementom ID
        // następnie przy pomocy PUT umiescić nową tablice w miejsce starej z uporządkowanymi numerami
        //teraz gdy usuniemy element ze środka listy wszystko się krzaczy i trzbea intereniować w pliku JSON
        //niestety zabrakło mi czasu na dokończenie tego zadania - zbyt późno zorientowałem się w błędzie więc zostawiam tak

        //sprawdzamy czy aby na pewno podane przez użytkownika wartości nam odpowiadają
        if (northSouth >= -90 && northSouth <= 90 && eastWest >= -180 && eastWest <= 180) {
            alert("The adding of the place was successful.")
                //umieszczamy wartości w zmiennej która jest obiektem spreparowanym tak by pasował formą do naszego pliku JSON
            var newPleace = {
                id: newIdNumber,
                northSouth: northSouth,
                eastWest: eastWest,
                name: description
            };
            //za pomocą metody POST dodajemy nowy element do naszego pliku JSON 
            $.ajax({
                method: "POST",
                url: url + "/places",
                dataType: "json",
                data: newPleace
            }).done(function(response) {
                console.log(response);
            });
            //i odświeżamy stronę żeby pokazać zmianę użytkownikowi
            location.reload();
        } else {
            alert("You gave the wrong coordinates. Max North/South property is 90/-90. Max East/West property is 180/-180. Change them.")
        }

    });
});