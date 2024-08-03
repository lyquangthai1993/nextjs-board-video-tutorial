import {cn} from "@/lib/utils";
import {Plus} from "lucide-react";
import {useApiMutation} from "@/hooks/use-api-mutation";
import {api} from "@/convex/_generated/api";
import {toast} from "sonner";

interface NewBoardButtonProps {
    orgId: string;
   disabled?: boolean;
}

const NewBoardButton = ({
                            orgId,
                            disabled
                        }: NewBoardButtonProps) => {

    const {mutate, pending} = useApiMutation(api.board.create);

    const onClick = () => {
        console.log('onclick');
        if (!orgId) return;

        mutate({
            orgId: orgId!,
            title: 'Untitled'
        })
            .then(id => {
                console.log('board created', id);
                toast.success('Board created');
                //TODO: redirect to the board/{id}
            })
            .catch((error) => {
                console.error(error);
                toast.error('Failed to create board');
            });
    };

    return (
        <button
        disabled={pending||disabled}
        onClick={onClick}
        className={cn(
            "col-span-1 aspect:[100/27] bg-blue-600 flex flex-col items-center justify-center rounded-lg hover:bg-blue-800 text-white",
            "hover:bg-blue-800",
            (pending||disabled) && 'hover:bg-blue-600 opacity-50 cursor-not-allowed'
        )}
        >
            <div></div>
            <Plus className="w-12 h-12 stroke-1"/>
            <p className={'text-xs text-white font-light'}>
                New Board
            </p>
        </button>
    );
};

export default NewBoardButton;
