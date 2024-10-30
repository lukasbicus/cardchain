'use client';

import {
  Html5Qrcode,
  Html5QrcodeResult,
  Html5QrcodeScannerState,
  Html5QrcodeCameraScanConfig,
} from 'html5-qrcode';
import { useEffect, useRef } from 'react';

const readerIds = ['reader1', 'reader2'];

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
  const activeReaderId = useRef<string | null>(null);
  useEffect(() => {
    let readerId: string;
    if (activeReaderId.current === null) {
      readerId = readerIds[0];
    } else {
      readerId = readerIds[1];
    }
    activeReaderId.current = readerId;
    const reader: Html5Qrcode = new Html5Qrcode(readerId);
    let cleanup = () => {
      reader.clear();
      document.getElementById(readerId)?.remove();
    };

    reader
      .start(
        { facingMode: 'environment' },
        getConfig(parentDiv.current?.getBoundingClientRect()),
        onCodeDetected,
        undefined
      )
      .then(() => {
        cleanup = () => {
          if (reader.getState() === Html5QrcodeScannerState.SCANNING) {
            reader.stop().finally(() => reader.clear());
          } else {
            reader.clear();
          }
          document.getElementById(readerId)?.remove();
        };
      })
      .catch(e => {
        console.log('error', e);
      });
    return () => {
      cleanup();
    };
  }, [onCodeDetected]);
  return (
    <div
      className="max-w-full overflow-clip"
      style={{
        height: 'calc(100% - 48px)',
        maxHeight: 'calc(100% - 48px)',
      }}
      ref={parentDiv}
    >
      <div id="reader1" className="max-h-full">
        Please grant camera permissions for this website
      </div>
      <div id="reader2" className="max-h-full" />
    </div>
  );
}
