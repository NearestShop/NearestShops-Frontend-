import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Drawer from "@mui/material/SwipeableDrawer";

const SearchBar = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [openMenu, setOpen] = useState(false);

  const toggleMenu = (openStatus) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setOpen(openStatus);
  };

  const search = () => {
    if(query === ""){
      return;
    }else{
      toggleMenu(false);
      setQuery("");
      navigate(`/search/${query.toLowerCase()}`);
      location.reload();
    }
  };

  const handleKeyPress = (e) => {
    if(e.key === "Enter"){
      search();
    }
  }

  return (
    <>
      <i onClick={() => setOpen(true)} className="fa-solid fa-magnifying-glass hover:text-secondary duration-200 cursor-pointer md:text-2xl"></i>
      <Drawer anchor="top" open={openMenu} onClose={toggleMenu(false)} onOpen={toggleMenu(true)}>
        <div className="bg-[#1f1f1f] flex items-center px-4">
          <input onKeyDown={handleKeyPress} value={query} onChange={(e) => setQuery(e.target.value)} className="block w-full bg-[#1f1f1f] py-3 sm:py-4 px-1 focus:outline-none focus:placeholder:opacity-0 placeholder:text-[#70756a] placeholder:duration-300 text-white text-sm sm:text-lg" type="text" placeholder="Search Nearest Shops" />
          <div className="flex items-center gap-4 sm:gap-6">
            <i onClick={() => search()} className="fa-solid fa-magnifying-glass text-white hover:text-accent duration-300 text-sm sm:text-xl cursor-pointer"
            ></i>
            <i onClick={toggleMenu(false)} className="fa-solid fa-x text-white hover:text-accent duration-300 text-sm sm:text-xl cursor-pointer"></i>
          </div>
        </div>
      </Drawer>
    </>
  )
}

export default SearchBar