import { useListener } from "../src/index";
import { BoxData, ES_BOX_DATA, validateBoxData } from "./service";


export const LeftPanel = () => {
  const boxData = useListener<BoxData>(ES_BOX_DATA);
  function sendBoxData(args: Partial<BoxData>) {
    useListener.emit(ES_BOX_DATA, validateBoxData(new BoxData({ ...boxData, ...args })));
  }

  return (
    <div>
      <div className="container f-col" style={{ gap:'10px' }}>
        <div className="panelTitle">Text</div>
        <textarea value={boxData.text} placeholder="Text of the box..." 
          onChange={ev => sendBoxData({ text: ev.currentTarget.value })} />
      </div>

      <hr />
      <div className="container">
        <div className="panelTitle">Sizes (px)</div>
        <div className="f-row" style={{ gap:'10px' }}>
          <div>
            <label>Height</label>
            <input value={parseInt(boxData.height)} type="number" onChange={ev => sendBoxData({ height: ev.currentTarget.value+`px` })} />
          </div>
          <div>
            <label>Width</label>
            <input value={parseInt(boxData.width)} type="number" onChange={ev => sendBoxData({ width: ev.currentTarget.value+`px` })} />
          </div>
        </div>
      </div>

      <hr />
      <div className="container">
        <div className="panelTitle">Border Radius (px)</div>
        <div className="f-row" style={{ gap:'10px' }}>
          <div>
            <label>Top L</label>
            <input value={parseInt(boxData.radiusTop)} type="number" onChange={ev => sendBoxData({ radiusTop: ev.currentTarget.value+`px` })} />
          </div>
          <div>
            <label>Top R</label>
            <input value={parseInt(boxData.radiusRight)} type="number" onChange={ev => sendBoxData({ radiusRight: ev.currentTarget.value+`px` })} />
          </div>
          <div>
            <label>B Right</label>
            <input value={parseInt(boxData.radiusBottom)} type="number" onChange={ev => sendBoxData({ radiusBottom: ev.currentTarget.value+`px` })} />
          </div>
          <div>
            <label>B Left</label>
            <input value={parseInt(boxData.radiusLeft)} type="number" onChange={ev => sendBoxData({ radiusLeft: ev.currentTarget.value+`px` })} />
          </div>
        </div>
      </div>

      <hr />
      <div className="container">
        <div className="panelTitle">Shadow (px)</div>
        <div className="f-row" style={{ gap:'10px' }}>
          <div>
            <label>X</label>
            <input defaultValue={parseInt(boxData.shadowX)} type="number" onChange={ev => sendBoxData({ shadowX: ev.currentTarget.value+`px` })} />
          </div>
          <div>
            <label>Y</label>
            <input defaultValue={parseInt(boxData.shadowY)} type="number" onChange={ev => sendBoxData({ shadowY: ev.currentTarget.value+`px` })} />
          </div>
          <div>
            <label>Size</label>
            <input defaultValue={parseInt(boxData.shadowSize)} type="number" onChange={ev => sendBoxData({ shadowSize: ev.currentTarget.value+`px` })} />
          </div>
        </div>
      </div>

    </div>
  );
};