import React from "react";
import { useState } from "react";
import { usePage, Head } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import PostFormModal from "@/components/post-form-modal";
import appLayout from "@/layouts/app-layout";


export default function Posts() {
    //code untuk tampilkan data dari database
    const { posts } = usePage<{ posts: {id: number; title: string; content: string; picture?: string}[]}>().props

    //code untuk handle muncul form modal
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [ selectedPost, setSelectedPost] = useState(null);

    const openModal = (post = null) => {
        setSelectedPost(post);
        setIsModalOpen(true);
    };

    return (
        <AppLayout>
            <Head title="apps crud"/>
            <div className="flex flex-col gap-6 p-6 bg-white text-black shadow-lg rounded-xl">
                <div className="flex justify-end">
                    <button onClick={() => openModal()} className="bg-green-600 text-white rounded px-3 py-1 text-sm hover:bg-green-700 transition">Tambah Data</button>
                </div>
                <table className="w-full border-collapse bg-white text-black shadow-sm rounded-lg">
                    <thead>
                        <tr className="bg-gray-100 text-gray-800 border-b">
                            {["Gambar", "Judul", "Konten", "Aksi"].map((header) => (
                                <th key={header} className="border p-3 text-left">{header}</th>
                            ) )}
                        </tr>
                    </thead>
                    <tbody>
                        {posts.length ? (
                            posts.map((post) => (
                                <tr key={post.id} className="border-b">
                                <td className="p-3">
                                    {post.picture ? <img src={post.picture} alt="Post" className="w-16 h-16 object-cover rounded-full" /> : "No Picture"}
                                </td>
                                <td className="p-3">{post.title}</td>
                                <td className="p-3">{post.content}</td>
                                <td className="p-3 flex gap-2">
                                    <button className="bg-blue-500 text-sm text-white px-3 py-1 rounded">Edit</button>
                                    <button className="bg-red-500 text-sm text-white px-3 py-1 rounded">Delete</button>
                                </td>
                                </tr>
                            ))
                        ) : (
                        <tr><td colSpan={4} className="text-center p-4 text-gray-600">Belum Ada Data</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            <PostFormModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} post={selectedPost}/>
        </AppLayout>
    );
}