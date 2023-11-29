"use client"

import { FileType } from "@/typings"
import { ColumnDef } from "@tanstack/react-table"
import prettyBytes from 'pretty-bytes'
import Link from 'next/link';
import { FileIcon, defaultStyles } from 'react-file-icon';


export const columns: ColumnDef<FileType>[] = [
    {
        accessorKey: 'type',
        header: 'Type',
        cell: ({ renderValue, ...props }) => {
            const type = renderValue() as string;
            const extenstion: string = type.split('/')[1];
            return (
                <div className="w-10">
                    <FileIcon
                        extension={extenstion}
                        labelColor='#eab308'
                        //@ts-ignore
                        {...defaultStyles[extenstion]}
                    />
                </div>
            )
        }
    },
    {
        accessorKey: "filename",
        header: "Filename",
    },
    {
        accessorKey: "timestamp",
        header: "Date Added",
    },
    {
        accessorKey: "size",
        header: "Size",
        cell: ({ renderValue, ...props }) => {
            return <span>{prettyBytes(renderValue() as number)}</span>
        }
    },
    {
        accessorKey: 'downloadURL',
        header: 'Link',
        cell: ({ renderValue, ...props }) => (
            <a
                href={renderValue() as string}
                target="_blank"
                className="underline text-blue-500 hover:text-blue-600"
            >
                Download
            </a>
        )
    }
]
