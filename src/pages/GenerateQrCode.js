import { GenerateQr } from "../features/Product/Components/GenerateQr";

export function GenerateQrCode() {
  return (
    <div className="w-screen flex items-center justify-center">
      <div className="shadow-xl rounded-md flex flex-col items-center justify-center">
        <div className="font-medium text-blue-900 text-2xl py-7 ">
          Generate QR Code
        </div>
        <GenerateQr />
      </div>
    </div>
  );
}
