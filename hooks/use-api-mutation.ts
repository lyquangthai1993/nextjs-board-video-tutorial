import {useState} from "react";
import {useMutation} from "convex/react";


export const useApiMutation = (mutationFunction: any) => {
    const [pending, setPending] = useState(false);
    const apiMutation = useMutation(mutationFunction);

    const mutate = (payload: any) => {
        setPending(true);
        return apiMutation(payload)
            .finally(() => setPending(false))
            .then(r => r)
            .catch(error => error);
    };

    return {mutate, pending};
};
