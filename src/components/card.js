'use client'
export default function Card({ 
    children, 
    title, 
    style, 
    showAddBtn=false,
    onAddNew
}) {

    return (
        <div className={`w-full  px-4 my-2 ${style}`}>
            <div className=" bg-white p-10  rounded-xl">
                <div className="flex">
                    <h3 className="flex-1 text-2xl py-2">{title}</h3>

                    {   showAddBtn && 
                        <div>
                            <button 
                                onClick={onAddNew}
                                className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                                Add New
                            </button> 
                        </div>
                    }
                    
                </div>

                { children }
            </div>
        </div>
    );
  }
  