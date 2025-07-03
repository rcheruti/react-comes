import { useListener } from '../src/index'

// ---------------------------------------------------
// ---- Theme service
export const ES_THEME = 'ES_THEME';
export type ES_THEME_TYPE = 'light' | 'dark';
useListener.send(ES_THEME, 'light'); // default value

// ---------------------------------------------------
// ---- Box data
export const ES_BOX_DATA = 'ES_BOX_DATA';
export class BoxData {
  text: string = '';
  height: string = '100px';
  width: string = '100px';

  radiusTop: string = '0px';
  radiusRight: string = '0px';
  radiusBottom: string = '0px';
  radiusLeft: string = '0px';

  shadowX: string = '0px';
  shadowY: string = '0px';
  shadowSize: string = '0px';

  constructor(arg?: Partial<BoxData>) {
    if(!arg) return this;
    for(let key in arg) (this as any)[key] = (arg as any)[key];
  }
}
function valideOrDefault(value: any, min: number, max: number): number {
  const valueP = parseInt(value);
  if( valueP < min ) return min;
  if( valueP > max ) return max;
  if( !valueP && valueP !== 0 ) return min;
  return valueP;
}
export function validateBoxData(box: BoxData) {
  box.height = valideOrDefault(box.height, 100, 500) + 'px';
  box.width = valideOrDefault(box.width, 100, 500) + 'px';
  box.radiusTop = valideOrDefault(box.radiusTop, 0, 100) + 'px';
  box.radiusRight = valideOrDefault(box.radiusRight, 0, 100) + 'px';
  box.radiusBottom = valideOrDefault(box.radiusBottom, 0, 100) + 'px';
  box.radiusLeft = valideOrDefault(box.radiusLeft, 0, 100) + 'px';
  box.shadowX = valideOrDefault(box.shadowX, -100, 100) + 'px';
  box.shadowY = valideOrDefault(box.shadowY, -100, 100) + 'px';
  box.shadowSize = valideOrDefault(box.shadowSize, 0, 100) + 'px';
  return box;
}
const boxDataStr = localStorage.getItem(ES_BOX_DATA);
let boxData = new BoxData();
try {
  boxData = JSON.parse(boxDataStr||'');
} catch(ex: any) { /* nothing */ }
useListener.send(ES_BOX_DATA, validateBoxData(boxData));
useListener.listen(ES_BOX_DATA, async(boxData: BoxData) => {
  localStorage.setItem(ES_BOX_DATA, JSON.stringify(boxData));
});

// ---------------------------------------------------
// ---- Some service to fetch data

export const ES_JOB_EVENT = 'ES_JOB_EVENT';
let counter = 10;
function jobEventLoader(id: string) {
  // show some delay
  setTimeout(() => {
    counter += 5;
    useListener.send(ES_JOB_EVENT, counter);
  }, 1500);
}
useListener.setLoader(ES_JOB_EVENT, jobEventLoader);
