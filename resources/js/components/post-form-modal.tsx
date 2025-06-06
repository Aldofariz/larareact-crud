import { useEffect, useState  } from "react";
import { router } from "@inertiajs/react";


interface Post {
    id?: number;
    title: string;
    content: string;
    picture: string;
}

interface Props {
    isOpen: boolean;
    closeModal: () => void;
    post?: Post | null;
}

export default function PostFormModal({ isOpen, closeModal, post }: Props) {
    const [ formData, setFormData ] = useState<Post>({title: "", content: "", picture: ""});
    const [ selectedFiles, setSelectedFile ] = useState<File | null>(null);
    const [ preview, setPreview] = useState<string>("");


//code untuk efek modal

useEffect(()=> {
    if(post) {
        setFormData({ title: post.title, content: post.content, picture: post.picture || ""});
        setPreview(post.picture || "");
        setSelectedFile(null);
    } else {
        setFormData({ title: "", content: "", picture: ""});
        setPreview("");
        setSelectedFile(null);
    }
}, [post]);


// setting untuk element text area

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value});
}


// code untuk upload images
const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]){
        const file = e.target.files[0];
        setSelectedFile(file);
        setPreview(URL.createObjectURL(file));
    }
};

// code ini diketik selanjutnya untuk handle input form
const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append('title', formData.title);
    data.append('content', formData.content);
    if(selectedFiles){
      data.append("picture", selectedFiles)
    }

    if (post?.id) {
      data.append("_method", "PUT");
      router.post('/posts/${post.id}', data,  {
        onSuccess: () => {
          closeModal();
          router.reload();
        },
        onError: (errors) => {
          console.error(errors.message || "gagal kirim data")
        },
      })
    } else {
      router.post("/posts", data, {
        onSuccess: () => {
          closeModal();
          router.reload();
        },
        onError: (errors) => {
          console.error(errors.message || "gagal kirim data")
        },
      });
    }
};




if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl">
        <h2 className="text-lg font-semibold mb-4">{post ? "Edit Post" : "Add Post"}</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-3">
            <label className="block text-sm font-medium">Judul</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium">Konten</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium">Gambar (opsional)</label>
            <input
              type="file"
              name="picture"
              onChange={handleFileChange}
              className="w-full"
              accept="image/*"
            />
          </div>
          {preview && (
            <div className="mb-3">
              <p className="text-sm mb-1">Lihat Gambar:</p>
              <img src={preview} alt="Preview" className="w-32 h-32 object-cover rounded" />
            </div>
          )}
          <div className="flex justify-end gap-2">
            <button type="button" onClick={closeModal} className="px-4 py-2 bg-red-500 text-white rounded">Batal</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">{post ? "Ubah" : "Input"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}