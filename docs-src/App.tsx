import { ES_THEME, ES_THEME_TYPE } from "./service";
import { StatusBar } from "./status-bar";
import { useListener } from '../src/index'
import { LeftPanel } from "./left-panel";
import { CentralPanel } from "./central-panel";


export const App = () => {
  const theme = useListener<ES_THEME_TYPE>(ES_THEME);

  return (
    <div id="app" className={`${theme} f-col`}>
      <div className="container mainTitle f-nogrow f-row">
        <div className="">React ComES Example</div>
        <div className="f-nogrow f-row" style={{ gap:'6px' }}>
          <div>Theme:</div>
          <div className="buttonBox">
            <button className={theme === 'light' ? 'active':''} 
              onClick={() => useListener.send(ES_THEME,'light')}>Light</button>
            <button className={theme === 'dark' ? 'active':''} 
              onClick={() => useListener.send(ES_THEME,'dark')}>Dark</button>
          </div>
        </div>
      </div>
      <div className="mainArea f-row">
        <div className="f-nogrow f-col">
          <LeftPanel />
        </div>
        <div className="f-col">
          <CentralPanel />
        </div>
      </div>
      <div className="statusBar f-nogrow f-row f-align-center">
        <StatusBar />
      </div>
    </div>
  );
};