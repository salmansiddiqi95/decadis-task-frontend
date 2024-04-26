import { useForm, SubmitHandler } from "react-hook-form";
import {Button, Label, Modal, Select} from "flowbite-react";
import {runAction} from "../api/userApis";

type Inputs = {
    id: string,
    action: string;
};

type userData = {
    id?: number;
    firstname?: string;
    lastname?: string;
    email?: string;
    actions?: string[];
};

type Props = {
    user: userData;
    showModal: boolean;
    closeModal: () => void;
};

function ActionModal({ user, showModal, closeModal }: Props) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>(); // Use correct type for form

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        const userData = {
            userId: user.id,
            action: data.action,
        };

        runAction(userData)
            .then((res) => {
                console.log("Action performed:", res);
                closeModal(); // Close the modal on success
            })
            .catch((err) => {
                console.error("Error performing action:", err);
                // You can also display an error message to the user
            });
    };

    return (
        <Modal show={showModal} onClose={closeModal}>
            <Modal.Header>
                Perform Action
            </Modal.Header>
            <Modal.Body>
                <form className="flex flex-col gap-4">
                    <div>
                        <Label htmlFor="action" value="Action"/>
                        <Select
                            id="action"
                            {...register("action", {required: "Action is required"})}
                            defaultValue="Action" // Default value for the dropdown
                        >
                            <option value="create-item">Create</option>
                            <option value="move-item">Move</option>
                            <option value="view-item">View</option>
                            <option value="delete-item">Delete</option>
                        </Select>
                        {errors.action && <span>{errors.action.message}</span>}
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button type="submit"
                        onClick={handleSubmit(onSubmit)}>RUN ACTION</Button>
                <Button color="gray" onClick={closeModal}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
export default ActionModal;
