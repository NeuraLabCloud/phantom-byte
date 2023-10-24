import React, { FC } from "react";
import Link from "next/link"

interface ComponentProps {}

const Component: FC<ComponentProps> = async ({}) => {
    return (
        <div>
            <p className={"mb-5"}>
                Dashboard Page
            </p>
            <Link href="/logout">
               Logout
            </Link>
        </div>
    )
};

export default Component;
