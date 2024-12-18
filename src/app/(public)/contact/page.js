"use client"
import { useState, useEffect } from 'react'

const ItemCard = ({ label, value }) => {
    return (
        <div className='flex gap-4 bg-white  rounded-md my-2 p-2'>
            <div>{label}</div>
            <div>{value}</div>
        </div>
    )

}

export default function Contact() {
    // const [data, setData] = useState([])
    const [data, setData] = useState({
        nama: "",
        email: "",
        subject: "",
        pesan: ""
    });

    const inputHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const [isLoading, setLoading] = useState(true)

    async function onLoadData() {
        setLoading(true)
        let res = await fetch('/api/contact')
        let data = await res.json()
        setData(data)
        setLoading(false)
    }

    async function onSubmitData(e) {
        e.preventDefault(); // Prevent form submission without validation
        try {
            let res = await fetch("/api/pesan", {
                method: "POST",
                body: JSON.stringify(data),
            });
            let resData = await res.json();
            if (!resData.data) {
                throw Error(resData.message);
            }
            alert("Data berhasil disimpan dengan id \n" + resData.data.insertedId);
        } catch (err) {
            console.error("ERR", err.message);
            alert(err.message);
        }
    }

    useEffect(() => {
        onLoadData()
    }, [])

    return (
        <>
            <h2 className="text-center text-3xl w-full">Get In Touch</h2>

            <p className="text-center margin-0 mx-auto w-2/3	">
                lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
                ipsum lorem ipsum lorem ipsum
            </p>

            <div className="md:flex mt-16">
                <form onSubmit={onSubmitData}>
                    <div className="w-full md:w-3/4 px-4 ">
                        <div className=" bg-white p-10  rounded-xl">
                            <h3 className="text-2xl py-2">Leave a message</h3>
                            <div className="w-ful md:flex gap-6">
                                <div className="w-full my-2">
                                    <label>Name</label>
                                    <input type="text" name='nama' onChange={inputHandler} className="w-full border my-input-text" />
                                </div>
                                <div className="w-full my-2">
                                    <label>Email</label>
                                    <input type="text" name='email' onChange={inputHandler} className="w-full border my-input-text" />
                                </div>
                            </div>
                            <div className="w-full my-2">
                                <label>Subject</label>
                                <input type="text" name='subject' onChange={inputHandler} className="my-input-text w-full" />
                            </div>
                            <div className="w-full">
                                <label>Message</label>
                                <textarea name='pesan' onChange={inputHandler} className="border my-input-text w-full"></textarea>
                            </div>
                            <div className="w-full py-2">
                                <button type='submit' className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                    <label>Send Message</label>
                                </button>
                                <button type='reset' className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                                    <label>Cancel</label>
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
                <div className="w-full md:w-1/3 px-4">

                    {
                        !isLoading && Object.keys(data.location).map(key => {
                            return <ItemCard label={key} value={data.location[key]} key={key} />
                        })
                    }

                    {
                        !isLoading && Object.keys(data.phone).map(key => {
                            return <ItemCard label={key} value={data.phone[key]} key={key} />
                        })
                    }

                    {
                        !isLoading && Object.keys(data.social).map(key => {
                            return <ItemCard label={key} value={data.social[key]} key={key} />
                        })
                    }


                </div>
            </div>

        </>
    );
}