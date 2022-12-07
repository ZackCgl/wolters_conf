
interface Props{
    handleLogin : () => void
}

function PublicProcedure({handleLogin}:Props) {

  return (
    <div className=" container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
     <div
        className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
       
      >
        <h3 onClick={handleLogin} className="text-2xl font-bold">Sign In →</h3>
        <div className="text-lg">
          Sign in from your account - We offer the greatest features available.
        </div>
      </div>
    <div
        className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
      
      >
        <h3 className="text-2xl font-bold">Documentation →</h3>
        <div className="text-lg">
          Learn more about Ruby Finance, our docs are open source.
        </div>
      </div>
    </div>
  </div>
  )
}

export default PublicProcedure