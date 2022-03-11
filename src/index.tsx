import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot, useRecoilSnapshot } from 'recoil';
import reportWebVitals from './reportWebVitals';
import App from './App';
import './index.css';

function DebugObserver() {
  const snapshot = useRecoilSnapshot();
  useEffect(() => {
    console.debug('The following atoms were modified:');
    // @ts-ignore
    for (const node of snapshot.getNodes_UNSTABLE({ isModified: true })) {
      console.debug(node.key, snapshot.getLoadable(node));
    }
  }, [snapshot]);
  return null;
}

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <DebugObserver />
      <App/>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
