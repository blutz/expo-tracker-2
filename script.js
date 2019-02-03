const dtla = '806_0_var0'
const sm = '806_1_var0'
const compareNumbers = (a, b) => a < b

async function getPredictions() {
  const predictions = await
    (await fetch('http://api.metro.net/agencies/lametro-rail/stops/80134/predictions/')).json()
  let ret = { sm: [], dtla: [] }
  predictions.items.forEach(item => {
    if(item.run_id === dtla) {
      ret.dtla.push(item.minutes)
    }
    else {
      ret.sm.push(item.minutes)
    }
  })
  ret.sm.sort(compareNumbers)
  ret.dtla.sort(compareNumbers)
}

getPredictions()
