'use client'

import { useAppStore } from '@/store/store';
import { useUser } from '@clerk/nextjs';
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { db } from "@/firebase"
import { doc, updateDoc } from "firebase/firestore"
import { Input } from './ui/input';
import toast from 'react-hot-toast';


type Props = {}

function RenameModal({ }: Props) {

    const { user } = useUser();

    const [input, setInput] = useState('')

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
    ]);

    async function renameFile() {
        if (!fileId || !user) return

        const toastId = toast.loading("Renaming...")

        try {
            await updateDoc(doc(db, "users", user.id, "files", fileId), {
                filename: input,
            })
        } catch (error) {
            console.log(error);
        } finally {
            setIsRenameModalOpen(false);
            setInput("")
            toast.success("Rename Successful", {
                id: toastId,
            })
        }
    }

    return (
        <Dialog
            open={isRenameModalOpen}
            onOpenChange={(isOpen) => {
                setIsRenameModalOpen(isOpen);
            }}
        >
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className='pb-2'>Rename the file</DialogTitle>

                    <Input
                        id='link'
                        defaultValue={filename}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDownCapture={(e) => {
                            if (e.key === "Enter") {
                                renameFile();
                            }
                        }}
                    />
                </DialogHeader>
                <DialogFooter className="flex justify-end md:space-x-2 py-3">
                    <Button
                        size='sm'
                        className="px-3 py-2 flex-1"
                        variant={"ghost"}
                        onClick={() => setIsRenameModalOpen(false)}
                    >
                        <span className="sr-only">Cancel</span>
                        <span>Cancel</span>
                    </Button>

                    <Button
                        type="submit"
                        size='sm'
                        className="px-3 py-2 flex-1"
                        onClick={() => renameFile()}
                    >
                        <span className="sr-only">Rename</span>
                        <span>Rename</span>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default RenameModal