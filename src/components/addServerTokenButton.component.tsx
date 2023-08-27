'use client'

import { Button, Label, Modal, Spinner, TextInput } from "flowbite-react";
import { GiKeyring } from 'react-icons/gi';
import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function AddServerTokenButton() {
    const {
        handleSubmit,
        register,
        formState: { errors },
      } = useForm();

    const [openModal, setOpenModal] = useState<string | undefined>();
    const [buttonLoading, setButtonLoading] = useState<boolean>();
    const props = { openModal, setOpenModal, buttonLoading, setButtonLoading };

    const onSubmit = async (data: any) => {
        props.setButtonLoading(true);

        try {
            const response = await axios.post('/api/admin/server/token', { name: data.name });
            console.log(response.data.message);
            props.setOpenModal(undefined);
            props.setButtonLoading(false);
            toast.success("Server Token Created", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } catch (error) {
            console.error('Error creating server token:', error);
            props.setButtonLoading(false);
            toast.error("Server Token Failed", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
        }
    };

    return(
    <>
        <Button color="gray" onClick={() => props.setOpenModal('openTokenModal')}>
          <GiKeyring className="mr-3 h-4 w-4" />
          <p>
            New Token
          </p>
        </Button>

        <Modal show={props.openModal === 'openTokenModal'} onClose={() => props.setOpenModal(undefined)}>
            <Modal.Header>Add New Server Token</Modal.Header>
            <Modal.Body>
                <div className="space-y-6">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="block">
                            <Label
                                htmlFor="tokenName"
                                value="Token Name"
                            />
                        </div>
                        <TextInput
                            {...register('name', { required: true })}
                            className="mb-2"
                            id="tokenName"
                            placeholder="my new holdfast token"
                            required
                            type="text"
                        />
                        {errors.name && <p>Token name is required</p>}

                        {props.buttonLoading &&
                            <Button isProcessing disabled>
                                Submit
                            </Button>
                        }
                        {!props.buttonLoading &&
                            <Button type="submit">
                                Submit
                            </Button>
                        }
                    </form>
                </div>
            </Modal.Body>
        </Modal>
    </>
    )
}