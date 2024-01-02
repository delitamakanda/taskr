'use client'
import { useState } from "react";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import Loader from "../global/Loader";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { createWorkspace } from "@/lib/queries";
import {  useForm } from "react-hook-form";
import EmojiPicker from '../global/emoji-picker'
import { Label } from '../ui/label';
import { Input } from '../ui/input';


const DashboardSetup = ({ user, subscription}) => {
    const { toast } = useToast();
    const router = useRouter();
    const [selectedEmoji, setSelectedEmoji] = useState('💼');
    const { data: session } = useSession();
    const { register, handleSubmit, reset, formState: { isSubmitting: isLoading, errors} } = useForm({
        mode: 'onChange',
        defaultValues: {
            logo: '',
            title: '',
            owner: user?.pk,
        }
    });
    const onSubmit = async (data) => {
        const file = data.logo?.[0];
        console.log(data);
        try {
            const newWorkspace = {
                title: data.title,
                logo: file || null,
                icon_id: selectedEmoji,
                in_trash: '',
                banner_url: '',
                data: null,
                owner: user?.pk,
            }
            const { data: workspace } = await createWorkspace(session.access_token, newWorkspace);
            toast({
                title: 'Workspace created successfully',
                description: `Workspace ${workspace.title} created successfully`,
            })
            router.push(`main/${workspace.id}/`);
        } catch (error) {
            console.error(error);
            toast({
                variant: 'destructive',
                title: 'Failed to create workspace',
                description: error.message,
            })
        }
        finally {
            reset();
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
                <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                            <div className="text-5xl">
                                <EmojiPicker getValue={(emoji) => setSelectedEmoji(emoji)}>
                                {selectedEmoji}
                                </EmojiPicker>
                            </div>
                            <div className="w-full">
                                <Label htmlFor="title" className="text-sm text-muted-foreground">
                                    Name
                                </Label>
                                <Input id="title" type="text" placeholder="Workspace name" disabled={isLoading} {...register('title', { required: 'Workspace name is required', })} />
                                <small className="text-red-600">{errors?.workspaceName?.message?.toString()}</small>
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="logo" className="text-sm text-muted-foreground">
                                Workspace logo
                            </Label>
                            <Input id="logo" type="file" placeholder="Workspace logo" {...register('logo', { required: false, })} />
                            <small className="text-red-600">{errors?.logo?.message?.toString()}</small>
                            {subscription?.status !== 'active' && (
                                <small>
                                    To customize your workspace, you need a Pro Plan
                                </small>
                            )}
                        </div>
                        <div className="self-end">
                            <Button type="submit" disabled={isLoading}>
                                {isLoading? <Loader /> : 'Create workspace'}
                            </Button>
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}

export default DashboardSetup;
