const Header = ({theme, setTheme}) => {
  return (
    <div className="">
      <div className="text-center">
        <h1 className="font-bold text-3xl text-slate-900 dark:text-slate-100 text-center">
          Split<span className="text-green-500 ">Smart</span>
        </h1>
        <p className="text-center text-slate-700 dark:text-slate-400 mt-1">
          Split expenses. Settle smarter.
        </p>
      </div>

      <div>
        <button onClick={()=>setTheme(theme === "light" ? "dark" : "light")} className="cursor-pointer absolute top-2 right-2 bg-slate-300 px-3 py-1 rounded-xl dark:bg-slate-700">
          {theme === "dark" ? (
            <i class="ri-sun-fill"></i>
          ) : (
            <i class="ri-moon-fill"></i>
          )}
        </button>
      </div>
    </div>
  );
};

export default Header;
