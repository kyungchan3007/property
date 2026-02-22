import { Bot } from "lucide-react";
import pinguImage from "@/src/assets/image/pingu.jpeg";
import Image from "next/image";
export const Header = () => {
  return (
    <div className="bg-white px-5 py-4 border-b border-gray-100">
      <div className="max-w-3xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-500 rounded-2xl flex items-center justify-center">
            <Image
              src={pinguImage}
              alt="핑구 어시스턴트"
              width={28}
              height={28}
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">핑구네 부동산</h1>
          </div>
        </div>
      </div>
    </div>
  );
};
