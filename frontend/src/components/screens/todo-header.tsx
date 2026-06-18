import {
  Building2,
  ChevronDown
} from "lucide-react";
import ProfileImg from "../../assets/images/profile-image.png";

const TodoHeader = () => {
  return (
    <header className="w-full px-4 py-2 bg-primary-background shadow-sm shadow-shadow-navbar sticky top-0 z-50">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="w-[70%] md:w-[50%] lg:w-[50%]">
            <div className="max-w-max p-2 flex items-center gap-2 hover:bg-background-profile rounded-md cursor-pointer">
              <div className="w-[32px] h-[32px] bg-icon-background rounded-md flex items-center justify-center">
                <Building2 size={24} className="text-primary-background" />
              </div>
              <div className="flex items-center justify-center">
                <h2 className="text-[18px] font-semibold">Mariya Tech Labs</h2>
              </div>
              <div className="flex items-center justify-center w-[20px] h-[20px]">
                <ChevronDown size={18} className="text-primary-black" />
              </div>
            </div>
          </div>
          <div className="w-[30%] md:w-[50%] lg:w-[50%] p-2 flex items-center justify-end">
            <div className="w-[40px] h-[40px] flex items-center justify-center cursor-pointer">
              <img src={ProfileImg} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TodoHeader;
