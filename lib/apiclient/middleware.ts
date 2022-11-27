"use client";

import { Middleware, SWRHook } from 'swr'
import { useAuth } from '../../contexts/auth';
import { GrpcWebError } from "../../gen/controlplane/v1/status";
import { grpc } from "@improbable-eng/grpc-web";

export const apiErrorMiddleware: Middleware = (useSWRNext: SWRHook) => (key, fetcher, config) => {
    const swr = useSWRNext(key, fetcher, config)
    const err = <GrpcWebError>swr.error;
    const { logout } = useAuth()

    if (err && err.code && err.code == grpc.Code.Unauthenticated) {
        console.log("authentication error", "code", err.code, "message", err.cause, "cause", err.message)
        if (logout) {
            console.log("logging out")
            logout()
        }
    }

    return swr
}