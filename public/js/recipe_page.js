let getParams = function (url) {
	let params = {};
	let parser = document.createElement('a');
	parser.href = url;
	let query = parser.search.substring(1);
	let vars = query.split('&');
	vars.forEach(process);
	return params;
};

let specials_obj = [];
const specials = new XMLHttpRequest();
specials.open('GET', 'http://localhost:3001/specials/');
specials.responseType = 'json';
specials.onload = function(e) {
	if (this.status == 200) {
		this.response.forEach(specials_data);
	}
};
specials.send();

let get_params = getParams(window.location.href);
if(get_params.length != 0){
	const recipe = new XMLHttpRequest();
	recipe.open('GET', 'http://localhost:3001/recipes/'+get_params.uid);
	recipe.responseType = 'json';
	recipe.onload = function(e) {
		if (this.status == 200) {
			let info = this.response;
			document.getElementById("banner_img").src = info.images.full;
			document.getElementById("recipe_main_image").src = info.images.medium;
			document.getElementById("recipe_name").innerHTML = info.title;
			document.getElementById("recipe_description").innerHTML = info.description;

			document.getElementById("recipe_servings").innerHTML = `${info.servings}<span>Servings</span>`;
			document.getElementById("recipe_preptime").innerHTML = `${info.prepTime}<span>Preparation Time</span>`;
			document.getElementById("recipe_cooktime").innerHTML = `${info.cookTime}<span>Cooking Time</span>`;

			let ing_elem = '';
			info.forEach(process_details);
			info.ingredients.forEach(process_details);
			document.getElementById("recipe_ingredients").innerHTML = ing_elem;

			let dir_elem = '';
			info.directions.forEach(process_number);

			document.getElementById("recipe_page__directions").innerHTML = dir_elem;
		}
	};
	recipe.send();
}

function process(item,index){
	let pair = item.split('=');
	params[pair[0]] = decodeURIComponent(pair[1]);
}

function specials_data(item,index){
	specials_obj[item.ingredientId] = item;
}

function process_details(item,index){
	if(specials_obj[item[index].uuid]){
		ing_elem += '<li>'+ (info.ingredients[index].amount || '') + ' ' + (info.ingredients[index].measurement ? (info.ingredients[index].measurement + ' of ') : '') +info.ingredients[index].name+'<div class="recipe__ingredients__specials"><p class="type">'+specials_obj[info.ingredients[index].uuid].type+'!</p><p class="title">'+specials_obj[info.ingredients[index].uuid].title+'</p><p class="message">'+specials_obj[info.ingredients[index].uuid].text+'</p></div></li>';
	}else{
		ing_elem += '<li>'+ (info.ingredients[index].amount || '') + ' ' + (info.ingredients[index].measurement ? (info.ingredients[index].measurement + ' of ') : '') +info.ingredients[index].name+'</li>';
	}
}

function process_number(item,index){
	dir_elem += '<li><span class="number">'+ (index+1) +'</span>'+ (item.directions[index].optional ? '(OPTIONAL) ': '') + item.directions[index].instructions+'</li>';
}