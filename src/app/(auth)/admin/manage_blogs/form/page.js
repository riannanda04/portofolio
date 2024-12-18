'use client'
import Card from '../../../../../components/card';
import ConfigDialog from '../../../../../components/ConfirmDialog'
import { useState } from 'react'
import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function ManageBlogsForm() {
    const editorRef = useRef(null);
    const [modal, setModal] = useState(false)
    const [modalTitle, setModalTitle] = useState("")
    const [modalMessage, setModalMessage] = useState("")
    const [data, setData] = useState({
        blogstitle:'',
        blogssummary:'',
        blogscategory:'',
        content:'',
    });

    const clearData = ()=>{
        setData({
            title:'',
            blogssummary:'',
            category:'',
            content:'',
        })
    }

    const optblogscategory = [
        {label:'reactjs', value:'reactjs'},
        {label:'php-programming', value:'php-programming'},
        {label:'VueJS', value:'VueJS'},
        {label:'ReactNative', value:'ReactNative'}
      ]

    const inputHandler= (e) =>{
        setData({...data, [e.target.name]: e.target.value })
    }

    const onCancel=()=>{
        setModal(false)
        setModalTitle('')
        setModalMessage('')
        clearData()
    }

    async function onSubmitData() {
        try{
            if (editorRef.current) {
                const body = data
                body.content = editorRef.current.getContent();

                let res = await fetch('/api/list_blogs', {
                    method:'POST',
                    body: JSON.stringify(body),
                })

                let resData = await res.json()
                if(!resData.data){
                throw Error(resData.message)
                }
                setModal(true)
                setModalTitle('Info')
                setModalMessage(resData.message)
            }
        }catch(err){
          console.error("ERR", err.message)
          setModal(true)
          setModalTitle('Err')
          setModalMessage(err.message)
        }
      }

    return (
    <>

        <Card title="Blogs Form">
            <div className="w-full my-2">
                <label>blogs Title</label>
                    <input 
                        name='blogstitle'
                        value={data.blogstitle}
                        onChange={inputHandler}
                        type="text" 
                        className="w-full border my-input-text"/>
            </div>

            <div className="w-full my-2">
                <label>summary blogs</label>
                    <input 
                        name='blogssummary'
                        value={data.blogssummary}
                        onChange={inputHandler}
                        className="w-full border my-input-text"/>
            </div>

            <div className="w-full my-2">
            <label>blogs category</label>
            <select  
              name='blogscategory' 
              onChange={inputHandler}
              className="w-full border my-input-text">
              {
                optblogscategory && 
                  optblogscategory.map((item, key)=>
                    <option key={key} value={item.value}>{item.label}</option>
                  )
              }
            </select>
        </div>

            <div className="w-full my-2">
                <label>Content</label>
                <Editor
                    id='content'
                    apiKey='zsi50x7ymctngli7btlhb6o85wqsdshppgng8g4pt1q8kn25'
                    onInit={(_evt, editor) => editorRef.current = editor}
                    initialValue={data.content}
                    init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                    ],
                    toolbar: 'undo redo | blocks | ' +
                        'bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                />
            </div>

            <button  className="btn-primary" onClick={onSubmitData}>
                <span className="relative text-sm font-semibold text-white">
                    Save Data
                </span>
            </button>
        </Card>

        <ConfigDialog  
            onOkOny={()=>onCancel()} 
            showDialog={modal}
            title={modalTitle}
            message={modalMessage}
            onCancel={()=>onCancel()} 
            onOk={()=>onCancel()} 
            isOkOnly={true} />
    </>
    )
}