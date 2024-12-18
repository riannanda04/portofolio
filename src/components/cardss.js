export default function Cardss({ children, name, style }) {
    return (
        <div className={`w-full  px-4 my-2 ${style}`}>
            <div className=" bg-white p-10  rounded-xl">
                <h3 className="text-2xl py-2">{name}</h3>
                { children }
            </div>
        </div>
    );
  }
  