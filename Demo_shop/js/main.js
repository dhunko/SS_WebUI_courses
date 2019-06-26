window.lang = 'en';
function init() {
  getTranslations();
  getData();
}

function getData() {
  const url = "data/data.json";

  fetch(url)
  .then(response => {
    return response.json();
  })
  .then(data => {
    // Work with JSON data here - pull this to localStorage
    Builder.build(data);
    localStorage.setItem("productsArr", JSON.stringify(data));
  })
  /*
  var returnObj = JSON.parse(localStorage.getItem("productsArr"));
  console.log(returnObj)*/
}
function getTranslations() {
  const url = "data/translations.json";

  fetch(url)
  .then(response => {
    return response.json();
  })
  .then(data => {
    // Work with JSON data here 
    window.translations = data;
  })
}

export default class Builder {
  constructor(data) {}
  static products (data) {
    const result = [];
        
    data.forEach(element => {
      switch (element.type) {
        case 'cat':
          result.push(new Cat(element));
          break;
        case 'dog':
          result.push(new Dog(element));
          break;
        case 'fish':
          result.push(new Fish(element));
          break;
        case 'bird':
          result.push(new Bird(element));
          break;
        }
    });

    return result;
  }

  static build(data) {
    Card.render(this.products(data));
  }
}

let langControls = document.querySelector('.lang-menu');
langControls.addEventListener("click", function(e){
  let elem = e.target;
  cleanCheckedDay();
  if(elem.classList.contains("item")) elem.classList.toggle("active");
  changLang();
});

function changLang() {
  let activeLang = document.querySelector('.lang-menu .active');
  window.lang = activeLang.outerText;

  let productsDB = JSON.parse(localStorage.getItem("productsArr"));
  Builder.build(productsDB);
  //getData();
}
function cleanCheckedDay() {
  let chEll = document.getElementsByClassName('active');
  if (chEll.length !== 0) {
    for (let i = 0; i < chEll.length; i++) {
      chEll[i].classList.remove("active");
      break;
    }
  }
}



class Card {
  constructor(data) {
    this.data = data;
  }

  static create(el) {
    const rowCards = document.querySelector('.products-container');
    let parentDiv = document.createElement('div'),
        uniqueCartClass = 'card-' + el.id,
        description = '',
        content = '';

    el.link = parentDiv;

    description = '<div class=\"descr\">';
    for(let part in el){
      if (part !== 'name' && part !== 'url' && part !== 'id' && part !== 'type' && part !== 'quantity' && part !== 'link') {
        content += '<p>' + convertToLang(part) + ": " + convertToLang(el[part]) + '</p>';
      }
    }
    function convertToLang(a){
      let result = a;
      for (let pos in window.translations[0]) {
        if (a == pos) {
          (isNaN(1 * a)) ? result = window.translations[0][a][0][window.lang] : result = a;
        }
        if (a == true) {
          result = window.translations[0]['true'][0][window.lang];
        }
        if (a == false) {
          result = window.translations[0]['false'][0][window.lang];
        }
      }
      return result;
    }
    description += content + '</div>';

    el.link = parentDiv;

    parentDiv.classList.add('ui', 'card', uniqueCartClass);
    parentDiv.innerHTML = `<div class="image">
            <img src="${el.url}">
          </div>
          <div class="content">
            <a class="header">${el.name}</a>
            <div class="available">Available at the moment: ${el.quantity}</div>
            ${description}
          </div>`;
    rowCards.appendChild(parentDiv);
  }

  static delete() {
    const rowCards = document.querySelector('.products-container');
    while(rowCards.hasChildNodes()){
        rowCards.removeChild(rowCards.firstChild);
    }
  }

  static render(data) {
    //window.products = [];
    this.delete();
    data.forEach((el)=>{
      // build Card
      //window.products.push(this.create(el));
      this.create(el);
    });
  }
}




// all animal classes
class Animal {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.type = data.type;
    this.gender = data.gender;
    this.quantity = data.quantity;
    this.url = data.url;
    this.price = data.price;
    this.age = data.age;
    this.weight = data.weight;
    this.life_length = data.life_length;
    this.color = data.color;
    this.rapacity = data.rapacity;
  }
}
class Dog extends Animal {
  constructor(data) {
    super(data);
    this.fur = data.fur;
    this.short_tail = data.short_tail;
    this.short_legs = data.short_legs;
    this.pedigree = data.pedigree;
    this.speciality = data.speciality;
  }
}
class Cat extends Animal {
  constructor(data) {
    super(data);
    this.fur = data.fur;
    this.short_tail = data.short_tail;
    this.short_legs = data.short_legs;
    this.pedigree = data.pedigree;
    this.straight_ears = data.straight_ears;
  }
}
class Bird extends Animal {
  constructor(data) {
    super(data);
    this.can_fly = data.can_fly;
    this.can_speak = data.can_speak;
    this.can_sing = data.can_sing;
  }
}
class Fish extends Animal {
  constructor(data) {
    super(data);
    this.need_solted_water = data.need_solted_water;
    this.area = data.area;
  }
}



init();