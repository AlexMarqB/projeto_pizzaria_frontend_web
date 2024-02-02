"use client"

import { useState } from "react";
import { OrderModal } from "./orderModal";

interface CardProps {
    id: string;
    table: number;
    status: boolean;
    draft: boolean;
    name?: string;
    bill: number;
    created_at: Date;
    updated_at: Date;
}

export function OrderCard({data}: {data: CardProps}) {
    const [modal, setModal] = useState(false)

    return (
        <>
            <button type="button" onClick={() => setModal(true)} className="flex w-full h-12 rounded-md items-center bg-blue-200">
                <div className="h-full w-2 bg-green-100 rounded-l-md mr-3" />
                <h1 className="font-[700] text-white-100 text-[16px] md:text-[18px] lg:text-[23px] xl:text-[27px]">Mesa {data.table}</h1>
            </button>
            <OrderModal isOpen={modal} onClose={setModal} order_id={data.id} table={data.table} />
        </>
    )
}   