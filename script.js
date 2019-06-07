
const PATH = 'https://api.edamam.com/api/nutrition-data';
const APP_ID = '76b45435';
const APP_KEY = '2427510b4cb99441c4a8188e544c070d'
const pulldata = async () => {
  let response = await axios.get(`${PATH}?app_id=${APP_ID}&app_key=${APP_KEY}&ingr=one%20banana`)

  console.log(response);

}
pulldata();