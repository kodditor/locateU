import Header from "./components/Header"
import Footer from "./components/Footer"

export default function Home() {
  return (
    <main className="bg-white">
      <section className="bg-[url('/img/bbblurry.svg')] bg-no-repeat bg-center bg-contain bg-blend-lighten bg-opacity-20">
        <Header />
        <div className="flex flex-col items-center ">
          <div className="mt-16 mb-8 ">
            <p className="text-black font-semibold max-w-[700px] text-[50px] md:text-[80px]  w-[80%] md:w-auto text-center m-auto"><span className="text-blue">Never</span> get lost on <span className="text-blue">campus.</span></p>
          </div>
          <div>
              <form action="/search" className="flex flex-col items-center ">
                <div className="flex flex-row items-center justify-normal md:justify-between gap-2 md:gap-4 mb-5 md:mb-8 w-full md:w-auto m-auto">
                  <input type="text" className="w-[calc(100%-40px)] md:w-[500px] duration-150 text-blue text-[18px] md:text-[20px] rounded-full px-3 md:px-8 py-2 md:py-4 border-2 border-lightBlue border-solid active:border-blue" placeholder="Search for a lecture hall..." required maxLength={50} name="q"/>
                  <button className="flex justify-center items-center duration-150 px-2 py-2 md:p-4 bg-blue hover:bg-lightBlue rounded-full border-2"><img className="w-[20px] md:w-[25px] h-[20px] md:h-[25px]" src="/img/magnifying-glass.png"/></button>
                </div>
                <select className="rounded-full bg-blue text-white px-3 md:px-5 py-2 mt-1 mb-[calc(100vh-35rem)] md:mb-[9rem] after:after-content-[▼]" name="uni">
                  <option value={'UG'}>University of Ghana</option>
                </select>
              </form>
          </div>
        </div>
        <Footer />
        </section>
    </main>
  )
}
