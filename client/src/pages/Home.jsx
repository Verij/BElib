import { Link } from "react-router-dom"



function Home() {
  return (
    <div className="flex flex-col h-96 w-full  justify-center items-center gap-8">

  <h1 className="text-5xl text-center font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 ">Para poder seguir rastro de tu lectura</h1>

  <p className="text-white text-lg mb-8">Nessum dorma</p>

  <div className="space-x-2">
    <Link to='/agregar-libro' className="py-3 px-8text-center font-bold border-2 border-[#FFA41B] hover:bg-[#FFA41B] p-8 hover:border-zinc-700 mid-w-240">Empezá agregando tus libros</Link>
  </div>

</div>
  )
}

export default Home