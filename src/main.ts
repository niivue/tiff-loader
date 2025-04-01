import './niivue.css'
import { setupNiivue } from './setupNiivue.js'
async function main() {
  // Note: moved the html to the index.html file
  await setupNiivue(document.querySelector('#nvCanvas')!)
}

main()
