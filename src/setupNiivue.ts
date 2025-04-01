import { Niivue, SHOW_RENDER } from '@niivue/niivue'
import { tiff2nii } from './lib/loader.js'
//import { Niivue, NVImage, NVMesh, NVMeshLoaders, SHOW_RENDER, DRAG_MODE } from './niivue/index.ts'

export async function setupNiivue(element: HTMLCanvasElement) {
  const dragSelect = document.getElementById('dragSelect') as HTMLSelectElement
  dragSelect.onchange = function () {
    const drag = dragSelect.options[dragSelect.selectedIndex].text
    if (drag === 'None') {
      nv.opts.dragMode = nv.dragModes.none
    } else if (drag === 'Contrast') {
      nv.opts.dragMode = nv.dragModes.contrast
    } else if (drag === 'Measurement') {
      nv.opts.dragMode = nv.dragModes.measurement
    } else if (drag === 'Pan') {
      nv.opts.dragMode = nv.dragModes.pan
    }
  }

  const onLocationChange = (data) => {
    const statusText = document.getElementById('statusText') as HTMLDivElement
    statusText.innerHTML = '&nbsp;&nbsp;' + data.string + ` slice: ${data.vox[2] + 1}/${nv.back.dims[3]}`
  }

  const nv = new Niivue()
  nv.onLocationChange = onLocationChange
  // supply loader function, fromExt, and toExt (without dots)
  nv.useLoader(tiff2nii, 'tif', 'nii')
  nv.useLoader(tiff2nii, 'tiff', 'nii')
  nv.useLoader(tiff2nii, 'lsm', 'nii')
  nv.useLoader(tiff2nii, 'tf8', 'nii')
  nv.useLoader(tiff2nii, 'btf', 'nii')
  await nv.attachToCanvas(element)
  var volumeList1 = [
    {
      url: './mni.tiff',
      limitFrames4D: 5
    }
  ]
  await nv.loadVolumes(volumeList1)

  nv.onImageLoaded = (volume) => {
    nv.setVolumeRenderIllumination(0)
    if (nv.volumes[0].hdr!.dims[3] > 1) {
      prevBtn.style.display = 'inline-block'
      nextBtn.style.display = 'inline-block'
      // This option is in the zarr branch right?
      // if (nv.opts.is2DSliceShader) {
      //   nv.setSliceType(nv.sliceTypeAxial)
      //   nv.setVolumeRenderIllumination(-1)
      // } else {
      //   nv.setSliceType(nv.sliceTypeMultiplanar)
      // }
    } else {
      prevBtn.style.display = 'none'
      nextBtn.style.display = 'none'
      nv.setSliceType(nv.sliceTypeAxial)
    }
  }
  const smoothCheck = document.getElementById('smoothCheck') as HTMLInputElement
  smoothCheck.onchange = function () {
    nv.setInterpolation(smoothCheck.checked)
  }
  const prevBtn = document.getElementById('prevBtn') as HTMLButtonElement
  prevBtn.onclick = async function () {
    nv.moveCrosshairInVox(0, 0, -1)
  }
  const nextBtn = document.getElementById('nextBtn') as HTMLButtonElement
  nextBtn.onclick = async function () {
    nv.moveCrosshairInVox(0, 0, 1)
  }
  const aboutBtn = document.getElementById('aboutBtn') as HTMLButtonElement
  aboutBtn.onclick = async function () {
    alert(`NiiVue visualization`)
  }
  nv.setSliceType(nv.sliceTypeMultiplanar)
  nv.graph.autoSizeMultiplanar = true
  nv.graph.normalizeValues = false
  nv.graph.opacity = 1.0
  nv.opts.multiplanarShowRender = SHOW_RENDER.ALWAYS
}
