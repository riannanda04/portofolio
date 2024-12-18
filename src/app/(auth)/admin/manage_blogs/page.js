'use client'
import Card from '../../../../components/card';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ConfigDialog from '../../../../components/ConfirmDialog'

export default function ManageBlogs() {
    const router = useRouter();
    const [modal, setModal] = useState(false)
    const [modalTitle, setModalTitle] = useState("")
    const [modalMessage, setModalMessage] = useState("")
    const [blogs, setBologs] = useState([])
    const [isOkOnly, setIsOkOnly] = useState(true)
    const [deleteId, setDeleteId] = useState(null)

    const onAddNew = ()=>{
        router.push('/admin/manage_blogs/form')
    }

    const onConfirmDelete=(id)=>{
        setDeleteId(id)
        setIsOkOnly(false)
        setModalTitle('Confirm')
        setModalMessage('Apakah and yakin ingin menghapus data ini?')
        setModal(true)
    }

    const onCancel=()=>{
        setModal(false)
    }

    const onConfirmOk=async ()=>{
        try{
            const res = await fetch(`/api/list_blogs/${deleteId}`,{method:'DELETE'});
            let responseData = await res.json()

            setIsOkOnly(true)
            setModalTitle('Info')
            setModalMessage(responseData.message)
            setModal(true)
            fetchData()
        }catch(err){
            console.error("ERR", err.message)
            setModal(true)
            setModalTitle('Err')
            setModalMessage(err.message)
        }

    }

    const fetchData = async ()=>{
        try{
            const res = await fetch('/api/list_blogs');
            let responseData = await res.json()
            setBologs(responseData.data)

        }catch(err){
            console.error("ERR", err.message)
            setModal(true)
            setModalTitle('Err')
            setModalMessage(err.message)
        }
    }

    const gotoEditPage=(id)=>{
        router.push(`/admin/manage_blogs/${id}`)
    }

    useEffect(()=>{
        fetchData()
    },[])

    return (
        <>
        <Card title="manage of Blogs" style="mt-5" showAddBtn onAddNew={onAddNew}>
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th className='table-head border-blue-gray-100'>No</th>
                        <th className='table-head border-blue-gray-100'>blog Title</th>
                        <th className='table-head border-blue-gray-100'>blogs summary</th>
                        <th className='table-head border-blue-gray-100'>category</th>
                        <th className='table-head border-blue-gray-100'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    { blogs.map((item, key)=>{
                        return (
                            <tr key={key} className='border-b border-blue-gray-50 '>
                                <td className='p-2 text-center'>{key+1}</td>
                                <td className='p-2 '>{item.blogstitle} </td>
                                <td className='p-2 '>{item.blogssummary} </td>
                                <td className='p-2 '>{item.blogscategory} </td>
                                <td className='p-2 '>
                                    <div className="inline-flex text-[12px]">
                                        <button className="bg-green-300 hover:bg-green-400 text-gray-800 py-2 px-4 rounded-l">
                                            Detail
                                        </button>
                                        <button 
                                            onClick={()=>gotoEditPage(item._id)}
                                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4">
                                            Edit
                                        </button>
                                        <button 
                                            onClick={()=>onConfirmDelete(item._id)}
                                            className="bg-red-300 hover:bg-red-400 text-gray-800 py-2 px-4 rounded-r">
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>
        </Card>

        <ConfigDialog  
            onOkOny={()=>onCancel()} 
            showDialog={modal}
            title={modalTitle}
            message={modalMessage}
            onCancel={()=>onCancel()} 
            onOk={()=>onConfirmOk()} 
            isOkOnly={isOkOnly} />
      </>
    );
}