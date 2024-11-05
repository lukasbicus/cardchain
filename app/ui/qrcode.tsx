'use client';

import { useEffect, useState } from 'react';
import qrcode from 'qrcode';

export function Qrcode({ code }: { code: string }) {
  const [dataUrl, setDataUrl] = useState('');
  console.log('code:', code);
  useEffect(() => {
    qrcode
      .toDataURL(code, {
        errorCorrectionLevel: 'H',
      })
      .then(url => {
        console.log(url);
        setDataUrl(url);
      })
      .catch(e => {
        console.log(e);
        // todo: handle failures while rendering qr codes
      });
  });
  return (
    <div className="flex justify-center items-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={dataUrl} className="w-full max-w-44 h-auto" alt={code} />
    </div>
  );
}
