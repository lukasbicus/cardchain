'use client';

import {
  initialState,
  ScannerActions,
  ScannerActionTypes,
  scannerReducer,
  ScannerState,
} from '@/app/create-card/scannerReducer';
import {
  Html5Qrcode,
  Html5QrcodeResult,
  Html5QrcodeScannerState,
  Html5QrcodeCameraScanConfig,
} from 'html5-qrcode';
import { Reducer, useCallback, useEffect, useReducer, useRef } from 'react';

const getConfig = (boundingRect?: DOMRect): Html5QrcodeCameraScanConfig => {
  let qrbox = {
    width: 250,
    height: 250,
  };
  if (boundingRect) {
    qrbox = {
      width: Math.max(50, Math.ceil(boundingRect.width * 0.8)),
      height: Math.max(50, Math.ceil(boundingRect.height * 0.8)),
    };
  }
  const videoConstraints = boundingRect
    ? {
        width: {
          max: boundingRect.width,
        },
        height: {
          max: boundingRect.height,
        },
      }
    : undefined;
  const config = {
    fps: 4,
    qrbox,
    videoConstraints,
  };
  console.log('config', config);
  return config;
};

export default function Scanner({
  onCodeDetected,
}: {
  onCodeDetected: (decodedText: string, result: Html5QrcodeResult) => void;
}) {
  const parentDiv = useRef<HTMLDivElement>(null);
  const alreadyRequestedRef = useRef<boolean | null>(null);
  const [{ activeDevice }, dispatch] = useReducer<
    Reducer<ScannerState, ScannerActions>
  >(scannerReducer, initialState);

  const getCameraDevices = useCallback(async function (): Promise<void> {
    try {
      alreadyRequestedRef.current = true;
      const devices = await Html5Qrcode.getCameras();
      console.log('devices', devices);
      dispatch({
        type: ScannerActionTypes.SET_DEVICES,
        payload: devices,
      });
    } catch (e) {
      console.log('error while querying cameras', e);
      alreadyRequestedRef.current = false;
      dispatch({
        type: ScannerActionTypes.SET_DEVICES,
        payload: [],
      });
    }
  }, []);

  const startScanning = useCallback(
    (activeDeviceId: string): (() => void) => {
      const reader: Html5Qrcode = new Html5Qrcode('reader1');
      reader
        .start(
          { facingMode: 'environment', deviceId: activeDeviceId },
          getConfig(parentDiv.current?.getBoundingClientRect()),
          onCodeDetected,
          undefined
        )
        .catch(e => {
          console.log('error', e);
        });
      return () => {
        if (reader.getState() === Html5QrcodeScannerState.SCANNING) {
          reader.stop().finally(() => reader.clear());
        } else {
          reader.clear();
        }
      };
    },
    [onCodeDetected]
  );

  useEffect(() => {
    getCameraDevices();
  }, [getCameraDevices]);

  useEffect(() => {
    let cleanup: () => void;
    if (activeDevice?.id) {
      cleanup = startScanning(activeDevice.id);
    }
    return () => {
      cleanup?.();
    };
  }, [activeDevice?.id, startScanning]);

  return (
    <div
      className="max-w-full overflow-clip"
      style={{
        height: 'calc(100% - 48px)',
        maxHeight: 'calc(100% - 48px)',
      }}
      ref={parentDiv}
    >
      <div id="reader1" className="max-h-full"></div>
      <div id="reader2" className="max-h-full" />
      {!activeDevice && (
        <div className="text-center">
          <p className="text-xl py-4">Please grant camera permissions.</p>
          <p className="text-sm text-gray-500 pb-4">
            Without those permissions, it will be impossible to scan and save
            your cards.
          </p>
          <button className="btn btn-primary" onClick={getCameraDevices}>
            Request devices
          </button>
        </div>
      )}
    </div>
  );
}
