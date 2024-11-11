import { Barcode } from '@/app/ui/barcode';
import { Qrcode } from '@/app/ui/qrcode';

export function CodePicture({
  code,
  codeFormat,
}: {
  code: string;
  codeFormat: string;
}) {
  return codeFormat === 'QR' ? (
    <Qrcode code={code} />
  ) : (
    <Barcode code={code} codeFormat={codeFormat} />
  );
}
