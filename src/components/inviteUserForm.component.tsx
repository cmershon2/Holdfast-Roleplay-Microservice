'use client'

import { useForm } from 'react-hook-form';
import axios from 'axios'; // You might need to install axios: npm install axios

function AdminInviteUserForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post('/api/admin/users/invite', { emails: data.emails.split('\n') });
      console.log(response.data.message);
    } catch (error) {
      console.error('Error sending invites:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <textarea
        {...register('emails', { required: true })}
        placeholder="Enter email addresses separated by a new line"
        rows={5}
        cols={30}
      />
      {errors.emails && <p>Emails are required</p>}
      <button type="submit">Send Invites</button>
    </form>
  );
}

export default AdminInviteUserForm;