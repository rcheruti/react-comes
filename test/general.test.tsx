import { test } from 'vitest'
import React, { useEffect, useState } from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { createUseListener } from '../src/index';
import { EventSystem } from 'comes';

// ------------------------------------------

test(`test emit and listen`, async({ expect }) => {
  const ES_USE_LISTENER = 'ES_EMIT_AND_LISTEN';
  const useListener = createUseListener(new EventSystem());

  function App() {
    useListener.emit(ES_USE_LISTENER, 15);
    return (
      <Page />
    );
  }
  function Page() {
    const value = useListener<number>(ES_USE_LISTENER);
    return (
      <div data-value={ value } data-last={ useListener.last(ES_USE_LISTENER) }>Value</div>
    );
  }

  render(<App />);
  // screen.debug();
  const el = await screen.findByText('Value');
  const nodeValue = el.attributes.getNamedItem('data-value');
  expect(nodeValue?.value).toBe("15"); // will be text
  const nodeLast = el.attributes.getNamedItem('data-last');
  expect(nodeLast?.value).toBe("15"); // will be text
})

// ---

test(`test loader and loadOnce`, async({ expect }) => {
  const ES_USE_LISTENER = 'ES_LOAD_ONCE';
  const useListener = createUseListener(new EventSystem());
  let value = 0;
  useListener.setLoader(ES_USE_LISTENER, () => {
    value += 5;
    useListener.emit(ES_USE_LISTENER, value);
  });

  function App() {
    const value = useListener<number>(ES_USE_LISTENER);
    const [page2, setPage2] = useState(false);
    useEffect(() => {
      if( value === 5 ) setPage2(true); // cause Page 2 to call "loadOnce"
    }, [value]);
    return (
      <div data-value={ value }>
        <Page />
        { page2 ? <Page02 /> : null }
      </div>
    );
  }

  function Page() {
    const value = useListener<number>(ES_USE_LISTENER);
    return (
      <div data-value={ value }>Text</div>
    );
  }

  function Page02() {
    useListener.loadOnce(ES_USE_LISTENER);
    const value = useListener<number>(ES_USE_LISTENER);
    return (
      <div data-value={ value }>Value</div>
    );
  }

  render(<App />);
  // screen.debug();
  await waitFor(async() => {
    const el = await screen.findByText('Value');
    const nodeValue = el.attributes.getNamedItem('data-value');
    expect(nodeValue?.value).toBe("10"); // will be text
  }, { timeout: 1000, interval: 100 });
})
