export default function Dashboard() {
  return (
    <>
    <div className="flex mt-16">
              <div className="md:w-3/4 px-4 ">
                  <div className="rounded-xl">
                      <h2 className="text-left text-5xl w-full font-extrabold">Hello</h2>
                      <h3 className="text-left text-2xl w-full font-bold mt-5">I Am <span className="text-blue-600">Febrian Denanda</span></h3>
                    <div className="w-full py-2 mt-5">
                          <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                              <label>Contact</label>
                          </button>
                      </div>
                  </div>
              </div>
          </div>
    </>

  );
}
