'use client';
import React, { useState }  from 'react';
import { formatPrice, postData } from '@/lib/utils';
import { useToast } from '../ui/use-toast';
import { useSubscriptionModal } from '@/lib/providers/subscription-modal-provider';
import Loader from './Loader';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { useUser } from '@/lib/providers/user-provider';

export default function SubscriptionModal({ products }) {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const { open, setOpen } = useSubscriptionModal();
    const { subscription } = useUser();
    const { user } = useUser();

    const handleSubscribe = async (price) => {
        try {
            setLoading(true);
            if (!user) {
                toast({ title: 'you must be logged in'})
                setLoading(false);
                return;
            }
            if (!subscription) {
                toast({ title: 'already subscribed'})
                setLoading(false);
                return;
            }
            const { sessionId } = await postData({
                url: process.env.NEXT_PUBLIC_BACKEND_URL + '/subscribe/',
                data: {
                    price,
                }
            });
            console.log('getting checkout for stripe');

        } catch (error) {
            toast({ title: error.message })
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog onOpenChange={setOpen} open={open}>
            {subscription?.status === 'active' ? (
                <DialogContent>Already subscribed on paid plan !</DialogContent>
            ): (
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Subscribe</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                        <p>
                            Choose a plan to subscribe to.
                        </p>
                    </DialogDescription>
                   {products?.length ? <div className="flex
                  justify-between
                  items-center" key={product?.id}>
                        {products?.price?.map((price) => (
                            <React.Fragment key={price?.id}>
                                <strong>{formatPrice(price?.price)} / <small>{price?.interval}</small></strong>
                                <Button disabled={loading} onClick={() => handleSubscribe(price)}>
                                    {loading ? <Loader /> : 'Subscribe'}
                                </Button>
                            </React.Fragment>
                        ))}
                    </div>
                    : '' }
                </DialogContent>
            )
            }
        </Dialog>
    )

}