import imgView from './imgView/index.vue'
import XtxSku from './XtxSku/index.vue'

export const componentsPlugn = {
  install(app){
    app.component('XtxSku', XtxSku)
    app.component('imgView', imgView)
  }
}
