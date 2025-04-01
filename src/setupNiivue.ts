import { Niivue, SHOW_RENDER } from '@niivue/niivue'
import { tiff2nii } from './lib/loader.js'
//import { Niivue, NVImage, NVMesh, NVMeshLoaders, SHOW_RENDER, DRAG_MODE } from './niivue/index.ts'
      
export async function setupNiivue(element: HTMLCanvasElement) {
  dragSelect.onchange = function () {
    const drag = this.options[this.selectedIndex].text
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
  smoothCheck.onchange = function () {
    nv.setInterpolation(!this.checked)
  }
  prevBtn.onclick = async function () {
     nv.moveCrosshairInVox(0, 0, -1)
  }
  nextBtn.onclick = async function () {
     nv.moveCrosshairInVox(0, 0, 1)
  }
  aboutBtn.onclick = async function () {
    alert(`NiiVue visualization`)
  }
  const onLocationChange = (data) => {
    statusText.innerHTML = '&nbsp;&nbsp;' + data.string + ` slice: ${data.vox[2]+1}/${nv.back.dims[3]}`
  }

  const nv = new Niivue({onLocationChange: onLocationChange})
  window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search)
    const imageUrlParsed = params.get('image')
    //let imageUrl = './pcasl.nii.gz'
    let imageUrl = './mni.tiff'
    if (imageUrlParsed) {
     console.log('Image URL detected:', imageUrlParsed)
     // Replace this with your actual image loading function
     imageUrl = imageUrlParsed
    }
    var volumeList1 = [
      {
        url: imageUrl,
        limitFrames4D: 5
      },
    ]
    nv.loadVolumes(volumeList1)
  })
  // supply loader function, fromExt, and toExt (without dots)
  nv.useLoader(tiff2nii, 'tif', 'nii')
  nv.useLoader(tiff2nii, 'tiff', 'nii')
  nv.useLoader(tiff2nii, 'lsm', 'nii')
  nv.useLoader(tiff2nii, 'tf8', 'nii')
  nv.useLoader(tiff2nii, 'btf', 'nii')
  await nv.attachToCanvas(element)

  nv.onImageLoaded = (volume) => {
    nv.setVolumeRenderIllumination(0)
    if (nv.volumes[0].hdr.dims[3] > 1) {
      prevBtn.style.display = 'inline-block'
      nextBtn.style.display = 'inline-block'
      if (nv.opts.is2DSliceShader) {
        nv.setSliceType(nv.sliceTypeAxial)
        nv.setVolumeRenderIllumination(-1)
      } else {
        nv.setSliceType(nv.sliceTypeMultiplanar)
      }
    } else {
      prevBtn.style.display = 'none'
      nextBtn.style.display = 'none'
      nv.setSliceType(nv.sliceTypeAxial)
    }
  }
  dragSelect.onchange()
  nv.setSliceType(nv.sliceTypeMultiplanar)
  nv.graph.autoSizeMultiplanar = true
  nv.graph.normalizeValues = false
  nv.graph.opacity = 1.0
  nv.opts.multiplanarShowRender = SHOW_RENDER.ALWAYS
}
