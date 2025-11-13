"use client";

import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { getBanks } from "@/apiservices/bankApi";
import PreviewSheet from "../commen/PreviewSheet";
import { formatDateTime } from "@/lib/formatDateTime";

export default function BuserPreviewSheet({ buser = null, isOpen, onOpen, onClose }) {
    const [banks, setBanks] = useState([]);

    useEffect(() => {
        getBanks().then((data) => setBanks(data || []));
    }, []);

    const handleCancel = () => {
        onClose?.();
    };

    if (!buser) return null;

    const getBankName = (id) => {
        const bank = banks.find((b) => b.id === id);
        return bank ? bank.name : id;
    };

    return (
        <PreviewSheet
            title={`${buser.name}`}
            isOpen={isOpen}
            onOpen={onOpen}
            onCancel={handleCancel}
        >
            <div className=" p-2 text-sm">
                {/* Bank */}
                <div>
                    <Label className="font-semibold text-gray-600">Bank</Label>
                    <p className="mt-1 border rounded-md p-2 bg-gray-50 text-gray-800">
                        {getBankName(buser.bid)}
                    </p>
                </div>

                {/* Branch */}
               

                {/* Name */}

                <div>
                    <Label className="font-semibold text-gray-600">Name</Label>
                    <p className="mt-1 border rounded-md p-2 bg-gray-50 text-gray-800">
                        {buser.name}
                    </p>
                </div>

                {/* Mobile */}
                <div>
                    <Label className="font-semibold text-gray-600">Mobile</Label>
                    <p className="mt-1 border rounded-md p-2 bg-gray-50 text-gray-800">{buser.mobile}</p>
                </div>

                {/* Status */}
                <div>
                    <Label className="font-semibold text-gray-600">Status</Label>
                    <p
                        className={`mt-1 border rounded-md p-2 ${buser.status === "A"
                                ? "bg-green-50 text-green-700 border-green-200"
                                : "bg-red-50 text-red-700 border-red-200"
                            }`}
                    >
                        {buser.status === "A" ? "Active" : "Inactive"}
                    </p>
                </div>


               

                <div>
                    <Label className="font-semibold text-gray-600">pwd expiry days</Label>
                    <p className="mt-1 border rounded-md p-2 bg-gray-50 text-gray-800">
                        {buser.pwd_expiry_days}
                    </p>
                </div>


                <div>
                    <Label className="font-semibold text-gray-600">pin login attempt</Label>
                    <p className="mt-1 border rounded-md p-2 bg-gray-50 text-gray-800">
                        {buser.pinloginattempt}
                    </p>
                </div>

                <div>
                    <Label className="font-semibold text-gray-600">password login attempt</Label>
                    <p className="mt-1 border rounded-md p-2 bg-gray-50 text-gray-800">
                        {buser.pwdloginattempt}
                    </p>
                </div>

                {/* Toggles */}
                <div className="grid pt-3">
                    <div className="flex items-center justify-between border p-3 rounded-md bg-gray-50">
                        <Label>Enabled</Label>
                        <Switch checked={buser.enabled} disabled />
                    </div>

                    
                </div>
            </div>
        </PreviewSheet>
    );
}
