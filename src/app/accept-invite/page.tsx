"use client"

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';

function AcceptInvitePage() {
    const tokenParams = useSearchParams()
    const token = tokenParams.get('token');
    const [status, setStatus] = useState('Verifying...');

    useEffect(() => {

        async function verifyToken() {
        try {
            const response = await axios.post('/api/auth/verify-invite-token', { token: token });
            setStatus(response.data.message);
        } catch (error) {
            setStatus('Invalid token or expired.');
        }
        }

        if (token) {
            verifyToken();
        } else {
            setStatus('Invalid token.');
        }
    }, []);

    return (
    <div>
        <p>{status}</p>
    </div>
    );
}

export default AcceptInvitePage;