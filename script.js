
const PATH = 'https://api.edamam.com/api/nutrition-data';
const APP_ID = '76b45435';
const APP_KEY = '2427510b4cb99441c4a8188e544c070d'
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
let newCal = 0;
let newPro = 0;
let newCarb = 0;
let newFat = 0;
let foodInput = '';
const localCal = localStorage.getItem("Calories");
const localP = localStorage.getItem("Protein");
const localCar = localStorage.getItem("Carbs");
const localF = localStorage.getItem("Fats");
info.innerHTML = `
<p>Calorie goals: ${0} out of ${localCal}</p>
<p>Protein goals: ${0} out of ${localP} grams</p>
<p>Carb goals: ${0} out of ${localCar} grams</p>
<p>Fats goals: ${0} out of ${localF} grams</p>`


const pullData = async () => {
  if (info.innerHTML === '') {
    alert('Please enter your macro goals first!')
    return;
  }
  foodInfo.innerHTML = '';
  let response = await axios.get(`${PATH}?app_id = ${APP_ID}& app_key=${APP_KEY}& ingr=${food.value} `)
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
  foodInfo.innerHTML = `
  < p > Foods: ${ foodInput}</p >
    <p>Calories: ${newCal}</p>
${ PROCNT ? `<p>Protein: ${Math.round(newPro)} grams</p>` : `<p>Protein: 0 grams</p>`}
${ CHOCDF ? `<p>Carbs: ${Math.round(newCarb)} grams</p>` : `<p>Carbs: 0 grams</p>`}
${ FAT ? `<p>Fats: ${Math.round(newFat)} grams</p>` : `<p>Fats: 0 grams</p>`}
`;
  food.value = '';
  info.innerHTML = `
  < p > Calorie goals: ${ newCal} out of ${cals.value}</p >
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
  localStorage.setItem("Calories", `${cals.value} `);
  localStorage.setItem("Protein", `${protein.value} `);
  localStorage.setItem("Carbs", `${carbs.value} `);
  localStorage.setItem("Fats", `${fats.value} `);
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

macroButton.addEventListener('click', storeMacros);
foodButton.addEventListener('click', pullData);