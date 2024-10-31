'use client';

import { useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';

export function Barcode({ code }: { code: string }) {
  const barcodeRef = useRef(null);

  useEffect(() => {
    if (barcodeRef.current) {
      try {
        JsBarcode(barcodeRef.current, code, {
          format: 'CODE39',
          lineColor: '#000000',
          width: 2,
          height: 100,
          displayValue: true,
        });
      } catch (e) {
        console.log('error', e);
      }
    }
  }, [code]);

  return (
    <div>
      <svg ref={barcodeRef} className="p-3" />
      <div>{code}</div>;
    </div>
  );
}
