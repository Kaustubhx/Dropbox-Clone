'use client'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { db, storage } from "@/firebase"
import { useAppStore } from "@/store/store"
import { useUser } from "@clerk/nextjs"
import { deleteDoc, doc } from "firebase/firestore"
import { deleteObject, ref } from "firebase/storage"
import toast from 'react-hot-toast';

export function DeleteModal() {

    const { user } = useUser();

    const [
        isDeleteModalOpen,
        setIsDeleteModalOpen,
        setFileId,
        filename,
        setFilename,
        isRenameModalOpen,
        setIsRenameModalOpen,
        fileId,
    ] = useAppStore(state => [
        state.isDeleteModalOpen,
        state.setIsDeleteModalOpen,
        state.setFileId,
        state.filename,
        state.setFilename,
        state.isRenameModalOpen,
        state.setIsRenameModalOpen,
        state.fileId,
    ])

    async function deleteFile() {
        if (!fileId || !user) return

        const toastId = toast.loading("Deleting File");

        const fileRef = ref(storage, `users/${user.id}/files/${fileId}`)

        try {
            deleteObject(fileRef).then(async () => {
                deleteDoc(doc(db, "users", user.id, "files", fileId))
            })
        } catch (error) {
            console.log(error);
        } finally {
            setIsDeleteModalOpen(false)

            toast.success("Deleted Successfully", {
                id: toastId
            });
        }

    }

    return (
        <Dialog
            open={isDeleteModalOpen}
            onOpenChange={(isOpen) => {
                setIsDeleteModalOpen(isOpen);
            }}
        >
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Are you sure you want to delete?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your file!
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex md:space-x-2 py-3">
                    <Button
                        size='sm'
                        className="px-3 py-2 flex-1"
                        variant={"ghost"}
                        onClick={() => setIsDeleteModalOpen(false)}
                    >
                        <span className="sr-only">Cancel</span>
                        <span>Cancel</span>
                    </Button>

                    <Button
                        type="submit"
                        size='sm'
                        className="px-3 py-2 flex-1"
                        variant={"destructive"}
                        onClick={() => deleteFile()}
                    >
                        <span className="sr-only">Delete</span>
                        <span>Delete</span>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
