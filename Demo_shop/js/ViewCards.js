export default class Card {
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
      if (part !== 'title' && part !== 'url' && part !== 'id' && part !== 'type' && part !== 'quantity' && part !== 'link') {
        content += '<p>' + this.convertToLang(part) + ": " + this.convertToLang(el[part]) + '</p>';
      }
    }
    description += content + '</div>';

    el.link = parentDiv;

    parentDiv.classList.add('ui', 'card', uniqueCartClass);
    parentDiv.innerHTML = `<div class="image">
            <img src="${el.url}">
          </div>
          <div class="content">
            <a class="header">${el.title}</a>
            <!-- <div class="available">Available at the moment: ${el.quantity}</div> -->
            </br>
            ${description}
          </div>`;
    rowCards.appendChild(parentDiv);
  }
  // move this to model
  static convertToLang(a){
    let result = a;
    let translations = JSON.parse(localStorage.getItem("translations"));
    for (let pos in translations[0]) {
      if (a == pos) {
        (isNaN(1 * a)) ? result = translations[0][a][0][window.lang] : result = a;
      }
      if (a == true) {
        result = translations[0]['true'][0][window.lang];
      }
      if (a == false) {
        result = translations[0]['false'][0][window.lang];
      }
    }
    return result;
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

  static cleanCheckedDay() {
    let chEll = document.getElementsByClassName('active');
    if (chEll.length !== 0) {
      for (let i = 0; i < chEll.length; i++) {
        chEll[i].classList.remove("active");
        break;
      }
    }
  }
}
