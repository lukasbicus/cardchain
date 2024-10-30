'use client';

import { Html5QrcodeScanner, Html5QrcodeResult } from 'html5-qrcode';
import { useEffect } from 'react';

export default function Scanner({
  onCodeDetected,
}: {
  onCodeDetected: (decodedText: string, result: Html5QrcodeResult) => void;
}) {
  useEffect(() => {
    const html5QrcodeScanner = new Html5QrcodeScanner(
      'reader',
      { fps: 10, qrbox: { width: 250, height: 250 } },
      /* verbose= */ false
    );
    html5QrcodeScanner.render(onCodeDetected, undefined);
    return () => {
      html5QrcodeScanner.clear();
    };
  }, [onCodeDetected]);
  return (
    <div>
      <div id="reader" className="w-full" />
    </div>
  );
}
