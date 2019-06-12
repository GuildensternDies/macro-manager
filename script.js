
const PATH = 'https://api.edamam.com/api/nutrition-data';
const APP_ID = '4595eb4a';
const APP_KEY = '7729cdb5d62a9d271ec1ed70c865f4df'
const macroButton = document.querySelector('#macros');
const macroList = document.querySelector('#macro-list');
const cals = document.querySelector('#cals');
const carbs = document.querySelector('#carbs');
const protein = document.querySelector('#protein');
const fats = document.querySelector('#fats');
const info = document.querySelector('#info');
const food = document.querySelector('#food');
const foodButton = document.querySelector('#foodButton');
const foodInfo = document.querySelector('#food-info');
const restart = document.querySelector('#restart');
const burger = document.querySelector('#burger');
const lettuce = document.querySelector('#lettuce');
const worksLink = document.querySelector('#works');
const tryLink = document.querySelector('#try');
let newCal = 0;
let newPro = 0;
let newCarb = 0;
let newFat = 0;
let foodInput = '';
const localCal = localStorage.getItem("Calories");
const localP = localStorage.getItem("Protein");
const localCar = localStorage.getItem("Carbs");
const localF = localStorage.getItem("Fats");
const localFood = localStorage.getItem('FoodInput');
const localNCal = localStorage.getItem('NewCal');
const localNP = localStorage.getItem('NewPro');
const localNCar = localStorage.getItem('NewCarb');
const localNF = localStorage.getItem('NewFat');
if (typeof localCal === 'string' && typeof localFood === 'string') {
  info.innerHTML = `
    <p>Calorie goals: ${localNCal} out of ${localCal}</p>
    <p>Protein goals: ${localNP} out of ${localP} grams</p>
    <p>Carb goals: ${localNCar} out of ${localCar} grams</p>
    <p>Fats goals: ${localNF} out of ${localF} grams</p>
  `
} else if (typeof localCal === 'string') {
  info.innerHTML = `
    <p>Calorie goals: ${0} out of ${localCal}</p>
    <p>Protein goals: ${0} out of ${localP} grams</p>
    <p>Carb goals: ${0} out of ${localCar} grams</p>
    <p>Fats goals: ${0} out of ${localF} grams</p>
  `
} else {
  info.innerHTML = '';
}

const pullData = async () => {
  if (info.innerHTML === '') {
    alert('Please enter your macro goals first!')
    return;
  }
  foodInfo.innerHTML = '';
  let response = await axios.get(`${PATH}?app_id=${APP_ID}&app_key=${APP_KEY}&ingr=${food.value}`)
  const { PROCNT, CHOCDF, FAT } = response.data.totalNutrients;
  newCal += response.data.calories;
  PROCNT ? newPro += PROCNT.quantity : newPro += 0;
  CHOCDF ? newCarb += CHOCDF.quantity : newCarb += 0;
  FAT ? newFat += FAT.quantity : newFat += 0;
  if (foodInput == '') {
    foodInput += `${food.value} `;
  } else {
    foodInput += `, ${food.value} `
  }
  localStorage.setItem('FoodInput', `${foodInput}`);
  localStorage.setItem('NewCal', `${newCal}`);
  localStorage.setItem('NewPro', `${Math.round(newPro)}`);
  localStorage.setItem('NewCarb', `${Math.round(newCarb)}`)
  localStorage.setItem('NewFat', `${Math.round(newFat)}`)
  const localFood = localStorage.getItem('FoodInput');
  const localNCal = localStorage.getItem('NewCal');
  const localNP = localStorage.getItem('NewPro');
  const localNCar = localStorage.getItem('NewCarb');
  const localNF = localStorage.getItem('NewFat');
  foodInfo.innerHTML = `
    <p>Foods: ${localFood}</p>
    <p>Calories: ${localNCal}</p>
  ${ PROCNT ? `<p>Protein: ${localNP} grams</p>` : `<p>Protein: 0 grams</p>`}
  ${ CHOCDF ? `<p>Carbs: ${localNCar} grams</p>` : `<p>Carbs: 0 grams</p>`}
  ${ FAT ? `<p>Fats: ${localNF} grams</p>` : `<p>Fats: 0 grams</p>`}
  `;
  food.value = '';
  info.innerHTML = `
    <p>Calorie goals: ${newCal} out of ${cals.value}</p>
    <p>Protein goals: ${Math.round(newPro)} out of ${protein.value} grams</p>
    <p>Carb goals: ${Math.round(newCarb)} out of ${carbs.value} grams</p>
    <p>Fats goals: ${Math.round(newFat)} out of ${fats.value} grams</p>
  `
}
const storeMacros = () => {
  if (cals.value === '' || protein.value === '' || carbs.value === '' || fats.value === '') {
    alert('Please fill in all fields.')
    return;
  }
  if (isNaN(cals.value) || isNaN(carbs.value) || isNaN(protein.value) || isNaN(fats.value)) {
    alert('Please enter numbers only')
    return;
  }
  localStorage.setItem("Calories", `${cals.value}`);
  localStorage.setItem("Protein", `${protein.value}`);
  localStorage.setItem("Carbs", `${carbs.value}`);
  localStorage.setItem("Fats", `${fats.value}`);
  const localCal = localStorage.getItem("Calories");
  const localP = localStorage.getItem("Protein");
  const localCar = localStorage.getItem("Carbs");
  const localF = localStorage.getItem("Fats");
  info.innerHTML = `
    <p>Calorie goals: ${0} out of ${localCal}</p>
    <p>Protein goals: ${0} out of ${localP} grams</p>
    <p>Carb goals: ${0} out of ${localCar} grams</p>
    <p>Fats goals: ${0} out of ${localF} grams</p>
  `
}
const clearStorage = () => {
  localStorage.clear();
  window.location.reload();
}
const makeBurger = () => {
  burger.style.display = "block";
}
const makeLettuce = () => {
  lettuce.style.display = "block";
}
const eatBurger = () => {
  burger.style.display = "none";
}
const eatLettuce = () => {
  lettuce.style.display = "none";
}

macroButton.addEventListener('click', storeMacros);
foodButton.addEventListener('click', pullData);
restart.addEventListener('click', clearStorage);
worksLink.addEventListener('mouseover', makeBurger);
tryLink.addEventListener('mouseover', makeLettuce);
worksLink.addEventListener('mouseleave', eatBurger);
tryLink.addEventListener('mouseleave', eatLettuce);