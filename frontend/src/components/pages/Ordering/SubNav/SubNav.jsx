import { Link } from "react-scroll";
import cn from "classnames";
import { useState } from "react";
import menuData from "@/tools/menu.json";

function SubNav() {
  const [preSelectedMenuItem, setPreSelectedMenuItem] = useState(null);
  const [selectedMenuItem, setSelectedMenuItem] = useState("waffle");

  const handlePreselectClick = (id) => {
    setPreSelectedMenuItem(id);
  };

  return (
    <nav className="hidden sm:flex w-full sticky top-14 h-14 bg-amber-100/70 backdrop-blur-sm z-50 select-none">
      <ul className="text-lg text-pink-800 flex w-full items-center gap-0.5 justify-center ">
        {menuData.map((item, index) => {
          return (
            <li key={index}>
              <Link
                key={index}
                to={item.category}
                className={cn(
                  "p-1 cursor-pointer rounded-xl hover:text-pink-300",
                  {
                    preselected: preSelectedMenuItem === item.category,
                    selected: selectedMenuItem === item.category,
                  }
                )}
                spy={true}
                smooth={true}
                offset={-150}
                duration={500}
                onClick={() => handlePreselectClick(item.category)}
                onSetActive={(e) => {
                  setSelectedMenuItem(item.category);
                  if (e === preSelectedMenuItem) handlePreselectClick("");
                }}
              >
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default SubNav;
