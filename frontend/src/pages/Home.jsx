import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import ImageUploadModal from "../components/guards/ImageUploadModal";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchPhotos, postPhoto } from "../api/api";

function Home() {
    const { logout } = useContext(AuthContext);
    const [modalOpen, setModalOpen] = useState(false);

    const queryClient = useQueryClient();

    const { data: images, isLoading, isError: isGetError } = useQuery({
        queryKey: ['photos'],
        queryFn: fetchPhotos,
    });

    const { mutate, isError: isPostError, isPending } = useMutation({
        mutationFn: postPhoto,
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ['photos'],
            })
        }
    })

    const handleUpload = (file) => {
        mutate({
            image: file,
        });
    };

    return (
        <div>
            <button className="px-2 border-1 border-black rounded-md cursor-pointer" onClick={logout}>Log out</button>
            <button
                onClick={() => setModalOpen(true)}
                className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
                Open Image Upload Modal
            </button>

            <ImageUploadModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onUpload={handleUpload}
            />

            <div className="p-6 flex flex-wrap gap-2">
                {
                    images && images.map((image) => {
                        return <img src={image.url} className="w-[200px] h-[200px]" />
                    })
                }
            </div>
        </div>
    )
}

export default Home