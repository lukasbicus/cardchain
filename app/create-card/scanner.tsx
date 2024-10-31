'use client';

import {
  CreateCardFormActions,
  CreateCardFormActionTypes,
} from '@/app/create-card/createCardFormReducer';
import {
  Html5Qrcode,
  Html5QrcodeResult,
  Html5QrcodeScannerState,
  Html5QrcodeCameraScanConfig,
  CameraDevice,
} from 'html5-qrcode';
import { Dispatch, useCallback, useEffect, useRef } from 'react';

const getConfig = (boundingRect?: DOMRect): Html5QrcodeCameraScanConfig => {
  let qrbox = {
    width: 250,
    height: 250,
  };
  if (boundingRect) {
    const width = Math.max(50, Math.ceil(boundingRect.width * 0.8));
    qrbox = {
      width,
      height: Math.max(
        50,
        Math.min(Math.ceil(boundingRect.height * 0.8), width)
      ),
    };
  }
  return {
    fps: 10,
    qrbox,
  };
};

export default function Scanner({
  onCodeDetected,
  activeDevice,
  dispatch,
}: {
  onCodeDetected: (decodedText: string, result: Html5QrcodeResult) => void;
  activeDevice: CameraDevice | null;
  dispatch: Dispatch<CreateCardFormActions>;
}) {
  const parentDiv = useRef<HTMLDivElement>(null);

  const getCameraDevices = useCallback(
    async function (): Promise<void> {
      let devices: CameraDevice[];
      try {
        devices = await Html5Qrcode.getCameras();
      } catch (e) {
        console.log('error while querying cameras', e);
        devices = [];
      }
      dispatch({
        type: CreateCardFormActionTypes.SET_DEVICES,
        payload: devices,
      });
    },
    [dispatch]
  );

  const startScanning = useCallback(
    (activeDeviceId: string): (() => void) => {
      const reader: Html5Qrcode = new Html5Qrcode('reader');
      reader
        .start(
          activeDeviceId,
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
    console.log('use effect called');
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
        height: 'calc(100% - 4rem)',
        maxHeight: 'calc(100% - 4rem)',
      }}
      ref={parentDiv}
    >
      <div id="reader" className="max-h-full"></div>
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
