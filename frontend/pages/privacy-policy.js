import Head from "next/head";
import PublicLayout from "@/components/layouts/publicLayout";
import { Button } from "@mui/material";

const PolicyPrivacy = () => {
    return (
        <>
        <Head>
            <title>Privacy Policy</title>
            <meta name="description" content="Privacy Policy"></meta>
        </Head>

        <PublicLayout>
            Privacy Policy lorem ipsum lorem sit dolor sit amet consectetur adipisicing elit.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            <Button variant="contained" color="primary" href="/">Home</Button>
        </PublicLayout>
        </>
    )
}

export default PolicyPrivacy;
