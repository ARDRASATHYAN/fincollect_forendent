"use client";

import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { getBanks } from "@/apiservices/bankApi";
import PreviewSheet from "../commen/PreviewSheet";
import { formatDateTime } from "@/lib/formatDateTime";

export default function AgentPreviewSheet({ agent = null, isOpen, onOpen, onClose }) {
    const [banks, setBanks] = useState([]);

    useEffect(() => {
        getBanks().then((data) => setBanks(data || []));
    }, []);

    const handleCancel = () => {
        onClose?.();
    };

    if (!agent) return null;

    const getBankName = (id) => {
        const bank = banks.find((b) => b.id === id);
        return bank ? bank.name : id;
    };

    return (
        <PreviewSheet
            title={`${agent.name}-${agent.mname}`}
            isOpen={isOpen}
            onOpen={onOpen}
            onCancel={handleCancel}
        >
            <div className="space-y-4 p-2 text-sm">
                {/* Bank */}
                <div>
                    <Label className="font-semibold text-gray-600">Bank</Label>
                    <p className="mt-1 border rounded-md p-2 bg-gray-50 text-gray-800">
                        {getBankName(agent.bid)}
                    </p>
                </div>

                {/* Branch */}
                <div>
                    <Label className="font-semibold text-gray-600">Branch</Label>
                    <p className="mt-1 border rounded-md p-2 bg-gray-50 text-gray-800">{agent.branch}</p>
                </div>

                {/* ID */}
                <div>
                    <Label className="font-semibold text-gray-600">Agent ID</Label>
                    <p className="mt-1 border rounded-md p-2 bg-gray-50 text-gray-800">{agent.id}</p>
                </div>

                {/* Name */}

                <div>
                    <Label className="font-semibold text-gray-600">Name</Label>
                    <p className="mt-1 border rounded-md p-2 bg-gray-50 text-gray-800">
                        {agent.name}
                    </p>
                </div>

                <div>
                    <Label className="font-semibold text-gray-600">Middle Name</Label>
                    <p className="mt-1 border rounded-md p-2 bg-gray-50 text-gray-800">
                        {agent.mname}
                    </p>
                </div>

                {/* Mobile */}
                <div>
                    <Label className="font-semibold text-gray-600">Mobile</Label>
                    <p className="mt-1 border rounded-md p-2 bg-gray-50 text-gray-800">{agent.mobile}</p>
                </div>

                {/* Status */}
                <div>
                    <Label className="font-semibold text-gray-600">Status</Label>
                    <p
                        className={`mt-1 border rounded-md p-2 ${agent.status === "A"
                                ? "bg-green-50 text-green-700 border-green-200"
                                : "bg-red-50 text-red-700 border-red-200"
                            }`}
                    >
                        {agent.status === "A" ? "Active" : "Inactive"}
                    </p>
                </div>


                <div>
                    <Label className="font-semibold text-gray-600">last login date</Label>
                    <p className="mt-1 border rounded-md p-2 bg-gray-50 text-gray-800">
                        {formatDateTime(agent.last_login_date)}
                    </p>
                </div>


                <div>
                    <Label className="font-semibold text-gray-600">pwd changed date</Label>
                    <p className="mt-1 border rounded-md p-2 bg-gray-50 text-gray-800">
                        {formatDateTime(agent.pwd_changed_date)}
                    </p>
                </div>

                <div>
                    <Label className="font-semibold text-gray-600">pwd expiry days</Label>
                    <p className="mt-1 border rounded-md p-2 bg-gray-50 text-gray-800">
                        {agent.pwd_expiry_days}
                    </p>
                </div>


                <div>
                    <Label className="font-semibold text-gray-600">pin login attempt</Label>
                    <p className="mt-1 border rounded-md p-2 bg-gray-50 text-gray-800">
                        {agent.pinloginattempt}
                    </p>
                </div>

                <div>
                    <Label className="font-semibold text-gray-600">password login attempt</Label>
                    <p className="mt-1 border rounded-md p-2 bg-gray-50 text-gray-800">
                        {agent.pwdloginattempt}
                    </p>
                </div>

                {/* Toggles */}
                <div className="grid grid-cols-2 gap-3 pt-3">
                    <div className="flex items-center justify-between border p-3 rounded-md bg-gray-50">
                        <Label>Enabled</Label>
                        <Switch checked={agent.enabled} disabled />
                    </div>

                    <div className="flex items-center justify-between border p-3 rounded-md bg-gray-50">
                        <Label>SMS Required</Label>
                        <Switch checked={agent.sms_required} disabled />
                    </div>

                    <div className="flex items-center justify-between border p-3 rounded-md bg-gray-50">
                        <Label>Print Required</Label>
                        <Switch checked={agent.print_required} disabled />
                    </div>

                    <div className="flex items-center justify-between border p-3 rounded-md bg-gray-50">
                        <Label>Collection Status</Label>
                        <Switch checked={agent.collection_status} disabled />
                    </div>
                </div>
            </div>
        </PreviewSheet>
    );
}
