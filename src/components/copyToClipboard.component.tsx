'use client'

import { Button, Tooltip } from "flowbite-react"
import { useState } from "react";
import { LuClipboardCopy } from 'react-icons/lu';

export const CopyToClipboard = ({content} : any) => {
    const [copyMessage, setCopyMessage] = useState<string>('Copy');

    return(
        <Tooltip content={copyMessage}>
            <Button color="gray" className="h-6 w-6" onClick={() => {navigator.clipboard.writeText(content); setCopyMessage('Copied');}}>
                <LuClipboardCopy className="h-4 w-4" />
            </Button>
        </Tooltip>
    )
}