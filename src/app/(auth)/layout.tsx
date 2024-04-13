import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex min-h-screen w-screen items-center justify-center">
            {children}
        </div>
    );
};

export default AuthLayout;
