export default function Card({ children, title, style }) {
    return (
        <div className={`w-full  px-4 my-2 ${style}`}>
            <div className=" bg-white p-10  rounded-xl">
                <h3 className="text-2xl py-2">{title}</h3>
                { children }
            </div>
        </div>
    );
  }
  