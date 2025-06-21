import { useListener } from "../src/index";
import { BoxData, ES_BOX_DATA, ES_THEME } from "./service";


export const CentralPanel = () => {
  const theme = useListener<BoxData>(ES_THEME);
  const boxData = useListener<BoxData>(ES_BOX_DATA);
  const styles = {
    height: boxData.height,
    width: boxData.width,
    borderRadius: `${boxData.radiusTop} ${boxData.radiusRight} ${boxData.radiusBottom} ${boxData.radiusLeft}`,
    boxShadow: `${boxData.shadowX} ${boxData.shadowY} ${boxData.shadowSize} var(--box-shadow)`,
  };

  return (
    <div className="f-col f-center f-align-center">
      <div className="mainBox" style={styles}>{ boxData.text || '' }</div>
    </div>
  );
};