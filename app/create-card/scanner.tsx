'use client';

import {
  Html5Qrcode,
  Html5QrcodeResult,
  Html5QrcodeScannerState,
  Html5QrcodeCameraScanConfig,
  CameraDevice,
} from 'html5-qrcode';
import { useCallback, useEffect, useRef, useState } from 'react';

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
  const [cameraDevices, setCameraDevices] = useState<CameraDevice[]>([]);

  const getCameraDevices = useCallback(async function (): Promise<void> {
    try {
      alreadyRequestedRef.current = true;
      const devices = await Html5Qrcode.getCameras();
      console.log('devices', devices);
      setCameraDevices(devices);
    } catch (e) {
      console.log('error while querying cameras', e);
      alreadyRequestedRef.current = false;
      setCameraDevices([]);
    }
  }, []);

  const startScanning = useCallback(
    (device: CameraDevice): (() => void) => {
      const reader: Html5Qrcode = new Html5Qrcode('reader1');
      reader
        .start(
          { facingMode: 'environment', deviceId: device.id },
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
    console.log('cameraDevices,', cameraDevices);
    if (cameraDevices.length > 0) {
      cleanup = startScanning(cameraDevices[0]);
    }
    return () => {
      console.log('running cleanup');
      cleanup?.();
    };
  }, [cameraDevices, startScanning]);

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
      {cameraDevices.length === 0 && (
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
