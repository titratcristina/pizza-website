var nr_chr; // definita direct in script (nu intr-o functie,deci la incarcarea paginii

window.onload = function () {
	// obiect de tip XMLHttpRequest cu care se pot transmite cereri catre server
	var ajaxRequest = new XMLHttpRequest();


	// la schimbarea starii obiectului XMLHttpRequest (la schimbarea proprietatii readyState)
	/* stari posibile:
	0 - netrimis
	1 - conexiune deschisa
	2 - s-au transmis headerele
	3 - se downleadeaza datele (datele sunt impartite in pachete si el primeste cate un astfel de pachet)
	4 - a terminat
	*/

	ajaxRequest.onreadystatechange = function () {
		//daca am primit raspunsul (readyState==4) cu succes (codul status este 200)
		if (this.readyState == 4 && this.status == 200) {
			//in proprietatea responseText am contintul fiserului JSON
			// document.getElementById("afisJson").innerHTML = this.responseText;
			var obJson = JSON.parse(this.responseText);
			afiseajaJsonTemplate(obJson);
		}
	};

	//deschid o conexiune cu o cerere de tip get catre server
	//json e pus in folderul static "resurse" deci calea e relativa la acel folder (fisierul e la calea absoluta /resurse/json/studenti.json)
	ajaxRequest.open("GET", "/json/mancare.json", true);
	//trimit catre server cererea
	ajaxRequest.send();

	function afiseajaJsonTemplate(obJson) {
		//in acets div voi afisa template-urile   
		let containerPizza = document.getElementById("afisTemplatePizza");
		let containerGustari = document.getElementById("afisTemplateGustari");
		let containerDesert = document.getElementById("afisTemplateDesert");
		let containerBauturi = document.getElementById("afisTemplateBauturi");

		//in textTemplate creez continutul (ce va deveni innerHTML-ul) divului "afisTemplate"
		let textTemplatePizza = "";
		let textTemplateGustari = "";
		let textTemplateDesert = "";
		let textTemplateBauturi = "";

		// parcurg vetorul de studenti din obJson

		//console.log(obJson.length);
		for (let i = 0; i < obJson.length; i++) {
			if (obJson[i].denumire == "pizza") {
				for (let j = 0; j < Object.keys(obJson[i].tipuri).length; j++) {
					console.log(obJson[i].tipuri[j].disponibilitate);
					textTemplatePizza += ejs.render('<div class="col-4 col-sm-12 col-md-12">\
						<div class="card">\
							<div class="container-card">\
								<img class="bigger <% if(!pizza.disponibilitate){ %>grayscale<% } %>" src="<%= pizza.imagine %>" alt="<%= pizza.imagine %>" title="<%= pizza.imagine %>">\
								<button class="favorite btn-card" onclick="changeColor()"><i class="fa fa-heart" aria-hidden="true"></i></button>\
							</div>\
							<h3><%= pizza.nume %></h3>\
                            <p class="pt-3"><%= pizza.ingrediente %></p>\
							<p class="price mt-4 left"> \
							<% if(!pizza.disponibilitate){ %>Indisponibil<% } else{ %> <%= pizza.pret %> lei <% } %> \
							</p> \
                            <button class="btn btn-outline-primary mt-3 right" type="button" <% if(!pizza.disponibilitate){ %>disabled<% } %>>Adaugă în coș</button>\
                        </div>\
                    </div>', {
						pizza: obJson[i].tipuri[j]
					});
				}
			} else if (obJson[i].denumire == "gustari") {
				for (let j = 0; j < Object.keys(obJson[i].tipuri).length; j++) {

					textTemplateGustari += ejs.render('<div class="col-4 col-sm-12 col-md-12">\
                        <div class="card">\
                            <img class="bigger <% if(!gustari.disponibilitate){ %>grayscale<% } %>" src="<%= gustari.imagine %>" alt="<%= gustari.imagine %>" title="<%= gustari.imagine %>">\
                            <h3><%= gustari.nume %></h3>\
                            <p class="pt-3"><%= gustari.descriere %></p>\
                            <p class="price mt-4 left"><%= gustari.pret %> lei</p>\
                            <button class="btn btn-outline-primary mt-3 right" type="button" <% if(!gustari.disponibilitate){ %>disabled<% } %>>Adaugă în coș</button>\
                        </div>\
                    </div>', {
						gustari: obJson[i].tipuri[j]
					});
				}
			} else if (obJson[i].denumire == "desert") {
				for (let j = 0; j < Object.keys(obJson[i].tipuri).length; j++) {

					textTemplateDesert += ejs.render('<div class="col-4 col-sm-12 col-md-12">\
                        <div class="card">\
                            <img class="bigger <% if(!desert.disponibilitate){ %>grayscale<% } %>" src="<%= desert.imagine %>" alt="<%= desert.imagine %>" title="<%= desert.imagine %>">\
                            <h3><%= desert.nume %></h3>\
                            <p class="pt-3"><%= desert.descriere %></p>\
                            <p class="price mt-4 left"><%= desert.pret %> lei</p>\
                            <button class="btn btn-outline-primary mt-3 right" type="button" <% if(!desert.disponibilitate){ %>disabled<% } %>>Adaugă în coș</button>\
                        </div>\
                    </div>', {
						desert: obJson[i].tipuri[j]
					});
				}
			} else if (obJson[i].denumire == "bauturi") {
				for (let j = 0; j < Object.keys(obJson[i].tipuri).length; j++) {

					textTemplateBauturi += ejs.render('<div class="col-4 col-sm-12 col-md-12">\
                        <div class="card">\
                            <img class="bigger <% if(!bauturi.disponibilitate){ %>grayscale<% } %>" src="<%= bauturi.imagine %>" alt="<%= bauturi.imagine %>" title="<%= bauturi.imagine %>">\
                            <h3><%= bauturi.nume %></h3>\
                            <p class="price mt-4 left"><%= bauturi.pret %> lei</p>\
                            <button class="btn btn-outline-primary mt-3 right" type="button" <% if(!bauturi.disponibilitate){ %>disabled<% } %>>Adaugă în coș</button>\
                        </div>\
                    </div>', {
						bauturi: obJson[i].tipuri[j]
					});
				}
			}
		}
		//adaug textul cu afisarea studentilor in container
		containerPizza.innerHTML = textTemplatePizza;
		containerGustari.innerHTML = textTemplateGustari;
		containerDesert.innerHTML = textTemplateDesert;
		containerBauturi.innerHTML = textTemplateBauturi;
	}

	//----------------------------------------------------------------------------------------------------------------- 
	//--------------------------------------------- LOCAL STORAGE ----------------------------------------------------- 
	//-----------------------------------------------------------------------------------------------------------------

	//voi considera in localStorage campurile asociate lui nr_chr si ultim_chr ca fiind "nr" si "ultim".
	//localStorage.getItem("nr") obtine valoarea campului "nr" din localStorage. Daca acest camp nu exista, returneaza null
	//valoarea unei atribuiri de forma (variabila=valoare), va fi valoarea, deci mai jos, ce retruneaza getItem
	if (nr_chr = localStorage.getItem("nr")) //daca nu returneaza null (null se converteste automat la false in expresie booleana)
		nr_chr = parseInt(nr_chr); //in localStorage valorile sunt doar stringuri
	else
		nr_chr = 0; // getItem() a returnat null, deci e prima oara cand am incarcat pagina, sau prima oara dupa ce a fost sters campul "nr" din localStorage, asa ca setez variabila la 0

	//obtinem si ultim_chr
	ultim_chr = localStorage.getItem("ultim"); //daca valoarea nu se gaseste in localStorage, ultim_chr oricum trebuie sa fie null, deci nu mai e nevoie de if


	seteazaInfoDiv(); //functie definita mai jos, care actualizeaza informatia din divul cu id-ul "info"


	window.onkeypress = function (e) {
		//preiau tasta apasata:
		ultim_chr = String.fromCharCode(e.charCode ? e.charCode : e.keyCode);
		nr_chr++; //a crescut numarul de taste apasate

		//actualizez localStorage
		//pentru localStorage.setItem("camp", valoare); daca respectivul camp nu exista, il creeaza si-i seteaza valoarea; iar daca exista deja, il actualizeaza
		localStorage.setItem("ultim", ultim_chr);
		localStorage.setItem("nr", nr_chr);
		seteazaInfoDiv();
	}

	//--------------------------------------------------------------------------------------------------
	//setam si functiile pentru click-ul pe butoane
	var btn1 = document.getElementById("resteaza_numar");
	btn1.onclick = function () {
		//resetez nr_chr
		nr_chr = 0;
		//sterg si din localStorage campul asociat
		localStorage.removeItem("nr");
		seteazaInfoDiv();
	}


	var btn2 = document.getElementById("resteaza_caracter");
	btn2.onclick = function () {
		//resetez ultim_chr
		ultim_chr = null;
		//sterg si din localStorage campul asociat
		localStorage.removeItem("ultim");
		seteazaInfoDiv();
	}

	var btn3 = document.getElementById("resteaza_tot");
	btn3.onclick = function () {
		//resetez nr_chr
		nr_chr = 0;
		//resetez ultim_chr
		ultim_chr = null;
		//sterg si din localStorage campul asociat
		localStorage.clear();
		seteazaInfoDiv();
	}
}

function seteazaInfoDiv() {
	var dv = document.getElementById("info");
	dv.innerHTML = "Numar taste apasate: " + nr_chr + "<br/>Ultimul caracter: " + ultim_chr;
}