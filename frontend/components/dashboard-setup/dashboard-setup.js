'use client'
import { useState } from "react";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import Loader from "../global/Loader";
import { useSession } from "next-auth/react";
import { v4 } from "uuid";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { createWorkspace } from "@/lib/queries";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const DashboardSetup = ({ user, subscription}) => {
    const { toast } = useToast();
    const router = useRouter();
    const { data: session } = useSession({ required: true });
    const { register, handleSubmit, reset, formState: { isSubmitting: isLoading, errors} } = useForm({
        mode: 'onChange',
        defaultValues: {
            logo: '',
            name: '',
        }
    });
    const onSubmit = async (data) => {
        const file = data.logo?.[0];
        let filePath = '';
        console.log(file);

        if (file) {
            try {
                
            } catch (error) {
                
            }
        }
    };
    return (
        <Card className="w-[800px]
        h-screen
        sm:h-auto">
            <CardHeader>
                <CardTitle>
                    Create a new workspace
                </CardTitle>
                <CardDescription>
                    Create a private workspace to get you started. You can add collaborators later from the workspace admin panel.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                            <div className="text-5xl">
                                
                            </div>
                            <div className="w-full">
                                
                            </div>
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}

export default DashboardSetup;
