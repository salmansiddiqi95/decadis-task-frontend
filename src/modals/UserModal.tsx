import { useForm, SubmitHandler } from "react-hook-form";
import {Button, Label, Modal, Select, TextInput} from "flowbite-react";
import {createUser, updateUser} from "../api/userApis";
import {useEffect} from "react";

// Define the correct form inputs type
type Inputs = {
    firstname: string;
    lastname: string;
    email: string;
    actions: string;
};

// Define the user data type and Props for the component
type userData = {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    actions: string;
};

type Props = {
    user: userData;
    showModal: boolean;
    closeModal: () => void;
    getUsers: () => void;
    setSelectedUser: () => void | undefined;
};

function UserModal({ user, showModal, closeModal, getUsers, setSelectedUser }: Props) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
        reset,
    } = useForm<Inputs>(); // Use correct type for form

    useEffect(() => {
        if(user && user.id) {
            reset({
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                actions: JSON.parse(user.actions)
            })
        }
    }, [reset, user]);

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        const userData = {
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            actions: Array.isArray(data?.actions) ? data.actions : [data.actions],
        };

        if(user && user?.id) {
            updateUser(user?.id, userData)
                .then((res) => {
                    console.log("User updated:", res);
                    closeModal(); // Close the modal on success
                    setSelectedUser();
                    reset({
                        firstname: '',
                        lastname: '',
                        email: '',
                        actions: 'create-item'
                    })
                    getUsers(); // Get the new users
                })
                .catch((err) => {
                    console.error("Error updating user:", err);
                    // You can also display an error message to the user
                });

        }

        else {
            createUser(userData)
                .then((res) => {
                    console.log("User created:", res);
                    closeModal(); // Close the modal on success
                    getUsers(); // Get the new users
                })
                .catch((err) => {
                    console.error("Error creating user:", err);
                    // You can also display an error message to the user
                });
        }
    };

    return (
        <Modal show={showModal} onClose={closeModal}>
            <Modal.Header>
                {user?.id ? `Edit ${user.firstname} ${user.lastname}` : "Add User"}
            </Modal.Header>
            <Modal.Body>
                <form className="flex flex-col gap-4">
                    <div>
                        <Label htmlFor="firstname" value="First Name"/>
                        <TextInput
                            id="firstname"
                            type="text"
                            placeholder="John"
                            value={watch('firstname')}
                            {...register("firstname", {required: "First name is required"})} // Correct the key and add validation
                            onChange={(e) => setValue('firstname', e.target.value)}
                        />
                        {errors.firstname && <span>{errors.firstname.message}</span>}
                    </div>

                    <div>
                        <Label htmlFor="lastname" value="Last Name"/>
                        <TextInput
                            id="lastname"
                            type="text"
                            placeholder="Doe"
                            value={watch('lastname')}
                            {...register("lastname", {required: "Last name is required"})}
                            onChange={(e) => setValue('lastname', e.target.value)}
                        />
                        {errors.lastname && <span>{errors.lastname.message}</span>}
                    </div>

                    <div>
                        <Label htmlFor="email" value="Email"/>
                        <TextInput
                            id="email"
                            type="email"
                            placeholder="example@example.com"
                            value={watch('email')}
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "Invalid email format",
                                },
                            })}
                            onChange={(e) => setValue('email', e.target.value)}
                        />
                        {errors.email && <span>{errors.email.message}</span>}
                    </div>
                    <div>
                        <Label htmlFor="action" value="Action"/>
                        <Select
                            id="action"
                            value={watch('actions')}
                            {...register("actions", {required: "Action is required"})}
                            defaultValue="Action" // Default value for the dropdown
                            onChange={(e) => setValue('actions', e.target.value)}
                        >
                            <option value="create-item">Create</option>
                            <option value="move-item">Move</option>
                            <option value="view-item">View</option>
                            <option value="delete-item">Delete</option>
                        </Select>
                        {errors.actions && <span>{errors.actions.message}</span>}
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button type="submit"
                        onClick={handleSubmit(onSubmit)}>{ user?.id ? 'EDIT' : 'ADD'}</Button> {/* Ensure this button submits the form */}
                <Button color="gray" onClick={closeModal}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default UserModal;
