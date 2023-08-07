

export default function Header() {
  return (
    <div> 
        <div className="bg-black text-white flex justify-around items-center p-5">
            <h1 className="text-2xl font-bold">LOGO</h1>
            <ul className="flex">
                <li><a href="#">Home</a> </li>
                <li> <a href="#">Programs</a></li>
                <li><a href="#">Pricing</a> </li>
                <li><a href="#">Blogs</a> </li>
            </ul>
            <button className="rounded-xl px-4 py-2 text-[#FED25B] border-2 border-[#FED25B] bg-[#FED25B] bg-opacity-20">Login/Signup</button>
        </div>

    </div>
  )
}
