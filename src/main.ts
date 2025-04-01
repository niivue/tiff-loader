import './niivue.css'
import { setupNiivue, loadFromUrlParams } from './setupNiivue.js'
async function main() {
  window.addEventListener('DOMContentLoaded', () => {
    loadFromUrlParams()
  })
  await setupNiivue(document.querySelector('#nvCanvas')!)
}

main()
