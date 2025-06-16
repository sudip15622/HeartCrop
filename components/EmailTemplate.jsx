
export const EmailTemplate = ({ name, message, email }) => (
    <div style={{
        fontFamily: 'Arial, sans-serif',
        color: '#333',
        margin: '0 auto',
        maxWidth: '600px',
        padding: '20px',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        border: '1px solid #e1e1e1',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
    }}>
        <div style={{
            textAlign: 'center',
            marginBottom: '20px',
            paddingBottom: '20px',
            borderBottom: '1px solid #e1e1e1'
        }}>
            <img
                src="https://i.ibb.co/TBjWH5pK/heartcrop.png"
                alt="heartcrop"
                style={{ width: '80px', height: 'auto', borderRadius: '50%' }}
            />
        </div>
        <h1 style={{
            textAlign: 'center',
            color: '#ef4444',
            fontSize: '26px',
            margin: '20px 0',
            fontWeight: '600'
        }}>
            Hello, HeartCrop!
        </h1>
        <p style={{
            textAlign: 'center',
            fontSize: '16px',
            margin: '0 0 20px 0'
        }}>
            You got a message from {name}:
        </p>
        <div style={{
            textAlign: 'center',
            padding: '15px',
            backgroundColor: '#f8f8f8',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            marginBottom: '20px'
        }}>
            <p style={{
                fontSize: '17px',
                color: 'rgb(39, 77, 135)',
                margin: '0'
            }}>
                {message}
            </p>
        </div>
        <p style={{
            textAlign: 'center',
            fontSize: '16px',
            margin: '0 0 7px 0'
        }}>
           Name: {name}
        </p>
        <p style={{
            textAlign: 'center',
            fontSize: '16px',
            margin: '0 0 7px 0',
        }}>
            Email Address: {email}
        </p>
        <footer style={{
            textAlign: 'center',
            fontSize: '14px',
            color: '#555',
            borderTop: '1px solid #e1e1e1',
            paddingTop: '20px',
            paddingBottom: '10px',
            marginTop: '30px',
            backgroundColor: '#f9f9f9',
            borderRadius: '0 0 8px 8px'
        }}>
            <p style={{ margin: '0', fontSize: '15px' }}>Best regards,</p>
            <p style={{ margin: '5px 0 0 0', fontSize: '16px', fontWeight: 'bold' }}><strong>HeartCrop</strong></p>
        </footer>
    </div>
);

export default EmailTemplate
