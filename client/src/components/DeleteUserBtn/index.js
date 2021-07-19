import React from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_USER } from '../../utils/mutations';

function DeleteUserBtn(props) {

    const [deleteUser, { error }] = useMutation(DELETE_USER);

    const handleDelete = async (event) => {
        event.preventDefault();
        try {
            const deleteResponse = await deleteUser({
                variables: {
                    password: props.password,
                },
            });
            if (deleteResponse) {
                window.location.assign('/userdeleted');
            }
        } catch (e) {
            console.log(e)
        }
    };

    return (
        <div>
            {error ? (
                <div>
                    <p className="text-danger text-center">{error.message}</p>
                </div>
            ) : null}
            <div className="row my-2 mx-3 justify-content-center">
                <button className="btn btn-primary mt-1" id="delete" type="submit" onClick={handleDelete}>
                    Delete Profile
                </button >
            </div>
        </div>
    )
}

export default DeleteUserBtn;