import { Outlet } from "react-router-dom";

import { Footer, Header } from '../../components'

export const UserLayout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}