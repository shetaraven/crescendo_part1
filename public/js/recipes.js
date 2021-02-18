const xhr = new XMLHttpRequest();
xhr.open('GET', 'http://localhost:3001/recipes');
xhr.responseType = 'json';
xhr.onload = function(e) {
    if (this.status == 200) {
        let appendhtml = '';
        let info = this.response;
        info.forEach(process);
        document.getElementById("recipes_list_container").innerHTML += appendhtml;
    }
};
xhr.send();

function process(item,index){
    appendhtml += `<a href="/views/recipe_page.html?uid=${item.uuid}" key="${index}"><li class="recipes__item" data-uid="'+item.uuid+'">`
    appendhtml += `<div class="recipes__item__container"><div class="recipes__item__image">`
    appendhtml += `<img src="${item.images.medium}"></div>`
    appendhtml += `<div class="recipes__item__title">${item.title}</div>`
    appendhtml += `<div class="recipes__item__desc">${item.description}</div>`
    appendhtml += `<ul class="recipes__item__etc">`
    appendhtml += `<li title="Preparation Time"><i class="fa fa-clock-o"></i> ${item.prepTime}</li>`
    appendhtml += `<li title="Servings"><i class="fa fa-spoon"></i> ${item.servings}</li>`
    appendhtml += `<li title="Cooking Time"><i class="fa fa-clock-o"></i> ${item.cookTime}</li></ul></div></li></a>`
}