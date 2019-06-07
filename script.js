const apiKey = '020afd8539254682ba614019eeb6e34c'
const apiId = '30a288fb'
const BASEID = 'https://trackapi.nutritionix.com/v2/search/instant?query='
const header = document.querySelector('h1');

const getBanana = async () => {
  const response = await axios.get(`${BASEID}banana`, {
    "x-app-id": apiId,
    "x-app-key": apiKey,
    "x-remote-user-id": 0
  })
  console.log(response);
}
getBanana();