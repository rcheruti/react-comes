import { es as defaultES, ES_ValueType, EventSystem } from "comes";
import { useState, useEffect } from "react";

/**
 * Create an implementation of "useListener" for the {@link EventSystem} informed.
 * 
 * Use the default implementation {@link useListener} if you dont need more than one
 * {@link EventSystem} in your application.
 * 
 * If you need to create another {@link EventSystem}, so export the "useListener"
 * implementation as:
 * ```ts
 * const MyES = new EventSystem();
 * export const useListener = createUseListener(MyES);
 * ```
 * 
 * @param es {@link EventSystem} to create React "useListener" implementation
 * @returns New implementation for the {@link EventSystem} informed
 */
export function createUseListener(es: EventSystem) {
  /**
   * Implementation that will automaticaly listen to the event address,
   * and call {@link useState} when new values are issued.
   * @param id The address name
   * @returns 
   */
  const useListener = <T>(id: string): T => {
    const [state, setState] = useState<T>( () => es.get( id ).last);
    useEffect(() => es.listen( id, setState ) , [id]);
    return state;
  }

  // ------------------------------------------------------------------------------
  // Bridge to the original implementation

  /** Call {@link EventSystem.send}. */
  useListener.send = es.send.bind(es) as EventSystem['send'];
  /** Return the last value emitted to the address "id". */
  useListener.get = es.get.bind(es) as EventSystem['get'];
  /** Call {@link EventSystem.listen}. */
  useListener.listen = es.listen.bind(es) as EventSystem['listen'];
  /** Call {@link EventSystem.unlisten}. */
  useListener.unlisten = es.unlisten.bind(es) as EventSystem['unlisten'];
  /** Call {@link EventSystem.setLoader}. */
  useListener.setLoader = es.setLoader.bind(es) as EventSystem['setLoader'];
  /** Call {@link EventSystem.setLoaderCatch}. */
  useListener.setLoaderCatch = es.setLoaderCatch.bind(es) as EventSystem['setLoaderCatch'];
  /** Call {@link EventSystem.load}. */
  useListener.load = es.load.bind(es) as EventSystem['load'];
  /** Call {@link EventSystem.addInter}. */
  useListener.addInter = es.addInter.bind(es) as EventSystem['addInter'];
  /** Call {@link EventSystem.removeInter}. */
  useListener.removeInter = es.removeInter.bind(es) as EventSystem['removeInter'];

  // ------------------------------------------------------------------------------
  // React only

  /** Reference to {@link EventSystem} */
  useListener.es = es;

  /** Return the last value emitted to the address "id". */
  useListener.last = <T = any>(id: string): T => es.get( id ).last ;

  /** Call {@link EventSystem.load} only once, using {@link useEffect} with the "id" as parameter to changes. */
  useListener.loadOnce = <T>(id: string, ...args: any[]) => useEffect(() => { es.load<T>(id, ...args); }, [id]);

  return useListener;
}

/**
 * Default implementation of the default {@link EventSystem} ({@link defaultES es}).
 */
export const useListener = createUseListener(defaultES);
