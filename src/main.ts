import './niivue.css'
import { setupNiivue } from './setupNiivue.js'
document.querySelector('#app')!.innerHTML = `
    <header>
      <label for="dragSelect">Drag</label>
      <select id="dragSelect">
        <option>None</option>
        <option>Contrast</option>
        <option>Measurement</option>
        <option selected>Pan</option>
      </select>
      <label for="smoothCheck">Smooth</label>
      <input type="checkbox" checked="true" id="smoothCheck" />
      <button id="prevBtn">Previous Slice</button>
      <button id="nextBtn">Next Slice</button>
      <button id="aboutBtn">About</button>
    </header>
    <main id="canvas-container">
      <div style="display: flex; width: 100%; height: 100%">
        <canvas id="nvCanvas"></canvas>
      </div>
    </main>
    <footer id="statusText">&nbsp;</footer>
`
setupNiivue(document.querySelector('#nvCanvas')!)
