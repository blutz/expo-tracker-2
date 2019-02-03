const dtlaRoute = '806_0_var0'
const smRoute = '806_1_var0'
const compareNumbers = (a, b) => a < b
const addMinutes = (num) => `${num} min`

async function getPredictions() {
  const predictions = await
    (await fetch('http://api.metro.net/agencies/lametro-rail/stops/80134/predictions/')).json()
  let ret = { sm: [], dtla: [] }
  predictions.items.forEach(item => {
    if(item.run_id === dtlaRoute) {
      ret.dtla.push(item.minutes)
    }
    else {
      ret.sm.push(item.minutes)
    }
  })
  ret.sm.sort(compareNumbers)
  ret.dtla.sort(compareNumbers)
  return ret
}

async function updatePage() {
  const predictions = await getPredictions()
  const textPredictions = { dtla: [], sm: [] }
  textPredictions.dtla = predictions.dtla.map(addMinutes)
  textPredictions.sm = predictions.sm.map(addMinutes)

  const dtla = document.getElementById('dtla')
  const sm = document.getElementById('sm')

  dtla.innerHTML = textPredictions.dtla.join(', ')
  sm.innerHTML = textPredictions.sm.join(', ')
}

updatePage()
