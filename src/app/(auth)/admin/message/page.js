"use client"
import { useState, useEffect } from "react";
// import { useState, useEffect } from "react";
// import Card from "../../../../component/card";

export default function Message() {
    const [data, setData] = useState({});
    const [isLoading, setLoading] = useState(true)

    async function onLoadData() {
        setLoading(true);
        try {
            const res = await fetch('/api/pesan');
            if (!res.ok) {
                throw new Error('Failed to fetch data');
            }
            const fetchedData = await res.json();
            setData(fetchedData.data); // Adjust based on your API response structure
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        onLoadData();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>; // Show loading indicator while data is being fetched
      }

    return (
        <>
            <div title="list of message" className="mt-20">List Of Messages</div>
            <table className="w-full border-collapse mt-5">
                <thead>
                    <tr>
                        <th className="border border-white-500 p-2">#No</th>
                        <th className="border border-white-300 p-2">Name</th>
                        <th className="border border-white-300 p-2">Email</th>
                        <th className="border border-white-300 p-2">Subject</th>
                        <th className="border border-white-300 p-2">Message</th>
                        <th className="border border-white-300 p-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((message, index) => (
                        <tr key={message.id}>
                            <td className="border border-gray-300 p-2">{index + 1}</td>
                            <td className="border border-gray-300 p-2">{message.nama}</td>
                            <td className="border border-gray-300 p-2">{message.email}</td>
                            <td className="border border-gray-300 p-2">{message.subject}</td>
                            <td className="border border-gray-300 p-2">{message.pesan}</td>
                            <td className="border border-gray-300 p-2">
                                <button className="bg-green-500 text-white px-3 py-2 rounded-l">Balas</button>
                                <button className="bg-gray-500 text-white px-3 py-2 rounded-r">Arsipkan</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                {/* <tbody>
                    {messages.map((msg) => (
                        <tr key={msg.id}>
                            <td className="border border-gray-300 p-2">{msg.no}</td>
                            <td className="border border-gray-300 p-2">{msg.name}</td>
                            <td className="border border-gray-300 p-2">{msg.email}</td>
                            <td className="border border-gray-300 p-2">{msg.subjet}</td>
                            <td className="border border-gray-300 p-2">{msg.message}</td>
                            <td className="border border-gray-300 p-2">{msg.action}</td>
                        </tr>
                    ))}
                </tbody> */}
            </table>
            <div className="w-full md:w-1/3 px-4">
                {/* <h1>Testing {{(data.nama)}}</h1> */}

                {/* {
                    !isLoading && Object.(data.nama).map(key => {
                        return <>
                        </>
                    })
                } */}

                {/* {
                    !isLoading && Object.keys(data.phone).map(key => {
                        return <ItemCard label={key} value={data.phone[key]} key={key} />
                    })
                }

                {
                    !isLoading && Object.keys(data.social).map(key => {
                        return <ItemCard label={key} value={data.social[key]} key={key} />
                    })
                } */}


            </div>
        </>
    );
}